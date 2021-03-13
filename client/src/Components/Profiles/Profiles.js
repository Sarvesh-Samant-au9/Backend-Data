import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getAllProfiles } from "../../Actions/profile";
import ProfileItem from "./ProfileItem";
const Profiles = ({ getAllProfiles, profile: { profiles, isLoading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  console.log(profiles);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Connect with Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem profile={profile} key={profile._id} />
              ))
            ) : (
              <h1>No Profiles Found</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
