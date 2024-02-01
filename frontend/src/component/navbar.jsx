import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/signin");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://127.0.0.1:8000/auth/users/me/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        setUser(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link exact to="/" activeClassName="active">
          Home
        </Link>
      </div>
      <div className="navbar__right">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user}</span>
            <button onClick={handleLogout} className="logout_button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" activeClassName="active">
              Signup
            </Link>
            <Link to="/signin" activeClassName="active">
              Signin
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
