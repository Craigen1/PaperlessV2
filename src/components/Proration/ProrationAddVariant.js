import React, { useState } from "react";
import { DefTable } from "../ComponentList";

export default function ProrationAddVariant(p) {
  const [rows, setrows] = useState([]);

  const columns = [
    {
      name: "ItemCode",
      disabled: true,
    },
    {
      name: "ItemName",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Output",
      disabled: true,
    },
    {
      name: "PCsCase",
      disabled: true,
      type: "number",
    },
    {
      name: "Grams",
      disabled: true,
      type: "number",
    },

    {
      name: "DMPISample",
      disabled: true,
      type: "number",
    },

    {
      name: "PO",
      disabled: true,
      type: "number",
    },
  ];

  const handleOption = (e) => {};
  const handleCHange = (e) => {};

  return (
    <div className="mt-4">
      Variant
      <DefTable
        columns={columns}
        rows={p.ChosnProdOrders}
        btnCss="w-fit "
        btnLabel="Remove"
        spanCSS="w-full"
        handleOption={handleOption}
        onChange={handleCHange}
      />
    </div>
  );
}
