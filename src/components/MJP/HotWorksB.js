import React from "react";
import { useState } from "react";

export default function HotWorksB({ setHotWorks }) {
  const [viewHotWorks, setViewHotWorks] = useState(true);
  const [color, setColor] = useState(false);

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setHotWorks((p) => ({ ...p, [id]: value }));
  };

  return (
    <>
      <div className="py-2">
        <div className="flex text-black-Font">
          <button type="button" onClick={() => setViewHotWorks(!viewHotWorks)}>
            <div>
              <button onClick={() => setColor(!color)}>
                {color ? (
                  <>
                    <div className="flex text-sm font-medium">
                      <h4>Hot Works</h4>
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
                      <h4>Hot Works</h4>
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
                  • Secure/shield pedestrian lanes, machines, motors, panels,
                  conduits or affected area/s from welding sparks, falling
                  objects, dirts, etc.
                </li>
                <li>
                  • Remove flammable materials/dangerous chemicals from the
                  immediate vicinity.
                </li>
                <li>• Do not cut or weld on process lines.</li>
                <li>
                  • Assure that the welding machine or generator set have been
                  checked by an electrician.
                </li>
                <li>
                  • Ensure approval of Oxygen/Acetylene set from the
                  Project/Area Engineer.
                </li>
                <li>• Provide fire extinguisher/s.</li>
                <li>
                  • Shutdown or disconnect sensitive equipment or instruments in
                  areas (i.e load cells, sensors, computers, etc.). Must acquire
                  clearance from Engineering Dept. before proceeding to the HOT
                  WORKS.
                </li>
              </ul>
            </div>
            <div className="px-2">
              <div className="px-1 flex flex-col">
                <label className="font-semibold">Electrician's Name</label>{" "}
                <input
                  onChange={DataChangeHandler}
                  className="h-9 max-w-xs bg-[#FFFFFF] text-[#0E0D0D]"
                />
              </div>
              <div className="px-1 flex flex-col">
                <label className="font-semibold">Project Area Engineer</label>{" "}
                <input
                  onChange={DataChangeHandler}
                  className="h-9 max-w-xs bg-[#FFFFFF] text-[#0E0D0D]"
                />
              </div>
              <div className="px-1 flex flex-col">
                <label className="font-semibold">Date</label>{" "}
                <input
                  type="date"
                  onChange={DataChangeHandler}
                  className="h-9 max-w-xs bg-[#FFFFFF] text-[#0E0D0D]"
                />
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
