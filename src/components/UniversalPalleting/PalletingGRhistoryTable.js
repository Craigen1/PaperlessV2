import React, { useRef, useState } from "react";
import { LoadingSpinner } from "../../assets/SVGs";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";
import PalletingPrint from "./Print/PalletingPrint";
import ReactToPrint from "react-to-print";

export default function PalletingGRhistoryTable(p) {
  const componentRef = useRef(undefined);
  const [loading, setloading] = useState(false);
  const [loadingPrev, setloadingPrev] = useState(false);
  const [collapse, setcollapse] = useState(false);
  const [rows, setrows] = useState([]);
  const getCollapse = async () => {
    if (collapse == false) {
      setloading(true);
      await EXEC_SQL_InsertOne(800, setrows, p.item.DocNum);
      setloading(false);
    }
    setcollapse(!collapse);
  };
  const [iPrint, setiPrint] = useState(false);
  const iPreview = async () => {
    setloadingPrev(true);
    await EXEC_SQL_InsertOne(800, setrows, p.item.DocNum);
    setloadingPrev(false);
    setiPrint(true);
  };
  return (
    <>
      <tr>
        <td className="flex">
          <button
            onClick={getCollapse}
            className=" bg-[#0000001f] w-6 h-6 text-center mx-2 font-[1000]"
          >
            {loading ? <LoadingSpinner /> : !collapse ? "+" : "-"}
          </button>
          <button
            onClick={iPreview}
            className=" bg-[#0000001f]  h-6 text-center  px-2 rounded-md"
          >
            {loadingPrev ? <LoadingSpinner /> : "Preview"}
          </button>
        </td>
        <td>{p.item.DocNum}</td>
        <td>{p.item.ItemCode}</td>
        <td>{p.item.Dscription}</td>
        <td>{p.item.ExpDate}</td>
        <td>{p.item.MnfDate}</td>
        <td>{p.item.UomCode}</td>
        <td>{p.item.Quantity}</td>
      </tr>
      {collapse && (
        <>
          {rows.map((i) => (
            <tr>
              <td className=""></td>
              <td colSpan={6} className="border-l border-b  rounded-sm"></td>
              <td className="">{i.Quantity}</td>
              <td>{i.BatchNum}</td>
            </tr>
          ))}
        </>
      )}
      {iPrint && (
        <div className=" absolute top-0 z-50 left-0 w-full h-fu">
          <>
            <button
              onClick={() => setiPrint(false)}
              className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent "
            >
              Back
            </button>
            <ReactToPrint
              trigger={() => (
                <button className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent ">
                  🖨️Print
                </button>
              )}
              content={() => componentRef.current}
            />

            <div ref={componentRef} className="  bg-white top-0 left-0 z-50">
              <div
                className="print-container max-w-[890px]  min-w-[890px] "
                style={{ margin: "0", padding: "0" }}
              >
                {rows.map((item, index) => (
                  <>
                    <PalletingPrint setiPrint={setiPrint} item={item} />
                    {index + 1 != rows.length && (
                      <>
                        {index % 2 != 0 ? (
                          <div className={"page-break block"}></div>
                        ) : (
                          <div className="mt-2 border-dashed border-b-2 border-black mb-2"></div>
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}
