import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const { paymentMethod, cartItems } = useSelector((state) => state.cart);
  if (!paymentMethod) {
    history.push("/payment");
  }

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const { address, city, postalCode, country } = shippingAddress;
  if (!address || !city || !postalCode || !country) {
    history.push("/shipping");
  }

  const { userInfo } = useSelector((state) => state.userLogin);
  if (!userInfo) {
    history.push("/login");
  }

  // Calculate prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 || !cartItems.length ? 0 : 4.99;
  const taxPrice = +(itemsPrice * 0.075).toFixed(2);
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  const { order, success, error } = useSelector((state) => state.orderCreate);
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, order, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Ship to:</h2>
              <p>
                <strong>
                  {address}, {city}, {postalCode}, {country}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Pay with:</h2>
              <strong>{paymentMethod}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Your Items:</h2>
              {!cartItems.length ? (
                <Message>Your cart is currently empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estimated tax</Col>
                  <Col>${taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={!cartItems.length}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
