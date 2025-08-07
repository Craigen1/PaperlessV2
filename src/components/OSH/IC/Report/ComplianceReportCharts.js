import React from "react";

import { Chart } from "react-google-charts";

export default function ComplianceReportCharts(p) {
  const data = [
    ["Task", "Hours per Day"],
    [`${p.counted} - Counted`, p.counted],
    [`${p.miss} - Miss`, p.miss],
  ];

  const options = {
    title: "",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="bg-red-500 w-[512px]">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
