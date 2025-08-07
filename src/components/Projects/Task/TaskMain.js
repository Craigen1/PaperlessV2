import React, { useState } from "react";
import TaskCreate from "./TaskCreate";
import TaskLine from "./TaskLine";
import { DefButton } from "../../ComponentList";

export default function TaskMain() {
  const [CreateTask, setCreateTask] = useState(false);

  return (
    <div className="mb-96">
      <TaskCreate setCreateTask={setCreateTask} />
    </div>
  );
}
