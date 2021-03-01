import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, isLoading } }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>
          Connect ME!!
        </Link>
      </h1>
      {/* {!isLoading ? <> {isAuthenticated ? authLinks : guestLinks} </> : null} */}
      {!isLoading && <> {isAuthenticated ? authLinks : guestLinks} </>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStatetoProps, { logout })(Navbar);
