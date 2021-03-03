import { combineReducers } from "redux";
import alert from "./AlertReducer";
import auth from "./AuthenticationReducer";
import profile from "./ProfileReducer";
export default combineReducers({
  alert,
  auth,
  profile,
});
