import React, { useState } from "react";
import InventoryReportLevel3 from "./InventoryReportLevel3";
import { EXEC_SQL_InsertOne } from "../../../../ComponentList";

export default function InventoryReportLevel2B(p) {
  const [Collaps, setCollaps] = useState("+");
  const collapsx = async () => {
    Collaps == "+" ? setCollaps("-") : setCollaps("+");
    getChild();
  };
  const [loading, setloading] = useState(false);
  const getChild = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(807, setrows, p.store, p.weeks, p.asof);
    setloading(false);
  };
  return (
    <>
      <tr className="hover:bg-SAP-headerLine">
        <td className="">
          <button
            onClick={collapsx}
            className="ml-5 bg-[#00000042] text-center justify-center h-fit w-5 "
          >
            {Collaps}
          </button>
          {p.item.whsname}
        </td>
        <td> {p.item.systemCount}</td>
        <td> {p.item.sellingCount}</td>
        <td> {p.item.whCount}</td>
        <td> {p.item.rtvCount}</td>
        <td> {p.item.total}</td>
      </tr>
      {Collaps == "-" && (
        <InventoryReportLevel3
          whsname={p.item.whsname}
          store={p.item.store}
          weeks={p.weeks}
          asof={p.asof}
        />
      )}
    </>
  );
}
