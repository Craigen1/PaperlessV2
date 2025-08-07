import React, { useState } from "react";
import { DefTable } from "../../ComponentList";

export default function PalletingOshForPalleting(p) {
  const handleOption = (e) => {};
  const [rows, setRows] = useState([]);
  const columns = [
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "Dscription",
      disabled: true,
      colspan: 0,
    },

    {
      name: "Quantity",
      disabled: true,
    },
    {
      name: "PalletSize",
      disabled: true,
    },

    {
      name: "Machine",
      disabled: true,
    },
    {
      name: "Station",
      disabled: true,
    },
    {
      name: "BatchNum",
      disabled: true,
    },
    {
      name: "MnfDate",
      disabled: true,
    },
    {
      name: "ExpDate",
      disabled: true,
    },
  ];

  return (
    <div>
      <p className="font-semibold frame bg-transparent shadow-none mt-2">
        For Palleting
      </p>

      <div className="frame mt-1 overflow-auto">
        <DefTable
          columns={columns}
          rows={p.headerRows}
          btnCss="w-fit "
          spanCSS="w-full"
          handleOption={handleOption}
        />
      </div>
    </div>
  );
}
