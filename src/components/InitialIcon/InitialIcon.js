import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import "./InitialIcon.scss";
import { useState, useEffect } from "react";
import { fetchUserandColour } from "../../utils/axiosCalls";
export default function InitialIcon({ username, inTaskComponent, }) {
    const [colour, setColour] = useState("");
    const [error, setError] = useState(null);
    // Get user and set user colour
    useEffect(() => {
        const fetchColour = async () => {
            const habitant = username;
            setError(null);
            try {
                const userColour = await fetchUserandColour(habitant);
                setColour(userColour);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
        };
        fetchColour();
    }, [username]);
    // Get the initial of the username
    const userInitial = username ? username.charAt(0).toUpperCase() : "";
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsx("div", { className: inTaskComponent ? "initial-icon-small" : "initial-icon", style: { backgroundColor: colour || "lightpink" }, children: _jsx("div", { className: userInitial === "C" ? "initial-icon-c" : "", children: userInitial }) }));
}
