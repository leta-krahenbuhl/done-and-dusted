import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./Header.scss";
import logo from "../../assets/images/logo.svg";
import avatarJane from "../../assets/images/avatar-jane.svg";
import LogOut from "../LogOut/LogOut";
import { Link } from "react-router-dom";
import InitialIcon from "../InitialIcon/InitialIcon";
import { getUsernameFromToken } from "../../utils/user";
export default function Header() {
    const username = getUsernameFromToken() || "undefined";
    // Sets class in InitialIcon to determine size
    // ToDo: Fix this!
    const inTaskComponent = false;
    return (_jsxs("div", { className: "header", children: [_jsx(Link, { to: "/home", children: _jsx("img", { src: logo, alt: "logo", className: "header__logo" }) }), _jsx("div", { className: "header__center", children: _jsxs("div", { className: "header__greeting-avatar", children: [_jsxs("div", { className: "header__greeting", children: ["Hi, ", username ? username : "You", "!"] }), username === "Jane" ? (_jsx("img", { src: avatarJane, alt: "avatar", className: "header__avatar" })) : (_jsx(_Fragment, { children: _jsx(InitialIcon, { username: username, inTaskComponent: inTaskComponent }) }))] }) }), _jsxs("div", { className: "header__right", children: [_jsx(Link, { to: "/account", className: "header__link", children: "MY ACCOUNT" }), _jsx(LogOut, {})] })] }));
}
