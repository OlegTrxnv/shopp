import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder, shipOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_SHIP_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const { loading: loadingShip, success: successShip } = useSelector(
    (state) => state.orderShip
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const orderId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !order.orderItems.length ||
      order._id !== orderId ||
      successPay ||
      successShip
    ) {
      dispatch({ type: ORDER_PAY_RESET }); // reset to stop loop after successful payment
      dispatch({ type: ORDER_SHIP_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      window.paypal ? setSdkReady(true) : addPayPalScript();
    }
  }, [dispatch, order, orderId, successPay, successShip]);

  const onSuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const onShipHandler = () => {
    dispatch(shipOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order # {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Ship To:</h2>
              <p>{order.user.name}</p>
              <p>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p>{order.user.email}</p>
              {order.isShipped ? (
                <Message variant="success">
                  Shipped on {order.shippedAt}
                </Message>
              ) : (
                <Message variant="warning">Not Shipped</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Pay with:</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Your Items:</h2>
              {!order.orderItems.length ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
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
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
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
                <h2>Your Order:</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {!sdkReady || loadingPay ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={onSuccessPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingShip ? (
                <Loader />
              ) : (
                userInfo?.isAdmin &&
                order.isPaid &&
                !order.isShipped && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={onShipHandler}
                    >
                      Mark as shipped
                    </Button>
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
