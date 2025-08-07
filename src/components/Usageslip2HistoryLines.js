import React, { useEffect, useState } from "react";
import { DefButton, DefTable, EXEC_SQL_InsertOne } from "./ComponentList";
import Usageslip2HistoryLinesAdj from "./Usageslip2HistoryLinesAdj";
import { LoadingSpinner } from "../assets/SVGs";
import { formatDate } from "date-fns";
export default function Usageslip2HistoryLines(p) {
  const today = new Date();
  const columns = [
    {
      name: "ItemNo",
      disabled: true,
      colspan: 2,
    },

    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Quantity",
      disabled: true,
    },
    {
      name: "Whse",
      disabled: true,
    },

    {
      name: "UoMCode",
      disabled: true,
    },
    {
      name: "Bin_ID",
      disabled: true,
    },
    {
      name: "Option",
    },
  ];
  const [selectedIndex, setselectedIndex] = useState(0);
  const [hasSelected, sethasSelected] = useState(false);
  const [rows, setRows] = useState([]);
  // const [From, setFrom] = useState(
  //   `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`
  // );
  // const [To, setTo] = useState(
  //
  // );

  const get903 = async (e) => {
    let Fromx = p.From + "";
    let Tox = p.To + "";
    await EXEC_SQL_InsertOne(903, setRows, To, From);
  };

  const [To, setTo] = useState(today);
  const [From, setFrom] = useState(today);
  useEffect(() => {
    try {
      setFrom(formatDate(From, "yyyy-MM-dd").substring(0, 11));
      setFrom(`${From.getFullYear()}.${From.getMonth()}.${From.getDate()}`);
      setTo(`${To.getFullYear()}.${To.getMonth()}.${To.getDate()}`);
    } catch (error) {}
  }, [To, From]);
  useEffect(() => {
    setTo(today);
    setFrom(today);
  }, []);

  // const handleSelection = (e) => {
  //   const { key, name, id } = e.target;
  //   console.log({ key, name, id, e });
  //   return;

  return (
    <div>
      <div className="flex gap-2 my-2 pb-2">
        <input
          type="date"
          className=" input input-sm w-fit"
          onChange={(e) => setTo(e.target.value)}
          value={To}
        ></input>
        <input
          type="date"
          className=" input input-sm w-fit"
          onChange={(e) => setFrom(e.target.value)}
          value={From}
        ></input>
        <DefButton
          text="Search"
          className="btn btn-primary m-0 btn-sm"
          id={"search"}
          type="2B"
          onClick={get903}
        />
      </div>
      <div className="">
        <div className="frame invisible -mt-8">x</div>
        {!hasSelected && (
          <>
            <div className="overflow-auto">
              <table className="w-full">
                <tr className="">
                  <td className=" pb-1 mx-0.5 px-1">ID</td>
                  <td className="mx-0.5 px-1">Status</td>
                  <td className="mx-0.5 px-1">MNF</td>
                  <td className="mx-0.5 px-1">Batch</td>
                  <td className="mx-0.5 px-1">Type</td>
                  <td className="mx-0.5 px-1">Rev</td>
                  <td className="mx-0.5 px-1">Size</td>
                  <td className="mx-0.5 px-1">Machine</td>
                  <td className="mx-0.5 px-1">Station</td>
                </tr>
                {rows.map((e, i) => (
                  <>
                    <tr
                      key={i}
                      id={i}
                      name={i}
                      className="frame hover:cursor-pointer hover:bg-trans20 active:bg-SAP-headerLine mt-2"
                      onClick={() => {
                        setselectedIndex(i);
                        sethasSelected(true);
                      }}
                    >
                      <td className=" px-2 whitespace-nowrap border">{e.id}</td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.Status}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.MNFdate}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.batch}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.UsageType}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.RevDesc}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.size}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.Machine}
                      </td>
                      <td className=" px-2 whitespace-nowrap border">
                        {e.station}
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            </div>
          </>
        )}

        {hasSelected && (
          <div className="max-w-2xl ">
            <Usageslip2HistoryLinesAdj
              index={selectedIndex}
              rows={rows}
              sethasSelected={sethasSelected}
            />
          </div>
        )}
      </div>
    </div>
  );
}
