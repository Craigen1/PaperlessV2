import React from "react";
import { SparklesIcon } from "@heroicons/react/outline";

export default function InventoryCountUsrHelp() {
  const Steps = [
    {
      text: "How to Process Goods Issue?",
    },
    {
      text: "Follow this steps!!",
    },

    {
      text: `• Once te 'STEPS' are loaded Click [START]`,
    },
    {
      text: "• Click [Continue]",
    },
    {
      text: "• Read The Top left corner  labels, as it adds information to the steps",
    },
    {
      text: "• Navigate via [◄] to go Left , [►] to go right at the buttom left corner ",
    },
    {
      text: "• Read/Scan carefuly",
    },
    {
      text: "• Call 141 for more information!!",
    },
  ];
  return (
    <React.Fragment>
      <div className="frame flex ">
        <SparklesIcon className="text-WhiteMode-Font w-6 h-6" />
        <div>
          {Steps.map((item, index) => (
            <React.Fragment key={index}>
              <p className="p-0 m-0 mt-0.5 ml-2">{item.text}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <iframe
          src="https://app.tango.us/app/embed/0dd93d34-232b-40d7-9815-ee50219c3288"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
          security="restricted"
          title="Efficient Workflow for Goods Issue Request - Admin and Support"
          width="100%"
          height="780px"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          allowfullscreen="allowfullscreen"
          className=" mx-auto max-w-[720px]"
        ></iframe>
      </div>
    </React.Fragment>
  );
}
