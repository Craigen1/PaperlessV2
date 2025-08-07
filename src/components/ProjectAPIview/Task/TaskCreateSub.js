import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function TaskCreateSub(p) {
  const { userInfo } = useContext(ITopContext);

  const components = [
    {
      label: "SubTask Name",
      id: "SubTaskName",
      type: "text",
      placeholder: "add SubTask Name",
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
      disable: true,
      css: "",
    },
    {
      label: "Task",
      id: "Task",
      type: "text",
      placeholder: "Select Task",
      disable: true,
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

  const [invalids, setInvalids] = useState([]);
  const [values, setvalues] = useState([]);

  const OnchangeHandler = async (e) => {
    const { value, id, name } = e.target;
    setInvalids((e) => ({ ...e, [id]: "" }));
    setvalues((e) => ({ ...e, [id]: value }));
    console.log({ value, id });
  };

  const invalidsChecker = (obj, lbl, isAllow) => {
    if (isAllow === false) return false;
    if (obj == "" || obj == undefined) {
      setInvalids((e) => ({ ...e, [lbl]: "invalid" }));
      return true;
    } else {
      return false;
    }
  };
  const [sqlLoading, setsqlLoading] = useState(false);
  const [InsertTaskReturn, setInsertTaskReturn] = useState([]);

  const addSubTask = async (e) => {
    let isAllow = false;
    console.log(values);
    components.map((item) => {
      isAllow = invalidsChecker(values[item.id], item.id, isAllow);
    });

    console.log({ values });
    if (isAllow) return;
    setsqlLoading(true);
    if (isAllow === false) {
      await EXEC_SQL_InsertOne(
        848,
        p.setrows,
        p.selectedID,
        userInfo.ID,
        values.SubTaskName,
        values.Assignee,
        values.Status,
        values.Due,
        values.Priority,
        values.Tags,
        values.Summary,
        values.Start
      );
      setsqlLoading(false);
      setvalues([]);
      alert("Document Added!");
    }
  };

  useEffect(() => {
    if (p.selectedRow == undefined) return;
    setvalues({
      Task: p.selectedRow.Task,
      Project: p.selectedRow.Project,
    });
  }, [p.selectedRow]);

  return (
    <div>
      <h1 className="font-sans  font-bold text-black">
        {values.Task} Sub Task
      </h1>
      <div className="">
        <div className="w-[512px]">
          {components.map((item, index) => (
            <>
              <DefInput
                label={item.id}
                id={item.id}
                placeholder={item.placeholder}
                type={item.type}
                dropDownId={item.dropDownId}
                handler={OnchangeHandler}
                // map={item.id == "Project" ? projectName : undefined}
                className="border-0"
                errorMsg={invalids[item.id]}
                value={values[item.id]}
                disabled={item.disable}
              />
            </>
          ))}
        </div>
        <div className="justify-evenly ">
          <DefButton type="10" text="Cancel" className=" " />
          <DefButton type="10" text="Add" className=" " onClick={addSubTask} />
        </div>
      </div>
    </div>
  );
}
