import React, { useEffect, useRef } from "react";
import { DefButton, RemoveFromGrid } from "../ComponentList";

export default function ProrationAddMaterialUsageAdOptn(p) {
  const ref = useRef(null);
  const handleOption = (e) => {
    if (e.target.name == "remove") handleRemove();
    if (e.target.name == "duplicate") handleDuplicate();
    p.setShowOption(false);
  };
  const keypressHandler = (e) => {
    if (e.key == "R" || e.key == "r") handleRemove();
    if (e.key == "D" || e.key == "d") handleDuplicate();
  };

  const handleRemove = () => {
    RemoveFromGrid(p.rows, p.setRows, p.ShowOptionID);
    p.setShowOption(false);
  };
  const handleDuplicate = () => {
    p.setRows((e) => [...e, { ...p.rows[p.ShowOptionID] }]);
    p.setShowOption(false);
  };

  useEffect(() => {
    if (ref) ref.current.focus();
  }, []);

  return (
    <div>
      <div className="frame bg-white shadow-md  p-2 mt-2 border grid gap-y-2">
        <DefButton
          text="Duplicate"
          name="duplicate"
          onClick={handleOption}
          className="btn btn-primary btn-sm"
        />
        <DefButton
          text="Remove"
          name="remove"
          onClick={handleOption}
          className="btn btn-warning btn-sm"
        />
        <input
          onKeyUp={keypressHandler}
          ref={ref}
          className="border-none bg-transparent text-transparent h-0"
        />
        <p className="p-0 m-0">Press [D] to duplicate</p>
        <p className="p-0 m-0 -mt-4">Press [R] to remove</p>
      </div>
    </div>
  );
}
