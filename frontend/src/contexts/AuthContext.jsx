import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a new context
export const AuthContext = createContext();

// Define the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify if the user is authenticated
  const verifyAuthentication = async () => {
    try {
      // Make a GET request to the authentication verification API endpoint
      if (token != undefined)
         token = localStorage.getItem("access_token");
       
      const response = await axios.get(
        "http://127.0.0.1:8000/auth/jwt/verify/",
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful, set isAuthenticated to true
      setIsAuthenticated(true);
    } catch (error) {
      // If the request fails, set isAuthenticated to false
      setIsAuthenticated(false);
    }
  };

  // Run the verifyAuthentication function on component mount
  useEffect(() => {
    verifyAuthentication();
  }, []);

  // Provide the authentication state to the rest of the application
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
