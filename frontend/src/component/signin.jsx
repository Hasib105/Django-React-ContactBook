import React from "react";
import "./signin.scss";

function SignIn() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;