import React, { useState } from "react";
import { DefMenus } from "../../../ComponentList";
import InventoryCountItemMskCreate from "./InventoryCountItemMskCreate";
import InventoryCountItemMskList from "./InventoryCountItemMskList";
import InventoryCountItemMskFromClipBoard from "./InventoryCountItemMskFromClipBoard";
import InventoryCountItemMskAllList from "./InventoryCountItemMskAllList";

export default function InventoryCountItemMsk() {
  const menus = [
    // {
    //   id: 0,
    //   text: "List ",
    // },
    {
      id: 0,
      text: "Create",
    },
    {
      id: 1,
      text: "Copy From Clipboard",
    },
    {
      id: 2,
      text: "List",
    },
  ];

  const [SelectedMenuId, setSelectedMenuId] = useState(0);

  return (
    <div>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />
      {SelectedMenuId == -1 && <InventoryCountItemMskList />}
      {SelectedMenuId == 0 && <InventoryCountItemMskCreate />}
      {SelectedMenuId == 1 && <InventoryCountItemMskFromClipBoard />}
      {SelectedMenuId == 2 && <InventoryCountItemMskAllList />}
    </div>
  );
}
