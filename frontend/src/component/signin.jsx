import React, { useState } from "react";
import "./signin.scss";
import axios from "axios";


import { useNavigate } from "react-router-dom";



const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/create/",
        formData
      );
      console.log("Response data:", response.data); // Log the response data
      
       localStorage.setItem("access_token", response.data.access);
       
       navigate('/')

      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;

