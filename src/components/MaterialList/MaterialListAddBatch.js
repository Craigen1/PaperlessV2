import React, { useContext, useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../ComponentList";
import { formatDate } from "date-fns";
import MaterialListB from "./MaterialListB";
import { ITopContext } from "../../hooks/TopContext";

export default function MaterialListAddBatch(p) {
  const { userInfo } = useContext(ITopContext);

  const [rows, setrows] = useState([]);
  const [SelectedComp, setSelectedComp] = useState([
    {
      label: "ItemCode",
      name: "ItemCode",
      className: "col-span-1",
    },
    {
      label: "ItemName",
      name: "ItemName",
      className: "col-span-3",
    },
    {
      label: "WhsCode",
      className: "col-span-1",
      name: "WhsCode",
    },
    {
      label: "WhsName",
      className: "col-span-3",
      name: "WhsName",
    },
    {
      label: "Quantity",
      className: "col-span-2",
      name: "Quantity",
    },
    {
      label: "BatchNum",
      className: "col-span-2",
      name: "BatchNum",
    },
    {
      label: "MnfDate",
      className: "col-span-2",
      name: "MnfDate",
    },
    {
      label: "ExpDate",
      className: "col-span-2",
      name: "ExpDate",
    },
  ]);
  const [PreSelectedBatch, setPreSelectedBatch] = useState([]);
  const [sumNeeded, setsumNeeded] = useState(0);
  const [SelectedBatch, setSelectedBatch] = useState([]);
  const [batchRow, setbatchRow] = useState([]);
  const getStcks = async () => {
    await EXEC_SQL_InsertOne(792, setrows, p.selectedBatchInto.ItemCode);
  };
  const BatchSelection = async (e) => {};
  const [Quantity, setQuantity] = useState();
  const onChangeQuantity = (e) => {
    const { id, name, value } = e.target;
    setQuantity(parseFloat(value));
  };

  const selectQty = () => {
    const qtyText = document.getElementById("BatchSelectqty");
    qtyText.focus();
    qtyText.select();
  };

  const getPostedBatchofItem = async () => {
    await EXEC_SQL_InsertOne(
      973,
      setbatchRow,
      p.selectedHistoryInfo.id,
      p.selectedBatchInto.ItemCode
    );
  };
  const getNeeded = () => {
    setsumNeeded(0);
    let holder = 0;
    batchRow.map((e, i) => {
      console.log({ e });
      holder += parseFloat(e.Qty);
    });
    holder = p.selectedBatchInto.qty - holder;

    console.log(holder.toFixed(2));
    setsumNeeded(holder.toFixed(2));
  };
  const Post = async (e) => {
    if (sumNeeded < Quantity || PreSelectedBatch.Quantity < Quantity) {
      alert(
        "Input quantity is greater than [Needed] Quantity or [Batch] Quantity "
      );
      return;
    }
    if (PreSelectedBatch.BatchNum == undefined) {
      alert("Select a batch first");
      return;
    }
    await EXEC_SQL_InsertOne(
      840,
      setbatchRow,
      p.selectedBatchInto.id,
      PreSelectedBatch.BatchNum,
      Quantity,
      userInfo.ID
    );
    await getPostedBatchofItem();
    await getStcks();
    setPreSelectedBatch([]);
  };
  useEffect(() => {
    getPostedBatchofItem();
  }, []);

  useEffect(() => {
    if (
      p.selectedBatchInto.ItemCode != "" ||
      p.selectedBatchInto.ItemCode != undefined
    )
      getStcks();
  }, [p.selectedBatchInto.ItemCode]);

  useEffect(() => {
    getNeeded();
  }, [batchRow]);

  return (
    <div className="overflow-auto z-50 fixed top-0 right-0 bg-trans20 w-full h-full">
      <div className="overflow-auto z-50 w-[420px] h-[100vh] bg-white fixed top-0 right-0 px-2">
        <div className="justify-between flex mt-2">
          <span className="text-2xl font-semibold px-2">
            Select Batch from Batch List
          </span>
          <DefButton
            text="Close"
            onClick={() => p.setSeeBatchList(false)}
            type="11"
            className="w-fit px-2 float-right frame"
          />
        </div>
        <table className="frame w-full mt-4 mb-4">
          <tr className="bg-gray-710">
            <td className="font-bold">Batch</td>
            <td className="font-bold">Qty</td>
            <td className="font-bold">PD(yyyy-MM-dd)</td>
            <td className="font-bold">ED(yyyy-MM-dd)</td>
          </tr>
          {rows.map((e, i) => (
            <tr
              className="cursor-pointer hover:bg-trans20 border-b border-trans20            "
              onClick={() => {
                setPreSelectedBatch(e);
                selectQty();
              }}
            >
              <td className="text-md py-1 ">{e.BatchNum}</td>
              <td className="text-md py-1 ">{e.Quantity}</td>
              <td className="text-md py-1 ">
                {formatDate(e.MnfDate, "yyyy-MM-dd")}
              </td>
              <td className="text-md py-1 ">
                {formatDate(e.ExpDate, "yyyy-MM-dd")}
              </td>
            </tr>
          ))}
        </table>
        <div className="grid grid-cols-4  gap-2">
          {SelectedComp.map((e, i) => (
            <div className={e.className}>
              <DefInput
                label={e.label}
                id={i}
                disabled={true}
                value={PreSelectedBatch[e.name]}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DefInput
            label={"Needed"}
            id={"BatchSelectNeeded"}
            type="text"
            disabled={true}
            value={sumNeeded}
          />

          <DefInput
            label={"Quantity"}
            id={"BatchSelectqty"}
            type="number"
            handler={onChangeQuantity}
            value={Quantity}
          />
        </div>
        <DefButton
          text="Post"
          onClick={Post}
          type="11"
          className="w-fit px-2   frame float-right mt-4"
        />

        <div className="mt-10">
          <MaterialListB p={p} batchRow={batchRow} />
        </div>
      </div>
    </div>
  );
}
