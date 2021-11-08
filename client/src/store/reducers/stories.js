import * as actionTypes from "../actions/actionTypes";

const initialState = {
  stories: null,
  loading: false,
  error: null,
  projectId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STORIES_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.FETCH_STORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actionTypes.SET_STORIES:
      return {
        ...state,
        loading: false,
        error: null,
        stories: action.stories,
        projectId: action.project_id,
      };

    case actionTypes.CREATE_STORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stories: action.stories,
      };

    case actionTypes.CREATE_STORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
