import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Link from "next/link";

const Nbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Link href="/">
          <a className='navbar-brand"'>Logo</a>
        </Link> */}
        <Link href="/">
          <a className="navbar-brand">Ecoomerce</a>
        </Link>
        {/* <Navbar.Brand href="/">Logo</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <i className="bi bi-cart-fill"></i>Cart
            </Nav.Link>
            <Nav.Link href="/signin">
              <i className="bi bi-person-circle"></i> Signin
            </Nav.Link>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nbar;
