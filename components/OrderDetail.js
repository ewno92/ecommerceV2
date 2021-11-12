import Link from "next/link";
// import PaypalBtn from "./paypalBtn";
import { patchData } from "../utils/fetchData";
import { updateItem } from "../store/Actions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;
  return (
    <>
      {orderDetail.map((order) => (
        <div
          key={order._id}
          style={{ margin: "20px auto" }}
          className="row justify-content-around"
        >
          <div className="text-uppercase my-3" style={{ maxWidth: "600px" }}>
            <p className="h5">Order: {order._id}</p>

            <div className="mt-3 text-secondary">
              <p className="h4 py-2">Shipping information</p>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>

              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                }
                        d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Deliverd on ${order.updatedAt}`
                  : "Not Delivered"}
                {auth.user.role == "1" && !order.delivered && (
                  <button
                    className="btn btn-dark text-uppercase"
                    onClick={() => handleDelivered(order)}
                  >
                    Mark as delivered
                  </button>
                )}
              </div>

              <div className="w-100">
                <h3>Order Items</h3>
                {order.cart.map((item) => (
                  <div
                    className="row border-bottom py-2 w-100 m-0"
                    key={item._id}
                  >
                    <div className="col d-flex align-items-center">
                      <img
                        src={item.images[0].url}
                        alt={item.images[0].url}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                      <h5 className="text-secondary px-3">
                        <Link href={`/product/${item._id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </h5>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <span className="text-info">
                        {item.quantity} x ${item.price} = $
                        {item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <h2 className="col d-flex justify-content-end my-3 text-uppercase">
                Total: ${order.total}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
