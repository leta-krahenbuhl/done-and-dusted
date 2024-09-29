import "./EditAccount.scss";
import { useEffect, useState } from "react";
// import { editTask, updateDone, deleteTask } from "../../utils/axios";
// import { getUsernameFromToken } from "../../utils/user";

export default function EditAccount({
  isEditAccountOpen,
  setIsEditAccountOpen,
  username,
  password,
  homeName,
}) {
  const [usernameNew, setUsernameNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewVerify, setPasswordNewVerify] = useState("");

  // Update states
  useEffect(() => {
    setUsernameNew(username);
  }, [username, password]);

  const closeEditAccount = () => {
    setIsEditAccountOpen(false);
  };

  const handleSubmitEditAccount = (e) => {
    e.preventDefault();
    console.log("click");
  };

  const handleRemoveHome = () => {
    console.log("click remove");
  };

  if (!isEditAccountOpen) return null;

  return (
    <div className="edit-acccount-overlay" onClick={closeEditAccount}>
      <div
        className="edit-acccount-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="edit-acccount-overlay__h2">{`EDIT: ${username}'s Account`}</h2>

        <div className="edit-acccount-overlay__remove-home">
          <div className="edit-acccount-overlay__remove-home-text ">
            {`Lives at: ${homeName}`}
          </div>
          <button
            className="edit-acccount-overlay__button-remove"
            onClick={handleRemoveHome}
          >
            REMOVE HOME
          </button>
        </div>

        <div className="edit-acccount-overlay__text-container"></div>

        <form
          onSubmit={handleSubmitEditAccount}
          className="edit-acccount-overlay-form"
        >
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="edit-acccount-overlay-form__input"
            value={usernameNew}
            onChange={(e) => setUsernameNew(e.target.value)}
            required
          />

          <label for="password">Password</label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="edit-acccount-overlay-form__input"
            value={password}
            onChange={(e) => setPasswordNew(e.target.value)}
            required
          />

          <label for="password">Password New</label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="edit-acccount-overlay-form__input"
            value={passwordNew}
            onChange={(e) => setPasswordNew(e.target.value)}
            required
          />

          <label for="password">Verify Password New</label>
          <input
            id="password"
            type="text"
            placeholder="Password"
            className="edit-acccount-overlay-form__input"
            value={passwordNewVerify}
            onChange={(e) => setPasswordNew(e.target.value)}
            required
          />

          {/* 
          <label for="due-date">Due</label>
          <input
            id="due-date"
            type="date"
            className="edit-acccount-overlay-form__input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <label for="repeat">Repeat</label>
          <select
            id="repeat"
            name="repeat"
            className="add-task-overlay-form__input"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="other">other</option>
          </select> */}
          <div className="edit-acccount-overlay-form__button-container">
            <button
              className="edit-acccount-overlay-form__button"
              onClick={closeEditAccount}
            >
              CANCEL
            </button>
            <button
              className="edit-acccount-overlay-form__button-submit"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
