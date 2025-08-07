import React, { useEffect, useState } from "react";
import { DefMenus } from "../../../ComponentList";
import InventoryCountUsrCount from "./InventoryCountUsrCount";
import InventoryCountUsrHistory from "./InventoryCountUsrHistory";
import InventoryCountUsrHelp from "./InventoryCountUsrHelp";

export default function InventoryCountUsr() {
  const [SelectedMenu, setSelectedMenu] = useState(1);
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

  const [documentNum, setdocumentNum] = useState({
    DocNum: 0,
    Module: "",
  });
  const SetInventoryCount = (e) => {
    setSelectedMenu(0);
  };
  useEffect(() => {
    if (documentNum.Module == "History") SetInventoryCount();
  }, [documentNum]);

  return (
    <div>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />
      {SelectedMenu == 0 && (
        <InventoryCountUsrCount
          documentNum={documentNum}
          setdocumentNum={setdocumentNum}
          setSelectedMenu={setSelectedMenu}
        />
      )}
      {SelectedMenu == 1 && (
        <InventoryCountUsrHistory
          documentNum={documentNum}
          setdocumentNum={setdocumentNum}
        />
      )}
      {SelectedMenu == 2 && <InventoryCountUsrHelp />}
    </div>
  );
}
