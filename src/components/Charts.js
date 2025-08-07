import React, { useContext, useState, useEffect, useRef } from "react";

import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { DefButton, EXEC_SQL } from "./ComponentList";
import DoughnutChart from "./DoughnutChart";
import IBarChart from "./IBarChart";
import { LoadingSpinner } from "../assets/SVGs";
export default function Charts() {
  const charx = useRef();
  const UserData = [
    {
      id: 1,
      name: "Usage Slip",
      QTY: 1,
      userLost: 1,
    },
    {
      id: 1,
      name: "Weighting",
      QTY: 10,
      userLost: 1,
    },
  ];
  const [DoughnutData, setDoughnutData] = useState([]);
  useEffect(() => {
    EXEC_SQL(960, setDoughnutData);
  }, []);
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-WhiteMode-FromBackground000 m-2 rounded-md shadow-sm">
        <IBarChart
          map={DoughnutData}
          title="Usage Slip fulfillment"
          loading={DoughnutData[0] === undefined ? true : false}
        />
      </div>
      {/* <div className="overflow-auto mx-2 rounded-md shadow-sm">
        <iframe
          className="w-full h-screen"
          src="https://app.powerbi.com/view?r=eyJrIjoiOTEwZGYwODYtYjAyNS00MTk0LThlZDMtMDFmMDA4YTQ1NGQxIiwidCI6Ijg1ZjE4MTU2LWY5NGQtNDRkZi05OTA2LWVhMjFkOWVlZjhmOSIsImMiOjEwfQ%3D%3D"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div> */}
    </>
  );
}
