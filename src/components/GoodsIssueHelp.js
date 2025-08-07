import React from "react";
import IconViews from "./IconViews";
import { SparklesIcon } from "@heroicons/react/outline";

export default function GoodsIssueHelp() {
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
          src="https://app.tango.us/app/embed/aefd64b8-8f99-44d4-b9d4-9e31616b291d?skipCover=false&defaultListView=false&skipBranding=true"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
          security="restricted"
          title="Efficient Workflow for Goods Issue Request - Admin and Support"
          width="100%"
          height="580px"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          allowfullscreen="allowfullscreen"
          className=" mx-auto"
        ></iframe>
      </div>
    </React.Fragment>
  );
}
