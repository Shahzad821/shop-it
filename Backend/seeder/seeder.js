import mongoose from "mongoose"; // Import mongoose to connect to the database
import Product from "../models/product.js"; // Import the Product model
import products from "./data.js"; // Import the products data
import dotenv from "dotenv"; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file
const sendProducts = async () => {
  try {
    const dbUrl = process.env.DB_PROD_URL || process.env.DB_LOCAL_URL;
    await mongoose.connect(dbUrl);

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
