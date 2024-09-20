import Header from "../../components/Header/Header";
import InitialIcon from "../../components/InitialIcon/InitialIcon";
import "./MyAccount.scss";
import { jwtDecode } from "jwt-decode";

export default function MyAccount() {
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
          <div className="account__avatar">
            <InitialIcon username={username} />
          </div>
          <div className="account__name">{username}</div>
        </div>
        <div className="account__bottom">Info</div>
      </article>
    </div>
  );
}
