import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { TasksWrapper } from "./context/tasks.context.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <TasksWrapper>
      <App />
    </TasksWrapper>
  </Router>
);
