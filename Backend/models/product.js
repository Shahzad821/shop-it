import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name!"],
      maxLength: [200, "Product name cannot exceed 200 characters!"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price!"],
      max: [99999, "Product price cannot exceed 5 digits!"], // Correct validation for numbers
    },
    description: {
      type: String,
      required: [true, "Please enter product description!"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true, // Make sure public_id is required
        },
        url: {
          type: String,
          required: true, // Ensure URL is present
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category!"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoors",
          "Homes",
        ],
        message: "Invalid product category!",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock!"],
      min: [0, "Stock cannot be negative!"], // Adding a minimum value check for stock
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true, // Ensure user is required
        },
        rating: {
          type: Number,
          required: [true, "Rating must be between 1 and 5"],
          min: 1,
          max: 5, // Rating should be between 1 and 5
        },
        comment: {
          type: String,
          required: [true, "Please provide a comment"],
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // function () {
      //   return this.isNew; // Only require user when the product is being created (isNew)
      // },
      // validate: {
      //   validator: async function (value) {
      //     // Check if the user exists in the database
      //     if (this.isNew && value) {
      //       const user = await mongoose.model("User").findById(value);
      //       return !!user; // Return true if user exists, false if not
      //     }
      //     return true; // Don't validate if not a new product (for updates)
      //   },
      //   message: "User not found",
      // },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
