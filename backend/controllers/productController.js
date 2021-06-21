import asyncHandler from "express-async-handler"; // error handler
import Product from "../models/productModel.js";

// @desc    Fetch all products or search products
// @route   GET /api/products?searchTerm&pageSize&pageNumber
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = +req.query.pageSize;
  const pageNumber = +req.query.pageNumber;

  const nameKeyword = req.query.searchTerm
    ? {
        // using RegEx to search for part of words, case-insensitive
        name: {
          $regex: req.query.searchTerm,
          $options: "i",
        },
      }
    : {};

  const brandKeyword = req.query.searchTerm
    ? {
        brand: {
          $regex: req.query.searchTerm,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({
    $or: [{ ...nameKeyword }, { ...brandKeyword }],
  });

  const products = await Product.find({
    $or: [{ ...nameKeyword }, { ...brandKeyword }],
  })
    .skip(pageSize * (pageNumber - 1))
    .limit(pageSize);

  res.json({ products, pageNumber, pagesTotal: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    s;
    if (product.isArchived) {
      await product.remove();
      res.json({ message: "Product permanently removed" });
    } else {
      product.isArchived = true;
      await product.save();
      res.json({ message: "Product archived" });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   PUT /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   POST /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price ?? product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock ?? product.countInStock;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Review already submitted");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: +rating,
      comment,
    };
    product.reviews.push(review);

    const oldRatingAcc = product.rating * product.numReviews;
    product.numReviews += product.reviews.length;

    product.rating =
      (product.reviews.reduce((acc, review) => acc + review.rating, 0) +
        oldRatingAcc) /
      product.numReviews;

    await product.save();
    res.status(201).json({ message: "Review created" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductById,
  getTopProducts,
  updateProduct,
};
