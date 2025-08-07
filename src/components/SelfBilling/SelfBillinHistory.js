import React, { useContext, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertMulti,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import { EXEC_SQL_InsertOne } from "../ComponentList";

export default function SelfBillinHistory() {
  const { DateNow } = useContext(ITopContext);
  const [rows, setRows] = useState([]);
  const [MnfFrom, setMnfFrom] = useState(DateNow);
  const [MnfTo, setMnfTo] = useState(DateNow);
  const datesHandler = async (e) => {
    const { value, id } = e.target;
    console.log({ value, id });
    if (id === "MNFDateFrom") {
      setMnfFrom(value);
    } else if (id === "MNFDateTo") {
      setMnfTo(value);
    }
  };

  const searchHandler = async (e) => {
    if (MnfFrom === "") return;
    if (MnfTo === "") return;
    await EXEC_SQL_InsertOne(947, setRows, MnfFrom, MnfTo);
  };

  const columns = [
    {
      name: "UPLOADENTRY",
      disabled: true,
    },

    {
      name: "SAPDOC",
      disabled: true,
    },
    {
      name: "DPUR",
      disabled: true,
    },
    {
      name: "PO",
      disabled: true,
    },
    {
      name: "MNFDATE",
      disabled: true,
    },

    {
      name: "ITEMCODE",
      disabled: true,
    },
    {
      name: "QUANTITY",
      disabled: true,
    },
    {
      name: "PRICE",
      disabled: true,
    },
    {
      name: "LINETOTAL",
      disabled: true,
    },
    {
      name: "UOM",
      disabled: true,
    },
  ];
  const Components = [
    {
      id: "MNFDateFrom",
      label: "📅 MNF Date From",
      type: "Date",
    },
    {
      id: "MNFDateTo",
      label: "📅 To",
      type: "Date",
    },
  ];

  return (
    <div>
      <div className="frame">
        <div className="flex gap-2 pb-2 pt-1">
          {Components.map((item, i) => (
            <div className="w-full">
              <DefInput
                label={item.label}
                id={item.id}
                type={item.type}
                defvalue={DateNow}
                handler={datesHandler}
              />
            </div>
          ))}
          <DefButton
            type="2B"
            className="w-fit px-2 mt-4 pt-1"
            text="🔎Search"
            onClick={searchHandler}
          />
        </div>
      </div>
      <div className="frame ">
        <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Remove"
          spanCSS="w-full"
          className=""
        />
      </div>
    </div>
  );
}
