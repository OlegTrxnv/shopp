import { Router } from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, addOrderItems);
router.get("/:id", protectRoute, getOrderById);
router.put("/:id/pay", protectRoute, updateOrderToPaid);

export default router;
