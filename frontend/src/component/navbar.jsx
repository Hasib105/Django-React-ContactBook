import React, { useContext } from "react";
import { NavLink, redirect } from "react-router-dom";

import "./navbar.scss";
import { AuthContext } from "../contexts/AuthContext";


const Navbar = () => {
  const  isAuthenticated  = useContext(AuthContext)
  
   const handleLogout = () => {
     localStorage.removeItem("access_token");
     return redirect('/signin')
   };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="navbar__right">
        {isAuthenticated ? (
          <>
            <span>Welcome, [User Name]</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/signup" activeClassName="active">
              Signup
            </NavLink>
            <NavLink to="/signin" activeClassName="active">
              Signin
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
