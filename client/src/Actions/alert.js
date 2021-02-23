import { SET_ALERT, REMOVE_ALERT } from "./type";
import uuid from "uuid/v4";
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid;
  dispatch({
    type: SET_ALERT,
    payload: {
      msg: msg,
      alertType: alertType,
      id: id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
