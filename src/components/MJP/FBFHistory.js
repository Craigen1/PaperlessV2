import React, { useState, useEffect } from "react";
import { EXEC_SQL } from "../ComponentList";
import { Fragment } from "react";

export default function FBFHistory() {
  const [HandleReturn, setHandleReturn] = useState([]);

  useEffect(() => {
    EXEC_SQL(918, setHandleReturn);
  }, []);

  return (
    <div className="bg-[#FFFFFF] px-3 py-2">
      <h2 className="text-2xl text-[#8D4DD0] font-bold uppercase grid place-items-center w-full">
        History
      </h2>
      <div>
        {HandleReturn.map((item) => (
          <Fragment key={item.id}>
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="my-1">
                <span className="font-bold">Your concern: </span>
                {item.title}
              </div>
              <div className="my-1">
                <span className="font-bold">Rate: </span>
                {item.Rating}
              </div>
              <div className="my-1">
                <span className="font-bold">Feedback: </span>
                {item.FeedBack}
              </div>
              <div className="my-1">
                <span className="font-bold">Date created: </span>
                {item.createdDate}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
