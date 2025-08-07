import React from "react";
import { CodeGen_Input_Edit } from "../components/ComponentList2";

export default function CodeTempOption(p) {
  return (
    <div>
      <div>
        <div className="mt-2 mx-2">
          <CodeGen_Input_Edit
            placeholder="Enter Page Size"
            className=""
            label="Page Size"
            type="number"
            onChange={p.PageHandler}
          />
        </div>
      </div>
    </div>
  );
}
