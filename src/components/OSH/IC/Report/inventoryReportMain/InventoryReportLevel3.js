import React, { useEffect, useState } from "react";
import { EXEC_SQL_InsertOne } from "../../../../ComponentList";

export default function InventoryReportLevel3(p) {
  const [Collaps, setCollaps] = useState("+");
  const collapsx = async () => {
    Collaps == "+" ? setCollaps("-") : setCollaps("+");
  };

  const [rows, setrows] = useState([]);
  const [loading, setloading] = useState(false);
  const getChild = async () => {
    setloading(true);
    collapsx();
    await EXEC_SQL_InsertOne(807, setrows, p.whsname, p.weeks, p.asof);
    setloading(false);
  };
  useEffect(() => {
    if (p.whsname != "") getChild();
  }, [p.whsname]);

  return (
    <>
      <tr>
        <td className="min-w-[300px] bg-[#4fa4f33f]">
          <span className="ml-10 font-semibold">SKU</span>
        </td>
        <td className="min-w-[70px] bg-[#4fa4f33f]"></td>
        <td className="min-w-[70px] bg-[#4fa4f33f]"></td>
        <td className="min-w-[70px] bg-[#4fa4f33f]"></td>
        <td className="min-w-[70px] bg-[#4fa4f33f]"></td>
        <td className="min-w-[70px] bg-[#4fa4f33f]"></td>
      </tr>
      {rows.map((item, index) => (
        <tr className="hover:bg-SAP-headerLine">
          <td className="overflow-hidden">
            {/* <button
              onClick={getChild}
              className="ml-7 bg-[#00000042] text-center justify-center h-fit w-5 "
            >
              {Collaps}
            </button> */}
            <input
              value={` ${item.ItemCode}-${item.itemname}`}
              className="border-0 ml-10 mr-2"
            />
          </td>
          <td> {item.systemCount}</td>
          <td> {item.sellingCount}</td>
          <td> {item.whCount}</td>
          <td> {item.rtvCount}</td>
          <td> {item.total}</td>
        </tr>
      ))}
    </>
  );
}
