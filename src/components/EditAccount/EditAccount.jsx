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

  console.log("username in editAccount: ", username);

  // Update states
  useEffect(() => {
    setUsernameNew(username);
    setPasswordNew(password);
  }, [username, password]);

  const closeEditAccount = () => {
    setIsEditAccountOpen(false);
  };

  const handleSubmitEditAccount = (e) => {
    e.preventDefault();
    console.log("click");
  };

  if (!isEditAccountOpen) return null;

  console.log("usernameNew: ", usernameNew);
  console.log("passwordNew: ", passwordNew);

  return (
    <div className="edit-acccount-overlay" onClick={closeEditAccount}>
      <div
        className="edit-acccount-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-acccount-overlay__text-container">
          <p>{username}</p>
          <p>{password}</p>
        </div>

        <form
          onSubmit={handleSubmitEditAccount}
          className="edit-acccount-overlay-form"
        >
          <h2 className="edit-acccount-overlay-form__h2">{`EDIT: ${username}'s Account`}</h2>

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
            value={passwordNew}
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
              className="edit-acccount-overlay__button"
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
