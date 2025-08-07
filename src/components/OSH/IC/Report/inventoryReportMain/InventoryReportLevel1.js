import React, { useState } from "react";
import InventoryReportLevel2 from "./InventoryReportLevel2";

export default function InventoryReportLevel1(p) {
  const [Collaps, setCollaps] = useState("+");
  const collapsx = async () => {
    Collaps == "+" ? setCollaps("-") : setCollaps("+");
  };
  return (
    <div>
      <table className="w-full">
        <tr>
          <td className="min-w-[300px] bg-[#4fa4f398]">STORE</td>
          <td className="min-w-[70px] bg-[#4fa4f398]">System</td>
          <td className="min-w-[70px] bg-[#4fa4f398]">Selling</td>
          <td className="min-w-[70px] bg-[#4fa4f398]">WHS</td>
          <td className="min-w-[70px] bg-[#4fa4f398]">RTV</td>
          <td className="min-w-[70px] bg-[#4fa4f398]">Total</td>
        </tr>

        <tr className="hover:bg-SAP-headerLine">
          <td className="">
            <button
              onClick={collapsx}
              className=" bg-[#00000042] text-center justify-center h-fit w-5 "
            >
              {Collaps}
            </button>
            {p.item.StoreName}
          </td>
          <td> {p.item.systemCount}</td>
          <td> {p.item.sellingCount}</td>
          <td> {p.item.whCount}</td>
          <td> {p.item.rtvCount}</td>
          <td> {p.item.total}</td>
        </tr>
        {Collaps == "-" && (
          <>
            {p.item.StoreName != "" && (
              <InventoryReportLevel2
                store={p.item.StoreName}
                weeks={p.weeks}
                asof={p.asof}
              />
            )}
          </>
        )}
      </table>
    </div>
  );
}
