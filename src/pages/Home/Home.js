import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // NEW: Loading state
  // set username
  useEffect(() => {
    const getUsername = getUsernameFromToken();
    setUsername(getUsername || "undefined");
  }, []);
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
    return _jsx("p", { children: "Loading home data..." }); // Loading state
  }
  if (!username) {
    return _jsx("p", { children: "Loading username..." });
  }
  const handleAddHome = () => {
    setIsAddHomeOpen(true);
  };
  const handleCloseAddHome = () => {
    setIsAddHomeOpen(false);
  };
  if (error)
    return _jsxs("p", {
      className: "home-error",
      children: [" Error: ", error],
    });
  // If user doesn't have a home yet
  if (!homeName) {
    return _jsxs("div", {
      className: "home-none-all",
      children: [
        _jsx(Header, {}),
        _jsxs("article", {
          className: "home-none",
          children: [
            _jsx("img", {
              src: cleaningWoman,
              alt: "logo",
              className: "home-none__image",
            }),
            _jsxs("div", {
              className: "home-none__text-container",
              children: [
                _jsx("h1", {
                  className: "home-none__header",
                  children: "Welcome to Done&Dusted.",
                }),
                _jsx("p", {
                  className: "home-none__text-big",
                  children:
                    "You're not part of a home yet. Create your own home to get started, or ask a habitant from another home to add you on theirs, then refresh this page.",
                }),
                _jsx("button", {
                  className: "home-none__button",
                  onClick: handleAddHome,
                  children: "CREATE NEW HOME",
                }),
              ],
            }),
          ],
        }),
        _jsx(AddHome, {
          isAddHomeOpen: isAddHomeOpen,
          handleCloseAddHome: handleCloseAddHome,
        }),
      ],
    });
  }
  // User is part of a home
  return _jsxs("div", {
    className: "home-all",
    children: [
      _jsx(Header, {}),
      _jsxs("article", {
        className: "home",
        children: [
          _jsx("h1", { className: "home__header", children: homeName }),
          _jsxs(Tabs, {
            children: [
              _jsxs(TabList, {
                children: [
                  _jsx(Tab, { children: "TASKS" }),
                  _jsx(Tab, { children: "SCOREBOARD" }),
                  _jsx(Tab, { children: "MY HOME" }),
                ],
              }),
              _jsx(TabPanel, { children: _jsx(Tasks, { homeName: homeName }) }),
              _jsx(TabPanel, {
                children: _jsx(Scoreboard, { homeName: homeName }),
              }),
              _jsx(TabPanel, {
                children: _jsx(MyHome, { homeName: homeName }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
