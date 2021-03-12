import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../Actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: true,
  isAuthenticated: null,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case AUTH_ERROR: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      };
    }
    // case LOGIN_SUCCESS:
    //   localStorage.setItem("token", payload.token);
    //   return {
    //     ...state,
    //     ...payload,
    //     isLoading: false,
    //     isAuthenticated: true,
    //   };
    // case LOGIN_FAILURE:
    //   localStorage.removeItem("token");
    //   return {
    //     ...state,
    //     token: null,
    //     isLoading: false,
    //     isAuthenticated: false,
    //   };
    default:
      return state;
  }
}
