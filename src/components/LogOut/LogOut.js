import { jsx as _jsx } from "react/jsx-runtime";
import "./LogOut.scss";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
export default function LogOut() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem("token");
        // Redirect to the root path
        navigate("/");
    };
    return (_jsx("button", { onClick: handleLogout, className: "logout-button", children: "LOG OUT" }));
}
