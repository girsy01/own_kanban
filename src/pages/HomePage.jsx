import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import { useEffect } from "react";

const HomePage = ({ tasks, setTasks }) => {
  function handleDrop(event) {
    const { active, over } = event;

    if (!active || !over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task };
        updatedTask.status = newStatus;
        return updatedTask;
      }
      return task;
    });
    // console.log(updatedTasks);
    setTasks(updatedTasks);
  }

  return (
    <DndContext onDragEnd={handleDrop}>
      <div id="HomePage">
        <Column tasks={tasks} colStatus="To Do" />
        <Column tasks={tasks} colStatus="In Progress" />
        <Column tasks={tasks} colStatus="Done" />
      </div>
    </DndContext>
  );
};
export default HomePage;
