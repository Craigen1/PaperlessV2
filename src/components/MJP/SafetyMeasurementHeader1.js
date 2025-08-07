import React, { useState, useEffect } from "react";
import { Fragment } from "react";

export default function SafetyMeasurementHeader1({ setDesc, setSafetyMsmntH }) {
  const [description, setDescription] = useState();
  const [inputFields, setInputFields] = useState();

  const props = [
    {
      label: "Effectivity Date",
      id: "EffectivityD",
      type: "date",
    },
    {
      label: "Expiration Date",
      id: "ExpirationD",
      type: "date",
    },
    {
      label: "Dept./Section",
      id: "DepSec",
      type: "text",
    },
    {
      label: "Contractor",
      id: "Contractor",
      type: "text",
    },
    {
      label: "Work Permit No.",
      id: "Wpn",
      type: "number",
    },
    {
      label: "Status",
      id: "Status",
      type: "text",
      value: "...",
    },
    {
      label: "Company / Contractor Name",
      id: "Company",
      type: "text",
    },
  ];

  const DataChangeHandler = (e) => {
    const { value, id } = e.target;
    setInputFields((p) => ({ ...p, [id]: value }));
  };

  const handleRemarks = (e) => {
    const { id, value } = e.target;
    setDescription((p) => ({ ...p, [id]: value }));
  };

  useEffect(() => {
    setSafetyMsmntH(inputFields);
  }, [inputFields]);

  useEffect(() => {
    setDesc(description);
  }, [description]);

  return (
    <>
      <main className="mt-2 text-sm">
        <div className="grid md:grid-cols-4 gap-3">
          {props.map((item) => (
            <Fragment key={item.id}>
              <div>
                <label className="font-medium tracking-wide">
                  {item.label}
                </label>
                <input
                  value={item.value}
                  className="h-9"
                  type={item.type}
                  onChange={DataChangeHandler}
                />
              </div>
            </Fragment>
          ))}
        </div>
        <div className="my-2">
          <label className="block py-2">
            Brief description of work to be done
          </label>
          <textarea
            id="Brief Description"
            className="border-[1.5px] border-black inline-block"
            onChange={handleRemarks}
            cols={112}
            rows={9}
          ></textarea>
        </div>
      </main>
    </>
  );
}
