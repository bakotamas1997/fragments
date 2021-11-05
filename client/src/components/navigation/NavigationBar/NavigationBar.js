import React from "react";
import { useSelector } from "react-redux";
import classes from "./NavigationBar.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

const NavigationBar = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <header className={classes.NavBar}>
      <p className={classes.Logo}>fragments</p>
      <NavigationItems isAuthenticated={token !== null} />
    </header>
  );
};

export default NavigationBar;
