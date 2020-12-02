import { Router } from "express";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, addOrderItems);
router.get("/:id", protectRoute, getOrderById);

export default router;
