import "./Home.scss";
import cleaningWoman from "../../assets/images/cleaning-woman.svg";
import { useState, useEffect } from "react";
import AddHome from "../../components/AddHome/AddHome";
import Header from "../../components/Header/Header";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios"; // Import axios for making HTTP requests
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tasks from "../../components/Tasks/Tasks";
import MyHome from "../../components/MyHome/MyHome";

export default function Home() {
  const [isAddHomeOpen, setIsAddHomeOpen] = useState(false);
  const [homeName, setHomeName] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");

  // Check if user has home and get it
  useEffect(() => {
    //should this be outside of the useEffect?
    const token = localStorage.getItem("token");
    const { username } = jwtDecode(token);
    setUser(username);

    if (token) {
      // Fetch home data
      axios
        .get("/api/homes/user-home", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        })
        .then((response) => {
          setHomeName(response.data.homeName);
        })
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.message || "An error occurred");
          console.error("error", error);
        });
    }
  }, []);

  const handleAddHome = () => {
    setIsAddHomeOpen(true);
  };

  const handleCloseAddHome = () => {
    setIsAddHomeOpen(false);
  };

  // If user doesn't have a home yet
  if (!homeName) {
    return (
      <div className="home-none-all">
        <Header user={user} />
        <article className="home-none">
          <img src={cleaningWoman} alt="logo" className="home-none__image" />
          <div className="home-none__text-container">
            <h1 className="home-none__header">Welcome to Done&Dusted.</h1>
            <p className="home-none__text-big">
              You're not part of a home yet. Set up your own home to get
              started, or ask a home admin to add you on theirs.
            </p>
            <button className="home-none__button" onClick={handleAddHome}>
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

  // User is part of a home
  return (
    <div className="home-all">
      <Header />
      <article className="home">
        <h1 className="home__header">{homeName}</h1>
        <Tabs>
          <TabList>
            <Tab>TASKS</Tab>
            <Tab>SCOREBOARD</Tab>
            <Tab>MY HOME</Tab>
          </TabList>

          <TabPanel>
            <Tasks homeName={homeName} />
          </TabPanel>
          <TabPanel>
            <h2>Week 2</h2>
          </TabPanel>
          <TabPanel>
            <MyHome homeName={homeName} />
          </TabPanel>
        </Tabs>
      </article>
    </div>
  );
}
