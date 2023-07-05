export interface Project {
  _id: string;
  projectName: string;
  user: string;
  users: User[];
  startingDate: string;
  finishingDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  tasks: Task[];
}

export interface Task {
  taskName: string;
  status: string;
  assignTo: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
