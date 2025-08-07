import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function ProjectCreation(p) {
  const { userInfo } = useContext(ITopContext);

  const components = [
    {
      label: "Project Name",
      id: "ProjectName",
      type: "text",
      placeholder: "add Project Name",
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
  const [headerValues, setheaderValues] = useState([]);
  const OnchangeHandler = async (e) => {
    const { value, id, name } = e.target;
    setheaderValues((e) => ({ ...e, [id]: value }));
  };
  // >>>>> Object Handlers

  // >>>>> ADD PROJECT TO DB
  const [InsertProjectReturn, setInsertProjectReturn] = useState([]);
  const [addLoading, setaddLoading] = useState(false);
  const InsertProject = async () => {
    setaddLoading(true);

    let isAllow = false;
    setInvalids([]);
    isAllow = invalidsChecker(headerValues.ProjectName, "ProjectName");
    isAllow = invalidsChecker(headerValues.Status, "Status");
    isAllow = invalidsChecker(headerValues.Assignee, "Assignee");
    isAllow = invalidsChecker(headerValues.Status, "Status");
    isAllow = invalidsChecker(headerValues.Start, "Start");
    isAllow = invalidsChecker(headerValues.Due, "Due");
    isAllow = invalidsChecker(headerValues.Priority, "Priority");
    isAllow = invalidsChecker(headerValues.Tags, "Tags");
    isAllow = invalidsChecker(headerValues.Summary, "Summary");
    if (isAllow) return;
    await EXEC_SQL_InsertOne(
      861,
      setInsertProjectReturn,
      headerValues.ProjectName,
      userInfo.ID,
      headerValues.Assignee,
      headerValues.Status,
      headerValues.Start,
      headerValues.Due,
      headerValues.Priority,
      headerValues.Tags,
      headerValues.Summary,
      headerValues.Start
    );

    setaddLoading(false);
    p.setCreateProject(false);
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

  useEffect(() => {}, [InsertProjectReturn]);

  // >>>>> END  ADD PROJECT TO DB

  return (
    <>
      <div className=" bg-white w-full h-full p-2">
        <br></br>
        <br></br>
        <div className="  bg-white max-w-[40rem] p-2 rounded-md  pb-10">
          <h1 className="font-sans  font-bold text-black">Project</h1>
          {components.map((item, index) => (
            <>
              <DefInput
                label={item.id}
                id={item.id}
                placeholder={item.placeholder}
                type={item.type}
                dropDownId={item.dropDownId}
                handler={OnchangeHandler}
                className="border-0"
                errorMsg={invalids[item.id]}
              />
            </>
          ))}
          <div className="flex justify-between mt-2">
            <DefButton
              type="10"
              text="Cancel"
              className=" "
              onClick={() => {
                p.setCreateProject(false);
              }}
            />
            <DefButton
              type="10"
              text="Add"
              className=""
              onClick={InsertProject}
            />
          </div>
        </div>
      </div>
    </>
  );
}
