import express from "express";
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getProduct,
  getProductReviews,
  newProduct,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyUser.js";
const router = express.Router();
router.get(
  "/products",

  getAllProducts
);
router.post(
  "/admin/product",
  isAuthenticated,
  authorizeRoles("admin"),
  newProduct
);
router.put(
  "/admin/product/:id/upload_images",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadImage
);
router.put(
  "/admin/product/:id/delete_images",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProductImage
);
router.get("/product/:id", getProduct);
router.put(
  "/update/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/delete/product/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProduct
);
router.put("/reviews", isAuthenticated, createProductReview);
router.get("/reviews", isAuthenticated, getProductReviews);
router.post("/can_review", isAuthenticated, canUserReview);
router.delete(
  "/admin/reviews",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteReview
);
router.get(
  "/admin/get_Products",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminProducts
);
export default router;
