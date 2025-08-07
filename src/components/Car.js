import React, { useState } from "react";

export default function Car() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const container = document.querySelector(".mouse-rotate-container");
    const rect = container.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    setRotation({ x, y });
  };

  return (
    <div className="mt-10">
      {/* <div
        className="w-96 h-96 mouse-rotate-container  bg-black"
        onMouseMove={handleMouseMove}
      >
        <div
          className="mouse-rotate"
          style={{
            transform: `rotate3d(${rotation.y}, ${rotation.x}, 0, 45deg)`,
          }}
        >
          <div className="bg-red-500">
            <div className="box1">1</div>
            <div className="box2">2</div>
            <div className="box3">3</div>
            <div className="box4">4</div>
            <div className="box5">5</div>
            <div className="box6">6</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
