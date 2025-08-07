import React, { useContext, useState } from "react";
import { DefMenus } from "../ComponentList";
import ProjectListMain from "./Project/ProjectListMain";
import TaskMain from "./Task/TaskMain";
import BoardMain from "./Board/BoardMain";
import { ITopContext } from "../../hooks/TopContext";
import TimeLineMain from "./Task/TimeLine/TimeLineMain";

export default function ProjectsMain() {
  const { TaskTab, setTaskTab } = useContext(ITopContext);

  const menus = [
    {
      id: 0,
      text: "Projects",
    },
    {
      id: 1,
      text: "Task",
    },
    {
      id: 3,
      text: "TimeLine",
    },
  ];
  return (
    <div className="bg-white ">
      {/* <div className="frame">
        <p className="p-0 m-0">
          💡Tip: Welcome to your project tracker, where you can manage projects
          and tasks for your entire team! This page contains two connected
          databases
        </p>
        <p className="p-0 m-0 pr-2">
          <span className="ml-8 font-bold">[Projects]</span> This is your
          overview of all the projects in the pipeline. Each project is full of
          details, such as timelines, assigned team members, status updates,
          summary
        </p>
        <p className="p-0 m-0 pr-2">
          <span className="ml-8 font-bold"> [Tasks] </span>This is where you can
          create tasks per project.
        </p>

        <p className="p-0 m-0 pr-2">
          <span className="ml-8 font-bold"> [TimeLine] </span>This is your task
          via timeline
        </p>
      </div> */}
      <div>
        <DefMenus
          menus={menus}
          SelectedMenuId={TaskTab}
          setSelectedMenuId={setTaskTab}
        />
      </div>
      {TaskTab == 0 && <ProjectListMain />}
      {TaskTab == 1 && <TaskMain />}
      {TaskTab == 2 && <BoardMain />}
      {TaskTab == 3 && <TimeLineMain />}
    </div>
  );
}
