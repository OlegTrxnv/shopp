import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const UserListScreen = ({ history }) => {
  const { orders, loading, error } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table className="table-sm" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>PLACED</th>
              <th>TOTAL</th>
              <th>PAID ON</th>
              <th>SHIPPED ON</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isShipped ? (
                    order.shippedAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
