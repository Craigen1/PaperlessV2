import React from "react";

export default function TaskManagerLine(p) {
  const LineComponents = (lProps) => {
    return (
      <>
        <div
          className={
            lProps.index > 0
              ? ` overflow-auto    Border-bottom hover:bg-trans20 `
              : ` overflow-auto Border-top  Border-bottom hover:bg-trans20 `
          }
        >
          <div className=" flex head w-full text-sm overflow-auto">
            <div className=" Border-right   w-96">
              <input className=" border-transparent" />
            </div>
            <div className="Border-right w-28">
              <input className=" border-transparent" />
            </div>
            <div className="Border-right w-28">
              <input type="date" className=" border-transparent" />
            </div>
            <div className="Border-right w-28">
              <input className=" border-transparent" />
            </div>
            <div className="Border-right w-28">
              <input className=" border-transparent" />
            </div>
            <div className="Border-right w-28">
              <input className=" border-transparent" />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ListOfLines = [{ id: 0 }, { id: 1 }, { id: 2 }];
  return (
    <>
      <h6>RIRS - IT - ITR</h6>
      {ListOfLines.map((item, index) => (
        <React.Fragment key={index}>
          <LineComponents index={index} />
        </React.Fragment>
      ))}
    </>
  );
}
