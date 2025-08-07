import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function TaskCreate(p) {
  const { userInfo } = useContext(ITopContext);

  const components = [
    {
      label: "Task Name",
      id: "TaskName",
      type: "text",
      placeholder: "add Task Name",
      disable: false,
      css: "",
    },
    {
      label: "Assignee",
      id: "Assignee",
      type: "text",
      placeholder: "Select assignee",
      dropDownId: 860,
      disable: false,
      css: "",
    },

    {
      label: "Status",
      id: "Status",
      type: "text",
      placeholder: "Select Status",
      dropDownId: 859,
      disable: false,
      css: "",
    },
    {
      label: "Start",
      id: "Start",
      type: "Date",
      placeholder: "Select Start",
      dropDownId: undefined,
      disable: false,
      css: "",
    },
    {
      label: "Due",
      id: "Due",
      type: "Date",
      placeholder: "Select Due",
      dropDownId: undefined,
      disable: false,
      css: "",
    },
    {
      label: "Priority",
      id: "Priority",
      type: "text",
      placeholder: "Select Priority",
      dropDownId: 858,
      disable: false,
      css: "",
    },
    {
      label: "Project",
      id: "Project",
      type: "text",
      placeholder: "Select Project",
      dropDownId: 99999,
      disable: false,
      css: "",
    },
    {
      label: "Tags",
      id: "Tags",
      type: "text",
      placeholder: "Select Tags",
      dropDownId: undefined,
      disable: false,
      css: "",
    },
    {
      label: "Summary",
      id: "Summary",
      type: "text",
      placeholder: "add Summary",
      dropDownId: undefined,
      disable: false,
      css: "",
    },
  ];
  // >>>>> Object Handlers
  const [projectName, setprojectName] = useState([]);
  const [headerValues, setheaderValues] = useState([]);
  const OnchangeHandler = async (e) => {
    const { value, id, name } = e.target;
    setInvalids((e) => ({ ...e, [id]: "" }));

    setheaderValues((e) => ({ ...e, [id]: value }));
    console.log({ value, id });
  };
  // >>>>> Object Handlers

  // >>>>> ADD Task TO DB
  const [InsertTaskReturn, setInsertTaskReturn] = useState([{ ID: 0 }]);
  const [addLoading, setaddLoading] = useState(false);
  const InsertTask = async () => {
    let isAllow = false;
    setInvalids([]);
    isAllow = invalidsChecker(headerValues.Project, "Project");
    isAllow = invalidsChecker(headerValues.TaskName, "TaskName");
    isAllow = invalidsChecker(headerValues.Assignee, "Assignee");
    isAllow = invalidsChecker(headerValues.Status, "Status");
    isAllow = invalidsChecker(headerValues.Start, "Start");
    isAllow = invalidsChecker(headerValues.Due, "Due");
    isAllow = invalidsChecker(headerValues.Priority, "Priority");
    isAllow = invalidsChecker(headerValues.Tags, "Tags");
    isAllow = invalidsChecker(headerValues.Project, "Project");
    isAllow = invalidsChecker(headerValues.Summary, "Summary");
    if (isAllow) return;
    setaddLoading(true);
    await EXEC_SQL_InsertOne(
      856,
      setInsertTaskReturn,
      headerValues.Project,
      userInfo.ID,
      headerValues.TaskName,
      headerValues.Assignee,
      headerValues.Status,
      headerValues.Due,
      headerValues.Priority,
      headerValues.Tags,
      headerValues.Project,
      headerValues.Summary,
      "",
      headerValues.Start
    );
    setaddLoading(false);
    setheaderValues((e) => ({ ...e, TaskName: "", Summary: "" }));
    alert("Document Added");
    setheaderValues((e) => ({ ...e, TaskName: "", Summary: "" }));
  };
  const [invalids, setInvalids] = useState([]);
  const invalidsChecker = (obj, lbl) => {
    if (obj == "" || obj == undefined) {
      setInvalids((e) => ({ ...e, [lbl]: "invalid" }));
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (InsertTaskReturn[0].ID == -1) {
      alert("Something went wrong / check your task name");
      return;
    } else if (InsertTaskReturn[0].ID > 0) {
      p.setCreateTask(false);
    }
  }, [InsertTaskReturn]);
  const getProj = async () => {
    await EXEC_SQL(855, setprojectName, userInfo.ID);
  };
  useEffect(() => {
    getProj();
  }, []);

  return (
    <div>
      <div className=" bg-white w-full h-full p-2  ">
        <br></br>
        <br></br>
        <div className=" bg-white max-w-[40rem] p-2 rounded-md  pb-10">
          <h1 className="font-sans  font-bold text-black">Task</h1>
          {components.map((item, index) => (
            <>
              <DefInput
                label={item.id}
                id={item.id}
                placeholder={item.placeholder}
                type={item.type}
                dropDownId={item.dropDownId}
                handler={OnchangeHandler}
                map={item.id == "Project" ? projectName : undefined}
                className="border-0"
                errorMsg={invalids[item.id]}
              />
            </>
          ))}
          <div className="flex justify-between mt-10">
            <DefButton
              type="10"
              text="Cancel"
              className=" "
              onClick={() => {
                p.setCreateTask(false);
              }}
            />
            <DefButton
              type="10"
              text="Add"
              className=""
              onClick={InsertTask}
              loading={addLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
