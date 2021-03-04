import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../Actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import DashboardButtons from "./DashboardButtons";

const Dashboard = ({
  auth: { user },
  profile: { profile, isLoading },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

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
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStatetoProps, { getCurrentProfile })(Dashboard);
