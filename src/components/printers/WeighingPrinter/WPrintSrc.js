import React, { useContext } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import BarCodeGen from "../../BarCodeGen";
import QRCode from "react-qr-code";
export default function WPrintSrc() {
  const { WeighingPrinterObject } = useContext(ITopContext);
  // console.log({ WeighingPrint.erObject });
  return (
    <div className="my-2">
      <>
        <table className="mb-4">
          {WeighingPrinterObject.map((item, index) => (
            <div className="ml-2 border-b-2 border-black border-dashed">
              <tr>
                {/* <BarCodeGen value={item.BarCode} height={50} width={3} /> */}
                <QRCode value={item.BarCode} />
                <div className="mx-auto text-black w-fit p-0 my-0">
                  {item.BarCode}
                </div>
              </tr>
              <div className="text-xs ml-2 mt-2">
                <span className="text-black">
                  {item.ItemCode} -
                  <input
                    value={item.ItemName}
                    className="bg-transparent text-black border-none shadow-none"
                  />
                </span>
                <div className=" text-sm grid  grid-cols-2">
                  {/* <span className="text-black text-xs border-black border pl-1">
                    UoM:<br></br>
                    {item.UoM}
                  </span> */}
                  <span className="text-black text-xs border-black border pl-1">
                    Quantity:<br></br>
                    {item.Qty}
                  </span>
                  <span className="text-black text-xs border-black border pl-1">
                    Batch:<br></br>
                    {item.Batch}
                  </span>
                  <span className="text-black text-xs border-black border pl-1">
                    MNF:<br></br>
                    {item.MnfDate}
                  </span>
                  <span className="text-black text-xs border-black border pl-1">
                    EXP:<br></br>
                    {item.ExpDate}
                  </span>
                </div>
                <br />
              </div>
            </div>
          ))}
        </table>
      </>
    </div>
  );
}
