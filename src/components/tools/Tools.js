import React, { useState } from "react";
import { DefButton } from "../ComponentList";
import Calculator from "./Calculator";

export default function Tools() {
  const [btnSelectIDLine, setbtnSelectIDLine] = useState(1);

  const btnSelectLineOnClick = async (e) => {
    setbtnSelectIDLine(e.target.id);
  };

  return (
    <div>
      <div className="mb-2 w-fit rounded-lg border-2 border-main m-0 p-0.5 pt-0 h-fit">
        <DefButton
          text="Calculator"
          type={btnSelectIDLine == 1 ? "2" : "2B"}
          className="w-fit px-2  py-0 my-0"
          onClick={btnSelectLineOnClick}
          id={1}
        />
        <DefButton
          text="Scan Any Tag"
          type={btnSelectIDLine == 2 ? "2" : "2B"}
          className="w-fit px-2  py-0 my-0"
          onClick={btnSelectLineOnClick}
          id={2}
        />
        <DefButton
          text="Tag Re-Printer"
          type={btnSelectIDLine == 3 ? "2" : "2B"}
          className="w-fit px-2  py-0 my-0"
          onClick={btnSelectLineOnClick}
          id={3}
        />
      </div>

      {btnSelectIDLine == 1 ? (
        <>
          <Calculator />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
