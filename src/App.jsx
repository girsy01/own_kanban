import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles.scss";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import EditTaskPage from "./pages/EditTaskPage";
import tasksData from "./assets/tasks.json";
import AddNewTaskPage from "./pages/AddNewTaskPage";
import { TasksContext } from "./context/tasks.context";

function App() {
  const { tasks } = useContext(TasksContext);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="/tasks/add-new" element={<AddNewTaskPage />} />
          <Route path="/task/edit/:taskId" element={<EditTaskPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
