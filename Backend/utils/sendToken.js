export default (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + process.env.TIMESTAMP * 24 * 60 * 60 * 1000), // Convert TIMESTAMP to milliseconds
    httpOnly: true, // Helps prevent cross-site scripting attacks by making the cookie accessible only through HTTP
  };

  // Set the cookie in the response and send the response
  res.status(statusCode).cookie("token", token, options).json({
    token, // Sending token as part of the response
  });
};
