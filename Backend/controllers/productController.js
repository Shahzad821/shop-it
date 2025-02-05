import catchAsyncError from "../middleware/catchAsyncError.js";
import Product from "../models/product.js";
import APIFilter from "../utils/apiFilter.js";
import ErrorHandler from "../utils/ErrorHandler.js"; // Assuming the path is correct
import Order from "../models/order.js";
import uploadFile, { deleteFile } from "../utils/cloudinary.js";
// Controller to get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resperpage = 4;

  // Initialize the API filter and apply search and filters methods
  const apiFilter = new APIFilter(Product, req.query)
    .search() // Apply search filters (e.g., by keyword)
    .filters(); // Apply other filters (e.g., by price, category, etc.)
  let products = await apiFilter.query;
  const filteredProductsCount = products.length;
  // Apply pagination to the query
  apiFilter.pagination(resperpage);

  // Execute the query and get the filtered products
  products = await apiFilter.query.clone();

  // Send the response with products and filtered count
  res.status(200).json({
    resperpage,
    products,
    filteredProductsCount,
  });
});

// Controller to create a new product
export const newProduct = catchAsyncError(async (req, res, next) => {
  // Create the new product using Mongoose's built-in validation
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Controller to get a single product by ID
export const getProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get the product ID from request params

  // Fetch the product by its ID
  const product = await Product.findById(id).populate("reviews.user");

  // Check if the product exists
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Return the found product
  res.status(200).json(product);
});

// Controller to update a product by ID
export const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Get product ID from the request params
  const updates = req.body; // Get the updated fields from the request body

  // Find and update the product by its ID
  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true, // Return the updated product
    runValidators: true, // Ensure that validations are applied to updated fields
  });

  // If no product is found, return a 404 error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Return the updated product
  res.status(200).json(product);
});
export const uploadImage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (!req.body.images || !Array.isArray(req.body.images)) {
    return next(new ErrorHandler("No images provided", 400));
  }

  const uploader = async (image) => uploadFile(image, "shopIt/products");

  const urls = await Promise.all(req.body.images.map(uploader));

  product.images.push(...urls);

  await product.save();

  res.status(200).json(product);
});
export const deleteProductImage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Fetch the product using the provided id
  const product = await Product.findOne({ _id: id });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Delete the image from the storage
  const isDeleted = await deleteFile(req.body.imgId);

  if (!isDeleted.success) {
    return next(new ErrorHandler(isDeleted.result, 500));
  }

  if (isDeleted.success) {
    // Filter out the image with the matching public_id
    product.images = product.images.filter(
      (image) => image.public_id.toString() !== req.body.imgId.toString()
    );
    // Save the updated product
    await product.save();
  }

  // Send back the updated product information as the response
  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
    product,
  });
});

// Controller to delete a product by ID
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  if (product.images && Array.isArray(product.images)) {
    for (const image of product.images) {
      await deleteFile(image.public_id); // Assuming deleteFile accepts public_id for deletion
    }
  }

  res.status(204).json({ message: "Product deleted" });
});

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  // Find the product
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  // Check if the user has already reviewed the product
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    // Update the review if it exists
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.rating = rating;
        r.comment = comment;
      }
    });
  } else {
    // Add new review if not already reviewed
    const review = {
      user: req.user._id,
      rating,
      comment,
    };
    product.reviews.push(review);
  }

  // Update number of reviews and average rating
  product.numOfReviews = product.reviews.length;

  // Calculate the average rating
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  // Save the product with updated reviews
  await product.save();

  res.status(201).json({ success: true });
});
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  const product = await Product.findById(id).populate("reviews.user");
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  res.status(200).json({ reviews: product.reviews });
  // This route doesn't need to be protected since it's only meant to be accessed by users who have already reviewed the product.
});

export const deleteReview = catchAsyncError(async (req, res, next) => {
  const { reviewId, productId } = req.query; // Extract reviewId and productId from the query parameters

  if (!productId || !reviewId) {
    return next(new ErrorHandler("Invalid request!", 400)); // If any of the parameters are missing, return an error
  }

  // Find the product in the database
  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404)); // If the product is not found, return an error
  }

  // Remove the review from the product's reviews array
  product.reviews = product?.reviews?.filter(
    (review) => review?._id.toString() !== reviewId.toString()
  );

  // Update the number of reviews for the product
  product.numOfReviews = product.reviews.length;

  // Recalculate the average rating for the product
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    Number(product.reviews.length || 1); // Avoid division by zero if there are no reviews left

  // Save the updated product with the removed review and new rating
  await product.save();

  // Send a response indicating success
  res.status(200).json({ success: true });
});

export const canUserReview = catchAsyncError(async (req, res) => {
  // Check if the productId is provided in the query
  if (!req.query.productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  // Check if there's a matching order where the user has purchased the product and it's delivered
  const order = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
    orderStatus: "Delivered",
  });

  // If no matching orders, the user can't review
  if (order.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  // If an order exists, the user can review the product
  return res.status(200).json({ canReview: true });
});
export const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  // Check if there are no products found
  if (products.length === 0) {
    return next(new ErrorHandler("No products found", 404));
  }
  // Return the found product
  res.status(200).json(products);
});
