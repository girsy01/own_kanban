import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ tasks, colStatus }) => {
  const { setNodeRef } = useDroppable({
    id: colStatus,
  });

  return (
    <div className="col" ref={setNodeRef}>
      <h2>{colStatus}</h2>
      {tasks.length &&
        tasks
          .filter((task) => task.status === colStatus)
          .map((task) => <TaskCard task={task} key={task.id} />)}
    </div>
  );
};
export default Column;
