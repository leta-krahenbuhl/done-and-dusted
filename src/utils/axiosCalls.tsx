import axios from "axios"; // Default import of axios
import { AxiosResponse } from "axios";
import { User } from "../types/interfaces";

// Set up the base URL based on an environment variable or default to the deployed backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/";

// SignUp
export const signUp = async (
  username: string,
  password: string,
  colour: string
) => {
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
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error during sign up:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error signing up. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Log In
export const logIn = async (username: string, password: string) => {
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
  } catch (error: unknown) {
    // Log the error for debugging purposes
    console.error("Error during log in:", error);

    // Handle specific error messages
    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error logging in. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred whilst logging in");
    }
  }
};

// Get user and set user colour
export const fetchUserandColour = async (habitant: string) => {
  const username = habitant;

  try {
    const response = await axios.get(`${BASE_URL}/api/users/get-one`, {
      params: { username },
    });

    const userData = response.data[0];
    return userData.colour;
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error signing up. Server may be offline."
      );
    } else if (error instanceof Error) {
      throw new Error("Failed to fetch user data: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred whilst fetching user data");
    }
  }
};

// Get a user (with username)
export const fetchUser = async (user: string) => {
  const username = user;
  // console.log("user from axios: ", username); // works!

  try {
    const response = await axios.get(`${BASE_URL}/api/users/get-one`, {
      params: { username },
    });

    // console.log("response from axios: ", response.data); // works!
    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting user:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting user. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred whilst getting user");
    }
  }
};

// Get tasks: daily, undone
export const fetchDailyTasksUndone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/daily-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting daily undone tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting daily undone tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: daily, done
export const fetchDailyTasksDone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/daily-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting daily done tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting daily done tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: weekly, undone
export const fetchWeeklyTasksUndone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/weekly-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting weekly undone tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting weekly undone tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: weekly, done
export const fetchWeeklyTasksDone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/weekly-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting weekly done tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting weekly done tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: other, undone
export const fetchOtherTasksUndone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/other-undone`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting other undone tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting other undone tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: other, done
export const fetchOtherTasksDone = async (
  homeName: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/other-done`, {
      params: { homeName, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting other done tasks:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting other done tasks. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Get tasks: all done tasks of a user for a certain week
export const fetchTasksDoneByUser = async (
  username: string,
  currentWeekISO: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/done-by-user`, {
      params: { username, currentWeekISO },
    });

    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error getting tasks for user:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error getting tasks for user. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Edit task
export const editTask = async (
  taskName: string,
  minutes: number | null,
  repeat: "daily" | "weekly" | "other" | "not selected",
  dueDate: string,
  taskId: string
) => {
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
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error editing task:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error editing task. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Update task: done/undone property
export const updateDone = async (
  done: boolean,
  taskId: string,
  doneBy: string
) => {
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
export const deleteTask = async (
  taskId: string
): Promise<AxiosResponse | void> => {
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

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while deleting the task");
  }
};

// Add task
export const addTask = async (
  taskName: string,
  minutes: number,
  repeat: "daily" | "weekly" | "other" | "not selected",
  homeName: string,
  dueDate: string,
  currentWeekISO: string,
  startDate: string,
  endDate: string
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

// Add home
export const handleAddHome = async (
  homeName: string,
  admins: string[],
  habitants: string[]
) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/homes`, {
      homeName,
      habitants,
      admins,
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while creating the home");
  }
};

// Add habitant to home
export const addHabitantToHome = async (
  newHabitant: string,
  homeName: string
) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/homes/add-habitant`, {
      newHabitant,
      homeName,
    });

    return response;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error whilst adding habitant:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error whilst adding habitant. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Delete habitant
export const deleteHabitant = async (username: string, homeName: string) => {
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
export const fetchHomeData = async (homeName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/homes/get-current`, {
      params: { homeName },
    });
    return response.data;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error fetching home data:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error fetching home data. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Find homeName with username as habitant
export const fetchHomeName = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/homes/user-home`, {
      params: { username },
    });

    // Return the name of the home, or null if user is not part of a home
    return response.data.homeName || null;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error("Error fetching home name:", error);

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error fetching home name. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

// Fetch total minutes of user
export const fetchTasksForMinutes = async (
  habitant: string,
  currentWeekISO: string
) => {
  try {
    // console.log("username: ", username); // works
    // console.log("currentWeekISO: ", currentWeekISO); // works

    const response = await axios.get(`${BASE_URL}/api/users/minutes`, {
      params: { username: habitant, currentWeekISO },
    });

    const tasks = response.data;
    return tasks;
  } catch (error: unknown) {
    // Specify 'unknown' type
    // Log the error for debugging purposes
    console.error(
      "Error fetching total minutes for done tasks for user:",
      error
    );

    if (axios.isAxiosError(error)) {
      // Check if it's an Axios error
      // Handle specific error messages
      throw new Error(
        error.response?.data?.message ||
          "Error fetching total minutes for done tasks for user. Server may be offline."
      );
    } else if (error instanceof Error) {
      // Check if it's a generic Error
      // Handle generic errors
      throw new Error("Error: " + error.message);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred");
    }
  }
};

interface UpdateUserPayload {
  username?: string; // Optional property
  colourNew?: string; // Optional property
}

// Update username / password
export const updateUser = async (username: string, colourNew: string) => {
  try {
    // Prepare the payload dynamically based on what's provided
    const payload: UpdateUserPayload = {};
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
