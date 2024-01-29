// Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="navbar__right">
        <NavLink to="/signup" activeClassName="active">
          Signup
        </NavLink>
        <NavLink to="/signin" activeClassName="active">
          Signin
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
