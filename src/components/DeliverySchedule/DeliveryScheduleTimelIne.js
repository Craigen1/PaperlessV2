import React, { useEffect, useState } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";

export default function DeliveryScheduleTimelIne() {
  const [MonthsMaps, setMonthsMaps] = useState([]);
  //   function getDaysInMonth(month, year) {
  //     var date = new Date(year, month, 1);
  //     var days = [];
  //     let x = 0;
  //     setMonthsMaps([]);
  //     while (date.getMonth() === month) {
  //       days.push(new Date(date));
  //       date.setDate(date.getDate() + 1);
  //       x += 1;
  //       setMonthsMaps((e) => [...e, { day: 1 }]);
  //     }
  //     return days;
  //   }

  const getEXEC = async () => {
    await EXEC_SQL_InsertOne(925, setMonthsMaps, "8", "2023");
  };
  useEffect(() => {
    getEXEC();
  }, []);

  return (
    <>
      <div className="frame">
        <DefButton onClick={getEXEC} />
      </div>
      <div className="flex  frame">
        <div
          style={{
            minWidth: "80px",
            maxWidth: "80px",
          }}
          className="my-1 mr-1.5 rounded-sm  h-7 text-xl font-semibold bg-WhiteMode-ButtonBackground000 text-CakeFactory-Button100 text-center "
        >
          August
        </div>
        <div className=" flex overflow-auto gap-1">
          {MonthsMaps.map((item, index) => (
            <>
              <div
                style={{
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
                className="my-1 rounded-sm  h-7 text-xl font-semibold bg-WhiteMode-ButtonBackground000 text-CakeFactory-Button100 text-center "
              >
                {item.day}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
