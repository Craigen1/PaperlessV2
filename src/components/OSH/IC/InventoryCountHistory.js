import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import InventoryCountHistoryTable from "./InventoryCountHistoryTable";
import { Backdrop } from "@mui/material";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default function InventoryCountHistory() {
  let current = new Date();
  current = current.toLocaleDateString("en-CA");
  const columns = [
    {
      name: "Option",
      disabled: true,
    },
    {
      name: "StoreCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "StoreName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Diser",
      disabled: true,
      colspan: 1,
    },
    {
      name: "CountDate",
      disabled: true,
      colspan: 1,
    },
    {
      name: "status",
      disabled: true,
      colspan: 1,
    },
    {
      name: "remarks",
      disabled: true,
      colspan: 1,
    },
  ];
  const [rows, setrows] = useState([]);
  const [SelectedRow, setSelectedRow] = useState([]);
  const [headerValues, setHeaderValues] = useState({});
  const handleOnChange = async (e) => {
    const { id, name, value } = e.target;
    setHeaderValues((e) => ({ ...e, [id]: value }));
  };
  const Search = async (e) => {
    await EXEC_SQL_InsertOne(
      863,
      setrows,
      headerValues.From,
      headerValues.To,
      -10
    );
  };
  const handleOption = async (e) => {
    setSelectedRow(rows[e.target.id]);
    setCheckOn(!CheckOn);
  };
  const handleCHange = async (e) => {};

  useEffect(() => {
    setHeaderValues((e) => ({ ...e, From: current, To: current }));
  }, []);
  const [CheckOn, setCheckOn] = useState(false);
  return (
    <>
      {!CheckOn ? (
        <>
          <div className="frame flex gap-x-2 pb-2">
            <DefInput
              label="Count Date From"
              id="From"
              name="From"
              type="date"
              handler={handleOnChange}
              value={headerValues["From"]}
            />
            <DefInput
              label="To"
              id="To"
              name="To"
              type="date"
              handler={handleOnChange}
              value={headerValues["To"]}
            />

            <DefButton
              onClick={Search}
              type="10"
              text="Search"
              className="h-fit mt-4"
            />
          </div>
          <div className="frame">
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
        </>
      ) : (
        <>
          <button
            className="w-fit frame mx-2"
            onClick={(e) => {
              setCheckOn(!CheckOn);
            }}
          >
            <ArrowLeftIcon className="w-6 h-6 font-bold " />
          </button>
          <InventoryCountHistoryTable SelectedRow={SelectedRow} />
        </>
      )}
    </>
  );
}
