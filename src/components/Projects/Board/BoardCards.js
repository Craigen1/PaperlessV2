import {
  AnnotationIcon,
  DotsHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";

export default function BoardCards(p) {
  const [isHiden, SetisHiden] = useState(false);

  const moreOption = (e) => {
    p.setShowOptions(true);
    p.setBoardCards({
      X: e.clientX,
      Y: e.clientY,
    });
  };

  const Hover = (e) => {
    // console.log(e.type);

    if (e.type == "mouseenter") SetisHiden(true);
    if (e.type == "mouseleave") SetisHiden(false);
  };

  return (
    <div
      onMouseEnter={Hover}
      onMouseLeave={Hover}
      className="bg-white rounded-sm p-2 shadow-sm my-2 text-sm "
    >
      <div className="pl-2 py-2 font-semibold flex items-center relative">
        <AnnotationIcon className="min-w-[1rem] max-w-[1rem]  text-gray-410 mt-1 mr-1" />
        <p className="p-0 m-0">{p.item.TaskName}</p>

        {isHiden && (
          <div className="absolute right-0 top-0 rounded-sm bg-white shadow-sm   flex">
            <button onClick={moreOption} className="border p-1 px-[0.3rem]">
              <PencilIcon className="w-5" />
            </button>
            <button onClick={moreOption} className="border p-1 px-[0.3rem]">
              <DotsHorizontalIcon className="w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="pl-2 text-sm ml-2 py-2">Deanmark Famoleras</div>
      <div className="pl-2 text-[#000000be]">
        {p.item.DueDate}
        <span
          className={
            p.item.Priority == "1"
              ? "px-2 text-[#000000be] bg-[#65e7615b] w-fit float-right"
              : p.item.Priority == "2"
              ? "px-2 text-[#000000be] bg-[#dce7615b] w-fit float-right"
              : p.item.Priority == "3"
              ? "px-2 text-[#000000be] bg-[#e7b6615b] w-fit float-right"
              : ""
          }
        >
          {p.item.PriorityName}
        </span>
      </div>
    </div>
  );
}
