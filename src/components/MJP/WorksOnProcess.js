import React from "react";
import { useState } from "react";

export default function WorksOnProcess() {
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
                      <h4>Works on Process Line/Equipment</h4>
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
                      <h4>Works on Process Line/Equipment</h4>
                      <span className="flex items-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
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
                <li>• Blind all connecting pipelines.</li>
                <li>
                  • Remove flammable materials/dangerous chemicals from the
                  immediate vicinity.
                </li>
                <li>
                  • Empty/purge lines, pipes, vessels of dangerous gases, fumes
                  and residual materials.
                </li>
                <li>• Do not cut or weld on process lines.</li>
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
