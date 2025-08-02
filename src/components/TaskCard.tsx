import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export function TaskCard({ task }: any) {
  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({ id: task.id });

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 cursor-move"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        transition: transform ? "none" : "transform 200ms ease",
      }}
    >
      {task.title}
    </Card>
  );
}
