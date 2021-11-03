import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projects: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.SET_PROJECTS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: action.projects.slice(),
      };

    case actionTypes.FETCH_PROJECTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
