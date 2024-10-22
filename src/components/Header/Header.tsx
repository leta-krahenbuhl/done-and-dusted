import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import avatarJane from "../../assets/images/avatar-jane.svg";
import LogOut from "../LogOut/LogOut";
import { Link } from "react-router-dom";
import InitialIcon from "../InitialIcon/InitialIcon";
import { getUsernameFromToken } from "../../utils/user";

export default function Header() {
  const username = getUsernameFromToken();

  // Sets class in InitialIcon to determine size
  // ToDo: Fix this!
  const inTaskComponent: boolean = false;

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
              <InitialIcon
                username={username}
                inTaskComponent={inTaskComponent}
              />
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
