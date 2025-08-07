import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "./ComponentList";

export default function MaterialUsagePmScanSelectection(p) {
  const ComponentList = [
    {
      id: "itemcode",
      label: "ItemCode",
      type: "text",
      disabled: true,
      colspan: "1",
    },
    {
      id: "itemname",
      label: "ItemName",
      type: "text",
      disabled: true,
      colspan: "3",
    },
    {
      id: "uom",
      label: "UoM",
      type: "text",
      disabled: true,
      colspan: "1",
    },
    {
      id: "batchcode",
      label: "BatchCode",
      type: "text",
      disabled: false,
      colspan: "2",
    },
    {
      id: "OnHand",
      label: "OnHand",
      type: "text",
      disabled: true,
      colspan: "2",
    },
    {
      id: "qty",
      label: "Quantity",
      type: "number",
      disabled: false,
      colspan: "1",
    },
  ];
  const [HasError, setHasError] = useState(false);
  const [Batch, setBatch] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [SelectedBatchQty, setSelectedBatchQty] = useState(0);
  const [BatchHolder, setBatchHolder] = useState([]);
  const onChangehandler = (e) => {
    const { id, value, name } = e.target;
    console.log({ id, value, name, SelectedBatchQty });
    setHasError(false);
    if (id == "Quantity" && (value <= 0 || value > SelectedBatchQty))
      setHasError(true);
    if (id == "Quantity") setQuantity(value);
    if (id == "BatchCode") setBatch(value);
    if (id == "clearBatch") setBatch("");

    BatchHolder.map((item) => {
      if (item.BatchNum == value) setSelectedBatchQty(item.Quantity);
    });
  };
  const AddToList = (e) => {
    const { id, value } = e.target;
    console.log({ id, value, Quantity });
    p.secRow((e) => [
      ...e,
      {
        PMName: p.map.PMName,
        PMCode: p.map.PMCode,
        UoM: p.map.UoM,
        Quantity: Quantity,
        Batch: Batch,
        linenum: p.map.linenum,
      },
    ]);
    p.setScanningShow(false);
  };
  useEffect(() => {
    if (p.map != undefined)
      EXEC_SQL_InsertOne(930, setBatchHolder, p.map.PMCode, p.map.Warehouse);
  }, [p.map]);
  useEffect(() => {
    console.log(p.map);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-trans50 z-50 ">
        <div className="mt-40"></div>
        <div className="frame max-w-4xl  pb-4 m-auto  ">
          <h1></h1>
          <br></br>
          <DefButton
            text="x"
            type="2"
            className="w-fit px-2 float-right mt-2"
            onClick={() => {
              p.showme(false);
            }}
          />
          <br></br>
          <div className="tablet:grid  tablet:grid-cols-4 gap-2">
            {ComponentList.map((item, index) => (
              <div className={`col-span-${item.colspan}`}>
                <DefInput
                  label={item.id == "" ? "" : item.label}
                  id={item.label}
                  disabled={item.id == "qty" ? "" : item.disabled}
                  handler={onChangehandler}
                  type={item.type}
                  value={
                    item.id == "itemcode"
                      ? p.map.PMCode
                      : item.id == "itemname"
                      ? p.map.PMName
                      : item.id == "uom"
                      ? p.map.UoM
                      : item.id == "qty"
                      ? Quantity
                      : item.id == "OnHand"
                      ? SelectedBatchQty.toFixed(2).replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          "$1,"
                        )
                      : ""
                  }
                  clearid="clearBatch"
                  map={item.id == "batchcode" ? BatchHolder : undefined}
                  dropDownId={item.id == "batchcode" ? 99999 : undefined}
                />
              </div>
            ))}
          </div>
          <DefButton
            text="Add"
            onClick={AddToList}
            className="mt-2 w-fit px-4 float-right "
            loading={Batch == "" || Quantity == 0 || HasError ? true : false}
          />
          {HasError ? (
            <p className="text-red-500 p-0 -m-0">*Check you inputs* </p>
          ) : (
            ""
          )}
          <div className="h-10"></div>
        </div>
      </div>
    </>
  );
}
