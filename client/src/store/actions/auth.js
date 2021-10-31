import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    email: email,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };

    axios
      .post("/api/users/login", authData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        dispatch(authSuccess(response.data.token, response.data.email));
      })
      .catch((err) => console.log(err));
  };
};
