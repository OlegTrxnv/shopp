import { Router } from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protectRoute, adminRoute, getUsers).post(registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);
router
  .route("/:id")
  .delete(protectRoute, adminRoute, deleteUser)
  .get(protectRoute, adminRoute, getUserById)
  .put(protectRoute, adminRoute, updateUser);

export default router;
