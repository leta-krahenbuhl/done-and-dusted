import "./LogIn.scss";

export default function LogIn({ isLogInOpen, handleCloseLogIn }) {
  if (!isLogInOpen) return null;

  return (
    <div className="login-overlay" onClick={handleCloseLogIn}>
      <div
        className="login-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="login-overlay__button-close"
          onClick={handleCloseLogIn}
        >
          &times;
        </button>
        <h1 className="login-overlay__h1">Log In</h1>
        <form className="login-overlay-form">
          <input
            type="email"
            placeholder="Email"
            className="login-overlay-form__input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-overlay-form__input"
          />
          <button type="submit" className="login-overlay-form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
