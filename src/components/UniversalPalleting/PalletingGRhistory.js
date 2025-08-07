import React, { useContext, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import PalletingGRhistoryTable from "./PalletingGRhistoryTable";

export default function PalletingGRhistory() {
  const { DateNow } = useContext(ITopContext);
  const [headerValue, setheaderValue] = useState({
    from: DateNow,
    to: DateNow,
  });
  const [rows, setRows] = useState([]);
  const [loading, setloading] = useState(false);
  const headerChange = (e) => {
    const { id, value, name } = e.target;
    setheaderValue((e) => ({ ...e, [id]: value }));
  };
  const SearchHistory = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(802, setRows, headerValue.from, headerValue.to);
    setloading(false);
  };
  return (
    <div>
      <div className="frame pb-2 flex gap-2">
        <DefInput
          type="date"
          id="from"
          value={headerValue["from"]}
          handler={headerChange}
          label="From"
        />
        <DefInput
          type="date"
          id="to"
          value={headerValue["to"]}
          label="To"
          handler={headerChange}
        />
        <DefButton
          type="10"
          text="Search"
          className="h-fit mt-[20px]"
          onClick={SearchHistory}
          loading={loading}
        />
      </div>
      <div className="overflow-auto">
        <table className="w-full">
          <tr>
            <td></td>
            <td>GR#</td>
            <td>ITEMCODE</td>
            <td>NAME</td>
            <td>MNF</td>
            <td>EXP</td>
            <td>UOM</td>
            <td>PALLETQTY</td>
            <td>BATCH</td>
          </tr>
          {rows.map((e) => (
            <>
              <PalletingGRhistoryTable
                item={e}
                from={headerValue.from}
                to={headerValue.to}
              />
            </>
          ))}
        </table>
      </div>
    </div>
  );
}
