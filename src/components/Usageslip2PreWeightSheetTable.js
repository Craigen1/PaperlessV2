import React, { useState } from "react";
import MaterialUsage2PREWeighSheetTable from "./MaterialUsage2PREWeighSheetTable";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";
import Usageslip2PreWeightSheetTableA from "./Usageslip2PreWeightSheetTableA";

export default function Usageslip2PreWeightSheetTable() {
  const [mnf, setmnf] = useState([]);
  const [data, setdata] = useState([]);

  const updateDate = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setmnf(value);
  };
  const getRecords = async () => {
    await EXEC_SQL_InsertOne(766, setdata, mnf);
  };

  return (
    <div>
      <div className="flex gap-2 my-2">
        <DefInput
          type="date"
          id="mnfDate"
          label="MNF Date"
          handler={updateDate}
          className="w-fit"
        />
        <DefButton
          text="Search"
          onClick={getRecords}
          type="2B"
          className="btn btn-primary btm-sm mt-4"
        />
      </div>

      {data.map((e, i) => (
        <>
          <Usageslip2PreWeightSheetTableA items={e} />
        </>
      ))}
    </div>
  );
}
