import React, { useContext, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  DefTableV2,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";

export default function SelfBillingDmpReport() {
  const [rows, setRows] = useState([]);
  const columns = [
    {
      name: "SubconPO",
      disabled: true,
    },
    {
      name: "DPURx",
      disabled: true,
    },
    {
      name: "DateUpload",
      disabled: true,
    },
    {
      name: "invoiceDate",
      disabled: true,
    },
    {
      name: "Invoicenum",
      disabled: true,
    },
    {
      name: "MNFDATE",
      disabled: true,
    },
    {
      name: "ItemCode",
      disabled: true,
    },
    {
      name: "Dscription",
      disabled: true,
    },
    {
      name: "Quantity",
      disabled: true,
    },
    {
      name: "quantitySELFBIll",
      disabled: true,
    },
    {
      name: "qty_diff",
      disabled: true,
    },

    {
      name: "UomCode",
      disabled: true,
    },
  ];
  const { DateNow, RowsForPrintContx, setRowsForPrintContx } =
    useContext(ITopContext);

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
  const [DateFrom, setDateFrom] = useState(DateNow);
  const [DateTo, setDateTo] = useState(DateNow);
  const [Loading, setLoading] = useState(false);
  const DateChangeHandler = (e) => {
    const { value, id } = e.target;
    console.log({ value, id });
    if (id == "MNFDateFrom") setDateFrom(value);
    if (id == "MNFDateTo") setDateTo(value);
  };
  const [checked1, setChecked1] = useState(false);

  const searchHandler = async (e) => {
    console.log(e.target);
    setLoading(true);
    let xxx = "" + !checked1;
    await EXEC_SQL_InsertOne(938, setRows, DateFrom, DateTo, xxx);
    setLoading(!true);
  };
  const [checked2, setChecked2] = useState(false);

  const changeHandler = async (e) => {
    const { value, id, name } = e.target;
    // if (id == "1") {
    //   setChecked1(true);
    //   setChecked2(false);
    // }
    // if (id == "2") {
    //   setChecked1(false);
    //   setChecked2(true);
    // }
    setChecked1(!checked1);
  };
  return (
    <div>
      <div className="frame flex gap-4">
        <div className="w-fit  flex">
          <input
            type="checkbox"
            id="1"
            name="1"
            checked={checked1}
            onClick={changeHandler}
          />
          {/* <p className="p-0 -m-0 ml-1 whitespace-nowrap">
            Group By Generated Self Bill Only
          </p> */}
        </div>
      </div>
      <div className="flex gap-2 pb-2 pt-1 frame">
        {Components.map((item, i) => (
          <div className="w-full">
            <DefInput
              label={item.label}
              id={item.id}
              type={item.type}
              defvalue={DateNow}
              handler={DateChangeHandler}
            />
          </div>
        ))}
        <DefButton
          type="2B"
          className="w-fit px-2 mt-4 pt-1"
          text="🔎Search"
          loading={Loading}
          onClick={searchHandler}
        />
      </div>

      <div className="frame ">
        {/* <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Select"
          spanCSS="w-full"
          className=""
          // handleOption={handleOption}
        /> */}

        <DefTableV2
          columns={columns}
          rows={rows}
          rowsPerPage={50}
          // OptionHandler={OptionHandler}
        />
      </div>
    </div>
  );
}
