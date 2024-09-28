import axios from "axios";
import { getUsernameFromToken } from "./user";

// Get user and set user colour
export const fetchUserandColour = async (habitant, setColour) => {
  const username = habitant;

  try {
    const response = await axios.get("/api/users/get-one", {
      params: { username },
    });

    const userData = response.data[0]; // Access the first element of the array
    setColour(userData.colour); // Set the colour state
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch user data");
  }
};

// Get daily undone tasks
export const fetchDailyTasksUndone = async (
  homeName,
  currentWeekISO,
  setDailyTasksUndone,
  setError
) => {
  try {
    const response = await axios.get("/api/tasks/daily-undone", {
      params: { homeName, currentWeekISO },
    });

    setDailyTasksUndone(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(
        error.response.data.message || "Failed to fetch daily undone tasks."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }
};

// Get daily done tasks
export const fetchDailyTasksDone = async (
  homeName,
  currentWeekISO,
  setDailyTasksDone,
  setError
) => {
  try {
    const response = await axios.get("/api/tasks/daily-done", {
      params: { homeName, currentWeekISO },
    });

    setDailyTasksDone(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(
        error.response.data.message || "Failed to fetch daily undone tasks."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
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

// Get other tasks
export const fetchOtherTasks = async (
  homeName,
  currentWeekISO,
  setError,
  setOtherTasks
) => {
  try {
    const response = await axios.get("/api/tasks/other", {
      params: { homeName, currentWeekISO },
    });

    setOtherTasks(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(error.response.data.message || "Failed to fetch other tasks.");
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }
};

// Edit task
export const editTask = async (taskName, minutes, repeat, dueDate, taskId) => {
  try {
    const response = await axios.patch("/api/tasks/edit", {
      taskName,
      minutes,
      repeat,
      dueDate,
      taskId,
    });

    if (response.status !== 200) {
      // Handle unexpected responses
      throw new Error(response.data.message || "Failed to edit task.");
    }
  } catch (error) {
    // Handle different error scenarios
    console.error("Error while editing task:", error);
    if (error.response) {
      // Server responded with an error
      throw new Error(
        error.response.data.message || "An error occurred on the server."
      );
    } else if (error.request) {
      // No response was received
      throw new Error(
        "No response from the server. Please check your network connection."
      );
    } else {
      // Other errors
      throw new Error("An unexpected error occurred while editing the task.");
    }
  }
};

// Update done/undone property on task
export const updateDone = async (done, taskId, doneBy) => {
  try {
    const response = await axios.patch("/api/tasks/update-done", {
      done,
      taskId,
      doneBy,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while updating the task");
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete("/api/tasks/delete", {
      data: { taskId },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while deleting the task");
  }
};

// Add home //TODO: first error msg in other comp?
export const handleAddHome = async (
  homeName,
  setAdmins,
  setHabitants,
  admins,
  habitants,
  setError
) => {
  const username = getUsernameFromToken();
  setAdmins(admins.push(username));
  setHabitants(habitants.push(username));

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
  try {
    const response = await axios.patch("/api/homes/add-habitant", {
      newHabitant,
      homeName,
    });

    return response;
  } catch (error) {
    // Check if the error is an Axios error with a response (i.e., the server responded with a status code)
    if (error.response) {
      // The request was made and the server responded with a status code that falls outside the range of 2xx
      console.error("Response Error:", error.response.data);

      // Optionally, throw a more meaningful error to the caller with the server's message
      throw new Error(error.response.data.message || "Failed to add habitant");
    } else if (error.request) {
      // The request was made but no response was received (network issue or server didn't respond)
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response received from the server. Please check your network or try again later."
      );
    } else {
      // Something else happened in setting up the request that triggered an error
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Add task
export const addTask = async (
  taskName,
  minutes,
  repeat,
  homeName,
  dueDate,
  currentWeekISO
) => {
  const done = false;
  const doneBy = "not-done";

  try {
    const response = await axios.post("/api/tasks/add-one", {
      taskName,
      minutes,
      repeat,
      done,
      homeName,
      dueDate,
      doneBy,
      week: currentWeekISO,
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while creating the task");
  }
};

// Delete habitant
export const deleteHabitant = async (habitantToDelete, homeName) => {
  try {
    const response = await axios.patch("/api/homes/delete-habitant", {
      habitantToDelete,
      homeName,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while deleting the habitant");
  }
};

// Fetch home data with homeName (to get inhabitants)
export const fetchHomeData = async (homeName, setError, setHomeData) => {
  try {
    const response = await axios.get("/api/homes/get-current", {
      params: { homeName },
    });

    setHomeData(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(error.response.data.message || "Failed to fetch home data.");
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }
};

// Find homeName with username as habitant
export const fetchHomeName = async (username, setHomeName, setError) => {
  try {
    const response = await axios.get("/api/homes/user-home", {
      params: { username },
    });

    setHomeName(response.data.homeName);
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(error.response.data.message || "Failed to fetch home data.");
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      setError("An unexpected error occurred. Please try again.");
    }
  }
};
