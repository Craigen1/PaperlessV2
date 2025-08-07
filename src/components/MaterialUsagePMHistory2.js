import React, { useContext, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import MaterialUsagePMHistoryChildView from "./MaterialUsagePMHistoryChildView";

export default function MaterialUsagePMHistory2(p) {
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
          loading={getDataloading}
        />
      </div>
    );
  };
  const [getDataloading, setGetDataloading] = useState(false);
  const [Rows, setRows] = useState([]);
  const getData = async () => {
    setGetDataloading(true);
    await EXEC_SQL_InsertOne(835, setRows, dateRange.from, dateRange.to);
    setGetDataloading(!true);
  };

  const columns = [
    // {
    //   name: "Option",
    //   disabled: true,
    //   colspan: 1,
    // },
    {
      name: "Po",
      disabled: true,
      colspan: 1,
    },
    {
      name: "ProdCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "ProdName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "PMCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "PMName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Quantity",
      disabled: true,
      colspan: 1,
    },
    {
      name: "Batch#",
      disabled: true,
      colspan: 1,
    },
  ];

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
      <CompDateRange />
      <div className="overflow-auto">
        <table>
          <tr>
            <th></th>
            <th>DocNum</th>
            <th>ProdCode</th>
            <th>ProdName</th>
            <th>Batch </th>
            <th>CreatedDate </th>
            <th>MnfDate </th>
            <th>WhsCode </th>
            <th>WhsName </th>
          </tr>

          {Rows.map((item, index) => (
            <>
              <tr className="hover:bg-trans20">
                <td className="border-y whitespace-nowrap  border-trans20 min-w-[20px] ">
                  <div className="flex gap-x-2">
                    <DefButton
                      type="11"
                      text="Update"
                      className="h-fit "
                      onClick={() => {
                        p.setisForUpdate(true);
                        p.setOrderNo(item.DocNum);
                        p.setBatchSizeNum(item.Batch);
                        p.setMnfDate(item.MnfDateRaw);
                        p.setProrationLabel(item.Client);
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
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[40px] ">
                  {item.DocNum}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[40px] ">
                  {item.ProdCode}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[200px] ">
                  {item.ProdName}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[120px] ">
                  {item.Batch}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[80px] ">
                  {item.MnfDate}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[80px] ">
                  {item.CreatedDate}
                </td>
                <td className="border px-1 whitespace-nowrap  border-trans20 min-w-[100px] ">
                  {item.WhsCode}
                </td>
                <td className="border-y px-1   border-trans20 w-full whitespace-nowrap">
                  {item.WhsName}
                </td>
              </tr>

              {item.iView == 1 && (
                <tr className="my-2 pb-2">
                  <td className=" w-full" colSpan={10}>
                    <MaterialUsagePMHistoryChildView id={item.id} />
                  </td>
                </tr>
              )}
            </>
          ))}
        </table>
      </div>
      {/* <MaterialUsagePMHistoryChildView id={id} */}
    </div>
  );
}
