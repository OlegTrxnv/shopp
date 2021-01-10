import { Router } from "express";
import {
  deleteProduct,
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(protectRoute, adminRoute, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protectRoute, adminRoute, updateProduct)
  .delete(protectRoute, adminRoute, deleteProduct);

export default router;
