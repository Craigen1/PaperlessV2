import React, { useState } from "react";
import SelfBillingDmpUpload from "./SelfBillingDmpUpload";
import { DefButton } from "../ComponentList";
import SelfBillingGenerate from "./SelfBillingGenerate";
import SelfBillinHistory from "./SelfBillinHistory";
import SelfBillinGenerateHistory from "./SelfBillinGenerateHistory";
import { useMediaPredicate } from "react-media-hook";
import SelfBillingDmpReport from "./SelfBillingDmpReport";
export default function SelfBillinDmp() {
  const [tab, settab] = useState("1");
  const isDesktopOrLaptop = useMediaPredicate("(min-width: 800px)");
  const [ShowDropDown, setShowDropDown] = useState(false);
  const handleDropDownShow = async (e) => {
    // settab(e.target.id);
    setShowDropDown(!ShowDropDown);
  };
  const Components = [
    {
      id: "1",
      haspoint: true,
      label: "📥 Upload bill",
    },
    {
      id: "2",
      haspoint: false,
      label: "📝 Upload History",
    },
    {
      id: "3",
      haspoint: true,
      label: "📩 Post Self Bill",
    },
    {
      id: "4",
      haspoint: false,
      label: "📝 Generate Self Bill",
    },

    {
      id: "5",
      haspoint: false,
      label: "📜 Report",
    },
  ];
  const Point = () => {
    return (
      <>
        <p className="font-bold pt-1">.</p>
      </>
    );
  };

  const handleTabs = async (e) => {
    settab(e.target.id);
    setShowDropDown(false);
  };
  return (
    <div>
      <div className=" flex  mt-2  frame ">
        {isDesktopOrLaptop ? (
          <div className="flex   overflow-auto ">
            {Components.map((item, id) => (
              <div key={id} className=" flex">
                <DefButton
                  onClick={handleTabs}
                  className={
                    id == 2
                      ? "mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mr-1 py-1 ml-5"
                      : "mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mx-1 py-1"
                  }
                  text={item.label}
                  id={item.id}
                  type={tab == item.id ? "2" : "2B"}
                />
                {item.haspoint ? <Point /> : ""}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex overflow-auto ">
              <DefButton
                onClick={handleTabs}
                className="mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mx-1 py-1 invisible"
                text="📥 Upload bill"
                id={"1"}
                type={tab == "1" ? "2" : "2B"}
              />
            </div>
            <div className="absolute frame  z-50 ">
              <div className=" ">
                <DefButton
                  onClick={handleDropDownShow}
                  className="mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mx-1 py-1"
                  text={Components[tab - 1].label + " 👇"}
                  id={0}
                  type={"2"}
                />
                {ShowDropDown ? (
                  <>
                    {Components.map((item, id) => (
                      <div key={id}>
                        <DefButton
                          onClick={handleTabs}
                          className="mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mx-1 py-1"
                          text={item.label}
                          id={item.id}
                          type={tab == item.id ? "2" : "2B"}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {tab === "1" ? <SelfBillingDmpUpload /> : ""}
      {tab === "2" ? <SelfBillinHistory /> : ""}
      {tab === "3" ? <SelfBillingGenerate /> : ""}
      {tab === "4" ? <SelfBillinGenerateHistory /> : ""}
      {tab === "5" ? <SelfBillingDmpReport /> : ""}
    </div>
  );
}
