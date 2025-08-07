import React, { useEffect, useState } from "react";
import { EXEC_SQL_InsertOne } from "../../../../ComponentList";
import { LoadingSpinner } from "../../../../../assets/SVGs";
import InventoryReportLevel2B from "./InventoryReportLevel2B";

export default function InventoryReportLevel2(p) {
  const [rows, setrows] = useState([]);
  const [loading, setloading] = useState(true);
  const getChild = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(809, setrows, p.store, p.weeks, p.asof);
    setloading(false);
  };
  useEffect(() => {
    getChild();
  }, [p.store]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {rows.map((item, index) => (
            <InventoryReportLevel2B
              index={index}
              item={item}
              store={p.store}
              weeks={p.weeks}
              asof={p.asof}
            />
          ))}
        </>
      )}
    </>
  );
}
