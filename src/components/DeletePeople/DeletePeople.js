import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./DeletePeople.scss";
import { useState } from "react";
import { deleteHabitant } from "../../utils/axiosCalls";
export default function DeletePeople({ homeName, isDeletePeopleOpen, setIsDeletePeopleOpen, handleCloseDeletePeople, }) {
    const [habitantToDelete, setHabitantToDelete] = useState("");
    // Delete habitant
    const handleDeletePeople = async (event) => {
        event.preventDefault();
        // Error handling
        if (!habitantToDelete) {
            return alert("Please enter the username of the person you would like to delete from your home.");
        }
        try {
            const response = await deleteHabitant(habitantToDelete, homeName);
            if (response.status === 200) {
                alert(`${habitantToDelete} and their tasks deleted from ${homeName} successfully.`);
                setIsDeletePeopleOpen(false);
                window.location.reload();
            }
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
    if (!isDeletePeopleOpen)
        return null;
    return (_jsx("div", { className: "delete-people-overlay", onClick: handleCloseDeletePeople, children: _jsxs("div", { className: "delete-people-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "delete-people-overlay__button-close", onClick: handleCloseDeletePeople, children: "\u00D7" }), _jsx("h1", { className: "delete-people-overlay__h1", children: "Delete a habitant" }), _jsx("p", { className: "delete-people-overlay__text", children: "If you delete a person from a home, all their 'done' tasks and data will be deleted as well." }), _jsx("p", { className: "delete-people-overlay__text", children: "You can delete yourself, but you will loose access to this home and its data. If you're the only habitant, you won't be able to re-join the home and it will be deleted." }), _jsxs("form", { className: "delete-people-overlay-form", onSubmit: handleDeletePeople, children: [_jsx("input", { type: "text", placeholder: "Username of person to delete", className: "delete-people-overlay-form__input", value: habitantToDelete, onChange: (e) => setHabitantToDelete(e.target.value), required: true }), _jsx("button", { type: "submit", className: "delete-people-overlay-form__button", children: "Delete" })] })] }) }));
}
