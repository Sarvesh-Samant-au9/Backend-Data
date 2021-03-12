import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../Actions/type";

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
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        isLoading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        isLoading: false,
        repos: payload,
      };
    default:
      return state;
  }
}
