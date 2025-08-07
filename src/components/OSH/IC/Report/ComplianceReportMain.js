import React, { useContext, useState } from "react";
import ComplianceReport from "./ComplianceReport";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertOne,
} from "../../../ComponentList";
import { ITopContext } from "../../../../hooks/TopContext";
import ComplianceReportBridge from "./ComplianceReportBridge";

export default function ComplianceReportMain() {
  const { DateNow, userInfo } = useContext(ITopContext);
  const [rows, setrows] = useState([]);
  const [componentvalues, setcomponentvalues] = useState({
    weeks: 4,
    asof: DateNow,
  });
  const datehandler = (e) => {
    setcomponentvalues((x) => ({ ...x, [e.target.id]: e.target.value }));
  };

  const Search = async () => {
    setrows([]);
    await EXEC_SQL_InsertOne(
      811,
      setrows,
      componentvalues.weeks,
      componentvalues.asof
    );
  };

  return (
    <div>
      <div className="flex gap-2">
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
      </div>
      {/* <ComplianceReport /> */}

      {rows.map((item) => (
        <>
          <ComplianceReportBridge
            StoreName={item.StoreName}
            weeks={componentvalues.weeks}
            asof={componentvalues.asof}
          />
        </>
      ))}
    </div>
  );
}
