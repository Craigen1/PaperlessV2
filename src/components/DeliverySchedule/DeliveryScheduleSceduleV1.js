import {
  DeviceTabletIcon,
  ClipboardListIcon,
  ThumbUpIcon,
  ScaleIcon,
  PrinterIcon,
  DocumentTextIcon,
  UserIcon,
  UserCircleIcon,
  ArrowNarrowRightIcon,
  NewspaperIcon,
  QrcodeIcon,
  CubeTransparentIcon,
  UserGroupIcon,
  XCircleIcon,
  ExclamationIcon,
  CheckCircleIcon,
  ChipIcon,
  ReceiptRefundIcon,
  ClipboardCheckIcon,
  ClockIcon,
  MapIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { DefButton } from "../ComponentList";
import DeliveryScheduleSceduleV1EditButton from "./DeliveryScheduleSceduleV1EditButton";

export default function DeliveryScheduleSceduleV1(p) {
  const first = useRef(null);
  const [getHight, setGetHight] = useState(0);

  const [fixedW, setfixedW] = useState();
  useEffect(() => {
    if (first.current) setfixedW(first.current.offsetWidth);
  }, [first]);

  useEffect(() => {
    setGetHight(window.innerHeight - 120);
  }, [window.innerHeight]);

  const LineComponent = (e) => {
    return (
      <>
        <div className=" " ref={first}>
          <p
            className="font-semibold text-2xl "
            style={{
              width: `${fixedW}px`,
            }}
          >
            {e.Month === "null" ? "" : e.Month}
          </p>
          <div
            className={
              e.batchDef != 0
                ? "flex gap-x-5 w-full bg-WhiteMode-error rounded-md"
                : "flex gap-x-5 w-full  rounded-md"
            }
          >
            <div className="text-center w-fit  pl-2 pr-5  m-0  border-r-2  border-WhiteMode-Background000">
              <div className="text-lg -mb-2 font-semibold  p-0 -m-0">
                {e.weekOfDay}
              </div>
              <div className="text-4xl font-bold p-0 -m-0">{e.day}</div>
            </div>
            <div className="w-fit mt-1.5">
              <div className="w-fit flex  gap-x-2  h-7 ">
                <ClockIcon className="text-black text-2xl w-4 h-4 mt-1" />
                <p className="font-semibold ">{e.time}</p>
              </div>

              <div className="w-fit flex  gap-x-2 h-7">
                <MapIcon className="text-black text-2xl w-4 h-4 mt-1" />
                <p className="font-semibold  ">Consignment</p>
              </div>
              {/* time holder */}
            </div>

            <div className="w-fit mt-1.5">
              <div className="w-fit flex  gap-x-2  h-7 ">
                <p className="font-semibold ">{e.cardcode}</p>
              </div>

              <div className="w-fit flex  gap-x-2 h-7 ">
                <p className="font-semibold  whitespace-nowrap">{e.CardName}</p>
              </div>
              {/* time holder */}
            </div>
            {e.batchDef != 0 ? (
              <>
                <div className="w-fit flex  gap-x-2 h-7 mt-2.5 text-github_BorderColorError">
                  <InformationCircleIcon className="t text-2xl w-4 h-4 mt-1 text-github_BorderColorError" />
                  <p className="font-semibold   whitespace-nowrap text-github_BorderColorError">
                    Error on Batch Quantity
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="w-full"></div>
            <DeliveryScheduleSceduleV1EditButton />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div
        className="frame py-2 "
        // style={{
        //   height: getHight + "px",
        //   maxHeight: getHight + "px",
        // }}
      >
        {p.Upcomings.map((item, i) => (
          <>
            <LineComponent
              Month={item.Month}
              time={item.time}
              cardcode={item.cardcode}
              CardName={item.CardName}
              day={item.day}
              weekOfDay={item.weekOfDay}
              batchDef={item.batchDef}
            />
          </>
        ))}
      </div>
    </>
  );
}
