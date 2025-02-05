class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace and exclude the constructor from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
// function createErrorHandler(message, statusCode) {
//   const error = new Error(message);
//   error.statusCode = statusCode;

//   // Capture the stack trace and exclude this function from the stack trace
//   if (Error.captureStackTrace) {
//     Error.captureStackTrace(error, createErrorHandler);
//   }

//   return error;
// }

// export default createErrorHandler;
