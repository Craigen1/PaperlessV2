import React, { useContext, useEffect, useState } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";
import MaterialListAddBatch from "./MaterialListAddBatch";
import { ITopContext } from "../../hooks/TopContext";

export default function MaterialListA(p) {
  const { userid } = useContext(ITopContext);

  const iSeeP = (e) => {
    console.log({ p });
  };
  const [SeeBatchList, setSeeBatchList] = useState(false);
  const [selectedBatchInto, setselectedBatchInto] = useState([]);

  const [batchInfo, setbatchInfo] = useState([]);
  const getBatchDetails = async () => {
    await EXEC_SQL_InsertOne(791, setbatchInfo, p.selectedHistoryInfo.id);
  };
  useEffect(() => {
    getBatchDetails();
  }, [p.selectedHistoryInfo.id]);
  useEffect(() => {
    console.log(p.selectedHistoryInfo);
  }, []);

  return (
    <div>
      <table className="w-full">
        <tr>
          <td className="px-1 font-bold">Itemcode</td>
          <td className="px-1 font-bold">Quantity</td>
          <td className="px-1 font-bold">Open</td>
          <td className="px-1 font-bold">Adj</td>
          <td className="px-1 font-bold">Needed</td>
          <td className="px-1 font-bold">Batch</td>
          <td className="px-1 font-bold">Quantity</td>
          <td className="px-1 font-bold">MNF</td>
          <td className="px-1 font-bold">EXP</td>
        </tr>

        {p.iBom.map((e, i) => (
          <tr
            className="cursor-pointer hover:bg-trans20"
            onClick={() => {
              setSeeBatchList(true);
              setselectedBatchInto(e);
            }}
          >
            <td>
              {e.ItemCode}
              <br />
              <span className="text-xs whitespace-nowrap"> {e.ItemName}</span>
            </td>
            <td></td>
            <td className="px-1">{e.qty}</td>
            <td className="px-1">{e.adj}</td>
            <td className="px-1">{e.needed}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </table>
      {SeeBatchList && (
        <MaterialListAddBatch
          setSeeBatchList={setSeeBatchList}
          selectedBatchInto={selectedBatchInto}
          selectedHistoryInfo={p.selectedHistoryInfo}
        />
      )}
    </div>
  );
}
