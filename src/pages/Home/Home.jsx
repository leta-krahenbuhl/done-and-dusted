import "./Home.scss";
import cleaningWoman from "../../assets/images/cleaning-woman.svg";
import { useState, useEffect } from "react";
import AddHome from "../../components/AddHome/AddHome";
import Header from "../../components/Header/Header";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import axios from "axios"; // Import axios for making HTTP requests
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
      <div className="home-none-all">
        <Header />
        <article className="home-none">
          <img src={cleaningWoman} alt="logo" className="home-none__image" />
          <div className="home-none__text-container">
            <h1 className="home-none__header">Welcome to Done&Dusted.</h1>
            <p className="home-none__text-big">
              You're not part of a home yet. Ask a home admin to add you on
              their home, or set up your own home to get started.
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
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </article>
    </div>
  );
}
