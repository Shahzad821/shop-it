import express from "express";
import { isAuthenticated } from "../middleware/verifyUser.js";
import {
  stripeCheckoutSessions,
  stripeWebhook,
} from "../controllers/paymentController.js";
const router = express.Router();

// Correct the route path by adding the leading slash '/'

router.post(
  "/payment/checkout_sessions",
  isAuthenticated,
  stripeCheckoutSessions
);
router.post(
  "/payment/webhook",

  stripeWebhook
);

export default router;
