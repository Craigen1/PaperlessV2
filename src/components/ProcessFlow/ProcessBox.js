import React from "react";
import "./ProcessFlow.css";
export default function ProcessBox(p) {
  console.log();
  return (
    <>
      <div className={`relative boxpos${p.items.type}`}>
        {p.items.type == "1" && (
          <div className={`tailLeft ${p.items.hasOr}`}>
            <div
              style={{
                minWidth: "150px",
                minHeight: "120px",
              }}
              className="m-0 px-2 py-2 w-fit frame border-2 border-black  "
            >
              <div className=" bg-WhiteMode-header w-fit px-2 rounded-md font-medium">
                {p.items.number}
              </div>
              <div> {p.items.title}</div>
              <div>
                <span className="text-transparent -ml-2">c</span>{" "}
                {p.items.comment}
              </div>
            </div>
          </div>
        )}

        {p.items.type == "2" && (
          <div className={`tailLeft2 ${p.items.hasOr}`}>
            <div className=" px-2  h-11 text-center pt-1.5 rounded-full font-medium bg-WhiteMode-header border-2 border-black">
              {p.items.title}
            </div>
          </div>
        )}
        {p.items.type == "3" && (
          <div className={`tailLeft3 ${p.items.hasOr}`}>
            <div className=" px-3  h-11 text-center pt-1.5 rounded-full font-medium bg-WhiteMode-header border-2 border-black">
              {p.items.title}
            </div>
          </div>
        )}

        {p.items.type == "4" && (
          <div className={`tailLeft4 ${p.items.hasOr}`}>
            <div className=" px-3  h-11 text-center pt-1.5 rounded-full font-medium bg-WhiteMode-header border-2 border-black">
              {p.items.title}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
