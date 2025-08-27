// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
};

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { token } = useAuth();

  const api = axios.create({
    baseURL: "http://192.168.1.5:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchTasks = async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate("/");
      } else {
        setError("Failed to fetch tasks.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const res = await api.post("/tasks", { title: newTaskTitle });
      setTasks([...tasks, res.data]);
      setNewTaskTitle("");
    } catch {
      setError("Failed to add task.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  const editTask = async (id: string, newText: string) => {
    try {
      const res = await api.put(`/tasks/${id}`, { title: newText });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setError("Failed to update task.");
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const res = await api.put(`/tasks/${id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setError("Failed to update status.");
    }
  };

  const displayTasks = tasks.map((t) => ({
    id: t._id,
    text: t.title,
    completed: t.completed,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-6 flex">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-4 py-2 border rounded-l-md focus:ring-indigo-500"
        />
        <button
          onClick={addTask}
          className="py-2 px-4 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>

      {displayTasks.length > 0 ? (
        <TaskList
          tasks={displayTasks}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleStatus={toggleTaskStatus}
        />
      ) : (
        <p className="text-center text-gray-500 mt-10">
          You have no tasks. Add a new one to get started!
        </p>
      )}
    </div>
  );
};

export default Dashboard;
