import React, { useState } from "react";
import ComplianceReport from "./ComplianceReport";
import { DefButton } from "../../../ComponentList";

export default function ComplianceReportBridge(p) {
  const [show, setshow] = useState(false);
  return (
    <div>
      <table>
        <tr>
          <td className=""></td>
          {/* <td className=" w-[100px]">System</td>
          <td className=" w-[100px]">Selling</td>
          <td className=" w-[100px]">RTV</td>
          <td className=" w-[100px]">Total</td> */}
        </tr>
        <tr>
          <td className="border-y border-trans20  w-[300px] text-mainLink font-semibold">
            <button onClick={() => setshow(!show)}>{p.StoreName}</button>
          </td>
          {/* <td className="border border-trans20 "></td>
          <td className="border border-trans20 "></td>
          <td className="border border-trans20 "></td>
          <td className="border-y border-trans20 "></td> */}
        </tr>
      </table>
      <br></br>

      {show && (
        <ComplianceReport
          StoreName={p.StoreName}
          weeks={p.weeks}
          asof={p.asof}
        />
      )}
    </div>
  );
}
