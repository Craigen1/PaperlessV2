import React, { useState } from "react";
import { DefButton, DefTable, EXEC_SQL_InsertOne } from "./ComponentList";
import CalendarPicker from "./CalendarPicker";

export default function InventoryTransfer2History(props) {
  const [rows, setrows] = useState([]);

  const today = new Date();
  const [From, setFrom] = useState(today);
  const [To, setTo] = useState(today);

  const columns = [
    {
      name: "DocNum",
      disabled: true,
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
      name: "Quantity",
      disabled: true,
    },
    {
      name: "UomCode",
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
  const [loading, setLoading] = useState(false);
  const handleOption = async (e) => {
    setLoading(true);
    await EXEC_SQL_InsertOne(886, setrows, From, To);
    setLoading(false);
  };
  return (
    <div>
      <div className="frame flex">
        <div className="w-full h-14 mt-2">
          <CalendarPicker setFrom={setFrom} setTo={setTo} />
        </div>
        <div className="mt-1">
          <DefButton
            text="Search"
            type="2B"
            loading={loading}
            onClick={handleOption}
          />
        </div>
      </div>
      <div className="overflow-auto ">
        <DefTable columns={columns} rows={rows} onChange={handleOption} />
      </div>
    </div>
  );
}
