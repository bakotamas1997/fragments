import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { auth } from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

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

  const formProps = [
    {
      type: "email",
      value: email,
      placeholder: "Email Address",
      setValue: setEmail,
    },
    {
      type: "password",
      value: password,
      placeholder: "Password",
      setValue: setPassword,
    },
  ];

  const errorElement = error ? <p className={classes.Error}>{error}</p> : null;

  return (
    <div className={classes.LoginForm}>
      {authRedirect}
      <form action={onSubmit} className={classes.Form}>
        <h2>Login</h2>
        <Form form={formProps} />
        <Button onClickHandler={onSubmit}>Submit</Button>
        {errorElement}
        <p>{loading ? "Loading..." : null}</p>
      </form>
    </div>
  );
};

export default Login;
