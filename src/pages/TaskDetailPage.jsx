import { Link, useParams } from "react-router-dom";

const TaskDetailPage = ({ tasks }) => {
  const { taskId } = useParams();

  const task = tasks.find((e) => e.id === taskId);

  if (!task) {
    return <p>Task not found. It might have been moved or deleted.</p>;
  }

  return (
    <div className="TaskDetailPage">
      <div className="content center-container">
        <div className="h1-container">
          <h1 className={`${task.priority.toLowerCase()}`}>{task.title}</h1>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="font-weight-500">Assignee:</td>
              <td>{task.assignee}</td>
            </tr>
            <tr>
              <td className="font-weight-500">Due Date:</td>
              <td>{task.dueDate}</td>
            </tr>
            <tr>
              <td className="font-weight-500">Priority:</td>
              <td>{task.priority}</td>
            </tr>
            <tr>
              <td className="font-weight-500">Status:</td>
              <td>{task.status}</td>
            </tr>
          </tbody>
        </table>
        <div className={`description ${task.priority.toLowerCase()}`}>
          <p>
            <span className="font-weight-500">Description: </span>
          </p>
          <p>{task.description}</p>
        </div>
        <Link to={`/task/edit/${task.id}`}>
          <button>Edit Task</button>
        </Link>
      </div>
    </div>
  );
};

export default TaskDetailPage;
