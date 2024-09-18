import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import avatarJane from "../../assets/images/avatar-jane.svg";
import LogOut from "../LogOut/LogOut";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import InitialIcon from "../InitialIcon/InitialIcon";

export default function Header({ user }) {
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
      <div className="header__center">
        <div className="header__greeting-avatar">
          <div className="header__greeting">
            Hi, {username ? username : "You"}!
          </div>
          {username === "Jane" ? (
            <img src={avatarJane} alt="avatar" className="header__avatar" />
          ) : (
            <>
              <InitialIcon username={username} />
            </>
          )}
        </div>
      </div>
      <div className="header__right">
        <Link to="/account" className="header__link">
          MY ACCOUNT
        </Link>
        <LogOut />
      </div>
    </div>
  );
}
