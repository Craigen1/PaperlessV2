import React, { useEffect, useState } from "react";
import { EXEC_SQL_InsertOne } from "../../ComponentList";
import { formatDate } from "date-fns";
import { useUserStore } from "../../userStore/useUserStore";

export default function DPURHeaderInfo(p) {
  const [header, setheader] = useState([]);
  const { setHeaderINFO_MJ } = useUserStore();
  const getHeader = async () => {
    await EXEC_SQL_InsertOne(
      774,
      setheader,
      p.SearchValues.ItemCode,
      p.SearchValues.Date
    );
  };

  useEffect(() => {
    if (
      p.SearchValues.ItemCode == undefined ||
      p.SearchValues.Date == undefined
    )
      return;
    getHeader();
    console.log(p.SearchValues);
  }, [p.SearchValues.ItemCode, p.SearchValues.Date]);
  useEffect(() => {
    p.setHeaderInfo(header);
    setHeaderINFO_MJ(header);
  }, [header]);

  return (
    <div className=" w-full">
      <div className="my-4">
        <div className="pr-2 w-fit mx-auto font-bold">
          Del Monte Philippines, Inc
        </div>
        <div className="pr-2 w-fit mx-auto font-semibold">
          Daily Production Usage Report
        </div>
      </div>
      {Array.isArray(header) && header.length > 0 && (
        <table>
          <tr>
            <td className="pr-2">Toll Packer:</td>
            <td className="pr-2">Innovative Packaging Industry Corporation</td>
            <td className="pr-2  pl-[210px]">DPUR No:</td>
            <td className="">{header[0].U_DPUR ? header[0].U_DPUR : ""}</td>
          </tr>
          <tr>
            <td className="pr-2">Sub Con Po:</td>
            <td className="bg-primary text-white">
              {header[0].CustomerRef ? header[0].CustomerRef : ""}
            </td>
            <td className="pl-[210px]">MNF</td>
            <td className="">
              {p.SearchValues.Date
                ? formatDate(p.SearchValues.Date, "dd-MM-yyyy")
                : ""}
            </td>
          </tr>
          <tr>
            <td className="pr-2">Item Name</td>
            {header[0].ItemName ? header[0].ItemName : ""}
            <td className=""></td>
          </tr>
        </table>
      )}
    </div>
  );
}
