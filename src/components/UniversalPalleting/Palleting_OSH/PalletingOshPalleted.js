import React, { useState } from "react";
import { DefTable } from "../../ComponentList";

export default function PalletingOshPalleted(p) {
  const handleOption = (e) => {};
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
      name: "palletId",
      disabled: true,
    },
    {
      name: "palletQty",
      type: "number",
      disabled: true,
    },
  ];

  const [rows2, setRows2] = useState([]);
  const columns2 = [
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
      name: "palletQty",
      disabled: true,
    },
    {
      name: "palletId",
      type: "number",
      disabled: true,
    },
  ];
  return (
    <div>
      <p className="font-semibold frame bg-transparent shadow-none mt-2">
        Palleted
      </p>

      <div className="frame mt-1">
        <DefTable
          columns={columns}
          rows={p.PalletedRows}
          btnCss="w-fit "
          spanCSS="w-full"
          handleOption={handleOption}
        />
      </div>
    </div>
  );
}
