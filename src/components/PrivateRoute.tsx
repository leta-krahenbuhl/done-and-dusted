import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
  username: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        // If expired, remove the token
        localStorage.removeItem("token");
        alert("Your session has expired. Please log in again.");
        return <Navigate to="/" />;
      }

      // If token is valid, render the children
      return children;
    } catch (error) {
      // If there's an error decoding the token, remove it
      localStorage.removeItem("token");
      return <Navigate to="/" />;
    }
  }

  // If no token, redirect to the landing page
  return <Navigate to="/" />;
};

export default PrivateRoute;
