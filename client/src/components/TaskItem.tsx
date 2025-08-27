import { useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onToggleStatus: (id: string) => void;
};

const TaskItem = ({ task, onDelete, onEdit, onToggleStatus }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(task.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
     
      <button
        onClick={() => onToggleStatus(task.id)}
        className={`w-5 h-5 rounded-full border-2 mr-3 ${
          task.completed ? "bg-green-500 border-green-500" : "border-gray-400"
        }`}
      />

    
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="flex-grow border-b-2 focus:outline-none"
        />
      ) : (
        <span
          className={`flex-grow text-gray-800 ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>
      )}

    
      <span
        className={`ml-3 text-sm ${
          task.completed ? "text-green-600" : "text-yellow-600"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>

      <div className="flex space-x-2 ml-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="py-1 px-3 text-sm rounded-md bg-green-500 text-white"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="py-1 px-3 text-sm rounded-md bg-blue-500 text-white"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="py-1 px-3 text-sm rounded-md bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
