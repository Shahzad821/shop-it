import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentInfo,
    user: req.user._id,
  });
  res.status(201).json(order);
});
export const orderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  res.status(200).json(order);
});
export const myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  res.status(200).json(orders);
});
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Update product stock based on order items
  for (let item of order.orderItems) {
    try {
      const product = await Product.findById(item.product.toString()); // Corrected toString
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Reduce the product stock by the ordered quantity

      product.stock -= item.quantity;

      // Save the updated product
      await product.save({ validateBeforeSave: false }); // Removed validateBeforeSave: false to ensure validation is respected
    } catch (error) {
      return next(error); // If any error occurs during stock update, stop the process
    }
  }

  // Update the order status and set deliveredAt if necessary
  order.orderStatus = req.body.status;

  // Set deliveredAt only if status is "Delivered"
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({ success: true });
});

export const allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");
  res.status(200).json(orders);
});
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  res.status(204).json({ success: true });
});
const getDatesBetween = (startDate, endDate) => {
  let dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const getSalesData = async (startDate, endDate) => {
  let totalSales = 0;
  let totalOrders = 0;

  // Fetch sales data from MongoDB aggregation
  const salesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        totalSales: { $sum: "$totalAmount" },
        numberOfOrders: { $sum: 1 },
      },
    },
  ]);

  // Store sales data in a map for quick lookup by date
  const salesMap = new Map();
  salesData.forEach((data) => {
    const date = data._id.date;
    const sales = data.totalSales;
    const numberOfOrders = data.numberOfOrders;

    salesMap.set(date, { sales, numberOfOrders });
    totalSales += sales;
    totalOrders += numberOfOrders;
  });

  // Get all dates in the range, including those without sales
  const dates = getDatesBetween(startDate, endDate);

  // Map the dates to corresponding sales and order data, filling in missing dates with 0
  const finalDatesData = dates.map((date) => {
    return {
      date,
      sales: (salesMap.get(date) || { sales: 0 }).sales,

      numberOfOrders: (salesMap.get(date) || { numberOfOrders: 0 })
        .numberOfOrders,
    };
  });

  return { salesMap, totalSales, totalOrders, finalDatesData };
};

export const getSales = catchAsyncError(async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    // Check for valid date range
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({
        message: "Invalid date range",
      });
    }

    // Set the time range to the full day
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    // Fetch sales data
    const { salesMap, totalSales, totalOrders, finalDatesData } =
      await getSalesData(startDate, endDate);

    // Respond with the fetched data
    res.status(200).json({
      salesData: finalDatesData, // Use finalDatesData with all dates included
      totalSales,
      totalOrders,
      message: "Sales data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    next(error); // Forward to global error handler
  }
});
