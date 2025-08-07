import { TicketIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";

export default function Steps(prop) {
  return (
    <>
      <div className="frame max-w-2xl  mx-auto p-2 ">
        <div className="flex">
          <prop.steps.Icon className="h-5 w-5 mr-2 mt-1 " />
          <p className="p-0 m-0 font-bold">{prop.steps.title}</p>
        </div>
        {prop.steps.steps.map((item, index) => (
          <>
            <div className="ml-7">
              <div className="p-0 m-0  flex">
                <div className="whitespace-nowrap mr-2">
                  {item.apex} {index + 1}:
                </div>
                <div>
                  <span>{item.stepTitle}</span>
                  <p>{item.stepMsg}</p>
                </div>
              </div>
            </div>
            {item.img == undefined ? (
              ""
            ) : (
              <div className="center  overflow-hidden">
                <iframe
                  src={item.img}
                  className="h-80"
                  style={{
                    width: "42rem",
                  }}
                ></iframe>
              </div>
            )}
          </>
        ))}

        <p className="mx-4 p-0 m-0">{prop.steps.msg}</p>
      </div>
    </>
  );
}
