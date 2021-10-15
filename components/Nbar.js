import { useContext } from "react";
import { Container, Nav, NavDropdown, Navbar, NavLink } from "react-bootstrap";
import Link from "next/link";
import { isAuth } from "../actions/auth";
import { signOut } from "../utils/fetchData";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

const Nbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("user");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    // return router.push("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* <Link href="/">
          <a className='navbar-brand"'>Logo</a>
        </Link> */}
        <Link href="/">
          <a className="navbar-brand">{process.env.APP_NAME}</a>
        </Link>
        {/* <Navbar.Brand href="/">Logo</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <i className="bi bi-cart-fill"></i>Cart
            </Nav.Link>

            {isAuth() ? (
              <Nav>
                <NavLink onClick={handleLogout}>
                  <i className="bi bi-person-circle"></i> Sign out
                </NavLink>
              </Nav>
            ) : (
              <Nav.Link href="/signin">
                <i className="bi bi-person-circle"></i> Signin
              </Nav.Link>
            )}

            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item>
                {/* <p onClick={signOut}>Logout</p> */}
              </NavDropdown.Item>
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
