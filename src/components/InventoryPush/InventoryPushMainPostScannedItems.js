import React, { useEffect, useState } from "react";
import { DefTable, RemoveFromGrid } from "../ComponentList";

export default function InventoryPushMainPostScannedItems(p) {
  const columns = [
    {
      name: "Option",
      disabled: true,
      colspan: 1,
    },
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Qty",
      disabled: true,
      colspan: 1,
    },
    {
      name: "uom",
      disabled: true,
      colspan: 1,
    },
    {
      name: "BatchNum",
      disabled: true,
      colspan: 1,
    },
  ];
  const [rows, setrows] = useState([]);
  const handleOption = (e) => {
    const { id } = e.target;
    RemoveFromGrid(p.rows, p.setrows, id);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="frame">
        <span className="font-semibold title ml-2">
          Batch Selection / Scanned Items
        </span>
      </div>
      <div className="frame">
        <DefTable
          columns={columns}
          rows={p.rows}
          btnLabel="Remove"
          spanCSS="w-full"
          className=""
          handleOption={handleOption}
        />
      </div>
    </>
  );
}
