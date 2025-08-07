import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

export default function DoughnutChart(p) {
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    setUserdata({
      labels: p.data.map((data) => data.name),
      datasets: [
        {
          label: "Usage Slip vs Weighing",
          data: p.data.map((data) => data.QTY),
          backgroundColor: ["#4a9cb9", "#f1a13a"],
          borderColor: ["#2e667f", "#ed8a33"],
          borderWidth: 1,
        },
      ],
    });
  }, [p.data]);

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  return <>{userdata == null > 0 ? <Doughnut data={userdata} /> : ""}</>;
}
