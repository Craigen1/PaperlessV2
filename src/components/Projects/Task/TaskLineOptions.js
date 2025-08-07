import React, { useContext, useEffect, useState } from "react";
import {
  EXEC_INSERT,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function TaskLineOptions(p) {
  const [SubOptionVisibilityID, setSubOptionVisibilityID] = useState(-1);
  const { userInfo, TaskTab, setTaskTab } = useContext(ITopContext);

  const MainOptionHandler = (e) => {
    const { id, name, value } = e.target;
    console.log({ id, name, value });
    setSubOptionVisibilityID(id);
    p.setselectedOption(id);
    if (id == "0") duplicateFunction(p.selectedID);
    if (id == "0") p.setOptionVisiblitry(false);
    if (id == "1") p.setOptionVisiblitry(false);
  };
  const [duplicateReturn, setduplicateReturn] = useState([]);
  const [duplicateReturn2, setduplicateReturn2] = useState([]);
  const duplicateFunction = async (id) => {
    await EXEC_SQL_InsertOne(851, p.setrows, id, userInfo.ID, p.project);
  };
  // useEffect(() => {
  //   // console.log(duplicateReturn2);
  // }, [duplicateReturn2]);

  const [updateReturnValue, setupdateReturnValue] = useState([]);
  const HandleTaskUpdateOption = async (e) => {
    const { value, id, name, tag } = e.target;
    console.log(p);

    await EXEC_SQL_InsertOne(
      852,
      setupdateReturnValue,
      value,
      id,
      p.selectedID,
      p.rows[p.selectedIndex].type
    );
    setSubOptionVisibilityID(0);

    p.setOptionVisiblitry(false);

    let xxx = "";

    if (id == "status" && value == 1) xxx = "Pending";
    if (id == "status" && value == 2) xxx = "In Progress";
    if (id == "status" && value == 3) xxx = "Done";
    if (id == "status" && value == 4) xxx = "Archived";

    if (id == "priority" && value == 1) xxx = "Low";
    if (id == "priority" && value == 2) xxx = "Medium";
    if (id == "priority" && value == 3) xxx = "High";

    const newROws = p.rows.map((item, index) => {
      if (item.id == p.selectedID) {
        if (id == "status")
          return {
            ...item,
            Status: xxx,
          };
        if (id == "priority")
          return {
            ...item,
            Priority: xxx,
          };
      } else return item;
    });

    p.setrows(newROws);
  };

  // useEffect(() => {
  // useEffect(() => {
  // useEffect(() => {
  //   const handleClickOutsideIn = (event) => {
  //     if (event.target.name == "MainOption") return;
  //     setSubOptionVisibilityID(0);
  //   };

  //   const handleClickOutsideOut = (event) => {
  //     if (event.target.name == "MainOption") return;
  //     setSubOptionVisibilityID(0);
  //   };

  //   document.addEventListener("mouseover", handleClickOutsideIn, true);
  //   document.addEventListener("mouseout", handleClickOutsideOut, true);
  //   return () => {
  //     document.removeEventListener("mouseover", handleClickOutsideIn, true);
  //     document.removeEventListener("mouseout", handleClickOutsideOut, true);
  //   };
  // }, []);

  return (
    <div>
      <div className="w- border m-2  p-2 bg-white shadow-sm">
        {p.options.map((item, index) => (
          <>
            {item.name == "separator" ? (
              <div className="border-b border-trans20"></div>
            ) : (
              <button
                className=" flex items-center hover:bg-trans20 w-full "
                onClick={MainOptionHandler}
                id={index}
                name="MainOption"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            )}

            {/* {index == SubOptionVisibilityID && ( */}
            <>
              <div className="  bg-white   ">
                {item.map != undefined && (
                  <>
                    {item.map.map((itemChild, index) => (
                      <div className="">
                        <button
                          onClick={HandleTaskUpdateOption}
                          name="MainOption"
                          value={itemChild.id}
                          id={item.name}
                          tag={itemChild.name}
                          className=" text-left ml-2 hover:bg-trans20 px-2 py-0.5  w-full my-0.5 "
                        >
                          {itemChild.name}
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
            {/* )} */}
          </>
        ))}
      </div>
    </div>
  );
}
