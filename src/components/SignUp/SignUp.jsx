import "./SignUp.scss";

export default function SignUp({ isSignUpOpen, handleCloseSignUp }) {
  if (!isSignUpOpen) return null;

  return (
    <div className="signup-overlay" onClick={handleCloseSignUp}>
      <div
        className="signup-overlay__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="signup-overlay__button-close"
          onClick={handleCloseSignUp}
        >
          &times;
        </button>
        <h1 className="signup-overlay__h1">Sign Up</h1>
        <form className="signup-overlay-form">
          <input
            type="text"
            placeholder="Username"
            className="signup-overlay-form__input"
          />
          <input
            type="email"
            placeholder="Email"
            className="signup-overlay-form__input"
          />
          <input
            type="password"
            placeholder="Password"
            className="signup-overlay-form__input"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="signup-overlay-form__input"
          />
          <button type="submit" className="signup-overlay-form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
