// The wrapper function for async controller functions
export default (controllerFunction) => {
  return (req, res, next) => {
    // Return a promise to handle async controller functions
    Promise.resolve(controllerFunction(req, res, next)).catch(next); // If there's an error, pass it to the next middleware
  };
};
