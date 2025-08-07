import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTableV2,
  EXEC_SQL_InsertOne,
} from "../../../ComponentList";
import { ITopContext } from "../../../../hooks/TopContext";
import ComplianceReportCharts from "./ComplianceReportCharts";

export default function ComplianceReport(p) {
  const [rows, setrows] = useState([]);
  const [getTaskLoad, setgetTaskLoad] = useState(false);
  const { DateNow, userInfo } = useContext(ITopContext);

  const onKeyDown = async (e) => {
    const { id, lang } = e.target;
    let xx = e.target.textContent;
    if (e.key != "Enter") return;
  };
  const [componentvalues, setcomponentvalues] = useState({
    weeks: p.weeks,
    asof: p.asof,
  });
  const onChange = (e) => {
    console.log(e);
  };

  const [columns, setcolumns] = useState([
    {
      name: "Assignee",
      label: "Assignee",
      id: "Assignee",
      width: "180px",
      editable: "true",
    },
  ]);

  const OptionHandler = async (e) => {
    const { id, name, value, lang } = e.target;
    console.log({ id, name, value, lang });
  };
  function customCss(rows, index) {
    let css = "";

    if (index > 3 && index < columns.length - 1 && rows > 0)
      return " bg-mainLink w-5 h-5 text-mainLink mx-auto mx-1 rounded-full ";
    let xx = "w-[" + rows + "%] bg-black";
    if (index == columns.length - 1)
      return `w${rows}  rounded-lg bg-mainLink px-1 my-0.5  text-white`;
  }

  const datehandler = (e) => {
    setcomponentvalues((x) => ({ ...x, [e.target.id]: e.target.value }));
  };

  const Search = async () => {
    await EXEC_SQL_InsertOne(
      819,
      setcolumns,
      componentvalues.weeks,
      componentvalues.asof
    );
    await EXEC_SQL_InsertOne(
      818,
      setrows,
      componentvalues.asof,
      componentvalues.weeks,
      p.StoreName
    );
  };
  const [counted, setcounted] = useState(0);
  const [miss, setmiss] = useState(0);
  const getPercentage = () => {
    setcounted(0);
    setmiss(0);

    let SumCounted = 0;
    let SumMiss = 0;
    let rowCount = 0;
    let colCount = 0;
    const percentperrorw = rows.map((r, index) => {
      colCount = 0;
      rowCount = 0;
      columns.map((c, cIndex) => {
        if (cIndex < columns.length - 1 && cIndex > 3) {
          if (r[c.name] > 0) {
            rowCount += 1;
            SumCounted += 1;
          } else {
            SumMiss += 1;
          }
          colCount += 1;
        }
      });

      let Percent = 0;
      Percent = ((colCount - rowCount) / colCount) * 100;
      Percent = (Percent - 100) * -1;
      Percent = parseInt(Percent);
      console.log({ colCount, rowCount });
      return {
        ...r,
        Percentage: Percent,
        colCount: colCount,
        rowCount: rowCount,
      };
    });
    setmiss(SumMiss);
    setcounted(SumCounted);
    setrows(percentperrorw);
  };
  useEffect(() => {
    if (rows.length <= 0) return;
    if (rows[0].Percentage != undefined) return;
    getPercentage();
  }, [rows]);
  useEffect(() => {
    Search();
  }, [p.StoreName]);

  return (
    <div>
      {/* <div className="flex gap-2">
        <DefInput
          id="asof"
          label="As of"
          type="date"
          min="1"
          max="48"
          value={componentvalues.asof}
          handler={datehandler}
        />

        <DefInput
          id="weeks"
          label="Month(s)"
          type="number"
          min="1"
          max="48"
          value={componentvalues.weeks}
          handler={datehandler}
        />

        <DefButton
          text="Search"
          type="10"
          className="mx-2 h-fit mt-4"
          onClick={Search}
        />
      </div> */}
      <div className="overflow-auto">
        <DefTableV2
          columns={columns}
          rows={rows}
          customCss={customCss}
          OptionHandler={OptionHandler}
          loading={getTaskLoad}
          onChange={onChange}
          onKeyDown={onKeyDown}
          freeze={true}
          freezeIndex={3}
        />
      </div>
      {/* <DefButton
        text="Search"
        type="10"
        className="mx-2 h-fit mt-4"
        onClick={getPercentage}
      /> */}

      {/* <ComplianceReportCharts counted={counted} miss={miss} /> */}
    </div>
  );
}
