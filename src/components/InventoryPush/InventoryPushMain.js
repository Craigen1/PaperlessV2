import React, { useState } from "react";
import InventoryPushMainPost from "./InventoryPushMainPost";
import { DefMenus } from "../ComponentList";
import InventoryPushMainHelp from "./InventoryPushMainHelp";
import InventoryPushMainHistory from "./InventoryPushMainHistory";
import InventoryPushGetQr from "./InventoryPushGetQr";
export default function InventoryPushMain() {
  const [SelectedMenuId, setSelectedMenuId] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Copy From ITR",
    },
    {
      id: 1,
      text: "History",
    },
    {
      id: 2,
      text: "Inventory",
    },
    {
      id: 3,
      text: "Help",
    },
  ];
  return (
    <>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />
      {SelectedMenuId == 0 && <InventoryPushMainPost />}
      {SelectedMenuId == 1 && <InventoryPushMainHistory />}
      {SelectedMenuId == 2 && <InventoryPushGetQr />}
      {SelectedMenuId == 3 && <InventoryPushMainHelp />}
    </>
  );
}
