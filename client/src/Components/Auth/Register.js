// import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../Actions/alert";
import { register } from "../../Actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password !== password2) {
  //     console.log("Passwords dont Match");
  //   } else {
  //     // Create A User Object Containing Name, email, password
  //     const newUser = {
  //       name: name,
  //       email: email,
  //       password: password,
  //     };
  //     try {
  //       // Create A config object to Pass on Headers
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };

  //       // Convert into a String
  //       const body = JSON.stringify(newUser);

  //       // post call on api/users to register the User and Get Token Back
  //       const response = await axios.post("/api/users", body, config);
  //       console.log(response);
  //       // console.log(formData);
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords Dont Match");
      // Passwords Dont Match is passed as a message to the action alert.js
      // danger is passed as alert-type
      setAlert(
        "Passwords Don't Match, Kindly Reconfirm those passwords",
        "danger"
      );
      // props.setAlert(
      //   "Passwords Don't Match, Kindly Reconfirm those passwords",
      //   "danger"
      // );
    } else {
      console.log("Success");
      console.log(formData);
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account?
        <Link to="/login">Sign In</Link>
      </p>{" "}
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// connect takes 2 things
// 1 state to map that is if to display something from the state
//2 Object with Action allows to access props.setAlert

// export default connect(null, { setAlert })(Register);

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { setAlert, register })(Register);
