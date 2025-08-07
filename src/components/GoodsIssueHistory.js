import React, { useState } from "react";
import CalendarPicker from "./CalendarPicker";
import {
  DefButton,
  DefTable,
  EXEC_SQLI,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "./ComponentList";

export default function GoodsIssueHistory() {
  const [History, setHistory] = useState([]);

  const today = new Date();
  const [From, setFrom] = useState(today);
  const [To, setTo] = useState(today);
  const columns = [
    {
      name: "Entry",
      disabled: true,
    },
    {
      name: "Remarks",
      disabled: true,
    },

    {
      disabled: true,

      name: "Status",
      disabled: true,
    },
    {
      disabled: true,
      name: "RequestedDate",
    },
    {
      disabled: true,

      name: "RECEIVEDBY",
      type: "text",
    },
    {
      disabled: true,

      name: "RELEASEDBY",
      type: "text",
    },
  ];

  const [rows, setrows] = useState([]);
  const handleOption = (e) => {};
  const handleCHange = (e) => {};
  const getHistory = async (e) => {
    setrows([]);
    await EXEC_SQL_InsertOne(907, setrows, From, To);
  };
  return (
    <div>
      <div className="frame flex h-12">
        <div className="mt-1">
          <CalendarPicker setFrom={setFrom} setTo={setTo} />
        </div>
        <DefButton
          text="search"
          type="2B"
          onClick={getHistory}
          className="w-fit  mt-2 ml-2 px-2"
        />
      </div>
      <div className="frame overflow-auto">
        <DefTable
          columns={columns}
          rows={rows}
          btnCss="w-fit "
          btnLabel="Remove"
          spanCSS="w-full"
          handleOption={handleOption}
          onChange={handleCHange}
        />
      </div>
    </div>
  );
}
