import React from "react";
import "./App.scss";
import Navbar from "./component/navbar";
import SignIn from "./component/signin";
import SignUp from "./component/signup";
import Dashboard from "./component/dashboard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewContact from "./component/new-contact";

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/new-contact" element={<NewContact/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
