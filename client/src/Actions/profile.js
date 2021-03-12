import axios from "axios";
import { setAlert } from "../Actions/alert";
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
} from "./type";

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
    // console.log(history);
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

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.put("/api/profile/exp", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
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

// Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.put(
      "/api/profile/education",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Added Education", "success"));
    history.push("/dashboard");
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

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/exp/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Profile Experience Deleted", "danger"));
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

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const deleteInfo = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: deleteInfo.data,
    });
    dispatch(setAlert("Education Field deleted Succesfully", "danger"));
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

// Delete the Entire Account and Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Really Wanna Delete??")) {
    try {
      const deleteInfo = await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Account Deleted Succesfully", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

// Get All Profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const resp = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: resp.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statuText,
        status: err.response.status,
      },
    });
  }
};

// Get Particular Profile
export const getParticularProfile = (Userid) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${Userid}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statuText,
        status: err.response.status,
      },
    });
  }
};

// Get Github Repos
export const getGithubRepos = (githubUserName) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/github/${githubUserName}`);
    dispatch({
      type: GET_REPOS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statuText,
        status: err.response.status,
      },
    });
  }
};
