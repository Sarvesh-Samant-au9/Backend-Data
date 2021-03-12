import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../Actions/profile";
const ExperienceList = ({ experience, deleteExperience }) => {
  const exp = experience.map((experience) => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className="hide-sm">{experience.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{experience.from}</Moment> --{" "}
        {experience.to === "" ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{experience.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(experience._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  // console.log(experience);
  return (
    <>
      <h2 className="my-2">Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exp}</tbody>
      </table>
    </>
  );
};

ExperienceList.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceList);
