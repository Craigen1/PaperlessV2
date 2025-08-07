import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import { LoadingSpinner } from "../assets/SVGs";

export default function MaterialUsagePMHistoryChildView(p) {
  const { userInfo, DateNow } = useContext(ITopContext);
  const [dateRange, setDateRange] = useState({
    from: DateNow,
    to: DateNow,
  });

  const dateRangeHandler = (e) => {
    const { value, name, id } = e.target;
    setDateRange((e) => ({ ...e, [id]: value }));
  };

  const [getDataloading, setGetDataloading] = useState(false);
  const [Rows, setRows] = useState([]);
  const getData = async () => {
    setGetDataloading(true);
    console.log(p.id);
    await EXEC_SQL_InsertOne(836, setRows, p.id);
    setGetDataloading(false);
  };

  const columns = [
    // {
    //   name: "Option",
    //   disabled: true,
    //   colspan: 1,
    // },
    // {
    //   name: "Po",
    //   disabled: true,
    //   colspan: 1,
    // },
    // {
    //   name: "ProdCode",
    //   disabled: true,
    //   colspan: 2,
    // },
    // {
    //   name: "ProdName",
    //   disabled: true,
    //   colspan: 0,
    // },
    {
      name: "PMCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "PMName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Quantity",
      disabled: true,
      colspan: 1,
    },
    {
      name: "Batch#",
      disabled: true,
      colspan: 1,
    },
  ];
  useEffect(() => {
    try {
      if (p.id != undefined) getData();
    } catch (error) {}
  }, [p.id]);

  return (
    <div>
      {/* <CompDateRange /> */}
      {!getDataloading ? (
        <div className="w-fit py-2">
          <DefTable columns={columns} rows={Rows} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
