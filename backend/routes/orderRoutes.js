import { Router } from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, addOrderItems);

export default router;
