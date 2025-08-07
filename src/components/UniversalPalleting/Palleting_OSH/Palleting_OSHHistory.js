import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function Palleting_OSHHistory() {
  const { DateNow, userInfo } = useContext(ITopContext);
  const [headerValue, setHeaderValue] = useState({});
  const [rows, setrows] = useState([]);
  const columns = [
    { name: "DocNum", colspan: 1 },
    { name: "ItemCode", colspan: 1 },
    { name: "Dscription", colspan: 1 },
    { name: "Quantity", colspan: 1 },
    { name: "PalletNo", colspan: 1 },
    { name: "CANCELED", colspan: 1 },
    { name: "CreatedDate", colspan: 1 },
    { name: "NumAtCard", colspan: 1 },
  ];
  const headerChange = (e) => {
    const { id, value } = e.target;
    setHeaderValue((e) => ({ ...e, [id]: value }));
  };
  const [loading, setloading] = useState(false);
  const SearchHistory = async (e) => {
    setloading(true);
    await EXEC_SQL_InsertOne(864, setrows, headerValue.from, headerValue.to);
    setloading(false);
  };
  useEffect(() => {
    console.log(DateNow);
    setHeaderValue((e) => ({
      ...e,
      to: DateNow,
      from: DateNow,
    }));
  }, []);

  return (
    <>
      <div className="frame pb-2 flex gap-2">
        <DefInput
          type="date"
          id="from"
          value={headerValue["from"]}
          handler={headerChange}
          label="From"
        />
        <DefInput
          type="date"
          id="to"
          value={headerValue["to"]}
          label="To"
          handler={headerChange}
        />
        <DefButton
          type="10"
          text="Search"
          className="h-fit mt-[20px]"
          onClick={SearchHistory}
          loading={loading}
        />
      </div>
      <div className="frame">
        <DefTable columns={columns} rows={rows} />
      </div>
    </>
  );
}
