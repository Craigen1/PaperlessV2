import React, { useEffect, useState } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";
import { LoadingSpinner } from "../../assets/SVGs";

export default function ProrationAddMaterialPoSelection(p) {
  const [rows, setrows] = useState([]);
  const [loading, setloading] = useState(false);
  const getSomething = async () => {
    setloading(true);

    await EXEC_SQL_InsertOne(
      797,
      setrows,
      p.compValues.Station,
      p.compValues.ProrationType,
      p.compValues.ProductionDate
    );
    setloading(!true);
    setonGet(true);
  };

  const Handler = (e) => {
    const { value, id, checked } = e.target;
    const newRow = rows.map((e, i) => {
      console.log({ id, i });
      if (parseInt(id) == parseInt(i)) return { ...e, Selected: checked };
      return e;
    });
    setrows(newRow);
  };
  const ICHoose = () => {
    const newRow = rows
      .filter((e) => e.Selected === true)
      .map((e) => {
        if (e.Selected == true) return { ...e };
      });
    console.log({ rows });
    console.log({ newRow });
    p.setChosnProdOrders(newRow);
    p.setChoose(false);
  };

  useEffect(() => {
    if (p.compValues.Station == "" || p.compValues.Station == undefined) return;
    if (
      p.compValues.ProrationType == "" ||
      p.compValues.ProrationType == undefined
    )
      return;
    if (
      p.compValues.ProductionDate == "" ||
      p.compValues.ProductionDate == undefined
    )
      return;
    getSomething();
  }, [
    p.compValues.Station,
    p.compValues.ProrationType,
    p.compValues.ProductionDate,
  ]);

  return (
    <div className="fixed bg-trans50 z-50 w-full h-full top-0 left-0">
      <div className="max-w-[1212px] border bg-SAP-form mx-auto mt-20">
        <div className="border-b-4 border-SAP-headerLine bg-SAP-header flex ">
          <div className="w-full mx-2 font-semibold">
            Choose Production Orders
          </div>
          <div>
            <DefButton
              type="4"
              onClick={() => p.setChoose(false)}
              text="Close"
              className="px-2 mx-1 mb-1"
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <tr>
              <td>Batch</td>
              <td className="w-fit">Selected</td>
              <td>DocNum</td>
              <td>ItemCode</td>
              <td></td>
              <td>Output</td>
              <td>DMPI Sample</td>
              <td>PO</td>
            </tr>
            {!loading ? (
              <>
                {rows.length > 0 && (
                  <>
                    {rows.map((e, i) => (
                      <>
                        <tr>
                          <td className="whitespace-nowrap">{e.Batch}</td>
                          <td className=" bg-[#fff] w-fit">
                            <input
                              type="checkbox"
                              className="mx-auto"
                              onClick={Handler}
                              id={i}
                            />
                          </td>
                          <td className="whitespace-nowrap">{e.DocNum}</td>
                          <td className="whitespace-nowrap">{e.ItemCode}</td>
                          <td className="whitespace-nowrap">{e.ItemName}</td>
                          <td className="whitespace-nowrap">{e.Output}</td>
                          <td className="whitespace-nowrap">{e.Batch}</td>
                          <td className="whitespace-nowrap">{e.PO}</td>
                        </tr>
                      </>
                    ))}
                  </>
                )}

                {rows.length <= 0 ? "No record found" : ""}
              </>
            ) : (
              <LoadingSpinner />
            )}
          </table>
          {rows.length > 0 && (
            <DefButton
              type="4"
              onClick={ICHoose}
              text="Choose"
              className="px-2 mx-1 mb-1 float-right my-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
