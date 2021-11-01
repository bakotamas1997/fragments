import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { auth } from "../../store/actions";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const token = useSelector((state) => state.token);
  const error = useSelector((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(auth(email, password));
  };

  let authRedirect = null;

  if (token != null) {
    authRedirect = <Redirect to="/projects" />;
  }

  return (
    <div className={classes.LoginForm}>
      {authRedirect}
      <form action={onSubmit} className={classes.Form}>
        <h1>Login</h1>
        <input
          placeholder="Email Address"
          className={classes.Input}
          type="email"
          id="floatingInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          className={classes.Input}
          type="password"
          id="floatingPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSubmit} className={classes.Button}>
          Submit
        </button>
        <p className={classes.Error}>{error ? error : null}</p>
        <p>{loading ? "Loading..." : null}</p>
      </form>
    </div>
  );
};

export default Login;
