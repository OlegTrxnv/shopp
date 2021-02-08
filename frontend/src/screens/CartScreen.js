import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { addToCart, changeQty, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import {
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  // access search query in location ?qty=xxx, into array [?qty, xxx], get element at [1]
  const qty = +location.search.split("=")[1];

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const { cartItems } = useSelector((state) => state.cart);

  const changeQtyHandler = (product, qty) => {
    dispatch(changeQty(product, +qty));
    history.push("/cart");
  };

  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product));
    history.push("/cart");
  };

  const checkoutHandler = () => {
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {!cartItems.length ? (
          <Message>
            <Link to="/" className="btn btn-outline-dark my-3">
              Go back
            </Link>
            <br />
            <h3>Your cart is currently empty</h3>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        changeQtyHandler(item.product, e.target.value)
                      }
                      className="m-sm-1 p-sm-1"
                    >
                      {[...Array(item.countInStock).keys()].map((idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {!!cartItems.length && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} item(s)
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
