import React, { useEffect, useState } from "react";
import { DefTableV2, EXEC_SQL_InsertOne } from "../../../ComponentList";
import { CubeIcon, CubeTransparentIcon } from "@heroicons/react/outline";

export default function InventoryCountItemMskAllList() {
  const [row, setrow] = useState([]);
  const [columns, setcolumns] = useState([
    {
      name: "",
      label: "",
      id: "Option",
      width: "0px",
      editable: "false",
    },
    {
      name: "StoreCode",
      label: "StoreCode",
      id: "StoreCode",
      width: "100px",
      icon: CubeTransparentIcon,
      editable: "true",
    },
    {
      name: "StoreName",
      label: "StoreName",
      id: "StoreName",
      width: "300px",
      icon: CubeTransparentIcon,
      editable: "true",
    },
    {
      name: "ItemCode",
      label: "ItemCode",
      id: "ItemCode",
      width: "100px",
      icon: CubeTransparentIcon,
      editable: "true",
    },
    {
      name: "ItemMask",
      label: "ItemMask",
      id: "ItemMask",
      width: "100px",
      icon: CubeTransparentIcon,
      editable: "true",
    },
    {
      name: "ItemName",
      label: "ItemName",
      id: "ItemName",
      width: "100%",
      icon: CubeTransparentIcon,
      editable: "true",
    },
  ]);

  function customCss(rows, index) {
    let css = "";
    return "p-1 ";
  }
  const getList = async () => {
    await EXEC_SQL_InsertOne(813, setrow);
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <DefTableV2 columns={columns} rows={row} customCss={customCss} />
    </div>
  );
}
