import React, { useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";

export default function MaterialUsage2PREWeighSheetTable(p) {
  const [distinctRecords, setdistinctRecords] = useState([]);
  const [distinctRecordsBatch, setdistinctRecordsBatch] = useState([]);
  const [data, setdata] = useState([]);

  const getRecords = async () => {
    // console.log(p.items.MNFdate);
    await EXEC_SQL_InsertOne(
      767,
      setdata,
      p.items.MNFdate,
      p.items.station,
      p.items.size,
      p.items.Revision,
      p.items.ProrType
    );
  };

  useEffect(() => {
    if (Array.isArray(data) == false) return;
    if (data.length <= 0) return;
    let dstinctItems = []; // items
    data.map((e) => {
      if (dstinctItems.indexOf(e.ItemCode) === -1) {
        dstinctItems.push(e.ItemCode);
      }
    });

    let dstinctBatch = [];
    data.map((e) => {
      if (dstinctBatch.indexOf(e.batch) === -1) {
        dstinctBatch.push(e.batch);
      }
    });

    console.log(dstinctItems);
    console.log(dstinctBatch);
    setdistinctRecords(dstinctItems);
    setdistinctRecordsBatch(dstinctBatch);
  }, [data]);

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div className="text-sm overflow-auto">
      <br></br>

      <table className="text-sm stiky stickyHead  ">
        <thead className="text-sm stiky stickyHead">
          <tr>
            <th className="text-sm text-center ">Ingredients</th>

            {distinctRecordsBatch.length > 0 &&
              distinctRecordsBatch.map((e, i) => (
                <>
                  <th>
                    <span className="text-sm whitespace-nowrap border-b w-full">
                      Batch NO {e}
                    </span>
                    <br />
                    <span>Actual Wt</span>
                  </th>
                  <th>Adj</th>
                  {/* <th>PD</th>
                  <th>ED</th> */}
                </>
              ))}
          </tr>
        </thead>

        <tbody className="text-sm stiky">
          {distinctRecords.map((itemcode, ix) => (
            <>
              <tr className="hover:bg-gray-800">
                <td className="text-sm  ">
                  <p className="text-sm ">
                    {itemcode}
                    {data
                      .filter((ff, i) => itemcode == ff.ItemCode)
                      .map((item, index) => (
                        <>{index == 1 ? " - " + item.ItemName : ""}</>
                      ))}
                  </p>
                </td>
                {distinctRecordsBatch.length > 0 &&
                  distinctRecordsBatch.map((e, i) => (
                    <>
                      {data
                        .filter(
                          (ff) => ff.batch === e && itemcode == ff.ItemCode
                        )
                        .map((item, index) => (
                          <>
                            <th className="text-sm whitespace-nowrap px-1 ">
                              {item.qty}
                            </th>
                            <th className="text-sm whitespace-nowrap px-1">
                              {item.adj}
                            </th>
                            {/* <th className="text-sm whitespace-nowrap px-1"></th>
                            <th className="text-sm whitespace-nowrap px-1"></th> */}
                          </>
                        ))}
                    </>
                  ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
