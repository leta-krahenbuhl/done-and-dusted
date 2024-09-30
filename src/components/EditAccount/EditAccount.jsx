import { deleteHabitant, updateUsernamePassword } from "../../utils/axios";
import "./EditAccount.scss";
import { useEffect, useState } from "react";

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

  // handle submit edit user/account
  //   const handleSubmitEditAccount = (e) => {
  //     e.preventDefault();

  //     const updateUser = async () => {
  //       try {
  //         await updateUsernamePassword(username, usernameNew, passwordNew);
  //       } catch (err) {
  //         console.error("Error updating user:", err);
  //       }
  //     };
  //     updateUser();
  //   };

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
        } catch (err) {
          console.error("Error deleting home:", err);
        }
      };
      deleteHome();
    } else {
      return;
    }
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
          />

          <label for="password-new">New Password (optional)</label>
          <input
            id="password-new"
            type="text"
            placeholder="New password"
            className="edit-acccount-overlay-form__input"
            value={passwordNew}
            onChange={(e) => setPasswordNew(e.target.value)}
          />

          <label for="password-new-verify">Verify New Password</label>
          <input
            id="password-new-verify"
            type="text"
            placeholder="Verify new password"
            className="edit-acccount-overlay-form__input"
            value={passwordNewVerify}
            onChange={(e) => setPasswordNew(e.target.value)}
          />
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
