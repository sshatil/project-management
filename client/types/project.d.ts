export interface Project {
  value: any;
  _id: string;
  projectName: string;
  user: string;
  users: string[];
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
