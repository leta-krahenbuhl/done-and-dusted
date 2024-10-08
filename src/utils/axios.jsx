import axios from "axios";
import { getUsernameFromToken } from "./user";

// Set up the base URL based on an environment variable or default to the deployed backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/";

// SignUp
export const signUp = async (username, password, colour) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/signup`,
      {
        username,
        password,
        colour,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during sign up:", error);

    // Handle specific error messages
    if (error.response) {
      // Server responded with a status code other than 200 range
      throw new Error(
        error.response.data.message ||
          "Error signing up. Server may be offline."
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from server");
    } else {
      // Something else happened while setting up the request
      throw new Error("Error: " + error.message);
    }
  }
};

// Log In
export const logIn = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during log in:", error);

    // Handle specific error messages
    if (error.response) {
      // Server responded with a status code other than 200 range
      throw new Error(
        error.response.data.message ||
          "Error logging in. Server may be offline."
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from server");
    } else {
      // Something else happened while setting up the request
      throw new Error("Error: " + error.message);
    }
  }
};

// Get user and set user colour
export const fetchUserandColour = async (habitant) => {
  const username = habitant;

  try {
    const response = await axios.get(`${BASE_URL}/api/users/get-one`, {
      params: { username },
    });

    const userData = response.data[0];
    return userData.colour;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch user data");
  }
};

// Get a user (with username)
export const fetchUser = async (user) => {
  const username = user;
  // console.log("user from axios: ", username); // works!

  try {
    const response = await axios.get(`${BASE_URL}/api/users/get-one`, {
      params: { username },
    });

    // console.log("response from axios: ", response.data); // works!
    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch user data");
  }
};

// Get tasks: daily, undone
export const fetchDailyTasksUndone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/daily-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch daily tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: daily, done
export const fetchDailyTasksDone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/daily-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch daily tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: weekly, undone
export const fetchWeeklyTasksUndone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/weekly-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch weekly tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: weekly, done
export const fetchWeeklyTasksDone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/weekly-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch weekly tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: other, undone
export const fetchOtherTasksUndone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/other-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch other tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: other, done
export const fetchOtherTasksDone = async (homeName, currentWeekISO) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/other-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch other tasks. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Get tasks: all done tasks of a user for a certain week
export const fetchTasksDoneByUser = async (
  username,
  currentWeekISO,
  setError
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/done-by-user`, {
      params: { username, currentWeekISO },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(
        error.response.data.message || "Failed to fetch tasks for user."
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

// Edit task
export const editTask = async (taskName, minutes, repeat, dueDate, taskId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/tasks/edit`, {
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

// Update task: done/undone property
export const updateDone = async (done, taskId, doneBy) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/tasks/update-done`, {
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
  // Ask for confirmation
  const userConfirmed = window.confirm(
    "Are you sure you want to delete this task? This action cannot be undone."
  );

  if (!userConfirmed) {
    return;
  }

  try {
    const response = await axios.delete(`${BASE_URL}/api/tasks/delete`, {
      data: { taskId },
    });

    if (response.status === 204) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while deleting the task");
  }
};

// Add task
export const addTask = async (
  taskName,
  minutes,
  repeat,
  homeName,
  dueDate,
  currentWeekISO,
  startDate,
  endDate
) => {
  const done = false;
  const doneBy = "not-done";

  try {
    const response = await axios.post(`${BASE_URL}/api/tasks/add-one`, {
      taskName,
      minutes,
      repeat,
      done,
      homeName,
      dueDate,
      doneBy,
      week: currentWeekISO,
      startDate,
      endDate,
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
    const response = await axios.post(`${BASE_URL}/api/homes`, {
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
    const response = await axios.patch(`${BASE_URL}/api/homes/add-habitant`, {
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

// Delete habitant
export const deleteHabitant = async (username, homeName) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/homes/delete-habitant`,
      {
        username,
        homeName,
      }
    );

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
export const fetchHomeData = async (homeName, setError) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/homes/get-current`, {
      params: { homeName },
    });
    return response.data;
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
export const fetchHomeName = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/homes/user-home`, {
      params: { username },
    });

    // Return the name of the home, or null if user is not part of a home
    return response.data.homeName || null;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      throw new Error(
        error.response.data.message ||
          "Failed to fetch home data. Server may be offline."
      );
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      throw new Error(
        "No response from the server. Please check your network or try again later."
      );
    } else {
      console.error("General Error:", error.message);
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// Fetch total minutes of user
export const fetchTasksForMinutes = async (habitant, currentWeekISO) => {
  try {
    // console.log("username: ", username); // works
    // console.log("currentWeekISO: ", currentWeekISO); // works

    const response = await axios.get(`${BASE_URL}/api/users/minutes`, {
      params: { username: habitant, currentWeekISO },
    });

    const tasks = response.data;
    return tasks;
  } catch (error) {
    if (error.response) {
      console.error("Response Error:", error.response.data);
      setError(
        error.response.data.message || "Failed to fetch tasks (to get minutes)."
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

// Update username / password
export const updateUser = async (username, colourNew) => {
  try {
    // Prepare the payload dynamically based on what's provided
    const payload = {};
    if (username) payload.username = username; // Only add if provided
    if (colourNew) payload.colourNew = colourNew; // Only add if provided
    const response = await axios.patch(`${BASE_URL}/api/users/update`, payload);
    if (response.status === 204) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while updating the user");
  }
};
