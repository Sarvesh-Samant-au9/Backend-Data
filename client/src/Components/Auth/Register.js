import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
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
    } else {
      console.log("Succcess");
      console.log(formData);
    }
  };
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

export default Register;
