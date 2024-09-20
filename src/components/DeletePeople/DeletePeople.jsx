import "./DeletePeople.scss";
import { useState } from "react";
import axios from "axios";

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
      const response = await axios.patch("/api/homes/delete-habitant", {
        habitantToDelete,
        homeName,
      });

      if (response.status === 200) {
        alert(`${habitantToDelete} deleted from ${homeName} successfully.`);
        setIsDeletePeopleOpen(false);
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert(`An error occurred while trying to delete ${habitantToDelete}.`);
      }
    }

    isDeletePeopleOpen(false);
  };

  if (!isDeletePeopleOpen) return null;

  return (
    <div className="add-home-overlay" onClick={handleCloseDeletePeople}>
      <div
        className="add-home-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-home-overlay__button-close"
          onClick={handleCloseDeletePeople}
        >
          &times;
        </button>
        <h1 className="add-home-overlay__h1">Delete a habitant</h1>
        <form className="add-home-overlay-form" onSubmit={handleDeletePeople}>
          <input
            type="text"
            placeholder="Username of person to delete"
            className="add-home-overlay-form__input"
            value={habitantToDelete}
            onChange={(e) => setHabitantToDelete(e.target.value)}
            required
          />

          <button type="submit" className="add-home-overlay-form__button">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
