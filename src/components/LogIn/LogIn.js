import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./LogIn.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../utils/axiosCalls";
export default function LogIn({ isLogInOpen, handleCloseLogIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        if (!username) {
            return alert("Please enter your username.");
        }
        if (!password) {
            return alert("Please enter your password.");
        }
        try {
            const data = await logIn(username, password);
            localStorage.setItem("token", data.token);
            navigate("/home");
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("An unknown error occurred.");
            }
        }
    };
    if (!isLogInOpen)
        return null;
    return (_jsx("div", { className: "login-overlay", onClick: handleCloseLogIn, children: _jsxs("div", { className: "login-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "login-overlay__button-close", onClick: handleCloseLogIn, children: "\u00D7" }), _jsx("h1", { className: "login-overlay__h1", children: "Log In" }), _jsxs("form", { className: "login-overlay-form", onSubmit: handleLogin, children: [_jsx("input", { id: "username", type: "text", placeholder: "Username", className: "login-overlay-form__input", value: username, onChange: (e) => setUsername(e.target.value), required: true }), _jsx("input", { id: "password", type: "password", placeholder: "Password", className: "login-overlay-form__input", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: "submit", className: "login-overlay-form__button", children: "Login" })] })] }) }));
}
