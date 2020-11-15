import { Router } from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protectRoute, getUserProfile);

export default router;
