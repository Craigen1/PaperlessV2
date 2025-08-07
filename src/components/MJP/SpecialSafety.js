import React from "react";
import { useState } from "react";

export default function SpecialSafety({ setSpecialSafety }) {
  const [viewHotWorks, setViewHotWorks] = useState(true);
  const [color, setColor] = useState(false);

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setSpecialSafety((p) => ({ ...p, [id]: value }));
  };

  return (
    <>
      <div className="py-2">
        <div className="flex text-black-Font">
          <button type="button" onClick={() => setViewHotWorks(!viewHotWorks)}>
            <div className="flex">
              <button onClick={() => setColor(!color)}>
                {color ? (
                  <>
                    <div className="flex text-sm font-medium">
                      <h4>Special Safety Measure Requirements</h4>
                      <span className="flex items-center px-4">
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
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-semibold">
                    <div className="flex text-sm">
                      <h4>Special Safety Measure Requirements</h4>
                      <span className="flex items-center px-4">
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
                            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </button>
        </div>
        {viewHotWorks ? (
          <>
            <div className="text-sm bg-[#FCFCFC] py-2 rounded-md">
              <ul>
                <li>
                  • Switch-off lock-out/tag-out electrical & other energy
                  sources.
                </li>
                <li>
                  • Disconnect shafts, chains, sprockets, pulleys and belts or
                  chain drivers.
                </li>
                <li>• Use anti-spark tools.</li>
                <li>• Provide adequate ventilation.</li>
                <li>
                  • For crane use, pls. refer to construction safety standards.
                </li>
                <li>
                  • For work on energized lines or systems, pls. obtain
                  approval,
                </li>
              </ul>
              <div className="px-2">
                <div className="px-1 flex flex-col">
                  <label className="font-semibold">Safety Officer</label>{" "}
                  <input
                    onChange={DataChangeHandler}
                    className="h-9 max-w-xs bg-[#FFFFFF] text-[#0E0D0D]"
                  />
                </div>
                <div className="px-1 flex flex-col">
                  <label className="font-semibold">
                    Maintenance Department Head
                  </label>{" "}
                  <input
                    onChange={DataChangeHandler}
                    className="h-9 max-w-xs bg-[#FFFFFF] text-[#0E0D0D]"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
