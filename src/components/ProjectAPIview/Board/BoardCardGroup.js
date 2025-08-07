import React, { useEffect, useState } from "react";
import BoardCard from "./BoardCard";
import { EXEC_SQL_InsertOne } from "../../ComponentList";
import BoardCards from "./BoardCards";

export default function BoardCardGroup(p) {
  const [rows, setrows] = useState([]);
  const getTask = async () => {
    await EXEC_SQL_InsertOne(854, setrows, p.userid, p.status);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <div
        className={
          p.status == "1"
            ? "bg-[#64646413] w-[18rem] round-md p-2 gap-2 mx-2"
            : p.status == "2"
            ? "bg-[#77b6e613] w-[18rem] round-md p-2 gap-2 mx-2"
            : p.status == "3"
            ? "bg-[#4be69813] w-[18rem] round-md p-2 gap-2 mx-2"
            : ""
        }
      >
        <div
          className={
            p.status == "1"
              ? "bg-[#6464648f] flex  items-center gap-2 w-fit px-2 rounded-xl font-semibold "
              : p.status == "2"
              ? "bg-[#77b6e68f] flex  items-center gap-2 w-fit px-2 rounded-xl font-semibold "
              : p.status == "3"
              ? "bg-[#4be6988f] flex  items-center gap-2 w-fit px-2 rounded-xl font-semibold "
              : ""
          }
        >
          <div
            className={
              p.status == "1"
                ? "w-3 h-3 bg-[#646464] rounded-full "
                : p.status == "2"
                ? "w-3 h-3 bg-[#77b6e6] rounded-full "
                : p.status == "3"
                ? "w-3 h-3 bg-[#4be698] rounded-full "
                : ""
            }
          ></div>
          <div>{p.header}</div>
          <div>{rows.length}</div>
        </div>
        <div className="">
          {rows.map((item, index) => (
            <BoardCards
              item={item}
              setBoardCards={p.setBoardCards}
              setShowOptions={p.setShowOptions}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
