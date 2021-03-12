import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducation } from "../../Actions/profile";
import Moment from "react-moment";
const EducationList = ({ education, deleteEducation }) => {
  const educationField = education.map((eachElement) => {
    console.log(eachElement._id);
    return (
      <>
        <tr key={eachElement._id}>
          <td>{eachElement.school}</td>
          <td className="hide-sm">{eachElement.degree}</td>
          <td className="hide-sm">{eachElement.fieldOfStudy}</td>
          <td className="hide-sm">
            {<Moment format="YYYY/MM/DD">{eachElement.from}</Moment>} - {""}
            {eachElement.to === "" ? " Now " : <> {eachElement.to} </>}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteEducation(eachElement._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  });
  // console.log(education);
  return (
    <>
      <h2 className="my-2">Educational Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field Of Study</th>
            <th className="hide-sm"> Years </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{educationField}</tbody>
      </table>
    </>
  );
};

EducationList.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationList);
