import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteUser, listUsers } from "../actions/userActions";
import { USER_DELETE_RESET } from "../constants/userConstants";

const UserListScreen = ({ history }) => {
  const { users, loading, error } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { message } = useSelector((state) => state.userDelete);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listUsers());
      if (message) {
        setTimeout(() => {
          dispatch({ type: USER_DELETE_RESET });
        }, 1000);
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, message, userInfo]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete user record ${name}?`)) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {message && <Message>{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table className="table-sm" striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "red" }} />
                  ) : (
                    <i className="fas fa-times" style={{ color: "green" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(user._id, user.name)}
                    disabled={userInfo._id === user._id}
                  >
                    <i className="fas fa-trash" />
                  </Button>
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
