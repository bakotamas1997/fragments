import React from "react";
import { useState } from "react";
import { auth } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(auth(email, password));
  };

  return (
    <div>
      <h1>Login</h1>
      <form action={onSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
        <p>{loading ? "Loading..." : null}</p>
      </form>
    </div>
  );
};

export default Login;
