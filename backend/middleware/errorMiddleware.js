const notFound404 = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // error.status = 404;
  res.status(404);
  next(error); // go to next middleware with this error
};

const errorHandler = (error, req, res, next) => {
  // sometimes errors come with 200 statusCode
  res.status(res.statusCode === 200 ? 500 : res.statusCode || 500);

  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { notFound404, errorHandler };
