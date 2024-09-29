import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./MyAccount.scss";
import { getUsernameFromToken } from "../../utils/user";
import { fetchUser, fetchHomeName } from "../../utils/axios";

export default function MyAccount() {
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [homeName, setHomeName] = useState("");
  const [error, setError] = useState(null);

  // get username
  useEffect(() => {
    const user = getUsernameFromToken();
    setUsername(user);
  }, []);

  // get user's details (to get pw, to map through for name)
  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const userData = await fetchUser(username);
          console.log("userData: ", userData);
          setUserDetails(userData);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };

      fetchUserData();
    }
  }, [username]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  // Get homeName (using the username)
  useEffect(() => {
    if (username) {
      const fetchHomeNameWithUsername = async () => {
        try {
          await fetchHomeName(username, setHomeName, setError);
          // console.log("userData: ", userData);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };

      fetchHomeNameWithUsername();
    }
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="account-all">
      <Header />
      <article className="account">
        <div className="account__top">
          <div className="account__name">{username}'s Account</div>
        </div>
        <div className="account__bottom">
          {userDetails.map((userdetail) => (
            <ul className="account__list" key={userdetail.id}>
              <li className="account__list-item">
                <div className="account__list-item-title">NAME:</div>
                <div className="account__list-item-part account__list-item-part--title">
                  {userdetail.username}
                </div>
              </li>
              <li className="account__list-item">
                <div className="account__list-item-title">PASSWORD:</div>
                <div className="account__list-item-part account__list-item-part--title">
                  ********
                </div>
              </li>
              <li className="account__list-item">
                <div className="account__list-item-title">LIVES AT:</div>
                <div className="account__list-item-part account__list-item-part--title">
                  {homeName}
                </div>
              </li>
            </ul>
          ))}
        </div>
      </article>
    </div>
  );
}
