import React, { useContext, useState } from "react";
import Chart from "react-google-charts";
import {
  DefButton,
  DefInput,
  EXEC_SQL_InsertOne,
} from "../../../ComponentList";
import BegBalReportTable from "./BegBalReportTable";
import { ITopContext } from "../../../../hooks/TopContext";
export default function BegBalReport() {
  const { DateNow } = useContext(ITopContext);

  const pieData = [
    ["Title", "Count"],
    ["Counted", 4],
    ["Pending", 1],
  ];
  const pieOptions = {
    title: "My Daily Activities",
    pieHole: 0.6,
  };
  const [AsOfDate, setAsOfDate] = useState(DateNow);
  const [StoreList, setStoreList] = useState([]);

  const Handlers = (e) => {
    setAsOfDate(e.target.value);
  };

  const Search = async () => {
    setStoreList([]);
    await EXEC_SQL_InsertOne(820, setStoreList, AsOfDate);
  };

  return (
    <div>
      <div className=" mt-5 overflow-auto">
        {/* <h2>React Donut Chart Example</h2> */}
        {/* <Chart
          width={"600px"}
          height={"320px"}
          chartType="PieChart"
          loader={<div className="animate-pulse">Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ "data-testid": "3" }}
        /> */}

        <div className="frame pb-2 flex gap-2">
          <DefInput
            type="date"
            id="from"
            value={AsOfDate}
            handler={Handlers}
            label="As Of"
          />
          <DefButton
            type="10"
            text="Search"
            className="h-fit mt-[20px] ml-2"
            onClick={Search}
            // loading={[]}
          />
        </div>
        <div className="frame my-2">Parameter</div>
        {StoreList.map((item, index) => (
          <div key={index} className="mt-2">
            <BegBalReportTable
              Storecode={item.code}
              Storename={item.name}
              AsOfDate={AsOfDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
