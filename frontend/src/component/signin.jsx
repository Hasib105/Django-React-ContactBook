import React, { useState } from "react";
import "./signin.scss";

import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
      console.log(response.data);
      localStorage.setItem("token", response.data.access);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
