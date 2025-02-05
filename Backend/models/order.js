import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Please enter the shipping address"],
      },
      city: {
        type: String,
        required: [true, "Please enter the city"],
      },
      phoneNo: {
        type: String,
        required: [true, "Please enter the phone number"],
      },
      postalCode: { type: String, required: [true, "Please enter postalCode"] },
      country: { type: String, required: [true, "Please enter the country"] },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter the user id!"], // Ensure user is required
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Please enter the product name"],
        },
        quantity: {
          type: Number,
          required: [true, "Please enter the quantity"],
        },
        image: {
          type: String,
          required: [true, "Please enter the product image"],
        },
        price: {
          type: Number,
          required: [true, "Please enter the price"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Please enter the product id!"], // Ensure product is required
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: {
        values: ["COD", "Card"],
        message: "Please select correct payment method",
      },
      required: [true, "Please choose a payment method"],
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: [true, "Please enter the items price"],
    },
    taxAmount: {
      type: Number,
      required: [true, "Please enter the tax amount"],
    },
    shippingAmount: {
      type: Number,
      required: [true, "Please enter the shipping amount"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Please enter the total amount"],
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["Processing", "Shipped", "Delivered"],
        message: "Please select correct order status",
      },
      default: "Processing",
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
