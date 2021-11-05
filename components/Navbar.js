import { useContext } from "react";
import Link from "next/link";
import { isAuth } from "../actions/auth";
import { signOut } from "../utils/fetchData";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("user");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">Navbar</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {isAuth() ? (
                <a className="nav-link" onClick={handleLogout}>
                  SignOut
                </a>
              ) : (
                <Link href="/signin">
                  <a className="nav-link">
                    <i className="bi bi-person-circle"></i> SignIn
                  </a>
                </Link>
              )}
            </li>

            {!isAuth() && (
              <li className="nav-item">
                <Link href="/register">
                  <a className="nav-link " aria-current="page">
                    SignUp
                  </a>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/home">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <Link href="/cart">
                <a className="nav-link " aria-current="page">
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden="true"
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: "3px 6px",
                        background: "#ed143dc2",
                        borderRadius: "50%",
                        top: "-10px",
                        right: "-10px",
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </i>
                  Cart
                </a>
              </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link ">Disabled</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>

    // <Navbar bg="light" expand="sm">
    //   <Container>
    //     {/* <Link href="/">
    //       <a className='navbar-brand"'>Logo</a>
    //     </Link> */}
    //     <Link href="/">
    //       <a className="navbar-brand fw-bold">{process.env.APP_NAME}</a>
    //     </Link>
    //     {/* <Navbar.Brand href="/">Logo</Navbar.Brand> */}
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav" className="">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">
    //           <i className="bi bi-cart-fill"></i>Cart
    //         </Nav.Link>

    //         {isAuth() ? (
    //           <Nav>
    //             <NavLink onClick={handleLogout}>
    //               <i className="bi bi-person-circle"></i> Sign out
    //             </NavLink>
    //           </Nav>
    //         ) : (
    //           <Nav.Link href="/signin">
    //             <i className="bi bi-person-circle"></i> Signin
    //           </Nav.Link>
    //         )}

    //         <NavDropdown title="User" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
    //           <NavDropdown.Item>
    //             {/* <p onClick={signOut}>Logout</p> */}
    //           </NavDropdown.Item>
    //           {/* <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">
    //             Separated link
    //           </NavDropdown.Item> */}
    //         </NavDropdown>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default Navbar;
