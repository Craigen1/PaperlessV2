import React, { useEffect, useState } from "react";
import { DefTable, EXEC_SQL_InsertOne } from "./ComponentList";

export default function MaterialUsageHistory2ExtTable(p) {
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
      name: "Quantity",
      disabled: true,
    },
    {
      name: "Batch",
      disabled: true,
    },
  ];

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);
  const getData = async (e) => {
    setLoading(true);
    await EXEC_SQL_InsertOne(954, setRows, p.id);
    setLoading(!true);
  };
  useEffect(() => {
    if (p.id == undefined || p.id == "") return;

    getData();
  }, [p.id]);

  return (
    <div className="w-fit my-2 pb-2">
      <DefTable
        columns={columns}
        rows={rows}
        //   handleOption={handleOption}
        //   onChange={rowshandler}
      />
    </div>
  );
}
