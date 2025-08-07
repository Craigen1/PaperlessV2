import React, { useState } from "react";
import { DefMenus } from "../ComponentList";
import ProrationAddHeaderA from "./ProrationAddHeaderA";
import DPUR from "./DPUR/DPUR";

export default function Proration() {
  const [SelectedMenuId, setSelectedMenuId] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Proration",
    },
    {
      id: 1,
      text: "DPUR",
    },
    {
      id: 2,
      text: "Help",
    },
  ];

  return (
    <div>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />

      {/*  */}

      {SelectedMenuId == 0 && <ProrationAddHeaderA />}
      {SelectedMenuId == 1 && <DPUR />}
    </div>
  );
}
