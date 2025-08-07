import React, { useContext, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertOne,
} from "../../../../ComponentList";
import { ITopContext } from "../../../../../hooks/TopContext";
import InventoryReportLevel1 from "./InventoryReportLevel1";

export default function InventoryReport() {
  const { DateNow } = useContext(ITopContext);

  const [componentvalues, setcomponentvalues] = useState({
    weeks: 4,
    asof: DateNow,
  });

  const datehandler = (e) => {
    setcomponentvalues((x) => ({ ...x, [e.target.id]: e.target.value }));
  };

  const Handlers = async (e) => {
    const [value, id, name] = e.target;
    setdates((e) => ({ ...e, [id]: value }));
  };
  const [rows, setrows] = useState([]);

  const Search = async (e) => {
    setrows([]);
    await EXEC_SQL_InsertOne(
      810,
      setrows,
      componentvalues.weeks,
      componentvalues.asof
    );
  };

  return (
    <div>
      <div className="flex gap-2">
        <DefInput
          id="asof"
          label="As of"
          type="date"
          min="1"
          max="48"
          value={componentvalues.asof}
          handler={datehandler}
        />

        <DefInput
          id="weeks"
          label="Month(s)-*"
          type="number"
          min="1"
          max="48"
          value={componentvalues.weeks}
          handler={datehandler}
        />

        <DefButton
          text="Search"
          type="10"
          className="mx-2 h-fit mt-4"
          onClick={Search}
        />
      </div>
      {rows.map((item) => (
        <>
          <InventoryReportLevel1
            item={item}
            weeks={componentvalues.weeks}
            asof={componentvalues.asof}
          />
        </>
      ))}
    </div>
  );
}
