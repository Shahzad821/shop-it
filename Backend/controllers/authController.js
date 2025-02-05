import { request } from "http";
import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/user.js";
import { resetEmailTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
import uploadFile, { deleteFile } from "../utils/cloudinary.js";

export const registerUser = catchAsyncError(async (req, res) => {
  // Validate user input
  const { email, password, name } = req.body;

  // Create a new user
  const user = await User.create({
    email,
    password,
    name,
  });
  sendToken(user, 201, res);
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  // Validate user input

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Find user by email and include the password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  // Compare the entered password with the stored hashed password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  sendToken(user, 200, res);
});
export const logoutUser = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  // Validate user input
  const { email } = req.body;

  // Find user by email and include the password field
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Generate reset password token
  const resetToken = user.getResetPasswordToken();

  // Save the token in the database
  await user.save();

  // Create the reset password URL (use a query string for token)
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  // Prepare the email message
  const message = resetEmailTemplate(user.name, resetUrl);

  try {
    // Send the email to the user
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    // Respond to the client
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // In case of error, remove the token and expiry time from the user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return next(
      new ErrorHandler(error?.message || "Something went wrong", 500)
    );
  }
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid or expired token", 400));
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  res.status(200).json({ user });
});
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!(await user.comparePassword(req.body.currentPassword))) {
    return next(new ErrorHandler("Current password is incorrect", 401));
  }
  if (req.body.currentPassword == req.body.newPassword) {
    return next(
      new ErrorHandler(
        "New password cannot be the same as current password",
        400
      )
    );
  }
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({ success: true });
});
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req?.user?._id, userDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ user });
});
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ users });
});
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({ user });
});
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //TODO: delete the avatar from the cloudinary server
  if (req?.user?.avatar?.url) {
    const isdeleted = await deleteFile(req.user.avatar.public_id);
    if (!isdeleted.success) {
      return next(new ErrorHandler(isdeleted.result, 500));
    }
  }

  // Delete the user from the database
  await User.findByIdAndDelete(req.params.id);
  await user.deleteOne();
  res.status(204).json({ success: true, message: "User deleted" });
});
export const updateUser = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req?.user?._id, userDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ user });
});
export const uploadAvatar = catchAsyncError(async (req, res, next) => {
  const avatar = req.body.avatar;

  if (!avatar) {
    return next(new ErrorHandler("Please upload an avatar image", 400));
  }
  const avatarResponse = await uploadFile(avatar, "shopit/avatar");
  if (req?.user?.avatar?.url) {
    await deleteFile(req.user.avatar.public_id);
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatarResponse },
    {
      new: true,
    }
  );
  res.status(200).json({ user });
});
