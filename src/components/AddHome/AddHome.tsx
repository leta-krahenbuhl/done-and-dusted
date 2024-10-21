import "./AddHome.scss";
import { useState } from "react";
import { handleAddHome } from "../../utils/axios";
import { getUsernameFromToken } from "../../utils/user";

export default function AddHome({ isAddHomeOpen, handleCloseAddHome }) {
  const [homeName, setHomeName] = useState("");
  const [error, setError] = useState(null);

  // Handle add home form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!homeName) {
      return alert("Please enter a name for your home.");
    }

    const username = getUsernameFromToken();
    const admins = [username];
    const habitants = [username];

    try {
      const response = await handleAddHome(homeName, admins, habitants);
      console.log("response: ", response);
    } catch (error) {
      setError(error.message);
    }

    window.location.reload();
  };

  if (!isAddHomeOpen) return null;

  return (
    <div className="add-home-overlay" onClick={handleCloseAddHome}>
      <div
        className="add-home-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="add-home-overlay__button-close"
          onClick={handleCloseAddHome}
        >
          &times;
        </button>
        <h1 className="add-home-overlay__h1">Create New Home</h1>
        <form className="add-home-overlay-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Home name"
            className="add-home-overlay-form__input"
            value={homeName}
            onChange={(e) => setHomeName(e.target.value)}
            required
          />
          <button type="submit" className="add-home-overlay-form__button">
            Submit
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
