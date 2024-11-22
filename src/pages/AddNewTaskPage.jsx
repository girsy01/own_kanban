import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewTaskPage = ({ tasks, handleAddTask }) => {
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({
    id: `${tasks.length ? tasks.length + 1 : 1}`,
    title: "",
    description: "",
    assignee: "",
    status: "",
    priority: "",
    dueDate: "",
    createdDate: new Date().toISOString().split("T")[0],
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewTask((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    if (
      !newTask.title ||
      !newTask.description ||
      !newTask.assignee ||
      !newTask.status ||
      !newTask.priority ||
      !newTask.dueDate
    ) {
      alert("All fields must be filled before submitting.");
      return;
    }

    handleAddTask(newTask);
    navigate("/");
  }

  return (
    <div className="AddNewTaskPage">
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={newTask.title} name="title" onChange={handleChange} />
        </label>
        <label>
          Assignee:
          <input type="text" value={newTask.assignee} name="assignee" onChange={handleChange} />
        </label>
        <label>
          Status:
          <select value={newTask.status} name="status" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <label>
          Priority:
          <select value={newTask.priority} name="priority" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" value={newTask.dueDate} name="dueDate" onChange={handleChange} />
        </label>
        <label>
          Description:
          <br />
          <textarea
            type="text"
            value={newTask.description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};
export default AddNewTaskPage;
