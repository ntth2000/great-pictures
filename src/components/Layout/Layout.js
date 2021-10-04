import React from "react";

import classes from "./Layout.module.css";
import Header from "./Header";
const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <main className={classes.main}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
