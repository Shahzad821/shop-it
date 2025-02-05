import mongoose from "mongoose";

export const ConnectDb = () => {
  let DBURL = "";

  // Set DB URL based on environment
  if (process.env.NODE_ENV == "DEVELOPMENT") {
    DBURL = process.env.DB_LOCAL_URL; // Local development DB URL
  }
  if (process.env.NODE_ENV == "PRODUCTION") {
    DBURL = process.env.DB_PRODUCTION_URL; // Replace with your actual production DB URL environment variable
  }

  // Try to connect to the database
  mongoose
    .connect(DBURL)
    .then((con) => {
      console.log("Connected to Mongoose database:", con.connection.host);
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
    });
};
