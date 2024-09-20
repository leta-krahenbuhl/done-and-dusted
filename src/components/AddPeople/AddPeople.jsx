import "./AddPeople.scss";
import { useState } from "react";
import axios from "axios";

export default function AddPeople({
  homeName,
  isAddPeopleOpen,
  setIsAddPeopleOpen,
  handleCloseAddPeople,
}) {
  //   const [admins, setAdmins] = useState([]);
  const [newHabitant, setNewHabitant] = useState("");

  // Edit task form submit
  const handleAddPeople = async (event) => {
    event.preventDefault();

    // Error handling
    if (!newHabitant) {
      return alert(
        "Please enter the username of the person you would like to add to your home."
      );
    }

    try {
      const response = await axios.patch("/api/homes/add-habitant", {
        newHabitant,
        homeName,
      });

      if (response.status === 200) {
        alert(`${newHabitant} added to ${homeName} successfully.`);
        setIsAddPeopleOpen(false);
        // window.location.reload();
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
        alert(`An error occurred while editing ${taskName}.`);
      }
    }

    setIsEdit(false);
  };

  if (!isAddPeopleOpen) return null;

  return (
    <div className="add-home-overlay" onClick={handleCloseAddPeople}>
      <div
        className="add-home-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-home-overlay__button-close"
          onClick={handleCloseAddPeople}
        >
          &times;
        </button>
        <h1 className="add-home-overlay__h1">Add a new habitant</h1>
        <form className="add-home-overlay-form" onSubmit={handleAddPeople}>
          <input
            type="text"
            placeholder="Username of person you'd like to add"
            className="add-home-overlay-form__input"
            value={newHabitant}
            onChange={(e) => setNewHabitant(e.target.value)}
            required
          />

          <button
            type="submit"
            className="add-home-overlay-form__button"
            onClick={handleAddPeople}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
