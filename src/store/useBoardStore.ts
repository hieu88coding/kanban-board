import { create } from "zustand";

import { BoardState } from "../../types/kanban";

export const useBoardStore = create<BoardState>((set) => ({
  columns: [
    { id: "todo", title: "To Do", tasks: [] },
    { id: "doing", title: "Doing", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ],

  moveTask: (taskId, fromId, toId) => {
    /* bạn viết logic ở đây */
    set((state) => {
      // Clone columns array
      const newColumns = state.columns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));

      // Tìm column nguồn và đích
      const fromColumn = newColumns.find((col) => col.id === fromId);
      const toColumn = newColumns.find((col) => col.id === toId);
      if (!fromColumn || !toColumn) return state;

      // Tìm task cần di chuyển
      const taskIndex = fromColumn.tasks.findIndex(
        (task) => task.id === taskId
      );
      if (taskIndex === -1) return state;

      const [task] = fromColumn.tasks.splice(taskIndex, 1);
      toColumn.tasks.push(task); // thêm vào to

      return { columns: newColumns };
    });
  },

  addTask: (columnId, task) => {
    /* thêm task vào đúng column */
    set((state) => {
      const newColumns = state.columns.map((col) => {
        if (col.id === columnId) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      });

      return { columns: newColumns };
    });
  },
}));
