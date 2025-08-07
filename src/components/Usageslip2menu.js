import React from "react";
import { DefButton } from "./ComponentList";

export default function Usageslip2menu(p) {
  const MenuChange = (Elements) => {
    const { id } = Elements.target;
    p.setSelectedMenu(id);
  };
  return (
    <>
      <div className="frame py-1">
        <DefButton
          onClick={MenuChange}
          id="0"
          type={p.SelectedMenu == "0" ? "2" : "2B"}
          text="Create"
          className="w-fit px-2"
        />
        <DefButton
          onClick={MenuChange}
          id="1"
          type={p.SelectedMenu == "1" ? "2" : "2B"}
          text="History"
          className="w-fit px-2"
        />
      </div>
    </>
  );
}
