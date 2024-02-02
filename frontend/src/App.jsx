import React, { useContext } from "react";
import './App.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/navbar";
import SignIn from "./component/signin";
import SignUp from "./component/signup";
import Dashboard from "./component/dashboard";
import NewContact from "./component/new-contact";
import EditContact from "./component/edit-contact";


function App() {
  const isAuthenticated = localStorage.getItem("access_token") !== null;
  console.log(isAuthenticated)

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/new-contact"
            element={
              isAuthenticated ? (
                <NewContact />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/edit-contact/:contactId"
            element={
              isAuthenticated ? (
                <EditContact />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
