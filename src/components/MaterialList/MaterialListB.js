import { formatDate } from "date-fns";
import React from "react";

export default function MaterialListB(p) {
  return (
    <div>
      <p className="text-xl font-semibold">
        Posted Batch for {p.p.selectedBatchInto.ItemCode}
      </p>

      <table className="frame w-full mt-4 mb-4">
        <tr className="bg-gray-710">
          <td className="font-bold">Batch</td>
          <td className="font-bold">Qty</td>
          <td className="font-bold">PD</td>
          <td className="font-bold">ED</td>
        </tr>
        {p.batchRow.map((e, i) => (
          <tr className="bg-gray-710">
            <td className="">{e.Batch}</td>
            <td className="">{e.Qty}</td>
            <td className="">{e.PD}</td>
            <td className="">{e.ED}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
