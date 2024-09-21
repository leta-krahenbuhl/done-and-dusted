import { useState } from "react";
import Header from "../../components/Header/Header";
import "./MyAccount.scss";
import { jwtDecode } from "jwt-decode";

export default function MyAccount() {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   // Fetch user
  //   axios
  //     .get("/api/tasks/weekly", {
  //       params: { homeName, currentWeekISO },
  //     })
  //     .then((response) => {
  //       setWeeklyTasks(response.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError(err.response?.data?.message || "An error occurred");
  //     });
  // }, [homeName, currentWeekISO]);

  // Below two paragraphs are in Header.jsx too. Simplify?
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // Decode the token to get the username
  let username = "";
  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username; // Access the username from the decoded token
  }

  return (
    <div className="account-all">
      <Header />
      <article className="account">
        <div className="account__top">
          <div className="account__name">{username}'s Account</div>
        </div>
        <div className="account__bottom">Info</div>
      </article>
    </div>
  );
}
