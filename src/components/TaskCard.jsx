import { useDraggable } from "@dnd-kit/core";
import { Link, useNavigate } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useState } from "react";
import { TasksContext } from "../context/tasks.context";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    // <Link to={`/task/${task.id}`} >
    <div
      className={`TaskCard ${task.priority.toLowerCase()}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h3>{task.title}</h3>
      <div>
        <p>
          <span className="font-weight-500">Assignee:</span> {task.assignee}
        </p>
        <p>
          <span className="font-weight-500">Due Date: </span>
          {task.dueDate}
        </p>
        <p>
          <span className="font-weight-500">Priority: </span>
          {task.priority}
        </p>
      </div>
    </div>
    // </Link>
  );
};
export default TaskCard;
