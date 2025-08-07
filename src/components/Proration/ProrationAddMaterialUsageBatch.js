import React, { useState } from "react";
import { DefButton } from "../ComponentList";

export default function ProrationAddMaterialUsageBatch(p) {
  const [ASDAX, setASDAX] = useState(0);

  return (
    <div>
      <div className="fixed top-0 left-0 h-full w-full bg-trans50">
        <div className="max-w-[512px] border bg-SAP-form mx-auto mt-20">
          <div className="border-b-4 border-SAP-headerLine bg-SAP-header flex ">
            <div className="w-full mx-2 font-semibold">yy Choose Batch</div>
            <div>
              <DefButton
                type="4"
                onClick={() => setshowBatch(false)}
                text="Close"
                className="px-2 mx-1 mb-1"
              />
            </div>
          </div>
          <div className="bg-[#0000002c] w-fit  px-1 rounded-md m-2">
            {p.selectedRow.ItemCode}
            {p.selectedRow.ItemName}
          </div>
          <div className="bg-[#0000002c] w-fit  px-1 rounded-md m-2">
            {parseFloat(p.selectedRow.Actual) - parseFloat(ASDAX)}
          </div>

          <table className=" p-2">
            <tr>
              <td></td>
              <td>BatchNum</td>
              <td>Quantity</td>
              <td>Selected</td>
              <td>MnF Date</td>
              <td>Exp Date</td>
            </tr>
            {p.batchInfo.map((e, i) => (
              <tr className="border">
                <td className="px-2 whitespace-nowrap">
                  <input className="w-[20px]" TYPE="checkbox" />
                </td>
                <td className="px-2 whitespace-nowrap">{e.BatchNum}</td>
                <td className="px-2 whitespace-nowrap">{e.Quantity}</td>
                <td className="px-2 whitespace-nowrap">
                  <input
                    className="w-[60px]"
                    max={e.Quantity}
                    min={0}
                    type="number"
                    id={i}
                    value={p.batchInfo[i].Selected}
                    onChange={p.is0Calculator}
                  />
                </td>
                <td className="px-2 whitespace-nowrap">{e.PrdDate}</td>
                <td className="px-2 whitespace-nowrap w-full">{e.ExpDate}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
