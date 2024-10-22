import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signUp } from "../../utils/axiosCalls";
import "./SignUp.scss";
import { useState } from "react";
export default function SignUp({ isSignUpOpen, handleCloseSignUp, }) {
    const [username, setUsername] = useState("");
    const [colour, setColour] = useState("lightpink"); // use the first colour in the select input
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            return alert("Passwords do not match.");
        }
        if (!username) {
            return alert("Please enter a username.");
        }
        if (!password) {
            return alert("Please enter a password.");
        }
        if (!colour) {
            return alert("Please choose a colour.");
        }
        try {
            const response = await signUp(username, password, colour);
            alert(`User created successfully. Please log in to get started. ${response.message}`);
            handleCloseSignUp();
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
    if (!isSignUpOpen)
        return null;
    return (_jsx("div", { className: "signup-overlay", onClick: handleCloseSignUp, children: _jsxs("div", { className: "signup-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "signup-overlay__button-close", onClick: handleCloseSignUp, children: "\u00D7" }), _jsx("h1", { className: "signup-overlay__h1", children: "Sign Up" }), _jsxs("form", { className: "signup-overlay-form", onSubmit: handleSignUp, children: [_jsx("input", { type: "text", placeholder: "Username", className: "signup-overlay-form__input", value: username, onChange: (e) => setUsername(e.target.value), required: true }), _jsxs("select", { id: "colour", name: "colour", className: "signup-overlay-form__input", value: colour, onChange: (e) => setColour(e.target.value), children: [_jsx("option", { value: "lightpink", children: "lightpink" }), _jsx("option", { value: "darkseagreen", children: "darkseagreen" }), _jsx("option", { value: "gold", children: "gold" }), _jsx("option", { value: "teal", children: "teal" }), _jsx("option", { value: "cornflowerblue", children: "cornflowerblue" }), _jsx("option", { value: "tomato", children: "tomato" }), _jsx("option", { value: "lightgrey", children: "lightgrey" })] }), _jsx("input", { type: "password", placeholder: "Password", className: "signup-overlay-form__input", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("input", { type: "password", placeholder: "Confirm password", className: "signup-overlay-form__input", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true }), _jsx("button", { type: "submit", className: "signup-overlay-form__button", children: "Submit" })] }), _jsx("div", { className: "signup-overlay__feedback", children: error && _jsx("div", { style: { color: "red" }, children: error }) })] }) }));
}
