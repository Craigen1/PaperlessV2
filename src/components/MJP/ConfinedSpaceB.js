import React from "react";
import { useState } from "react";

export default function ConfinedSpaceB({ setConfinedS }) {
  const [viewHotWorks, setViewHotWorks] = useState(false);
  const [color, setColor] = useState(true);

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setConfinedS((p) => ({ ...p, [id]: value }));
  };

  return (
    <>
      <div>
        <div className="flex text-black-Font">
          <button type="button" onClick={() => setViewHotWorks(!viewHotWorks)}>
            <div className="flex">
              <button onClick={() => setColor(!color)}>
                {!color ? (
                  <>
                    <div className="flex text-sm font-medium">
                      <h4>Confined Spaces/Excavation Works</h4>
                      <span className="flex items-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-semibold">
                    <div className="flex text-sm">
                      <h4>Confined Spaces/Excavation Works</h4>
                      <span className="flex items-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
        {!viewHotWorks ? (
          <>
            <div className="text-sm bg-[#FCFCFC] py-2 rounded-md">
              <ul>
                <li>• Provide adequate ventilation.</li>
                <li>• Blind all connecting pipelines.</li>
                <li>• Provide adequate lighting, 6 volts lamp.</li>
                <li>
                  • Assign a watcher trained in rescue or a first aider with
                  basic knowledge.
                </li>
                <li>
                  • Provide shoring if excavation is more than 5 feet deep.
                </li>
                <li>
                  • Obtain approval before excavation, same with works on
                  confined space.
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
