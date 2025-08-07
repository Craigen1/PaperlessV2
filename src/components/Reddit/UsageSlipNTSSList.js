import React, { useEffect, useState } from "react";
import { DefTable, EXEC_SQL } from "../ComponentList";

export default function UsageSlipNTSSList(props) {
  const [rows, setrows] = useState([]);
  const columns = [
    {
      name: "NTSS",
      type: "number",
    },
    {
      name: "WATER",
      type: "number",
    },
    {
      name: "SOLID",
      type: "number",
    },
  ];
  useEffect(() => {
    EXEC_SQL(992, setrows, props.id);
  }, []);

  return (
    <>{rows.length <= 0 ? "" : <DefTable rows={rows} columns={columns} />}</>
  );
}
