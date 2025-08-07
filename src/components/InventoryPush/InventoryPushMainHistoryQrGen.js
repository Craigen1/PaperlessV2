import React, { useState } from "react";
import { DefButton, DefInput } from "../ComponentList";
import QRCode from "react-qr-code";

export default function InventoryPushMainHistoryQrGen(p) {
  const onClickHandler = (e) => {};
  const [visible, setvisible] = useState(false);
  return (
    <>
      <tr
        className={
          p.index % 2
            ? `ml-2 py-0 px-2 m-0  bg-WhiteMode-FromBackground000       ${p.classNametr1}`
            : `ml-2 py-0 px-2 m-0 bg-gray-400        ${p.classNametr2}`
        }
      >
        {p.columns.map((x) => (
          <>
            {x.name == "Option" ? (
              <td className="px-1">
                <DefButton
                  text="Generate QR"
                  onClick={() => {
                    setvisible(!visible);
                  }}
                  type="2B"
                  className="w-fit px-2   frame m-0   "
                />
              </td>
            ) : (
              <td>
                <span className="ml-2 block break-words">{p.item[x.name]}</span>
              </td>
            )}
          </>
        ))}
      </tr>
      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-trans50 z-50">
          <div className="ml-2 frame mt-10 pt-2 w-fit mx-auto">
            <div className="mx-auto w-fit py-2">
              <QRCode size={300} value={"" + p.qrvalue} />
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-sm pb-2">
              {p.columns.map((x) => (
                <>
                  {x.name != "Option" && (
                    <div className={x.name == "Comments" ? "col-span-3" : ""}>
                      <DefInput
                        label={x.name}
                        value={p.item[x.name]}
                        disabled={true}
                      />
                    </div>
                  )}
                </>
              ))}
            </div>

            <DefButton
              text="Close"
              onClick={() => {
                setvisible(!visible);
              }}
              type="2B"
              className="w-fit px-2   frame m-0  mt-2 float-right"
            />
          </div>
        </div>
      )}
    </>
  );
}
