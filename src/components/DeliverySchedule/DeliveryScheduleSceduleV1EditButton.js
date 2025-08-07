import React, { useState } from "react";
import { DefButton } from "../ComponentList";
import { ClockIcon, XCircleIcon } from "@heroicons/react/outline";

export default function DeliveryScheduleSceduleV1EditButton() {
  const [on, setOn] = useState(true);
  return (
    <>
      {on ? (
        <>
          <div className=" abs">
            <div className="w-full bg-red-500"> </div>
            <div className=" bg-WhiteMode-FromBackground000       w-fit p-1 float-right ">
              <button
                onClick={() => {}}
                className="bg-WhiteMode-Background000 rounded-md px-2 pb-0.1"
              >
                <div className=" flex gap-x-1 h-5  w-fit">
                  <ClockIcon className="h-4 mt-1 " />
                  <p className="font-semibold px-0 mx-0 whitespace-nowrap">
                    Reschedule booking
                  </p>
                </div>
              </button>
              <br></br>
              <button
                onClick={() => {}}
                className="bg-WhiteMode-Background000 rounded-md px-2 pb-0.1"
              >
                <div className=" flex gap-x-1 h-5  w-fit">
                  <XCircleIcon className="h-4 mt-1 " />
                  <p className="font-semibold px-0 mx-0" whitespace-nowrap>
                    Cancel Booking
                  </p>
                </div>
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* <DefButton
        text="Edit"
        onClick={() => setOn(!on)}
        className=" h-10 float-right w-fit px-4 mt-3"
        type="2"
      /> */}
    </>
  );
}
