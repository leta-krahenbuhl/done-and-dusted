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
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
