import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./InitialIconByHabitant.scss";
import { useState, useEffect } from "react";
import { fetchUserandColour } from "../../utils/axiosCalls";
export default function InitialIconByHabitant({ habitant, }) {
    const [colour, setColour] = useState("");
    const [error, setError] = useState(null);
    // Get user and set user colour
    useEffect(() => {
        const fetchColour = async () => {
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
    }, [habitant]);
    // Get the initial of the username
    const userInitial = habitant ? habitant.charAt(0).toUpperCase() : "";
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsx(_Fragment, { children: _jsx("div", { className: "initial-icon", style: { backgroundColor: colour || "lightpink" }, children: _jsx("div", { className: userInitial === "C" ? "initial-icon-c" : "", children: userInitial }) }) }));
}
