import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function Column({ column }: any) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md min-h-[300px] flex flex-col"
    >
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-200">
        {column?.title}
      </h2>

      <div className="space-y-2 flex-1">
        {column?.tasks?.map((task: any) => (
          <SortableContext
            id={column.id}
            items={column.tasks.map((task: any) => task.id)} // thứ tự hiện tại
            strategy={verticalListSortingStrategy}
          >
            <TaskCard
              key={task.id}
              className="p-3 bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-sm"
              task={task}
            >
              <p className="text-sm text-gray-900 dark:text-white font-medium">
                {task?.title}
              </p>
            </TaskCard>
          </SortableContext>
        ))}
      </div>
    </div>
  );
}
