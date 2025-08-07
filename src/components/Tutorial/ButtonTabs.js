import React, { useState } from "react";

export default function ButtonTabs() {
  const [SelectedTab, setSelectedTab] = useState("1");
  const TabSelectionHandler = (p) => {
    setSelectedTab(p.target.id);
  };
  const TabComponent = (p) => {
    return (
      <button
        id={p.id}
        onClick={TabSelectionHandler}
        className={
          SelectedTab == p.id
            ? "rounded-full bg-black py-0.5 px-2 mx-0.5 text-white"
            : "px-2 py-0.5 mx-0.5 "
        }
      >
        {p.label}
      </button>
    );
  };

  const TabComponentList = [
    {
      label: "Menu",
    },
    {
      label: "Item Master",
    },
    {
      label: "Profile",
    },
    {
      label: "Another Tab",
    },
    {
      label: "Activities",
    },
  ];
  return (
    <div>
      <div className="mx-auto w-fit mt-2 rounded-full bg-white px-1 py-1.5">
        {TabComponentList.map((item, index) => (
          <>
            <TabComponent label={item.label} id={index} />
          </>
        ))}
      </div>
    </div>
  );
}
