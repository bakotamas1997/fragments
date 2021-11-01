import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  email: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        token: action.token,
        email: action.email,
        loading: false,
        error: null,
      };
    }
    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        email: null,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
