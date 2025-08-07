import React, { useState } from "react";
import {
  DefButton,
  DefInput,
  DefTableComPressed,
  DynamicTable,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { queryCreator } from "./BackFlashReversal";

export default function JeReversal() {
  const [RFP, setRFP] = useState("");
  const [loading, setloading] = useState(false);
  const [rowsRFP, setrowsRFP] = useState([]);
  const [rowsIFP, setrowsIFP] = useState([]);

  const getRows = async (e) => {
    setloading(true);
    setrowsRFP([]);
    setrowsIFP([]);
    await EXEC_SQL_InsertOne(770, setrowsRFP, RFP);
    await EXEC_SQL_InsertOne(769, setrowsIFP, RFP);
    setloading(!true);
  };

  const postIt = (e) => {
    setloading(true);
    queryCreator(rowsIFP, setrowsRFP, setrowsIFP);
    setloading(!true);
  };
  return (
    <>
      <div className="flex">
        <DefInput
          type="number"
          label="RFP Number"
          className="w-fit"
          handler={(e) => setRFP(e.target.value)}
        />
        <DefButton
          text="Search"
          onClick={getRows}
          type="2B"
          className=" mx-2 mt-4 btn btn-primary btn-sm"
        />
      </div>
      {rowsRFP.length > 0 && (
        <>
          <h4 className="mt-4">IFP Journal Entry</h4>
          <DynamicTable rows={rowsRFP} />
        </>
      )}
      {rowsIFP.length > 0 && (
        <>
          <h4 className="mt-4">Reversal Journal Entry</h4>
          <DynamicTable rows={rowsIFP} />
          <DefButton
            text="Post Cancelation"
            onClick={postIt}
            type="2B"
            loading={loading}
            className="btn btn-sm btn-primary"
          />
        </>
      )}
    </>
  );
}
