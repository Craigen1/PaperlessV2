import React from "react";
import ProcessBox from "./ProcessBox";

export default function ProcessMain() {
  const ProcessFlow = [
    {
      Department: "Sales Process",
      Process: [
        {
          type: "2",
          number: "",
          title: "Start",
          comment: "",
        },
        {
          type: "1",
          number: "01",
          title: "Subcon Po",
          comment: "Client",
        },
        {
          type: "1",
          number: "02",
          title: "Create Sales Order",
          comment: "",
        },
        {
          type: "3",
          number: "",
          title: "A",
          comment: "",
          hasOr: "TailOr",
        },
        {
          type: "4",
          number: "",
          title: "E",
          comment: "",
        },
      ],
    },

    {
      Department: "Production Process",
      Process: [
        {
          type: "3",
          number: "",
          title: "A",
          comment: "",
        },
        {
          type: "1",
          number: "01",
          title: "Create Production Order",
          comment: "",
        },
        {
          type: "1",
          number: "03",
          title: "Plan",
          comment: "Add Document",
        },
        {
          type: "1",
          number: "04",
          title: "Inventory Requisition",
          comment: "ITR-IT",
        },

        {
          type: "1",
          number: "05",
          title: "Report Completion",
          comment: "ITR-IT",
        },
        {
          type: "1",
          number: "06",
          title: "Issue Components",
          comment: "ITR-IT",
        },
        {
          type: "4",
          number: "",
          title: "P3",
          comment: "",
        },
      ],
    },
  ];
  return (
    <div className=" mt-10 overflow-auto ">
      {ProcessFlow.map((item, index) => (
        <div className="flex  mt-4">
          <div className="center ml-2 border-2 border-black rounded-md px-2 w-40">
            {item.Department}
          </div>

          <div className="flex  overflow-auto ">
            {item.Process.map((pItem, pIndex) => (
              <>
                <ProcessBox items={pItem} />
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
