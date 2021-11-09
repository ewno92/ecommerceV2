import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
const Profile = () => {
  const initialSate = {
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialSate);
  const { name, password, cf_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    // if (name !== auth.user.name) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    console.log("update name");
    console.log(name);
    patchData("user/", { name }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
    dispatch({
      type: "AUTH",
      payload: {
        user: name,
      },
    });
  };

  if (!auth.user) return null;

  return (
    <div className="profile">
      <Head>
        <title>Profile</title>
      </Head>
      <section className="row text-secondary my-3">
        <div className="col-md-4">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3>

          <form className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Your name"
              onChange={handleChange}
            />
            <button
              className="btn btn-dark my-3"
              disabled={notify.loading}
              onClick={handleUpdateName}
            >
              Update Name
            </button>
          </form>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={auth.user.email}
              className="form-control"
              disabled={true}
            />
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control"
                placeholder="Your new password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cf_password">Confirm New Password</label>
              <input
                type="password"
                name="cf_password"
                value={cf_password}
                className="form-control"
                placeholder="Confirm new password"
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-dark my-3"
              disabled={notify.loading}
              onClick={handleUpdateProfile}
            >
              Update Password
            </button>
          </form>
        </div>

        <div className="col-md-8">
          <h3 className="text-uppercase">Orders</h3>

          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">date</td>
                  <td className="p-2">total</td>
                  <td className="p-2">delivered</td>
                  <td className="p-2">paid</td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">
                      <Link href={`/order/${order._id}`}>
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">${order.total}</td>
                    <td className="p-2">
                      {order.delivered ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td className="p-2">
                      {order.paid ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
