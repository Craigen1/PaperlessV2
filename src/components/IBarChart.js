import React, { useState } from "react";

export default function IBarChart(p) {
  const [colors, setcolors] = useState([
    {
      color: "#58A6FF",
    },
    {
      color: "#85E462",
    },
    {
      color: "#58A6FF",
    },
    {
      color: "#85E462",
    },
    {
      color: "#58A6FF",
    },
    {
      color: "#85E462",
    },
    {
      color: "#58A6FF",
    },
    {
      color: "#85E462",
    },
  ]);
  return (
    <>
      {!p.loading ? (
        <div className="w-full my-0.5">
          <div className="rounded-md mx-4">
            <p className=" text-WhiteMode-Font pt-2 px-2 font-semibold">
              {p.title}
            </p>
            <div className="px-2 flex mb-2 pb-2">
              {p.map.map((item, index) => (
                <div
                  className="  h-2"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: `${colors[index].color}`,
                  }}
                ></div>
              ))}
            </div>
            <div className="flex gap-4">
              {p.map.map((item, index) => (
                <div>
                  <div className="flex">
                    <div
                      className=" w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: `${colors[index].color}`,
                      }}
                    ></div>
                    <p className=" text-WhiteMode-Font text-sm p-0 -m-0 -mt-1.5 mx-0.5">
                      {item.title}
                    </p>
                  </div>
                  <p className=" text-WhiteMode-Font  p-0 -m-0 ml-2.5 -mt-2">{`${item.percentage}%`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full animate-pulse px-4 mb-1">
          <div className="bg-gray-410 w-40 h-3"></div>
          <div className="bg-gray-410 w-full h-3 mt-2"></div>
          <div className="flex gap-x-4">
            <div className="bg-gray-410 w-20 h-3 mt-2"></div>
            <div className="bg-gray-410 w-20 h-3 mt-2"></div>
          </div>
        </div>
      )}
    </>
  );
}
