import React from "react";
import { useState, useEffect } from "react";
import { MyList } from "./PersonalProtective";

export default function WorkingAtHeights({ setWorkingAH }) {
  const [viewList, setViewList] = useState(true);
  const [valList, setValList] = useState(Array(10).fill(false));

  function toggleVal(index) {
    setValList((valList) =>
      valList.map((val, i) => (i === index ? !val : val))
    );
  }

  const handleToggle = (index) => {
    toggleVal(index);
  };

  useEffect(() => {
    setWorkingAH(valList);
  }, [valList]);

  return (
    <>
      <main>
        <div className="grid sm:grid-cols-2">
          <div className="grid col-span-2 py-2 bg-[#FCFCFC]">
            <div className="p-1">
              <button
                className="font-bold"
                type="button"
                onClick={() => setViewList(!viewList)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                  <h4 className="px-1">Working At Heights</h4>
                </div>
              </button>
              {viewList ? (
                <>
                  <div className="text-sm w-72">
                    <div className="rounded-sm px-2 py-1">
                      <i className="text-xs text-[#8D4DD0]">
                        *Mark check if worker/s has safety instruments
                      </i>
                      {[
                        "Guard Rail System",
                        "Scaffolding",
                        "Safety Net",
                        "Skylight Covers",
                        "Safety Monitor",
                        "Anchorage",
                        "Lanyard",
                        "Rope Grab",
                        "Deceleration Device",
                        "Lifeline",
                      ].map((item, index) => (
                        <MyList
                          key={index}
                          name={item}
                          onClickVal={() => handleToggle(index)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
