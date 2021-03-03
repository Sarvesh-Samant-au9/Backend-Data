import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../Actions/type";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  profiles: [],
  profile: null,
  isLoading: true,
  repos: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: false,
      };
    default:
      return state;
  }
}
