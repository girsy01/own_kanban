import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TasksContext = createContext();

function TasksWrapper({ children }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getTasksData = () => {
    axios
      .get("https://own-kanban-be.onrender.com/tasks")
      .then(({ data }) => setTasks(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTasksData();
  }, []);

  function handleAddTask(task) {
    axios
      .post("https://own-kanban-be.onrender.com/tasks", task)
      .then(({ data }) => {
        console.log("Added:", data);
        getTasksData();
      })
      .catch((err) => console.log(err));
  }

  function handleEditTask(task) {
    axios
      .put(`https://own-kanban-be.onrender.com/tasks/${task.id}`, task)
      .then(({ data }) => {
        console.log("Task updated:", data);
        getTasksData();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteTask(taskId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      axios
        .delete(`https://own-kanban-be.onrender.com/tasks/${taskId}`)
        .then(({ data }) => {
          console.log("Task deleted", taskId);
          getTasksData();
        })
        .catch((err) => console.log(err));
      navigate("/");
    }
  }

  function handleDropTask(event) {
    const { active, over } = event;

    if (!active || !over) return;

    const taskId = active.id; // The ID of the task being dragged
    const newStatus = over.id; // The new status from the drop target

    // Optimistically update the local state
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );

    function setTaskClicked() {
      axios
        .get(`https://own-kanban-be.onrender.com/tasks/${taskId}`)
        .then(({ data }) => {
          if (over.id === data.status) {
            navigate(`/tasks/${taskId}`);
          } else {
            performDrop();
          }
        })
        .catch((err) => {
          console.log(err);
          // Rollback state if API fails
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: active.data.currentStatus } : task
            )
          );
        });
    }
    setTaskClicked();

    function performDrop() {
      axios
        .patch(`https://own-kanban-be.onrender.com/tasks/${taskId}`, { status: newStatus })
        .then(({ data }) => {
          console.log("Task updated:", data);
          getTasksData();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        handleAddTask,
        handleEditTask,
        handleDeleteTask,
        handleDropTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export { TasksContext, TasksWrapper };
