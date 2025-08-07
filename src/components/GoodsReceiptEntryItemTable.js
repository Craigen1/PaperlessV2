import React, { useState } from "react";
import { DefTable } from "./ComponentList";

export default function GoodsReceiptEntryItemTable() {
  const [rows, setRows] = useState([]);
  const columns = [
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
      name: "BarCode",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Qty",
      disabled: true,
    },
    {
      name: "Option",
    },
  ];

  const handleOption = (e) => {
    let id = e.target.value;
    const TempContainer = [...rows];
    TempContainer.splice(id, 1);
    setRows(TempContainer);
    console.log({ TempContainer });
  };
  return (
    <>
      <div className="frame">
        <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Remove"
          spanCSS="w-full"
          className=""
          handleOption={handleOption}
        />
      </div>
    </>
  );
}
