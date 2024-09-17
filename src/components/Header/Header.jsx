import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import LogOut from "../LogOut/LogOut";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Decode the token to get the username
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username; // Access the username from the decoded token
  }

  return (
    <div className="header">
      <img src={logo} alt="logo" className="landing-logo" />
      <div className="greeting-avatar">Hi, {username ? username : "You"}!</div>
      <LogOut />
    </div>
  );
}
