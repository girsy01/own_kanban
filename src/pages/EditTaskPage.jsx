import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../context/tasks.context";

const EditTaskPage = () => {
  const navigate = useNavigate();
  const { tasks, handleEditTask } = useContext(TasksContext);

  const { taskId } = useParams();
  const task = tasks.find((e) => e.id == taskId);

  const [taskToEdit, setTaskToEdit] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    assignee: task.assignee,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    createdDate: task.createdDate,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setTaskToEdit((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    if (
      !taskToEdit.title ||
      !taskToEdit.description ||
      !taskToEdit.assignee ||
      !taskToEdit.status ||
      !taskToEdit.priority ||
      !taskToEdit.dueDate
    ) {
      alert("All fields must be filled before submitting.");
      return;
    }

    handleEditTask(taskToEdit);
    navigate("/");
  }

  return (
    <div className="AddNewTaskPage">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={taskToEdit.title} name="title" onChange={handleChange} />
        </label>
        <label>
          Assignee:
          <input type="text" value={taskToEdit.assignee} name="assignee" onChange={handleChange} />
        </label>
        <label>
          Status:
          <select value={taskToEdit.status} name="status" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <label>
          Priority:
          <select value={taskToEdit.priority} name="priority" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" value={taskToEdit.dueDate} name="dueDate" onChange={handleChange} />
        </label>
        <label>
          Description:
          <br />
          <textarea
            type="text"
            value={taskToEdit.description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default EditTaskPage;
