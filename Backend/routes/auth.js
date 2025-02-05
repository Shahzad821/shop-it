import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
} from "../controllers/authController.js";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyUser.js";
const router = express.Router();

// Correct the route path by adding the leading slash '/'
router.post("/register", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticated, getUserProfile);
router.put("/me/update-password", isAuthenticated, updatePassword);
router.put("/update/me/profile", isAuthenticated, updateProfile);
router.put("/me/upload-avatar", isAuthenticated, uploadAvatar);
router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/users/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUser
);
router.delete(
  "/admin/user/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
router.put(
  "/admin/user/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUser
);

export default router;
