import { jwtDecode } from "jwt-decode";

// get username from token
export const getUsernameFromToken = (
  setAdmins,
  setHabitants,
  admins,
  habitants
) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Decode the token to get the username
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username; // Access the username from the decoded token
    setAdmins(admins.push(username));
    setHabitants(habitants.push(username));
  }
};
