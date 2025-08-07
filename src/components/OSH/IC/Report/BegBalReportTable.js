import React, { useEffect, useState } from "react";
import { EXEC_SQL_InsertOne } from "../../../ComponentList";

export default function BegBalReportTable(p) {
  const [Disable, setDisable] = useState(true);
  const [rows, setrows] = useState([]);
  const getRows = async () => {
    await EXEC_SQL_InsertOne(812, setrows, p.Storecode, p.AsOfDate);
    // await EXEC_SQL_InsertOne(823, setrows, p.Storecode, p.AsOfDate);
  };
  useEffect(() => {
    if (p.Storecode == undefined) return;
    if (p.AsOfDate == undefined) return;

    getRows();
  }, [p.Storecode, p.AsOfDate]);

  return (
    <div>
      <button onClick={() => setDisable(!Disable)} className="flex frame">
        <div className={!Disable ? "rotate-90 font-mono " : "font-mono"}>►</div>
        <div className="mx-2 font-semibold flex">
          OUTLET : <div className="w-20">{p.Storecode}</div> - {p.Storename}
        </div>
      </button>
      {Disable && (
        <>
          <table>
            <tr>
              <td
                colspan="3"
                className="border border-trans20  font-semibold px-2"
              ></td>
              <td
                colspan="2"
                className="border border-trans20  font-semibold px-2"
              >
                BEGINNING
              </td>
              <td
                rowSpan={2}
                className=" border border-trans20  font-semibold px-2"
              >
                DEL
              </td>
              <td
                colspan="2"
                className="border border-trans20  font-semibold px-2"
              >
                ENDING
              </td>
              <td
                rowSpan={2}
                className="border border-trans20  font-semibold px-2"
              >
                PULL OUT
              </td>
              <td
                rowSpan={2}
                className="border border-trans20  font-semibold px-2"
              >
                OFFTAKE
              </td>
            </tr>
            <tr>
              <td
                style={{ width: "150px" }}
                className="border border-trans20  font-semibold  px-2"
              >
                SKU
              </td>
              {/* <td
                style={{ width: "150px" }}
                className="border border-trans20  font-semibold  px-2"
              >
                SAP CODE
              </td> */}
              <td
                className="border border-trans20  font-semibold  px-2"
                style={{ width: "500px" }}
              >
                DESCRIPTION
              </td>
              <td
                className="border border-trans20  font-semibold  px-2"
                style={{ width: "120px" }}
              >
                EXP DATE
              </td>
              <td className="border border-trans20  font-semibold  px-2">SA</td>
              <td className="border border-trans20  font-semibold  px-2">WH</td>
              <td className="border border-trans20  font-semibold  px-2">SA</td>
              <td className="border border-trans20  font-semibold  px-2">WH</td>
            </tr>
            {rows != undefined && (
              <>
                {rows.map((item, index) => (
                  <tr key={index} className="hover:bg-[#0808083a]">
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.ItemCode}
                    </td>
                    {/* <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.ItemUnMask}
                    </td> */}
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.ItemName}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? item.pullout > 0
                            ? "border text-center border-trans20   px-2"
                            : "border text-center border-trans20   px-2"
                          : item.pullout > 0
                          ? "border text-center border-trans20   bg-[#ff212181] px-2"
                          : "border text-center border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.expDate}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.sellingCount}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.whCount}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.ItemUnMas}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.SellEnd}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.WhsEnd}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.pullout}
                    </td>
                    <td
                      className={
                        index % 2 == 0
                          ? "border border-trans20   px-2"
                          : "border border-trans20   bg-trans20 px-2"
                      }
                    >
                      {item.OffTake}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </table>
        </>
      )}
    </div>
  );
}
