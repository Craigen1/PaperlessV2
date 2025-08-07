import React, { useState } from "react";
import { DefButton } from "../ComponentList";

export default function KnowledgeBaseTopicFilter(p) {
  const [topicList, settopicList] = useState([
    {
      label: "WorldPress",
      count: "10",
      id: "1",
    },
    {
      label: "Amazon",
      count: "10",
      id: "1",
    },

    {
      label: "How To Speak",
      count: "10",
      id: "1",
    },
    {
      label: "How To Connect",
      count: "10",
      id: "1",
    },
  ]);
  return (
    <>
      <div
        className={
          p.screenSize
            ? "frame fixed max-w-[13rem] min-w-[13rem] h-[100vh]"
            : ""
        }
      >
        <span className="font-bold text-2xl ">Topic </span>

        {/* List of Topics */}
        <div
          className={
            p.screenSize ? "grid mb-2 gap-1 mt-2 ml-2" : " mb-2 gap-2  ml-2"
          }
        >
          {topicList.map((item, index) => (
            <>
              <DefButton
                text={`${item.label}(${item.count})`}
                id={item.id}
                type="4"
                className="w-fit mx-2 hover:bg-trans20 px-2 "
              />
            </>
          ))}
        </div>
      </div>
      {p.screenSize && (
        <div className="frame  max-w-[13rem] min-w-[13rem]"></div>
      )}
    </>
  );
}
