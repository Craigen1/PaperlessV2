import React, { useContext, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";
import MaterialUsageHistory2ExtTable from "./MaterialUsageHistory2ExtTable";

export default function MaterialUsageHistory2(p) {
  const { userInfo, DateNow } = useContext(ITopContext);
  const [dateRange, setDateRange] = useState({
    from: DateNow,
    to: DateNow,
  });

  const dateRangeHandler = (e) => {
    const { value, name, id } = e.target;
    setDateRange((e) => ({ ...e, [id]: value }));
  };

  const CompDateRange = () => {
    return (
      <div className="flex">
        <DefInput
          type="date"
          handler={dateRangeHandler}
          value={dateRange.from}
          label="MnfDate From"
          id="from"
        />
        <DefInput
          type="date"
          handler={dateRangeHandler}
          value={dateRange.to}
          label="To"
          id="to"
        />
        <DefButton
          type="10"
          text="Search"
          className="h-fit mt-3"
          onClick={getData}
        />
      </div>
    );
  };

  const [getDataloading, setGetDataloading] = useState(false);
  const [Rows, setRows] = useState([]);
  const getData = async () => {
    setGetDataloading(true);
    await EXEC_SQL_InsertOne(953, setRows, dateRange.from, dateRange.to);
    setGetDataloading(!true);
  };

  const iView = (e) => {
    let xMap = Rows.map((item, index) => {
      if (index == e.target.id) {
        return { ...item, iView: 1 };
      }
      return { ...item, iView: 0 };
    });
    setRows(xMap);
  };

  return (
    <div>
      {/* header */}
      <CompDateRange />
      <div className="overflow-auto">
        <table>
          <tr>
            <th></th>
            <th>#</th>
            <th>Proration</th>
            <th>Revision</th>
            <th>Size </th>
            <th>Batch </th>
            <th>MNFDate </th>
            <th>Warehouse </th>
            <th>Station </th>
            <th>CreatedBy </th>
          </tr>

          {Rows.map((item, index) => (
            <>
              <tr className="hover:bg-trans20">
                <td className="border-y border-trans20 min-w-[20px] ">
                  <div className="flex gap-x-2">
                    <DefButton
                      type="11"
                      text="Update"
                      className="h-fit "
                      onClick={() => {
                        p.setDocEntryFromUpdate(item.DocEntry);
                      }}
                    />
                    <DefButton
                      type="11"
                      text="View"
                      className="h-fit "
                      id={index}
                      onClick={iView}
                    />
                  </div>
                </td>
                <td className="border border-trans20 min-w-[20px] ">
                  {item.DocEntry}
                </td>
                <td className="border border-trans20 min-w-[200px] ">
                  {item.ProrationType}
                </td>
                <td className="border border-trans20 min-w-[200px] ">
                  {item.Revision}
                </td>
                <td className="border border-trans20 min-w-[120px] ">
                  {item.Size}
                </td>
                <td className="border border-trans20 min-w-[80px] ">
                  {item.Batch}
                </td>
                <td className="border border-trans20 min-w-[120px] ">
                  {item.MNFDate}
                </td>
                <td className="border border-trans20 min-w-[100px] ">
                  {item.Warehouse}
                </td>
                <td className="border border-trans20 min-w-[100px] ">
                  {item.Station}
                </td>
                <td className="border-y border-trans20 w-full">
                  {item.CreatedBy}
                </td>
              </tr>

              {item.iView == 1 && (
                <tr className="my-2">
                  <td className=" w-full" colSpan={10}>
                    <MaterialUsageHistory2ExtTable id={item.DocEntry} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </table>
      </div>
    </div>
  );
}
