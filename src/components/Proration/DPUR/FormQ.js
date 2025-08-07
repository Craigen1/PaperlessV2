import React from "react";

export default function FormQ(p) {
  return (
    <div>
      {p.formSelector}

      <button
        className="border btn btn-primary btn-sm px-2"
        onClick={(e) => p.setformSelector(0)}
        id={0}
      >
        Back
      </button>
    </div>
  );
}
