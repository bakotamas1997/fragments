import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchStoriesStart = () => {
  return {
    type: actionTypes.FETCH_STORIES_START,
  };
};

export const fetchStoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_STORIES_FAIL,
    error: error,
  };
};

export const setStories = (stories, project_id) => {
  return {
    type: actionTypes.SET_STORIES,
    stories: stories,
    project_id: project_id,
  };
};

export const fetchStories = (project_id, history) => {
  return (dispatch) => {
    dispatch(fetchStoriesStart());
    axios
      .get("/api/stories/" + project_id)
      .then((response) => {
        dispatch(setStories(response.data, project_id));
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch(fetchStoriesFail(error.response.data));
      });
  };
};

export const createStorySuccess = (stories) => {
  return {
    type: actionTypes.CREATE_STORY_SUCCESS,
    stories: stories,
  };
};

export const createStoryFail = (error) => {
  return {
    type: actionTypes.CREATE_STORY_FAIL,
    error: error,
  };
};

export const createStory = (project_id, story, history) => {
  return (dispatch) => {
    axios
      .post("/api/stories/" + project_id, story)
      .then((response) => {
        dispatch(createStorySuccess(response.data));
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch(createStoryFail(error.response.data));
      });
  };
};
