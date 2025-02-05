import express from "express";
import {
  allOrders,
  deleteOrder,
  getSales,
  myOrders,
  newOrder,
  orderDetails,
  updateOrder,
} from "../controllers/orderController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/verifyUser.js";
const router = express.Router();
router.post("/orders/new", isAuthenticated, newOrder);
router.get("/me/orders/:id", isAuthenticated, orderDetails);
router.get("/me/orders", isAuthenticated, myOrders);
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  allOrders
);
router.get(
  "/admin/get_sales",
  isAuthenticated,
  authorizeRoles("admin"),
  getSales
);
router.put(
  "/admin/order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteOrder
);
export default router;
