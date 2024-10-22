import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./MyAccount.scss";
import { getUsernameFromToken } from "../../utils/user";
import { fetchUser, fetchHomeName } from "../../utils/axiosCalls";
import { Link } from "react-router-dom";
import EditAccount from "../../components/EditAccount/EditAccount";
import { User } from "../../types/interfaces";

export default function MyAccount() {
  const [username, setUsername] = useState<string>("");
  const [userDetails, setUserDetails] = useState<User[] | []>([]);
  const [homeName, setHomeName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);

  // console.log("userDetails: ", userDetails);

  // get username
  useEffect(() => {
    const user = getUsernameFromToken();
    setUsername(user || "undefined");
  }, []);

  // get user's details (to get pw, to map through for name)
  useEffect(() => {
    if (username) {
      const fetchUserData = async () => {
        try {
          const userData = await fetchUser(username);
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
          const nameOfHome = await fetchHomeName(username);
          setHomeName(nameOfHome);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Error fetching user data.");
          }
        }
      };

      fetchHomeNameWithUsername();
    }
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleClickEdit = () => {
    setIsEditAccountOpen(true);
  };

  return (
    <div className="account-all">
      <Header />
      <article className="account">
        <div className="account__top">
          <div className="account__h1">{username}'s Account</div>
        </div>
        <div className="account__bottom">
          <ul className="account__list">
            <li className="account__list-item">
              <div className="account__list-item-title">LIVES AT:</div>
              <div className="account__list-item-part account__list-item-part--title">
                {homeName ? homeName : "Not part of a home yet."}
              </div>
            </li>
            <li className="account__list-item">
              <div className="account__list-item-title">NAME:</div>
              <div className="account__list-item-part account__list-item-part--title">
                {userDetails[0]?.username}
              </div>
            </li>
            <li className="account__list-item">
              <div className="account__list-item-title">PASSWORD:</div>
              <div className="account__list-item-part account__list-item-part--title">
                ********
              </div>
            </li>
            <li className="account__list-item">
              <div className="account__list-item-title">COLOUR:</div>
              <div className="account__list-item-part account__list-item-part--title">
                {userDetails[0]?.colour}
              </div>
            </li>
          </ul>
        </div>
        <div className="account__bottom-container">
          <Link to="/home">
            <p className="account__link">BACK TO DASHBOARD</p>
          </Link>
          <button className="account__button" onClick={handleClickEdit}>
            EDIT
          </button>
        </div>
      </article>
      <EditAccount
        username={userDetails[0]?.username}
        setIsEditAccountOpen={setIsEditAccountOpen}
        isEditAccountOpen={isEditAccountOpen}
        homeName={homeName}
        colour={userDetails[0]?.colour}
      />
    </div>
  );
}
