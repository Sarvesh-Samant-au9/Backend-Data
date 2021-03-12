import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner";
import { getAllProfiles } from "../../Actions/profile";
const Profiles = (props) => {
  return (
    <div>
      <Spinner />
    </div>
  );
};

Profiles.propTypes = {};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getAllProfiles })(Profiles);
