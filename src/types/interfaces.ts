export interface Task {
  _id: string;
  taskName: string;
  minutes: number;
  repeat: "daily" | "weekly" | "other";
  done: boolean;
  doneBy: string;
  homeName: string;
  dueDate: string;
  week: string;
  startDate: string;
  endDate: string;
}

export interface Home {
  _id: string;
  homeName: string;
  habitants: string[];
  admins: string[];
}

export interface User {
  _id: string;
  username: string;
  password: string;
  colour: string;
}
