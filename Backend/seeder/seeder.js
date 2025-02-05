import mongoose from "mongoose"; // Import mongoose to connect to the database
import Product from "../models/product.js"; // Import the Product model
import products from "./data.js"; // Import the products data

// Define the async function to send products to the database
const sendProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://mrdeveloper102:shizzi12@shopit.z7ga3.mongodb.net/ShopIt?retryWrites=true&w=majority&appName=shopit"
    );

    // Delete all existing products in the collection
    await Product.deleteMany();
    console.log("All products deleted.");

    // Insert the new products data into the Product collection
    await Product.insertMany(products);
    console.log("Products inserted successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the function to execute the operation
sendProducts();
