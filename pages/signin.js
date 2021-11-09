import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { signin } from "../utils/fetchData";
import { useRouter } from "next/router";

import { authenticate, isAuth } from "../actions/auth";
const Signin = () => {
  const router = useRouter();
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await signin("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: { token: res.access_token, user: res.user },
    });

    authenticate(res);
    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });
    router.push(`/`);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mt-3">
          Login
        </button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link href="/register">
            <a style={{ color: "crimson" }}>Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;

// import React from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { useState, useContext, useEffect } from "react";
// import { DataContext } from "../store/GlobalState";
// import { postData } from "../utils/fetchData";
// import Cookie from "js-cookie";
// import { useRouter } from "next/router";
// import { Container, Form, Button } from "react-bootstrap";
// const Signin = () => {
//   const initialState = { email: "", password: "" };
//   const [userData, setUserData] = useState(initialState);
//   const { email, password } = userData;

//   const { state, dispatch } = useContext(DataContext);
//   const { auth } = state;

//   const router = useRouter();

//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//     dispatch({ type: "NOTIFY", payload: {} });
//     console.log(userData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "NOTIFY", payload: { loading: true } });
//     const res = await postData("auth/login", userData);

//     console.log(res.err);
//     if (res.err)
//       return dispatch({ type: "NOTIFY", payload: { error: res.err } });
//     dispatch({ type: "NOTIFY", payload: { success: res.msg } });

//     dispatch({
//       type: "AUTH",
//       payload: {
//         token: res.access_token,
//         user: res.user,
//       },
//     });

//     Cookie.set("refreshtoken", res.refresh_token, {
//       path: "api/auth/accessToken",
//       expires: 7,
//     });

//     localStorage.setItem("firstLogin", true);
//   };

//   useEffect(() => {
//     if (Object.keys(auth).length !== 0) router.push("/");
//   }, [auth]);

//   return (
//     <Container>
//       <Head>
//         <title>Sign in Page</title>
//       </Head>
//       <Form
//         className="mx-auto mt-5"
//         style={{ maxWidth: "500px" }}
//         onSubmit={handleSubmit}
//       >
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             onChange={handleChangeInput}
//           />
//           {/* <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text> */}
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             onChange={handleChangeInput}
//           />
//         </Form.Group>
//         {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group> */}
//         <Button variant="primary btn-dark" type="submit">
//           Login
//         </Button>

//         <p className="my-2">
//           You don't have an accout?
//           <Link href="/register">
//             <a className="mx-2" style={{ color: "crimson" }}>
//               Register
//             </a>
//           </Link>
//         </p>
//       </Form>
//     </Container>
//   );
// };

// export default Signin;
