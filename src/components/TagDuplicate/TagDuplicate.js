import React, { useContext, useEffect, useRef, useState } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "../ComponentList";
import PalletingPrint from "../UniversalPalleting/Print/PalletingPrint";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import { ITopContext } from "../../hooks/TopContext";

export default function TagDuplicate() {
  const { setPopScannerModal, qrInfo, setQrInfo } = useContext(ITopContext);

  const [row, setrow] = useState([]);
  const Components = [
    {
      name: "MnfDate",
      name2: "ExpDate",
      label: "PD ED",
    },
    {
      name: "DR",
      name2: "UomCode",
      label: "DR/UOM",
    },
    {
      name: "AbsEntry",
      label: "QR:",
    },
  ];
  const componentRef = useRef(undefined);
  const onClickHandler = async (e) => {
    setPopScannerModal(true);
    // await EXEC_SQL_InsertOne(788, setrow, 208336);
  };
  const getQrCodes = async (e) => {
    await EXEC_SQL_InsertOne(788, setrow, qrInfo.data);
  };

  useEffect(() => {
    setQrInfo({ type: "", data: "" });
  }, []);

  useEffect(() => {
    if (qrInfo.data == "") return;
    getQrCodes();
  }, [qrInfo.data]);

  return (
    <div className="mx-1">
      <div>
        <DefButton
          text="Search Tag"
          onClick={onClickHandler}
          type="11"
          className="btn btn-active btn-primary  float-right  btn-sm "
        />

        <ReactToPrint
          trigger={() => (
            <button className="btn btn-active btn-primary btn-sm  ">
              🖨️Print
            </button>
          )}
          content={() => componentRef.current}
        />
        <br />
        <br />
        <br />
        <div ref={componentRef} className="mt-4">
          {row.map((item, index) => (
            <>
              <QRCode
                size={230}
                value={"" + item.AbsEntry + ""}
                className="-mt-5 mx-auto"
              />
              <div className="mt-2 mx-auto w-fit">
                <table className="max-w-[240px] border-2 px-1">
                  <tr>
                    <td className="pr-2 border-2 px-1">{item.ItemCode}</td>
                    <td colSpan={2}> {item.Dscription}</td>
                  </tr>
                  {Components.map((e, i) => (
                    <>
                      <tr>
                        <td className="pr-2 border-2 px-1">{e.label}</td>
                        {e.name2 != undefined ? (
                          <>
                            <td className="border-2 px-1">{item[e.name]}</td>
                            <td className="border-2 px-1">{item[e.name2]}</td>
                          </>
                        ) : (
                          <td className="border-2 px-1" colSpan={2}>
                            {item[e.name]}
                          </td>
                        )}
                      </tr>
                    </>
                  ))}
                </table>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
