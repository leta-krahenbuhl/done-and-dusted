import { deleteHabitant, updateUser } from "../../utils/axiosCalls";
import "./EditAccount.scss";
import { useEffect, useState } from "react";

interface EditAccountProps {
  username: string;
  homeName: string;
  colour: string;
  isEditAccountOpen: boolean;
  setIsEditAccountOpen: (value: boolean) => void;
}

export default function EditAccount({
  username,
  homeName,
  colour,
  isEditAccountOpen,
  setIsEditAccountOpen,
}: EditAccountProps) {
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
      "Are you sure? If you're the only habitant of this home, you will not be able to re-join it."
    );
    if (userConfirmed) {
      const deleteHome = async () => {
        try {
          await deleteHabitant(username, homeName);
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
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <h2 className="edit-acccount-overlay__h2">{`EDIT ${username}'s Account`}</h2>

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
            <option value="teal">teal</option>
            <option value="cornflowerblue">cornflowerblue</option>
            <option value="tomato">tomato</option>
            <option value="lightgrey">lightgrey</option>
          </select>
          <div className="edit-acccount-overlay-form__button-container-form">
            <button
              type="submit"
              className="edit-acccount-overlay-form__button"
            >
              SUBMIT
            </button>
          </div>
        </form>

        <div className="edit-acccount-overlay__remove-home-container">
          <div className="edit-acccount-overlay__bold">
            {homeName ? (
              `Lives at: ${homeName}`
            ) : (
              <div>
                <div className="edit-acccount-overlay__bold">No home yet</div>

                <div className="edit-acccount-overlay__no-home-container">
                  <button
                    className="edit-acccount-overlay__button"
                    onClick={closeEditAccount}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
          {homeName ? (
            <div>
              <div className="edit-acccount-overlay__button-container">
                <button
                  className="edit-acccount-overlay__button"
                  onClick={handleRemoveHome}
                >
                  LEAVE THIS HOME
                </button>
              </div>
              <p className="edit-acccount-overlay__text">
                (If you're the last habitant, you will NOT be able to re-join
                this home)
              </p>
              <div className="edit-acccount-overlay__button-container">
                <button
                  className="edit-acccount-overlay__button"
                  onClick={closeEditAccount}
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
