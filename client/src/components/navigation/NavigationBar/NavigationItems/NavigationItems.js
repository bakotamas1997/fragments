import React from "react";

import classes from "./NavigationItems.module.css";
import { Fragment } from "react";

import NavigationItem from "../../../NavigationItem/NavigationItem";

const NavigationItems = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  let permissionItems = (
    <Fragment>
      <NavigationItem link="/login">Login</NavigationItem>
      <NavigationItem link="/register">Register</NavigationItem>
    </Fragment>
  );

  permissionItems = isAuthenticated ? (
    <Fragment>
      <NavigationItem link="/projects">Projects</NavigationItem>
      <NavigationItem link="/tags">Tags</NavigationItem>
    </Fragment>
  ) : (
    permissionItems
  );

  return <ul className={classes.NavigationItems}>{permissionItems}</ul>;
};

export default NavigationItems;
