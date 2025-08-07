import React, { useState } from "react";
import { DefButton } from "../ComponentList";

export default function DeliveryScheduleTabs(p) {
  const BtnComp = [
    {
      text: "Schedule Delivery",
    },
    {
      text: "Upcoming",
    },
    {
      text: "Pending",
    },
    {
      text: "Past",
    },
    {
      text: "Cancelled",
    },
  ];

  const [selectedTab, setselectedTab] = useState(1);
  const handleChangeTab = (e) => {
    console.log(e.target);
    const key = e.target.id;
    setselectedTab(key);
    p.setactiveTab(e.target.id);
  };
  return (
    <>
      <div className="frame py-1.5">
        {BtnComp.map((item, index) => (
          <>
            <DefButton
              onClick={handleChangeTab}
              text={item.text}
              type={selectedTab == index ? "2" : "2B"}
              key={index}
              id={index}
              className="w-fit px-2 mx-1"
            />
          </>
        ))}
      </div>
    </>
  );
}
