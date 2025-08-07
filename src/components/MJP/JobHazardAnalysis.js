import React from "react";
import { useState, useEffect } from "react";
import { DefInput } from "../ComponentList";

export default function JobHazardAnalysis({ setResult, setJHA }) {
  const [checkedBox, setCheckedBox] = useState(Array(2).fill(false));
  const [JobHazard, setJobHazard] = useState([]);

  const data = [
    {
      label: "Job Hazard Analysis Prepared by",
      id: "Prepared By",
      type: "text",
    },
    {
      label: "Job Hazard Analysis Received & Checked by",
      id: "Received & Checked By",
      type: "text",
    },
  ];

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setJobHazard((p) => ({ ...p, [id]: value }));
  };

  const RemarksHandler = (e) => {
    const { value, id } = e.target;
    setJobHazard((p) => ({ ...p, [id]: value }));
  };

  const DataChangeHandler1 = (index) =>
    setCheckedBox((checkedBox) =>
      checkedBox.map((item, i) => (i === index ? !item : item))
    );

  const DataHandler = (index) => {
    DataChangeHandler1(index);
  };

  useEffect(() => {
    setResult(checkedBox);
  }, checkedBox);

  useEffect(() => {
    setJHA(JobHazard);
  }, [JobHazard]);

  return (
    <>
      <div>
        <div className="grid place-items-center text-center">
          <h3 className="font-bold px-2 my-2">
            Job Hazard Analysis -{" "}
            <span className="text-[#8D4DD0]">
              Location, Equipment, Task or Process (LETP)
            </span>
          </h3>
        </div>
        <div className="text-sm px-2 py-2">
          {data.map((item) => (
            <div key={item.id}>
              <DefInput
                className="h-9 max-w-sm text-black"
                label={item.label}
                value={item.value}
                id={item.id}
                type={item.type}
                handler={DataChangeHandler}
              />
            </div>
          ))}
          <div>
            <div className="py-2">
              {["Accepted", "Deficient"].map((item, index) => (
                <div className="flex" key={index}>
                  <input
                    type="checkbox"
                    onClick={() => DataHandler(index)}
                    className="w-5 h-4"
                  />
                  {item}
                </div>
              ))}
            </div>
            <label className="mb-2">Remarks</label>
            <textarea
              id="Remarks"
              className="flex items-center border-black border-[1.5px]"
              cols={115}
              rows={9}
              onChange={RemarksHandler}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
