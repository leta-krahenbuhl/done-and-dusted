import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./AddHome.scss";
import { useState } from "react";
import { handleAddHome } from "../../utils/axiosCalls";
import { getUsernameFromToken } from "../../utils/user";
export default function AddHome({ isAddHomeOpen, handleCloseAddHome, }) {
    const [homeName, setHomeName] = useState("");
    const [error, setError] = useState(null);
    // Handle add home form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!homeName) {
            return alert("Please enter a name for your home.");
        }
        const username = getUsernameFromToken() || "undefined";
        const admins = [username];
        const habitants = [username];
        try {
            const response = await handleAddHome(homeName, admins, habitants);
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An unknown error occurred.");
            }
        }
        window.location.reload();
    };
    if (!isAddHomeOpen)
        return null;
    return (_jsx("div", { className: "add-home-overlay", onClick: handleCloseAddHome, children: _jsxs("div", { className: "add-home-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "add-home-overlay__button-close", onClick: handleCloseAddHome, children: "\u00D7" }), _jsx("h1", { className: "add-home-overlay__h1", children: "Create New Home" }), _jsxs("form", { className: "add-home-overlay-form", onSubmit: onSubmit, children: [_jsx("input", { type: "text", placeholder: "Home name", className: "add-home-overlay-form__input", value: homeName, onChange: (e) => setHomeName(e.target.value), required: true }), _jsx("button", { type: "submit", className: "add-home-overlay-form__button", children: "Submit" })] }), error && _jsx("p", { className: "error-message", children: error })] }) }));
}
