import React from "react";
import Nbar from "./Nbar";
import Notify from "./Notify";
const Layout = ({ children }) => {
  return (
    <div>
      <Nbar />
      <Notify />
      {children}
    </div>
  );
};

export default Layout;
