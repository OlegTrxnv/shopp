import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound404 } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

// dummy custom middleware
// app.use((req, res, next) => {
//   console.log("Hello!");
//   next();
// });

app.use("/api/products", productRoutes);

app.use(notFound404);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
