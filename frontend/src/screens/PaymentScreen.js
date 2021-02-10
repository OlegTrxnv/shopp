import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("Bank card");

  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Credit or debit card"
              id="Card"
              name="paymentMethod"
              value="Bank card"
              checked={paymentMethod === "Bank card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="PayPal account"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
