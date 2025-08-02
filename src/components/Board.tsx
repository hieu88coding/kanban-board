"use client";
import { Column } from "./Column";
import { Button } from "./ui/button";
import { useBoardStore } from "@/store/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { AddTaskDialog } from "./AddTaskDialog";
export function Board() {
  const { moveTask, addTask, columns } = useBoardStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over) return;

    const taskId = active.id.toString();
    const toColumnId = over.id.toString();

    // Dò từ column nào (loop qua columns trong Zustand)
    const fromColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );

    const fromColumnId = fromColumn?.id;
    if (!fromColumnId || fromColumnId === toColumnId) return;

    moveTask(taskId, fromColumnId, toColumnId);
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <div className="mb-4">
          <AddTaskDialog
            onCreate={(task) => {
              const newTask = {
                id: uuidv4(),
                title: task.title,
                description: task.description,
              };
              addTask("todo", newTask);
            }}
          />
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            <Column
              column={{
                id: "todo",
                title: "To Do",
                tasks: columns.find((item) => item.id === "todo")?.tasks,
              }}
            />
            <Column
              column={{
                id: "doing",
                title: "Doing",
                tasks: columns.find((item) => item.id === "doing")?.tasks,
              }}
            />
            <Column
              column={{
                id: "done",
                title: "Done",
                tasks: columns.find((item) => item.id === "done")?.tasks,
              }}
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
