import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
  const searchTerm = match.params.searchTerm;
  const pageCurrent = match.params.pageNumber || 1;
  let pageSize = 3;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(searchTerm, pageSize, pageCurrent));
  }, [dispatch, pageCurrent, pageSize, searchTerm]);

  // useSelector hook to get productList from the redux store's state
  const { products, pageNumber, pagesTotal, loading, error } = useSelector(
    (state) => state.productList
  );

  return (
    <>
      {!searchTerm ? (
        <ProductCarousel />
      ) : (
        <>
          <Link to="/" className="btn btn-outline-dark my-3">
            Go back
          </Link>
          <h1 className="text-center">That's what we found for you</h1>
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !products.length ? (
        <h4>No products found</h4>
      ) : (
        <>
          <Row className="justify-content-center">
            {products
              .filter((product) => !product.isArchived)
              .map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pageNumber={pageNumber}
            pagesTotal={pagesTotal}
            searchTerm={searchTerm ? searchTerm : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
