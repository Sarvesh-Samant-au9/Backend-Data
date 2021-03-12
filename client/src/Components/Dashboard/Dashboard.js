import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAccount, getCurrentProfile } from "../../Actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import DashboardButtons from "./DashboardButtons";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";

const Dashboard = ({
  auth: { user },
  profile: { profile, isLoading },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  // console.log(profile);
  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">DashBoard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        {""}
        Welcome {user && user.name}
      </p>
      <>
        {profile !== null ? (
          <>
            {" "}
            {/* <strong>Has a Profile</strong>  */}
            <DashboardButtons />
            {profile.experience.length !== 0 ? (
              <ExperienceList experience={profile.experience} />
            ) : (
              <h1 className="text-primary">No Experience Available</h1>
            )}
            {profile.education.length !== 0 ? (
              <EducationList education={profile.education} />
            ) : (
              <h1 className="text-primary">
                No Education Information Available
              </h1>
            )}
            <div className="my-2">
              <button
                className=" btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> Delete Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You Dont have A profile, Want To have One Click Below</p>
            <Link
              to="/create-profile"
              className="btn btn-primary my-1
            "
            >
              Create Profile
            </Link>
          </>
        )}
      </>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
