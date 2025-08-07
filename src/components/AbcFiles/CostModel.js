import React, { useState, useEffect, useContext } from "react";
import { DefButton, DefInput } from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";

export default function CostModel() {
  const { AbcG, setAbcG } = useContext(ITopContext);
  const [sampleInput1, setsampleInput1] = useState("");
  const [count, setcount] = useState(0);
  const onClickSample = (p) => {
    const { value, id, name } = p.target;
    if (id === "1") {
      console.log("pressed id 1");
    }
  };
  const onChangeHandler = (p) => {
    const { value, id, name } = p.target;
    console.log(id, name, value);
    if (id === "1") {
      setsampleInput1(value);
    }
  };

  useEffect(() => {
    setcount(count + 1);
  }, [sampleInput1]);
  return (
    <div>
      <div>
        <DefButton
          className="w-fit"
          text="sample Btn"
          type="2B"
          onClick={onClickSample}
          id="1"
          name="sampleBtnName"
        />

        <br></br>
        <DefInput
          handler={onChangeHandler}
          label="sample label"
          id="1"
          type="text"
          value={sampleInput1}
        />
        <p>{sampleInput1}</p>
        <p>{count}</p>
      </div>
    </div>
  );
}
