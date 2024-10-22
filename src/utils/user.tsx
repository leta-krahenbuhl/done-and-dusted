import { jwtDecode, JwtPayload } from "jwt-decode";

// Extend the JwtPayload to include your custom properties
interface CustomJwtPayload extends JwtPayload {
  username: string; // Add the username property
}

// get username from token
export const getUsernameFromToken = () => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Decode the token to get the username
  let username = "";
  if (token) {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    username = decoded.username; // Access the username from the decoded token
    return username;
  }
};
