import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { register } from "../../../store/actions";
import Button from "../../../components/UI/Button/Button";
import Form from "../../../components/UI/Form/Form";
import classes from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(register(email, password, firstName, lastName));
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
    {
      type: "text",
      value: firstName,
      placeholder: "First Name",
      setValue: setFirstName,
    },
    {
      type: "text",
      value: lastName,
      placeholder: "Last name",
      setValue: setLastName,
    },
  ];

  return (
    <div className={classes.LoginForm}>
      {authRedirect}
      <form action={onSubmit} className={classes.Form}>
        <h1>Register</h1>
        <Form form={formProps} />
        <Button onClickHandler={onSubmit}>Submit</Button>
        <p className={classes.Error}>{error ? error : null}</p>
        <p>{loading ? "Loading..." : null}</p>
      </form>
    </div>
  );
};

export default Register;
