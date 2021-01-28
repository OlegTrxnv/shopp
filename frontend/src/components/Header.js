import React from "react";
import { withRouter } from "react-router-dom"; // connect component to router
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = ({ history, location }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const cart = useSelector((state) => state.cart);
  const cartItemsQty = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopp</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i
                    className={`fas fa-shopping-cart fa-lg ${
                      (cartItemsQty || userInfo) && "fa-2x"
                    }`}
                  ></i>{" "}
                  <span className="badge" style={{ color: "red" }}>
                    {cartItemsQty || ""}
                  </span>
                  {`${cartItemsQty || userInfo ? "" : "Cart"}`}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i
                      className={`fas fa-user-alt ${
                        location.pathname === "/login" && "fa-2x"
                      }`}
                    ></i>{" "}
                    {`${location.pathname === "/login" ? "" : "Sign in"}`}
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo?.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default withRouter(Header);
