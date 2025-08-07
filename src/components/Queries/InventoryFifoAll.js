import React, { useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "../ComponentList";

export default function InventoryFifoAll() {
  const [FgCode, setFgCode] = useState("");
  const [LoadingState, setLoadingState] = useState(false);
  const [Lines, setLines] = useState([]);

  const onClickHandler = async (e) => {
    setLoadingState(true);
    await EXEC_SQL_InsertOne(806, setLines, FgCode);
    setLoadingState(false);
  };
  const onChangeHandler = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setFgCode(value);
  };
  const columns = [
    {
      name: "ItemCode",
      colspan: 2,
    },
    {
      name: "ItemName",
      colspan: 0,
    },
    {
      name: "BatchNum",
      colspan: 1,
    },
    {
      name: "Quantity",
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
    <div>
      <div className=" flex frame">
        <div className="w-full">
          <DefInput
            label="ItemCode"
            className="w-full"
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

      <DefTable
        columns={columns}
        rows={Lines}
        // handleOption={handleOption}
        btnLabel="scan"
        disabled={true}
        className="bg-SAP-form   frame text-black"
        spanCSS="text-black"
      />
    </div>
  );
}
