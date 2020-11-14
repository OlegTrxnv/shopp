import express from "express";
const router = express.Router();
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;

// //just different syntax
// router.route("/:id").get(getProductById);
