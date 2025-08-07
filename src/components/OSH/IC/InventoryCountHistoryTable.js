import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import { ITopContext } from "../../../hooks/TopContext";

export default function InventoryCountHistoryTable(p) {
  const { setPop, setpopTitle, setpopLabel } = useContext(ITopContext);
  const { DateNow, userInfo } = useContext(ITopContext);
  const [components, setcomponents] = useState([
    {
      name: "Document Number",
      id: "DocNum",
      type: "text",
      disabled: true,
    },
    {
      name: "Diser",
      id: "Diser",
      type: "text",
      disabled: true,
    },
    {
      name: "Count Date",
      id: "Cdate",
      type: "date",
      disabled: false,
      css: 4,
    },
    {
      name: "Status",
      id: "Status",
      type: "text",
      disabled: true,
      css: 4,
    },
    {
      name: "Store Name",
      id: "storeName",
      type: "text",
      disabled: true,
      css: "col-span-2",
    },

    {
      name: "Remarks",
      id: "Remarks",
      type: "text",
      disabled: false,
      css: "col-span-2",
    },
  ]);
  const [CompValue, setCompValue] = useState({
    storeName: "",
    date: DateNow,
    Status: "O - Open",
    DiserID: userInfo.ID,
    Diser:
      userInfo.firstname.toUpperCase() + " " + userInfo.lastname.toUpperCase(),
  });
  const columns = [
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
      name: "systemCount",
      disabled: true,
      colspan: 1,
    },
    {
      name: "sellingCount",
      disabled: true,
      colspan: 1,
    },
    {
      name: "rtvCount",
      disabled: true,
      colspan: 1,
    },

    {
      name: "Total",
      disabled: true,
      colspan: 1,
    },
    {
      name: "expDate",
      disabled: true,
      colspan: 1,
    },
  ];
  const [rows, setrows] = useState([]);
  const handleOption = async (e) => {};
  const handleCHange = async (e) => {};
  const getRowsValues = async (e) => {
    await EXEC_SQL_InsertOne(862, setrows, p.SelectedRow.id);
  };
  const [updateReturnStat, setUpdateReturnStat] = useState([]);
  const [loading, Setloading] = useState(!true);
  const UpDateTosetPop = async (e) => {
    Setloading(true);
    await EXEC_SQL(842, setUpdateReturnStat, p.SelectedRow.id);

    Setloading(false);
  };
  const UpDateTosetPopCancel = async (e) => {
    setopenStats(false);
  };

  const [openStats, setopenStats] = useState(false);

  const triggerCloseINventoryCount = async (e) => {
    setopenStats(true);
  };
  useEffect(() => {
    if (p.SelectedRow.id != undefined) getRowsValues();
  }, [p.SelectedRow]);

  useEffect(() => {
    if (updateReturnStat.length == 0) return;
    UpDateTosetPopCancel();
    setopenStats(false);
    setpopTitle("Inventory count");
    setpopLabel("Document Close");
    setPop(true);
    setUpdateReturnStat([]);
  }, [updateReturnStat]);

  return (
    <>
      <div className="frame pb-2 mb-2">
        <div className="grid  grid-cols-2 gap-x-2    ">
          {components.map((item, index) => (
            <div className={item.css}>
              <DefInput
                type={item.type}
                id={item.id}
                label={item.id}
                name={item.id}
                disabled={true}
                value={p.SelectedRow[item.id]}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="frame my-2">
        <DefTable
          columns={columns}
          rows={rows}
          btnCss="w-fit "
          btnLabel="Check"
          spanCSS="w-full"
          handleOption={handleOption}
          onChange={handleCHange}
        />
      </div>

      <DefButton
        type="10"
        text="Close Inventory Count"
        onClick={triggerCloseINventoryCount}
      />

      {openStats && (
        <div className="fixed z-50 top-0 left-0 bg-trans50 w-full h-full">
          <div className="p-1 bg-white   shadow-sm  mt-40  max-w-xl mx-auto border-l-8 border-WhiteMode-ButtonBackground000">
            <p className="p-2">Are you sure you want to close this documnet?</p>
            <div className="flex justify-between gap-2">
              <DefButton
                type="4"
                text="Cancel"
                onClick={UpDateTosetPopCancel}
                className="px-2 m-1 h-fit"
              />
              <DefButton
                type="11"
                text="Close Inventory Count"
                onClick={UpDateTosetPop}
                loading={loading}
                className="px-2 h-fit"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
