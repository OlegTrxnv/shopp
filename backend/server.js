import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound404 } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// allow accept JSON data in body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// dummy custom middleware
// app.use((req, res, next) => {
//   console.log("Hello!");
//   next();
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// get current folder if using ES modules
const __dirname = path.resolve();
// create a virtual path prefix "/uploads" to serve files from static path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(notFound404);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
