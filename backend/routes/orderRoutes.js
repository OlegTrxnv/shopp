import { Router } from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToShipped,
} from "../controllers/orderController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(protectRoute, adminRoute, getOrders)
  .post(protectRoute, addOrderItems);
router.get("/myorders", protectRoute, getMyOrders);
router.get("/:id", protectRoute, getOrderById);
router.put("/:id/pay", protectRoute, updateOrderToPaid);
router.put("/:id/ship", protectRoute, adminRoute, updateOrderToShipped);

export default router;
