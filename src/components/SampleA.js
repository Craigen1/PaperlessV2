import React from "react";

export default function SampleA() {
  const components = [
    {
      p: "username",
      inputType: "text",
    },
    {
      p: "password",
      inputType: "password",
    },
    {
      p: "fristname",
      inputType: "text",
    },
    {
      p: "lastname",
      inputType: "text",
    },
  ];

  return (
    <div>
      {components.map((item, index) => (
        <>
          <div className="cursor-wait">
            <p>{item.p}</p>
            <input type={item.inputType} />
          </div>
        </>
      ))}
    </div>
  );
}
