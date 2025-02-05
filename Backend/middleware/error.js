import ErrorHandler from "../utils/errorHandler.js";

const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 (Internal Server Error) by default
  let statusCode = err.statusCode || 500;

  // Set the message to the error message or default to 'Internal Server Error'
  let message = err.message || "Internal Server Error";

  // Handling Mongoose CastError (when an invalid ObjectId is passed)
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400; // Bad Request status code for invalid ObjectId
  }

  // Handle other specific error cases, like validation errors or database-related errors
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400; // Bad Request for validation errors
  }
  if (err.name === "JsonWebTokenError") {
    message = `JSON Web Token Error: ${err.message}`;
    statusCode = 400; // Bad Request status code for invalid ObjectId
  }
  if (err.name === "TokenExpiredError") {
    message = `JSON Web Token is expired: ${err.message}`;
    statusCode = 400; // Bad Request status code for invalid ObjectId
  }

  // Handle MongoDB duplicate key error (for unique constraints)
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    statusCode = 400;
  }

  // Create a new error object with the message and status code
  const error = new ErrorHandler(message, statusCode);

  // Optionally, include the stack trace in development environment
  // You can adjust this based on your environment (e.g., disable stack trace in production)
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    return res
      .status(statusCode)
      .json({ message: error.message, error: err, stack: err.stack });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    return res.status(statusCode).json({ message: error.message });
  }
};

export default errorHandler;
