import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles.scss";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import EditTaskPage from "./pages/EditTaskPage";
import tasksData from "./assets/tasks.json";
import AddNewTaskPage from "./pages/AddNewTaskPage";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from local storage or use default data
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : tasksData;
  });

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksData));
  }, []);

  function handleAddTask(task) {
    if (tasks.length) {
      setTasks((prev) => [task, ...prev]);
    } else setTasks([task]);
  }

  function handleEditTask(task) {
    const updatedTasks = tasks.map((e) => {
      if (e.id === task.id) return task;
      return e;
    });
    setTasks(updatedTasks);
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/task/:taskId" element={<TaskDetailPage tasks={tasks} />} />
          <Route
            path="/tasks/add-new"
            element={<AddNewTaskPage tasks={tasks} handleAddTask={handleAddTask} />}
          />
          <Route
            path="/task/edit/:taskId"
            element={<EditTaskPage tasks={tasks} handleEditTask={handleEditTask} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
