import React from "react";
import { useState } from "react";

export default function MajorLift() {
  const [viewHotWorks, setViewHotWorks] = useState(true);
  const [color, setColor] = useState(false);
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
                      <h4>Works on Major Lift/Hoists</h4>
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
                      <h4>Works on Major Lift/Hoists</h4>
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
                <li>• Secure breaker shutdown.</li>
                <li>• Initial position of Hoist must be on ground level.</li>
                <li>
                  • Provide inflexible reinforcement under the hoist car if it
                  is under the ground.
                </li>
                <li>• Blockade is a necessity on doors in all levels.</li>
                <li>• Remove belt or chain drives.</li>
              </ul>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
