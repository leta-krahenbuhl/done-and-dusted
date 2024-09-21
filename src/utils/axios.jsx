import axios from "axios";
import { getUsernameFromToken } from "./user";

// Get user and set user colour
export const fetchUser = async (habitant, setColour, setError) => {
  const username = habitant;

  try {
    const response = await axios.get("/api/users/get-one", {
      params: { username },
    });

    const userData = response.data[0]; // Access the first element of the array
    setColour(userData.colour); // Set the colour state
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "An error occurred");
  }
};

// Get weekly tasks
export const fetchWeeklyTasks = async (
  homeName,
  currentWeekISO,
  setError,
  setWeeklyTasks
) => {
  try {
    const response = await axios.get("/api/tasks/weekly", {
      params: { homeName, currentWeekISO },
    });
    setWeeklyTasks(response.data);
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "An error occurred");
  }
};

// Add home
export const handleAddHome = async (
  homeName,
  setAdmins,
  setHabitants,
  admins,
  habitants,
  setError
) => {
  getUsernameFromToken(setAdmins, setHabitants, admins, habitants);

  if (!homeName) {
    return alert("Please enter a name for your home.");
  }

  try {
    const response = await axios.post("/api/homes", {
      homeName,
      habitants,
      admins,
    });

    if (response.status === 200) {
      alert("New home created successfully.");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    setError("An error occurred while creating the home");
  }
};

// Add habitant to home
export const addHabitantToHome = async (newHabitant, homeName) => {
  return await axios.patch("/api/homes/add-habitant", {
    newHabitant,
    homeName,
  });
};
