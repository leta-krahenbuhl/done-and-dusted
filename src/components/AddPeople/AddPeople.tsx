import "./AddPeople.scss";
import { useState } from "react";
import { addHabitantToHome } from "../../utils/axiosCalls";

interface AddPeopleProps {
  homeName: string;
  isAddPeopleOpen: boolean;
  setIsAddPeopleOpen: (value: boolean) => void;
  handleCloseAddPeople: () => void;
}

export default function AddPeople({
  homeName,
  isAddPeopleOpen,
  setIsAddPeopleOpen,
  handleCloseAddPeople,
}: AddPeopleProps) {
  const [newHabitant, setNewHabitant] = useState("");

  // Add habitant to home
  const handleAddPeople = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Error handling
    if (!newHabitant) {
      return alert(
        "Please enter the username of the person you would like to add to your home."
      );
    }

    try {
      const response = await addHabitantToHome(newHabitant, homeName);

      if (response.status === 200) {
        alert(`${newHabitant} added to ${homeName} successfully.`);
        setIsAddPeopleOpen(false);
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(`An unknown error occurred whilst trying to add ${newHabitant}.`);
      }
    }
  };

  if (!isAddPeopleOpen) return null;

  return (
    <div className="add-people-overlay" onClick={handleCloseAddPeople}>
      <div
        className="add-people-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-people-overlay__button-close"
          onClick={handleCloseAddPeople}
        >
          &times;
        </button>
        <h1 className="add-people-overlay__h1">Add a new habitant</h1>
        <div className="add-people-overlay__text-container">
          <p className="add-people-overlay__text">
            To add a new person to your home they have to sign up first.
          </p>
          <p className="add-people-overlay__text">
            Then, enter their username below to add them.
          </p>
        </div>
        <form className="add-people-overlay-form" onSubmit={handleAddPeople}>
          <label htmlFor="username" className="add-people-overlay-form__label">
            Enter the username of the habitant you would like to add
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username of person you'd like to add"
            className="add-people-overlay-form__input"
            value={newHabitant}
            onChange={(e) => setNewHabitant(e.target.value)}
            required
          />

          <button type="submit" className="add-people-overlay-form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
