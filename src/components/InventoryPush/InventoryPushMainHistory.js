import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import InventoryPushMainHistoryQrGen from "./InventoryPushMainHistoryQrGen";

export default function InventoryPushMainHistory() {
  let current = new Date();
  current = current.toLocaleDateString("en-CA");
  const [coveredDate, setcoveredDate] = useState({
    From: current,
    To: current,
  });
  const [QRvalue, setQRvalue] = useState("asdasdasasds");

  const handleOption = (e) => {
    const { id, name, value } = e.target;
    console.log({ name, value, id });
    setQRvalue(rows[id].DraftEntry);
  };

  const [rows, setrows] = useState([]);

  const onChangeHandler = async (e) => {
    const { name, value, id } = e.target;
    setcoveredDate((e) => ({ ...e, [name]: value }));
  };

  const [qrValue, setQrValue] = useState("");

  const columns = [
    {
      name: "Option",
      disabled: true,
      colspan: 1,
    },
    {
      name: "DraftEntry",
      disabled: true,
      colspan: 1,
    },
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },

    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Quantity",
      disabled: true,
      colspan: 1,
    },
    // {
    //   name: "BatchNum",
    //   disabled: true,
    //   colspan: 1,
    // },
    // {
    //   name: "MnfDate",
    //   disabled: true,
    //   colspan: 1,
    // },
    // {
    //   name: "ExpDate",
    //   disabled: true,
    //   colspan: 1,
    // },
  ];
  const onClickBack = async (e) => {
    setQRvalue(0);
  };
  const GetHistory = async (e) => {
    await EXEC_SQL_InsertOne(834, setrows, coveredDate.From, coveredDate.To);
    // await EXEC_SQL_InsertOne(886, setrows, coveredDate.From, coveredDate.To);
  };
  return (
    <>
      <div className="flex gap-x-2 frame px-2 py-2">
        <div className="w-full">
          <DefInput
            label="From"
            name="From"
            id="From"
            type="date"
            handler={onChangeHandler}
            className=""
            value={coveredDate.From}
          />
        </div>
        <div className="w-full">
          <DefInput
            label="To"
            name="To"
            id="To"
            type="date"
            handler={onChangeHandler}
            className=""
            value={coveredDate.To}
          />
        </div>
        <div className="mt-4">
          <DefButton
            text={"Search"}
            onClick={GetHistory}
            type="2B"
            className="w-fit px-2 float-right frame"
          />
        </div>
      </div>

      <div className="overflow-auto frame">
        <table>
          <tr>
            {columns.map((item) => (
              <th className="ml-2 px-2">{item.name}</th>
            ))}
          </tr>
          {rows.map((item, index) => (
            <InventoryPushMainHistoryQrGen
              columns={columns}
              item={item}
              qrvalue={item.DraftEntry}
              index={index}
            />
          ))}
        </table>
      </div>
    </>
  );
}
