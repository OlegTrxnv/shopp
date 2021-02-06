import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";

import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const { products, error } = useSelector((state) => state.productTopRated);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Carousel.Caption className="carousel-caption">
              <h3>{product.name}</h3>
              <p>Top rated! Order for ${product.price}</p>
            </Carousel.Caption>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
