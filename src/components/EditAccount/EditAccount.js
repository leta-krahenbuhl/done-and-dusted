import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { deleteHabitant, updateUser } from "../../utils/axiosCalls";
import "./EditAccount.scss";
import { useEffect, useState } from "react";
export default function EditAccount({ username, homeName, colour, isEditAccountOpen, setIsEditAccountOpen, }) {
    const [colourNew, setColourNew] = useState("");
    // Update states
    useEffect(() => {
        setColourNew(colour);
    }, [colour]);
    const closeEditAccount = () => {
        setIsEditAccountOpen(false);
    };
    // Remove home from user
    const handleRemoveHome = () => {
        const userConfirmed = window.confirm("Are you sure? If you're the only habitant of this home, you will not be able to re-join it.");
        if (userConfirmed) {
            const deleteHome = async () => {
                try {
                    await deleteHabitant(username, homeName);
                    setIsEditAccountOpen(false);
                    window.location.reload();
                }
                catch (err) {
                    console.error("Error deleting home:", err);
                }
            };
            deleteHome();
        }
        else {
            return;
        }
    };
    // submit form (aka colour change)
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateUser(username, colourNew);
        window.location.reload();
    };
    if (!isEditAccountOpen)
        return null;
    return (_jsx("div", { className: "edit-acccount-overlay", onClick: closeEditAccount, children: _jsxs("div", { className: "edit-acccount-overlay__content", onClick: (e) => e.stopPropagation(), children: [_jsx("h2", { className: "edit-acccount-overlay__h2", children: `EDIT ${username}'s Account` }), _jsxs("form", { className: "edit-acccount-overlay-form", onSubmit: onSubmit, children: [_jsx("label", { className: "edit-acccount-overlay-form__label", htmlFor: "colour", children: "Edit colour:" }), _jsxs("select", { id: "colour", name: "colour", className: "edit-acccount-overlay-form__input", value: colourNew, onChange: (e) => setColourNew(e.target.value), children: [_jsx("option", { value: "lightpink", children: "lightpink" }), _jsx("option", { value: "darkseagreen", children: "darkseagreen" }), _jsx("option", { value: "gold", children: "gold" }), _jsx("option", { value: "teal", children: "teal" }), _jsx("option", { value: "cornflowerblue", children: "cornflowerblue" }), _jsx("option", { value: "tomato", children: "tomato" }), _jsx("option", { value: "lightgrey", children: "lightgrey" })] }), _jsx("div", { className: "edit-acccount-overlay-form__button-container-form", children: _jsx("button", { type: "submit", className: "edit-acccount-overlay-form__button", children: "SUBMIT" }) })] }), _jsxs("div", { className: "edit-acccount-overlay__remove-home-container", children: [_jsx("div", { className: "edit-acccount-overlay__bold", children: homeName ? (`Lives at: ${homeName}`) : (_jsxs("div", { children: [_jsx("div", { className: "edit-acccount-overlay__bold", children: "No home yet" }), _jsx("div", { className: "edit-acccount-overlay__no-home-container", children: _jsx("button", { className: "edit-acccount-overlay__button", onClick: closeEditAccount, children: "CANCEL" }) })] })) }), homeName ? (_jsxs("div", { children: [_jsx("div", { className: "edit-acccount-overlay__button-container", children: _jsx("button", { className: "edit-acccount-overlay__button", onClick: handleRemoveHome, children: "LEAVE THIS HOME" }) }), _jsx("p", { className: "edit-acccount-overlay__text", children: "(If you're the last habitant, you will NOT be able to re-join this home)" }), _jsx("div", { className: "edit-acccount-overlay__button-container", children: _jsx("button", { className: "edit-acccount-overlay__button", onClick: closeEditAccount, children: "CANCEL" }) })] })) : ("")] })] }) }));
}
