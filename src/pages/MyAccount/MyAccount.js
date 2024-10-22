import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./MyAccount.scss";
import { getUsernameFromToken } from "../../utils/user";
import { fetchUser, fetchHomeName } from "../../utils/axiosCalls";
import { Link } from "react-router-dom";
import EditAccount from "../../components/EditAccount/EditAccount";
export default function MyAccount() {
    var _a, _b, _c, _d;
    const [username, setUsername] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [homeName, setHomeName] = useState("");
    const [error, setError] = useState(null);
    const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
    // console.log("userDetails: ", userDetails);
    // get username
    useEffect(() => {
        const user = getUsernameFromToken();
        setUsername(user || "undefined");
    }, []);
    // get user's details (to get pw, to map through for name)
    useEffect(() => {
        if (username) {
            const fetchUserData = async () => {
                try {
                    const userData = await fetchUser(username);
                    setUserDetails(userData);
                }
                catch (err) {
                    console.error("Error fetching user data:", err);
                }
            };
            fetchUserData();
        }
    }, [username]);
    if (!userDetails) {
        return _jsx("div", { children: "Loading..." });
    }
    // Get homeName (using the username)
    useEffect(() => {
        if (username) {
            const fetchHomeNameWithUsername = async () => {
                try {
                    const nameOfHome = await fetchHomeName(username);
                    setHomeName(nameOfHome);
                }
                catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    }
                    else {
                        setError("Error fetching user data.");
                    }
                }
            };
            fetchHomeNameWithUsername();
        }
    }, [username]);
    if (error) {
        return _jsx("div", { children: error });
    }
    const handleClickEdit = () => {
        setIsEditAccountOpen(true);
    };
    return (_jsxs("div", { className: "account-all", children: [_jsx(Header, {}), _jsxs("article", { className: "account", children: [_jsx("div", { className: "account__top", children: _jsxs("div", { className: "account__h1", children: [username, "'s Account"] }) }), _jsx("div", { className: "account__bottom", children: _jsxs("ul", { className: "account__list", children: [_jsxs("li", { className: "account__list-item", children: [_jsx("div", { className: "account__list-item-title", children: "LIVES AT:" }), _jsx("div", { className: "account__list-item-part account__list-item-part--title", children: homeName ? homeName : "Not part of a home yet." })] }), _jsxs("li", { className: "account__list-item", children: [_jsx("div", { className: "account__list-item-title", children: "NAME:" }), _jsx("div", { className: "account__list-item-part account__list-item-part--title", children: (_a = userDetails[0]) === null || _a === void 0 ? void 0 : _a.username })] }), _jsxs("li", { className: "account__list-item", children: [_jsx("div", { className: "account__list-item-title", children: "PASSWORD:" }), _jsx("div", { className: "account__list-item-part account__list-item-part--title", children: "********" })] }), _jsxs("li", { className: "account__list-item", children: [_jsx("div", { className: "account__list-item-title", children: "COLOUR:" }), _jsx("div", { className: "account__list-item-part account__list-item-part--title", children: (_b = userDetails[0]) === null || _b === void 0 ? void 0 : _b.colour })] })] }) }), _jsxs("div", { className: "account__bottom-container", children: [_jsx(Link, { to: "/home", children: _jsx("p", { className: "account__link", children: "BACK TO DASHBOARD" }) }), _jsx("button", { className: "account__button", onClick: handleClickEdit, children: "EDIT" })] })] }), _jsx(EditAccount, { username: (_c = userDetails[0]) === null || _c === void 0 ? void 0 : _c.username, setIsEditAccountOpen: setIsEditAccountOpen, isEditAccountOpen: isEditAccountOpen, homeName: homeName, colour: (_d = userDetails[0]) === null || _d === void 0 ? void 0 : _d.colour })] }));
}
