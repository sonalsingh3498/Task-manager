import TaskItem from "./TaskItem";
import type { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;               // string instead of number
  onEdit: (id: string, newText: string) => void;
  onToggleStatus: (id: string) => void;
};

const TaskList = ({ tasks, onDelete, onEdit, onToggleStatus }: TaskListProps) => (
  <ul className="space-y-4">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleStatus={onToggleStatus}
      />
    ))}
  </ul>
);

export default TaskList;
