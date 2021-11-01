import React from "react";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <header className={classes.NavBar}>
      <p className={classes.Logo}>fragments</p>
      <ul className={classes.List}>
        {/* <li className={classes.ListItem}>
          <a href="#">Projects</a>
        </li>
        <li className={classes.ListItem}>
          <a href="#">Projects</a>
        </li>
        <li className={classes.ListItem}>
          <a href="#">Projects</a>
        </li> */}
      </ul>
    </header>
  );
};

export default NavigationBar;
