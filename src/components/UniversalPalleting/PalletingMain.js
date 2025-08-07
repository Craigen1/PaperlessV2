import React, { useState } from "react";
import { DefMenus } from "../ComponentList";
import PalletingGR from "./PalletingGR";
import PalletingGRhistory from "./PalletingGRhistory";

export default function PalletingMain() {
  const [SelectedMenu, setSelectedMenu] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Palleting",
    },
    {
      id: 1,
      text: "History",
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
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />
      {SelectedMenu == 0 && <PalletingGR setSelectedMenu={setSelectedMenu} />}
      {SelectedMenu == 1 && <PalletingGRhistory />}
    </div>
  );
}
