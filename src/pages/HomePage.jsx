import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import { useContext, useEffect } from "react";
import { TasksContext } from "../context/tasks.context";

const HomePage = () => {
  const { tasks, handleDropTask } = useContext(TasksContext);

  return (
    <DndContext onDragEnd={handleDropTask}>
      <div id="HomePage">
        <Column tasks={tasks} colStatus="To Do" />
        <Column tasks={tasks} colStatus="In Progress" />
        <Column tasks={tasks} colStatus="Done" />
      </div>
    </DndContext>
  );
};
export default HomePage;
