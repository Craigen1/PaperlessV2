import React, { useState } from "react";
import { DefButton, DefInput, DefTable, EXEC_SQL } from "../ComponentList";

export default function InventoryFifo() {
  const onClickHandler = async (e) => {
    setLoadingState(true);
    await EXEC_SQL(873, setLines, FgCode);
    setLoadingState(false);
  };
  const onChangeHandler = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setFgCode(value);
  };

  const [FgCode, setFgCode] = useState("");
  const [LoadingState, setLoadingState] = useState(false);
  const [Lines, setLines] = useState([]);

  const columns = [
    {
      name: "BASE_REF",
      colspan: 1,
    },
    {
      name: "DocType",
      colspan: 1,
    },
    {
      name: "CreateDate",
      colspan: 1,
    },
    {
      name: "inQty",
      colspan: 1,
    },
    {
      name: "outQty",
      colspan: 1,
    },
    {
      name: "Direction",
      colspan: 1,
    },
    {
      name: "WhsCode",
      colspan: 1,
    },

    {
      name: "BatchNum",
      colspan: 1,
    },
    {
      name: "MnfDate",
      colspan: 1,
    },
    {
      name: "ExpDate",
      colspan: 1,
    },
  ];
  return (
    <>
      <p className="frame">
        ⚠️FiFo Card shows only 30 days worth of record base on Item selected⚠️
      </p>

      <div className="frame flex">
        <div className="w-full">
          <DefInput
            label="ItemCode"
            handler={onChangeHandler}
            dropDownId={872}
          />
        </div>
        <DefButton
          text="Search"
          onClick={onClickHandler}
          type="2B"
          className="w-fit px-2 float-right frame mt-8 bg-WhiteMode-header"
          loading={LoadingState}
        />
      </div>

      <div className="frame overflow-auto">
        <DefTable
          columns={columns}
          rows={Lines}
          btnLabel="scan"
          disabled={true}
          className="bg-SAP-form   frame text-black"
          spanCSS="text-black"
        />
      </div>
    </>
  );
}
