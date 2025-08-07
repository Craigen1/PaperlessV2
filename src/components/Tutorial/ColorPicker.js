import React, { useState } from "react";

export default function ColorPicker() {
  const [RGB, setRGB] = useState({
    R: 0,
    G: 0,
    B: 0,
  });
  const ChangeHandler = (e) => {
    const { value, id } = e.target;
    setRGB((v) => ({
      ...v,
      [id]: parseInt(value),
    }));
  };

  const rgbToHex = (r, g, b) =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  return (
    <div className="mx-auto w-fit">
      <div
        className="frame max-w-sm mt-10"
        style={{
          backgroundColor: `rgb(${RGB.R}, ${RGB.G}, ${RGB.B})`,
        }}
      >
        <input
          type="range"
          min="1"
          max="255"
          value={RGB.R}
          onChange={ChangeHandler}
          id="R"
        />
        <input
          type="range"
          min="1"
          max="255"
          value={RGB.G}
          onChange={ChangeHandler}
          id="G"
        />
        <input
          type="range"
          min="1"
          max="255"
          value={RGB.B}
          onChange={ChangeHandler}
          id="B"
        />
      </div>
      <p className="w-full text-center  frame p-0 m-0">
        {`HEX:` + rgbToHex(RGB.R, RGB.G, RGB.B)}
      </p>
    </div>
  );
}
