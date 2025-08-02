export type Task = {
  id: string;
  title: string;
  description?: string;
};

export type IColumn = {
  id: string;
  title: string;
  tasks: Task[];
};

export type BoardState = {
  columns: IColumn[];
  moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
  addTask: (columnId: string, task: Task) => void;
};
