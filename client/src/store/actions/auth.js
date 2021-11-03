import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
    type: actionTypes.AUTH_FAIL,
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
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheck = (email, token) => {
  return (dispatch) => {
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(localStorage.token, localStorage.email));
      }
    }
  };
};

export const register = (email, password, firstName, lastName) => {
  return (dispatch) => {
    dispatch(authStart());

    const registerData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    axios
      .post("/api/users/register", registerData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        dispatch(authSuccess(response.data.token, response.data.email));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
