import "./LogOut.scss";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Redirect to login or home page
    navigate("/");
  };

  return (
    <button className="logout" onClick={handleLogout}>
      Log Out
    </button>
  );
}
