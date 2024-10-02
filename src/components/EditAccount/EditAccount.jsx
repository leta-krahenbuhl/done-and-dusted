import { deleteHabitant, updateUser } from "../../utils/axios";
import "./EditAccount.scss";
import { useEffect, useState } from "react";

export default function EditAccount({
  isEditAccountOpen,
  setIsEditAccountOpen,
  username,
  // password,
  homeName,
  colour,
}) {
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
    const userConfirmed = window.confirm(
      "Are you sure? If you're the only habitant of this home, the home and all data associated with it will be deleted, and you will not be able to re-join it."
    );
    if (userConfirmed) {
      const deleteHome = async () => {
        const habitantToDelete = username;
        try {
          await deleteHabitant(habitantToDelete, homeName);
          setIsEditAccountOpen(false);
          window.location.reload();
        } catch (err) {
          console.error("Error deleting home:", err);
        }
      };
      deleteHome();
    } else {
      return;
    }
  };

  // submit form (aka colour change)
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("in on submit function");
    await updateUser(username, colourNew);
    window.location.reload();
  };

  if (!isEditAccountOpen) return null;

  return (
    <div className="edit-acccount-overlay" onClick={closeEditAccount}>
      <div
        className="edit-acccount-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="edit-acccount-overlay__h2">{`EDIT: ${username}'s Account`}</h2>

        <div className="edit-acccount-overlay__text-container">
          <p>
            Here you can remove yourself from a home, even if you're the last
            habitant left. Doing so will delete the home and all data associated
            with it, so no one will be able to re-join that home.
          </p>
        </div>

        <div className="edit-acccount-overlay__remove-home">
          <div className="edit-acccount-overlay__remove-home-text ">
            {homeName ? `Lives at: ${homeName}` : "No home yet"}
          </div>
          {homeName ? (
            <button
              className="edit-acccount-overlay__button-remove"
              onClick={handleRemoveHome}
            >
              REMOVE HOME
            </button>
          ) : (
            ""
          )}
        </div>

        <form className="edit-acccount-overlay-form" onSubmit={onSubmit}>
          <label className="edit-acccount-overlay-form__label" htmlFor="colour">
            Edit colour:
          </label>
          <select
            id="colour"
            name="colour"
            className="edit-acccount-overlay-form__input"
            value={colourNew}
            onChange={(e) => setColourNew(e.target.value)}
          >
            <option value="lightpink">lightpink</option>
            <option value="darkseagreen">darkseagreen</option>
            <option value="gold">gold</option>
            <option value="aquamarine">aquamarine</option>
            <option value="cornflowerblue">cornflowerblue</option>
            <option value="tomato">tomato</option>
            <option value="lightgrey">lightgrey</option>
          </select>
          <div className="edit-acccount-overlay-form__button-container">
            <button
              className="edit-acccount-overlay-form__button"
              onClick={closeEditAccount}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="edit-acccount-overlay-form__button"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
