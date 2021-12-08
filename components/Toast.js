import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const Toast = ({ msg, handleShow }) => {
  return (
    <div
      className="toast position-absolute show"
      style={{ top: "5px", right: "5px", zIndex: 10, minWidth: "300px" }}
    >
      <div className="toast-header">
        <strong className="me-auto">{msg.title}</strong>
        {/* <small>X mins ago</small> */}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          data-dismiss="toast"
          onClick={handleShow}
        />
      </div>
      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast;
