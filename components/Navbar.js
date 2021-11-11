import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

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

  useEffect(() => {
    console.log(Object.keys(auth).length);
  }, [auth]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">{process.env.APP_NAME}</a>
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
              {Object.keys(auth).length ? (
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

            {!Object.keys(auth).length && (
              <li className="nav-item">
                <Link href="/register">
                  <a className="nav-link " aria-current="page">
                    SignUp
                  </a>
                </Link>
              </li>
            )}

            {/* <li className="nav-item">
              <a className="nav-link" href="/home">
                Features
              </a>
            </li> */}
            {!(Object.keys(auth).length === 0) && (
              <li className="nav-item">
                <Link href="/profile">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </Link>
              </li>
            )}
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
                        padding: "3px 5px",
                        background: "black",
                        borderRadius: "50%",
                        top: " -10px",
                        right: "-55px",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
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
  );
};

export default Navbar;
