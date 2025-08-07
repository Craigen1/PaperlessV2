import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import { DefButton, DefTableV2, EXEC_SQL_InsertOne } from "../../ComponentList";
import {
  ArrowSmRightIcon,
  CalendarIcon,
  DuplicateIcon,
  FlagIcon,
  IdentificationIcon,
  PencilAltIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import TaskLineOptions from "./TaskLineOptions";
import TaskCreateSub from "./TaskCreateSub";
import { useSearchParams } from "react-router-dom";

export default function TaskLine(p) {
  const { userInfo, TaskTab, setTaskTab } = useContext(ITopContext);
  const [rows, setrows] = useState([]);
  const [search, setsearch] = useSearchParams();

  const columns = [
    {
      name: "",
      label: "...",
      id: "",
      width: "30px",
      editable: "false",
    },
    {
      name: "Task",
      label: "Task",
      id: "Task",
      width: "180px",
      icon: PencilAltIcon,
      editable: "true",
    },
    {
      name: "id",
      label: "id",
      id: "id",
      width: "50px",
      editable: "true",
    },

    {
      name: "Status",
      label: "Status",
      id: "Status",
      width: "120px",
      editable: "false",
      icon: SparklesIcon,
    },
    {
      name: "Assignee",
      label: "Assignee",
      id: "Assignee",
      width: "180px",
      editable: "false",
      icon: IdentificationIcon,
    },
    {
      name: "createdDate",
      label: "Start",
      id: "createdDate",
      width: "100px",
      editable: "false",
      type: "date",
      icon: CalendarIcon,
    },
    {
      name: "DueRaw",
      label: "Due",
      id: "DueRaw",
      width: "100px",
      editable: "false",
      type: "date",
      icon: CalendarIcon,
    },
    // {
    //   name: "Project",
    //   label: "Project",
    //   id: "Project",
    //   width: "100px",
    //   editable: "false",
    //   icon: FlagIcon,
    // },
    {
      name: "Priority",
      label: "Priority",
      id: "Priority",
      width: "80px",
      editable: "false",
      icon: PencilAltIcon,
    },
    {
      name: "Tags",
      label: "Tags",
      id: "Tags",
      width: "80px",
      editable: "true",
      icon: PencilAltIcon,
    },
    {
      name: "Summary",
      label: "Summary",
      id: "Summary",
      width: "100%",
      editable: "true",
      icon: PencilAltIcon,
    },
  ];
  const [getTaskLoad, setgetTaskLoad] = useState(true);
  const getTask = async () => {
    setgetTaskLoad(true);
    await EXEC_SQL_InsertOne(853, setrows, search.get("id"), p.project);

    setgetTaskLoad(false);
  };

  function customCss(rows, index) {
    let css = "";
    if (index == 2 + 1 && rows == "Done")
      return "my-2 bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 2 + 1 && rows == "Pending")
      return "my-2 bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 2 + 1 && rows == "In Progress")
      return "my-2 bg-[#96abff] w-fit px-1.5 py-0  rounded-lg text-[#2c3c7b]";

    if (index == 6 + 1 && rows == "Medium")
      return "my-2 bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 6 + 1 && rows == "Low")
      return "my-2 bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 6 + 1 && rows == "High")
      return "my-2 bg-[#ff9696] w-fit px-1.5 py-0  rounded-lg text-[#7b2c2c]";
  }
  const options = [
    {
      name: "duplicate",
      editable: "false",
      icon: DuplicateIcon,
      label: "Duplicate",
    },
    {
      name: "SubTask",
      editable: "false",
      icon: ArrowSmRightIcon,
      label: "Add Sub-Task",
    },
    {
      name: "separator",
    },
    {
      name: "status",
      editable: "false",
      icon: PencilAltIcon,
      label: "Edit Status",
      map: [
        {
          name: "Pending",
          id: "1",
        },
        {
          name: "In progress",
          id: "2",
        },
        {
          name: "Done",
          id: "3",
        },
        {
          name: "Archived",
          id: "4",
        },
      ],
    },
    {
      name: "separator",
    },
    {
      name: "priority",
      editable: "false",
      icon: PencilAltIcon,
      label: "Edit Priority",
      map: [
        {
          name: "Low",
          id: "1",
        },
        {
          name: "Medium",
          id: "2",
        },
        {
          name: "High",
          id: "3",
        },
      ],
    },
    // // {
    // //   name: "Edit Property",
    // editable:false,//
    // icon: TerminalIcon,
    // //   label: "Edit property",
    // // },
  ];
  const [OptionVisiblitry, setOptionVisiblitry] = useState(false);
  const [position, setposition] = useState({
    left: 0,
    top: 0,
  });
  const [selectedID, setselectedID] = useState(-10);
  const [selectedIndex, setselectedIndex] = useState(-10);
  const [selectedOption, setselectedOption] = useState(-1);
  const OptionHandler = (e) => {
    const { id, name, value, lang } = e.target;
    console.log({ id, name, value, lang });
    setOptionVisiblitry(true);
    setposition({
      left: e.clientX,
      top: e.clientY,
    });
    setselectedID(parseInt(id));
    setselectedIndex(parseInt(lang));
  };

  useEffect(() => {
    console.log(p);
  }, []);

  useEffect(() => {
    console.log(p.item);
    getTask();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.name == "MainOption") return;
      setOptionVisiblitry(false);
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const [countDone, setcountDone] = useState(0);
  const [countAll, setcountAll] = useState(0);

  useEffect(() => {
    if (rows.count > 0) return;
    let count = 0;
    let count2 = 0;
    rows.map((item) => {
      if (item.Status == "Done") count++;
      count2++;
    });
    setcountDone(count);
    setcountAll(count2);
  }, [rows]);

  const onChange = (e) => {
    console.log(e);
  };

  const onKeyDown = async (e) => {
    const { id, lang } = e.target;
    let xx = e.target.textContent;
    xx = "" + xx + "";
    if (e.key != "Enter") return;
    console.log(rows[id]);
    if (rows[id].type == "main") {
      if (lang == "Task")
        await EXEC_SQL_InsertOne(
          850,
          setrows,
          xx,
          rows[id].id,
          search.get("id"),
          p.project
        );
      if (lang == "Summary")
        await EXEC_SQL_InsertOne(
          849,
          setrows,
          xx,
          rows[id].id,
          search.get("id"),
          p.project
        );
    } else if (rows[id].type == "sub") {
      if (lang == "Task")
        await EXEC_SQL_InsertOne(
          847,
          setrows,
          xx,
          rows[id].subid,
          search.get("id"),
          p.project
        );
      if (lang == "Summary")
        await EXEC_SQL_InsertOne(
          846,
          setrows,
          xx,
          rows[id].subid,
          search.get("id"),
          p.project
        );
    }

    // setrows(newRowsx);
  };
  useEffect(() => {
    console.log(selectedOption);
    console.log(selectedIndex);
  }, [selectedOption]);
  const [view, setView] = useState(false);
  return (
    <>
      {/* <p className="text-2xl font-sm font-semibold">Tasks</p> */}
      {selectedIndex > -1 && selectedOption == 1 ? (
        <TaskCreateSub
          selectedRow={rows[selectedIndex]}
          selectedID={selectedID}
          setrows={setrows}
        />
      ) : (
        <div className=" relative ">
          <DefButton
            text={p.projectName}
            type="11"
            className=""
            onClick={() => setView(!view)}
          />
          {view && (
            <DefTableV2
              columns={columns}
              rows={rows}
              customCss={customCss}
              OptionHandler={OptionHandler}
              loading={getTaskLoad}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          )}
          COMPLETED {countDone}/{countAll}
          {OptionVisiblitry && (
            <div
              name="OptionsContainer"
              className="fixed z-50 "
              style={{
                top: position.top,
                left: position.left,
              }}
            >
              <TaskLineOptions
                options={options}
                left={position.left}
                selectedID={selectedID}
                setOptionVisiblitry={setOptionVisiblitry}
                setrows={setrows}
                rows={rows}
                project={p.project}
                item={p.item}
                setselectedOption={setselectedOption}
                selectedIndex={selectedIndex}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
