import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./AddPeople.scss";
import { useState } from "react";
import { addHabitantToHome } from "../../utils/axiosCalls";
export default function AddPeople({ homeName, isAddPeopleOpen, setIsAddPeopleOpen, handleCloseAddPeople, }) {
    const [newHabitant, setNewHabitant] = useState("");
    // Add habitant to home
    const handleAddPeople = async (event) => {
        event.preventDefault();
        // Error handling
        if (!newHabitant) {
            return alert("Please enter the username of the person you would like to add to your home.");
        }
        try {
            const response = await addHabitantToHome(newHabitant, homeName);
            if (response.status === 200) {
                alert(`${newHabitant} added to ${homeName} successfully.`);
                setIsAddPeopleOpen(false);
                window.location.reload();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert(`An unknown error occurred whilst trying to add ${newHabitant}.`);
            }
        }
    };
    if (!isAddPeopleOpen)
        return null;
    return (_jsx("div", { className: "add-people-overlay", onClick: handleCloseAddPeople, children: _jsxs("div", { className: "add-people-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "add-people-overlay__button-close", onClick: handleCloseAddPeople, children: "\u00D7" }), _jsx("h1", { className: "add-people-overlay__h1", children: "Add a new habitant" }), _jsxs("div", { className: "add-people-overlay__text-container", children: [_jsx("p", { className: "add-people-overlay__text", children: "To add a new person to your home they have to sign up first." }), _jsx("p", { className: "add-people-overlay__text", children: "Then, enter their username below to add them." })] }), _jsxs("form", { className: "add-people-overlay-form", onSubmit: handleAddPeople, children: [_jsx("label", { htmlFor: "username", className: "add-people-overlay-form__label", children: "Enter the username of the habitant you would like to add" }), _jsx("input", { id: "username", type: "text", placeholder: "Username of person you'd like to add", className: "add-people-overlay-form__input", value: newHabitant, onChange: (e) => setNewHabitant(e.target.value), required: true }), _jsx("button", { type: "submit", className: "add-people-overlay-form__button", children: "Submit" })] })] }) }));
}
