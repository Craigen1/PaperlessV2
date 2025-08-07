import React, { useContext, useEffect, useState } from "react";
import { DefTimeline, EXEC_SQL } from "../../../ComponentList";
import { ITopContext } from "../../../../hooks/TopContext";
export default function TimeLineProjects(props) {
  const { userInfo } = useContext(ITopContext);

  let current = new Date();
  current = current.toLocaleDateString("en-CA");

  const labelColSizes = ["240px", "100px"];
  const labelCol = ["Task", "Status"];
  const [dates, setdates] = useState([]);
  const [dateRange, setdateRange] = useState({});

  const iSetDate = () => {
    let z = new Date();
    let y = new Date();
    z = new Date(z.getFullYear(), z.getMonth() - 1, z.getDate());
    y = new Date(y.getFullYear(), y.getMonth(), y.getDate());
    setdateRange({
      from: z,
      to: y,
    });
  };
  function customCss(rows, index) {
    let css = "";
    if (index == 1 && rows == "Done")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 1 && rows == "Pending")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 1 && rows == "In Progress")
      return "bg-[#96abff] w-fit px-1.5 py-0  rounded-lg text-[#2c3c7b]";

    if (index == 6 && rows == "Medium")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 6 && rows == "Low")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 6 && rows == "High")
      return "bg-[#ff9696] w-fit px-1.5 py-0  rounded-lg text-[#7b2c2c]";
  }
  const checkDatex = async () => {
    await EXEC_SQL(839, setdates, 2024);
  };
  const [timeLineData, settimeLineData] = useState([]);
  const getTimeLineData = async () => {
    await EXEC_SQL(833, settimeLineData, userInfo.ID, props.item.id);
  };

  useEffect(() => {
    iSetDate();
    checkDatex();
    getTimeLineData();
    // checkDate();
  }, []);

  useEffect(() => {
    console.log(props);
  }, []);

  //   useEffect(() => {
  //     console.log({ dates });
  //   }, [dates]);

  return (
    <div>
      {props.item.projectName}
      {props.item.statusName}
      <DefTimeline
        data={timeLineData}
        dates={dates}
        labelColSizes={labelColSizes}
        labelCol={labelCol}
        colsize={"100px"}
        customCss={customCss}
      />
      {/* <button onClick={checkDatex}>check Date</button> */}
    </div>
  );
}
