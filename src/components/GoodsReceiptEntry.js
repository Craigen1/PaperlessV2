import React, { useEffect, useRef, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import GoodsReceiptEntryItemTable from "./GoodsReceiptEntryItemTable";
import GoodsReceiptEntryItemSelection from "./GoodsReceiptEntryItemSelection";

export default function GoodsReceiptEntry() {
  const [tab, settab] = useState(1);
  const selectRef = useRef();
  const [SelectingItem, setSelectingItem] = useState(false);
  const [SelecteItemcode, setSelecteItemcode] = useState("");
  const [itemListMaps, setitemListMaps] = useState([]);
  const headerComponets = [
    {
      id: "DocEntry",
      name: "Number",
      type: "Number",
    },
    {
      id: "Series",
      name: "Series",
      type: "text",
    },
    {
      id: "TransType",
      name: "Transaction Type",
      type: "text",
    },
    {
      id: "PostingDate",
      name: "Posting Date",
      type: "Date",
    },
    {
      id: "DocDate",
      name: "Document Date",
      type: "Date",
    },
    {
      id: "BPLid",
      name: "Branch",
      type: "text",
    },
  ];
  const SelectItem = async (e) => {
    setSelecteItemcode(!SelecteItemcode);
  };
  const ChangeTab = async (e) => {
    const { id, name } = e.target;
    settab(id);
  };

  useEffect(() => {
    EXEC_SQL_InsertOne(932, setitemListMaps);
  }, []);

  return (
    <>
      <div>
        <div className="grid  grid-cols-4 gap-x-2 frame pb-2">
          {headerComponets.map((item, index) => (
            <div>
              <DefInput label={item.name} />
            </div>
          ))}
        </div>
        {/* Tabs  */}
        <div className="frame py-1">
          <DefButton
            id="1"
            onClick={ChangeTab}
            text="Item"
            className="w-fit px-2 mr-2"
            type={tab == "1" ? "2" : "2B"}
          />
          <DefButton
            id="2"
            onClick={ChangeTab}
            text="Batch"
            className="w-fit px-2"
            type={tab == "2" ? "2" : "2B"}
          />
          {tab == "1" ? (
            <div className="float-right grid grid-cols-2 gap-2">
              <DefButton
                id="1"
                // onClick={ChangeTab}
                text="🔘 Select Item"
                className="w-fit px-2  mt-0.5"
                type={"3B"}
                onClick={SelectItem}
              />
              <DefButton
                id="1"
                // onClick={ChangeTab}
                text="📸 Scan Item"
                className="w-fit px-2  mt-0.5"
                type={"3B"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {/* forms */}
        <GoodsReceiptEntryItemTable />

        {SelecteItemcode ? (
          <GoodsReceiptEntryItemSelection
            ref={selectRef}
            selectedItem={setSelecteItemcode}
            itemList={itemListMaps}
          />
        ) : (
          ""
        )}
        {SelecteItemcode}
      </div>
    </>
  );
}
