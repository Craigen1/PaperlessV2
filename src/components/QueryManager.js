import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertOne,
  EXEC_SQL,
  DefTable,
} from "./ComponentList";
export default function QueryManager() {
  const { setloading } = useContext(ITopContext);
  const [Temp, setTemp] = useState([]);
  const [Temp2, setTemp2] = useState([]);
  const btnHandler = () => {
    EXEC_SQL(999, setTemp);
    EXEC_SQL(998, setTemp2);
  };

  const q = window.location.search;
  const urlp = new URLSearchParams(q);

  const columnsdrdelnotif = [
    {
      name: "ItemCode",
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
      name: "RFP_Quantity",
      colspan: 1,
    },
    {
      name: "DR_Quantity",
      colspan: 1,
    },
    {
      name: "EQ",
      colspan: 1,
    },
  ];

  const [rowsdrdelnotif, setrowsdrdelnotif] = useState([]);
  const execx = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(53, setrowsdrdelnotif);
    setloading(false);
  };
  useEffect(() => {
    execx();
  }, []);

  return (
    <>
      <div className="mx-2">
        <DefTable
          columns={columnsdrdelnotif}
          rows={rowsdrdelnotif}
          disabled={true}
        />
      </div>
    </>
  );
}
