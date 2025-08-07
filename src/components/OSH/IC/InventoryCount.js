import React from "react";
import InventoryCountMain from "./InventoryCountMain";
import { DefMenus } from "../../ComponentList";
import { useState } from "react";
import InventoryCountHistory from "./InventoryCountHistory";

export default function InventoryCount() {
  const [SelectedMenu, setSelectedMenu] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Inventory Count",
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
      {SelectedMenu == 0 && <InventoryCountMain />}
      {SelectedMenu == 1 && <InventoryCountHistory />}
    </div>
  );
}
