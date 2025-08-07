import React, { useContext, useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { InputGroupContext } from "rsuite/esm/InputGroup/InputGroup";
import { ITopContext } from "../../../hooks/TopContext";
import TPURreportChild from "./TPURreportChild";

export default function TPURreport(p) {
  const { userInfo } = useContext(ITopContext);
  const [FGs, setFGs] = useState([]);
  return (
    <div className="min-h-[512px] w-fit">
      <div className="float-right">Form No. F-T-UA11-008, 0</div>
      <div className=" w-fit mx-auto">
        <br></br>
        <p className="p-0 m-0 text-center">Del Monte Philippines , Inc</p>
        <p className="p-0 m-0">TOMATO PASTE USAGE REPORT</p>
      </div>
      <div className="flex justify-between">
        <table>
          <tr>
            <td className="px-2">Company Name:</td>
            <td className="px-2 ">IPIC</td>
          </tr>
          <tr>
            <td className="px-2">Item Code:</td>
            <td className="px-2 bg-[#0096FF]">{p.ItemCode}</td>
          </tr>
          <tr>
            <td className="px-2">Production Date: </td>
            <td className="px-2 bg-[#fffb23]">
              {p.date && formatDate(p.date, "yyMMdd")}
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td className="px-2 ">TPUR:</td>
            <td className="px-2 bg-[#0096FF]">
              {p.Usage.length > 0 && p.Usage[0].U_TPUR}
            </td>
          </tr>
          <tr>
            <td className="px-2">DPUR:</td>
            <td className="px-2">{p.Usage.length > 0 && p.Usage[0].U_DPUR}</td>
          </tr>
        </table>
      </div>
      <table>
        <tr>
          <td className="DPUR_TD">ITEMCODE</td>
          <td className="DPUR_TD"></td>
          <td className="DPUR_TD">ACTUAL USAGE</td>
          <td className="DPUR_TD">ADJUSTMENTS</td>
          <td className="DPUR_TD">REJECTS</td>
          <td className="DPUR_TD">TOTAL USAGE</td>
          <td className="DPUR_TD">NTSS</td>
          <td className="DPUR_TD">TOMATO SOLIDS</td>
        </tr>

        {p.Usage.map((e) => (
          <>
            {e.Item != "" ? (
              <>
                <TPURreportChild Usage={p.Usage} Item={e.Item} po={e.Po} />
              </>
            ) : (
              ""
            )}
          </>
        ))}
      </table>
      <br />
      <table className="">
        <tr>
          <td className="px-2">Prepared By:</td>
          <td className="px-2 ">
            {userInfo.firstname + " " + userInfo.lastname}
          </td>
        </tr>
      </table>
    </div>
  );
}
