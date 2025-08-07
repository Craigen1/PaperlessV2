import React, { useState } from "react";
import { DefButton } from "../ComponentList";

export default function Calculator() {
  const [input, setInput] = useState("");
  const calcBtnStyl = "";
  function handleButtonPress(value) {
    setInput(input + value);
  }

  function handleClear() {
    setInput("");
  }

  function handleCalculate() {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  }
  const calcBtns = [
    {
      type: "1",
      text: "7",
    },
    {
      type: "1",
      text: "8",
    },
    {
      type: "1",
      text: "9",
    },
    {
      type: "2",
      text: "/",
    },

    {
      type: "1",
      text: "4",
    },
    {
      type: "1",
      text: "5",
    },
    {
      type: "1",
      text: "6",
    },
    {
      type: "2",
      text: "*",
    },

    {
      type: "1",
      text: "1",
    },
    {
      type: "1",
      text: "2",
    },
    {
      type: "1",
      text: "3",
    },
    {
      type: "2",
      text: "+",
    },

    {
      type: "2",
      text: "<-",
    },
    {
      type: "1",
      text: "0",
    },
    {
      type: "2",
      text: ".",
    },
    {
      type: "2",
      text: "=",
    },
  ];
  const handleClick = async (e) => {
    if (e.target.id == "=") {
      handleCalculate();
    } else if (e.target.id == "<-") {
    } else {
      handleButtonPress(e.target.id);
    }
  };
  return (
    <div>
      <br />
      <div className="w-96 mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="grid  grid-cols-4 gap-2 ">
          {calcBtns.map((item, index) => (
            <>
              <div>
                <DefButton
                  text={item.text}
                  id={item.text}
                  className={
                    item.type == "1"
                      ? "h-24  font-bold text-3xl bg-transparent text-github_BorderColorActive"
                      : "h-24  font-bold text-3xl bg-transparent  text-github_BorderColorError"
                  }
                  onClick={handleClick}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
