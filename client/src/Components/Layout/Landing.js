import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1
            className="x-large"
            style={{
              color: " #d9ff00",
              transform: "skewY(4deg)",
              display: "inline-block",
            }}
          >
            Connect Me!!
          </h1>
          <p className="lead">
            Write Code, try some more, Get Stucked, get help from Connect Me!!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
