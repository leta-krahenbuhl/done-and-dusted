import "./DeletePeople.scss";
import { useState } from "react";
import { deleteHabitant } from "../../utils/axios";

export default function DeletePeople({
  homeName,
  isDeletePeopleOpen,
  setIsDeletePeopleOpen,
  handleCloseDeletePeople,
}) {
  const [habitantToDelete, setHabitantToDelete] = useState("");

  // Delete habitant
  const handleDeletePeople = async (event) => {
    event.preventDefault();

    // Error handling
    if (!habitantToDelete) {
      return alert(
        "Please enter the username of the person you would like to delete from your home."
      );
    }

    try {
      const response = await deleteHabitant(habitantToDelete, homeName);

      if (response.status === 200) {
        alert(`${habitantToDelete} deleted from ${homeName} successfully.`);
        setIsDeletePeopleOpen(false);
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isDeletePeopleOpen) return null;

  return (
    <div className="delete-people-overlay" onClick={handleCloseDeletePeople}>
      <div
        className="delete-people-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="delete-people-overlay__button-close"
          onClick={handleCloseDeletePeople}
        >
          &times;
        </button>
        <h1 className="delete-people-overlay__h1">Delete a habitant</h1>
        <p>
          You can delete yourself, but you will loose access to this home and
          its data.
        </p>
        <form
          className="delete-people-overlay-form"
          onSubmit={handleDeletePeople}
        >
          <input
            type="text"
            placeholder="Username of person to delete"
            className="delete-people-overlay-form__input"
            value={habitantToDelete}
            onChange={(e) => setHabitantToDelete(e.target.value)}
            required
          />

          <button type="submit" className="delete-people-overlay-form__button">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
