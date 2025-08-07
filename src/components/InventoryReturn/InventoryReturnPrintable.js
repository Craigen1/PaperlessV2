import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";
import QRCode from "react-qr-code";

export default function InventoryReturnPrintable(p) {
  const { PalletMarkerGRprintRow, setPalletMarkerGRprintRow } =
    useContext(ITopContext);
  const compUpperLeft = [
    {
      id: "ITEMDESC",
      className: "w-[400px] col-span-2",
      label: "ITEM DESCRIPTION: ",
      width: "100%",
    },
    {
      id: "DR",
      className: "w-[400px] col-span-2",
      label: "DR NO: ",
      width: "180px",
      widthTitle: "120px",
    },
    {
      id: "BatchCode",
      className: "w-[400px] col-span-2",
      label: "Batch Code: ",
      width: "180px",
      widthTitle: "120px",
    },
    {
      id: "DeliverDate",
      className: "w-[420px] col-span-2",
      label: "Delivery Date:",
      width: "180px",
      widthTitle: "120px",
    },
    {
      id: "Quantity",
      className: "w-[200px] ",
      label: "Quantity:",
      width: "90px",
      widthTitle: "120px",
    },
    {
      id: "UoM",
      className: "w-[110px] ",
      label: "UoM",
      width: "200px",
      widthTitle: "120px",
    },
    {
      id: "MNF",
      className: "w-[200px] ",
      label: "Mnf Date:",
      width: "90px",
      widthTitle: "120px",
    },
    {
      id: "EXP",
      className: "w-[80px] ",
      label: "Exp:",
      width: "90px",
      widthTitle: "70px",
    },

    {
      id: "Drum",
      className: " col-span-2",
      label: "DRUM #:",
      width: "180px",
      widthTitle: "120px",
    },

    {
      id: "NetWeight",
      className: " col-span-2",
      label: "NEW WEIGHT:",
      width: "180px",
      widthTitle: "120px",
    },
  ];

  const [compUpperLeftValue, setCompUpperLeftValue] = useState({
    ITEMDESC: "400255",
    DR: "82405076",
  });

  const pGetInfo = () => {};

  useEffect(() => {
    setCompUpperLeftValue((e) => ({
      ...e,
      ITEMDESC: p.item.Dscription,
      DR: p.item.DR,
      ItemCode: p.item.ItemCode,
      BatchCode: p.item.BatchNum,
      DeliverDate: p.item.docdate + " " + p.item.iTime,
      Quantity: p.item.Quantity,
      UoM: p.item.UomCode,
      MNF: p.item.MnfDate,
      EXP: p.item.ExpDate,
      NetWeight: p.item.NetWeight,
      Drum: p.item.Drum,
    }));
  }, [p]);

  return (
    <div className="relative     px-6 pt-4">
      {/* <DefButton
        text="Cancel"
        onClick={() => console.log(p)}
        className="w-fit px-2 mt-2"
        type="5"
      /> */}
      <div className="font-bold text-2xl uppercase">Return Tag</div>
      <div className="grid grid-cols-2 w-[420px]">
        {compUpperLeft.map((i, indx) => (
          <>
            <div className={`flex -mt-1 ${i.className}  `}>
              <span
                className="font-semibold whitespace-nowrap uppercase"
                style={{ width: i.widthTitle }}
              >
                {i.label}
              </span>

              {i.id == "ITEMDESC" ? (
                <>
                  <div className="text-4xl absolute left-[290px] top-[10px]">
                    {compUpperLeftValue[i.id]}
                  </div>
                </>
              ) : (
                <span className="border-b  pl-4 " style={{ width: i.width }}>
                  {i.id == "Quantity" ? (
                    <div contentEditable={true}>{compUpperLeftValue[i.id]}</div>
                  ) : (
                    <>{compUpperLeftValue[i.id]}</>
                  )}
                </span>
              )}
            </div>
          </>
        ))}
      </div>
      <br />
      <div className="flex">
        <QRCode
          size={240}
          value={"" + p.item.AbsEntry + ""}
          className="-mt-5"
        />
        <div className="rotate-90 absolute left-[255px] top-[300px]">
          {"" + p.item.AbsEntry + ""}
        </div>
      </div>
      <br />

      {/* <div className="min-w-[280px] max-w-[280px] border-b text-center -mt-6"></div> */}

      <div className="min-w-[280px] max-w-[280px]   font-semibold -mt-6">
        CHECKED BY : {p.item.U_APP_CheckedBy}
      </div>
      {/* <div className="min-w-[280px] max-w-[280px] border-b  ">
        {p.item.U_APP_QAAcceptdBy}
      </div> */}

      <div className="min-w-[280px] max-w-[280px]   font-semibold">
        QA ACCEPTED BY : {p.item.U_APP_QAAcceptdBy}
      </div>
      <div className="min-w-[280px] max-w-[280px]   font-semibold text-sm">
        LG-01 REV.7(04/01/24)
        {/* LG-01-Rev.7 () */}
      </div>

      {/* pallet no */}

      <div className="w-[200px]  absolute top-[70px] right-4">
        <table className="border border-black  w-full ">
          <tr>
            <td className="border border-black   px-3 whitespace-nowrap w-[50%]">
              PALLET NO:
            </td>
            <td className="border border-black  font-semibold text-center w-[25%]">
              {p.item.U_APP_PalId}
            </td>
            <td className="border hidden border-black  font-semibold text-center w-[25%]">
              {p.item.maxpalletid}
            </td>
          </tr>
        </table>
      </div>
      {/* pallet no End */}
      {/* BIG TEXT  */}
      <div className="absolute top-[130px] right-0">
        <div className="flex">
          <div className="font-bold">ITEM</div>
          <div
            className={
              p.item.ItemCode.length > 6
                ? `text-[90px] mr-4 -mt-10 $ pb-4`
                : `text-[150px] mr-4 -mt-20 $`
            }
          >
            {p.item.ItemCode}{" "}
          </div>
        </div>
        <div className="flex -mt-10">
          <div className="font-bold">PD</div>
          <div className="text-[150px] mr-4 -mt-20"> {p.item.PD}</div>
        </div>
        <div className="flex  -mt-10">
          <div className="font-bold">ED</div>
          <div className="text-[150px] mr-4 -mt-20"> {p.item.ED}</div>
        </div>
      </div>
      {/* BIG TEXT END */}
    </div>
  );
}
