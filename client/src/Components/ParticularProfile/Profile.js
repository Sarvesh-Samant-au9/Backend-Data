import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getParticularProfile } from "../../Actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfielExperience from "./ProfielExperience";
import ProfileEducation from "./ProfileEducation";
import GithubProfile from "./GithubProfile";

const Profile = ({
  profile: { profile, isLoading },
  getParticularProfile,
  auth,
  match,
}) => {
  // console.log(match);
  console.log(profile);
  // console.log(auth);
  useEffect(() => {
    // console.log(getParticularProfile(match.params.id));
    getParticularProfile(match.params.id);
  }, [getParticularProfile, match]);
  return (
    <>
      {profile === null || isLoading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profile" className="btn btn-light">
            Return Back
          </Link>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp) => (
                    <ProfielExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No Experience</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((exp) => (
                    <ProfileEducation key={exp._id} education={exp} />
                  ))}
                </>
              ) : (
                <h4>No Education</h4>
              )}
            </div>
            {profile.githubUserName && (
              <>
                <GithubProfile username={profile.githubUserName} />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getParticularProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getParticularProfile })(Profile);
