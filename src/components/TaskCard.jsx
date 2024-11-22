import { useDraggable } from "@dnd-kit/core";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleClick = (e) => {
    console.log("hi from handleClick");
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <Link to={`/task/${task.id}`} onClick={handleClick}>
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
    </Link>
  );
};
export default TaskCard;
