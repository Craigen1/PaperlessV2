import React from "react";

export default function PotfTabs(p) {
  const btnProps = [
    {
      label: "About",
    },
    {
      label: "Experience",
    },
    {
      label: "Projects",
    },
  ];
  const TabSelectHandler = (e) => {
    p.settabIndex(e.target.id);
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-screen-md flex center">
        {btnProps.map((item, index) => (
          <div className="w-full hover:bg-trans20 center">
            <button
              id={index}
              className={
                p.tabIndex == index
                  ? "text-lg font-bold  border-b-4 border-red-500 text-gray-410 px-4  py-2"
                  : "text-lg font-bold    border-b-4  border-transparent px-4 text-gray-410 py-2"
              }
              onClick={TabSelectHandler}
              key={index}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
