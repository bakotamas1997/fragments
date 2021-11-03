import { TokenExpiredError } from "jsonwebtoken";
import * as actionTypes from "./actionTypes";

export const fetchProjects = () => {
  return {
    type: actionTypes.FETCH_PROJECTS,
  };
};

export const setProjects = (projects) => {
  return {
    type: actionTypes.SET_PROJECTS,
    projects: projects,
  };
};

export const fetchProjectsFail = (error) => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    error: error,
  };
};
