import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchProjects = () => {
  return {
    type: actionTypes.FETCH_PROJECTS,
  };
};

export const createProjectFail = (error) => {
  return {
    type: actionTypes.CREATE_PROJECT_FAIL,
    error: error,
  };
};

export const createProjectSuccess = (projects) => {
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    projects: projects,
  };
};

export const createProject = (name, description, history) => {
  return (dispatch) => {
    axios
      .post("/api/projects/", { name: name, description: description })
      .then((response) => {
        dispatch(createProjectSuccess(response.data));
        history.push("/projects");
      })
      .catch((error) => {
        dispatch(createProjectFail(error.response.data.error));
      });
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

export const getProjects = () => {
  return (dispatch) => {
    dispatch(fetchProjects());
    axios
      .get("/api/projects")
      .then((response) => {
        dispatch(setProjects(response.data.projects));
      })
      .catch((error) => {
        dispatch(fetchProjectsFail(error.response.data.error));
      });
  };
};
