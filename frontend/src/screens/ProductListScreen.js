import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  deleteProduct,
  createProduct,
  listProducts,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const pageCurrent = match.params.pageNumber || 1;
  let pageSize = 5;
  const { products, pageNumber, pagesTotal, loading, error } = useSelector(
    (state) => state.productList
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);

  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = useSelector((state) => state.productCreate);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_DELETE_RESET });

    if (!userInfo?.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageSize, pageCurrent));
    }
  }, [
    createdProduct,
    dispatch,
    history,
    pageCurrent,
    pageSize,
    successCreate,
    successDelete,
    userInfo,
  ]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete product '${name}' ?`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table className="table-sm" striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>STOCK</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td className="text-center">
                    {product.isArchived ? (
                      <i
                        onClick={() => deleteHandler(product._id, product.name)}
                        className="fas fa-times"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button className="btn-sm" variant="light">
                            <i className="fas fa-edit" />
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn-sm"
                          variant="danger"
                          onClick={() =>
                            deleteHandler(product._id, product.name)
                          }
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pageNumber={pageNumber}
            pagesTotal={pagesTotal}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
