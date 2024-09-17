import "./Home.scss";
import cleaningWoman from "../../assets/images/cleaning-woman.svg";
import { useState, useEffect } from "react";
import AddHome from "../../components/AddHome/AddHome";
import Header from "../../components/Header/Header";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios"; // Import axios for making HTTP requests

export default function Home() {
  const [isAddHomeOpen, setIsAddHomeOpen] = useState(false);
  const [homeName, setHomeName] = useState(null);
  const [error, setError] = useState(null);

  // Decode the token to get the username
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { username } = jwtDecode(token);
      // console.log("username:", username); // works!

      // Fetch home data
      axios
        .get("/api/homes/user-home", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        })
        .then((response) => {
          setHomeName(response.data.homeName);
          console.log("response.data.homeName:", response.data.homeName);
        })
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.message || "An error occurred");
          console.log("error", error);
        });
    }
  }, []);

  const handleAddHome = () => {
    setIsAddHomeOpen(true);
  };

  const handleCloseAddHome = () => {
    setIsAddHomeOpen(false);
  };

  if (!homeName) {
    return (
      <div className="home-all">
        <Header />
        <article className="home">
          <img src={cleaningWoman} alt="logo" className="home__image" />
          <div className="home__text-container">
            <h1 className="home__header">Welcome to Done&Dusted.</h1>
            <p className="home__text-big">
              You're not part of a home yet. Ask a home admin to add you on
              their home, or set up your own home to get started.
            </p>
            <button className="home__button" onClick={handleAddHome}>
              ADD A HOME
            </button>
          </div>
        </article>
        <AddHome
          isAddHomeOpen={isAddHomeOpen}
          handleCloseAddHome={handleCloseAddHome}
        />
      </div>
    );
  }

  return (
    <div className="home-all">
      <Header />
      <article className="home">
        <p>{homeName}</p>
      </article>
    </div>
  );
}
