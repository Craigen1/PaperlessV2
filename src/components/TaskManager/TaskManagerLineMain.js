import React from "react";
import TaskManagerLine from "./TaskManagerLine";

export default function TaskManagerLineMain() {
  const tasks = [
    {
      sectionID: 0,
      SectionName: "RIRS - ITR - IT",
    },
  ];
  return (
    <div className=" overflow-auto">
      {/* Header */}
      <div className=" overflow-auto text-trans50">
        <div className=" flex head w-full text-sm overflow-auto Border-top  Border-bottom ">
          <div className=" pl-1.5 py-1   Border-right w-96 ">Task name</div>
          <div className=" pl-1.5 py-1 Border-right   w-28">Assignee</div>
          <div className=" pl-1.5 py-1 Border-right   w-28">Date Start</div>
          <div className=" pl-1.5 py-1 Border-right   w-28">Date Duration</div>
          <div className=" pl-1.5 py-1 Border-right   w-28">MoM</div>
          <div className=" pl-1.5 py-1   w-28">Remarks</div>
        </div>
      </div>
      {tasks.map((item, index) => (
        <>
          <TaskManagerLine
            sectionID={item.sectionID}
            SectionName={item.SectionName}
          />
        </>
      ))}
    </div>
  );
}
