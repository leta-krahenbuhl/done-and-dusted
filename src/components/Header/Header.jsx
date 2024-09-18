import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import LogOut from "../LogOut/LogOut";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

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
      <Link to="/home">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <div className="greeting-avatar">Hi, {username ? username : "You"}!</div>
      <Link to="/account">MY ACCOUNT</Link>
      <LogOut />
    </div>
  );
}
