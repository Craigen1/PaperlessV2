import React, { useEffect, useState } from "react";
import { DefButton, DefInput } from "../../../ComponentList";

export default function InventoryCountUsrHistoryOption(props) {
  const components = [
    {
      text: "Update",
    },
    {
      text: "View Lines",
    },
  ];
  const [OptionPos, setOptionPos] = useState({
    left: 0,
    top: 0,
  });
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    if (props.OptionTaget == undefined) return;

    setOptionPos({
      left: props.OptionTaget.clientX,
      top: props.OptionTaget.clientY,
    });
    setShowOption(true);
  }, [props.OptionTaget]);

  const HeaderOption = (e) => {
    props.setdocumentNum({
      DocNum: props.OptionTaget.target.id,
      Module: "History",
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.name != "Option") setShowOption(false);
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div
      className="fixed"
      style={{
        left: OptionPos.left,
        top: OptionPos.top,
      }}
    >
      {showOption && (
        <>
          <div className="block border shadow-sm w-fit rounded-sm bg-[#fafafa]">
            {components.map((item, index) => (
              <div>
                <button
                  name="Option"
                  className=" rounded-sm px-2"
                  onClick={HeaderOption}
                >
                  {item.text}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
