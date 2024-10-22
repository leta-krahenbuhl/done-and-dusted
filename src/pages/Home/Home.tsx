import "./Home.scss";
import cleaningWoman from "../../assets/images/cleaning-woman.svg";
import { useState, useEffect } from "react";
import AddHome from "../../components/AddHome/AddHome";
import Header from "../../components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tasks from "../../components/Tasks/Tasks";
import MyHome from "../../components/MyHome/MyHome";
import { getUsernameFromToken } from "../../utils/user";
import { fetchHomeName } from "../../utils/axiosCalls";
import Scoreboard from "../../components/Scoreboard/Scoreboard";

export default function Home() {
  const [isAddHomeOpen, setIsAddHomeOpen] = useState(false);
  const [homeName, setHomeName] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true); // NEW: Loading state

  // set username
  useEffect(() => {
    const getUsername = getUsernameFromToken();
    setUsername(getUsername || "undefined");
  }, []);

  console.log("username: ", username);

  // Find homeName with username as habitant
  useEffect(() => {
    if (username) {
      const getHomeName = async () => {
        try {
          const data = await fetchHomeName(username);
          setHomeName(data);
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          } else {
            alert("An unknown error occurred.");
          }
        } finally {
          setLoading(false); // Mark loading as complete after fetch attempt
        }
      };
      getHomeName();
    }
  }, [username]);

  // Show loading message while data is being fetched
  if (loading) {
    return <p>Loading home data...</p>; // Loading state
  }

  if (!username) {
    return <p>Loading username...</p>;
  }

  const handleAddHome = () => {
    setIsAddHomeOpen(true);
  };

  const handleCloseAddHome = () => {
    setIsAddHomeOpen(false);
  };

  if (error) return <p className="home-error"> Error: {error}</p>;

  // If user doesn't have a home yet
  if (!homeName) {
    return (
      <div className="home-none-all">
        <Header />
        <article className="home-none">
          <img src={cleaningWoman} alt="logo" className="home-none__image" />
          <div className="home-none__text-container">
            <h1 className="home-none__header">Welcome to Done&Dusted.</h1>
            <p className="home-none__text-big">
              You're not part of a home yet. Create your own home to get
              started, or ask a habitant from another home to add you on theirs,
              then refresh this page.
            </p>
            <button className="home-none__button" onClick={handleAddHome}>
              CREATE NEW HOME
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
            <Scoreboard homeName={homeName} />
          </TabPanel>
          <TabPanel>
            <MyHome homeName={homeName} />
          </TabPanel>
        </Tabs>
      </article>
    </div>
  );
}
