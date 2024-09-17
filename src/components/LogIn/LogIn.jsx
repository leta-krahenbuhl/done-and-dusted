import "./LogIn.scss";

export default function LogIn({ isLogInOpen, handleCloseLogIn }) {
<<<<<<< Updated upstream
=======
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the token in local storage or state
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

>>>>>>> Stashed changes
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
