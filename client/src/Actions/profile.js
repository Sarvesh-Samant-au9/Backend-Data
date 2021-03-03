import axios from "axios";
import { setAlert } from "../Actions/alert";
import { GET_PROFILE, PROFILE_ERROR } from "./type";

// Get Current User
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or Update Profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    console.log(history);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert(edit ? "Profile is Updated" : "Profile is Created"));
    if (!edit) {
      // Redirect
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
