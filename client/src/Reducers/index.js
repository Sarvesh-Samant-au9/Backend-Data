import { combineReducers } from "redux";
import alert from "./AlertReducer";
import auth from "./AuthenticationReducer";
export default combineReducers({
  alert,
  auth,
});
