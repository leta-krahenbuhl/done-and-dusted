import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If the token does not exist, redirect to the landing page
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
