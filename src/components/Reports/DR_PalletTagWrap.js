import React, { useContext, useState } from "react";
import QRCode from "react-qr-code";
import { ITopContext } from "../../hooks/TopContext";

export default function DR_PalletTagWrap() {
  const { RP_palletingInfo } = useContext(ITopContext);
  const [qrValue, setQrValue] = useState("");

  const SubReport = (e) => {
    return (
      <>
        <div
          className="  gap-0     px-4 relative  text-sm  w-full"
          style={{
            height: "500px",
            maxHeight: "500px",
            minHeight: "500px",
          }}
        >
          <div className="text-lg font-semibold my-0 py-0 text-black text-center w-full">
            PALLET TAG MARKER
          </div>
          <div className="-mt-2">
            <p className=" my-0 py-0 text-black text-center w-full">
              PUNITIN AT IDIKIT SA IBABAW NG PALETA
            </p>
          </div>
          <p className=" my-0 py-0 text-black ">
            <span className="font-bold mr-2">VARIANT</span>
            {e.item.U_Itemcode}
          </p>

          <div className="flex  tracking-tighter">
            <div className=" font-bold text-5xl mr-6 mt-10 ">{e.TYPE}</div>

            <div>
              <div className="mt-8 flex font-semibold">
                PRODUCTION DATE
                <div className="ml-2">
                  <span>{e.item.MnfDate.substring(0, 10)}</span> <br></br>
                  <span> {e.item.Julian}</span>
                </div>
              </div>
              <div className=" font-semibold ">MACHINE / LINE #:</div>
              <div className=" ">
                {e.item.MachineCode}
                {e.item.MachineName}
              </div>
            </div>

            <table className="font-bold text-xl ">
              <tr className="">
                <td className="pr-2 text-center">
                  <div>Batch Details</div>
                  {e.item.Batch.split("|").map((item) => (
                    <>
                      <div>{item}</div>
                    </>
                  ))}
                </td>
                <td className="pr-2 text-center">
                  <div>Quantity</div>
                  <div className="absolute">
                    {e.item.PalletQty.split("|").map((item) => (
                      <>
                        <div>{item}</div>
                      </>
                    ))}
                  </div>
                </td>
                <td className="">
                  <div>Station</div>
                  <div>{e.item.Station}</div>

                  <table className="absolute top-52 right-48 tracking-tighter text-sm font-semibold ">
                    <tr className="">
                      <td className="pb-1 pr-2">DATE:</td>
                      <td className="pb-1 pr-2">
                        {e.item.MnfDate.substring(0, 10)}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">SHIFT:</td>
                      <td className="pb-1 pr-2">{e.item.SHIFT}</td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">PACKER:</td>
                      <td className="pb-1 pr-2 absolute w-96 ">
                        {e.item.U_packer}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">PALLETIZER:</td>
                      <td className="pb-1 pr-2">{e.item.U_Palletizer}</td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">RECEIVED BY:</td>
                      <td className="pb-1 pr-2">{e.item.U_RecievedBy}</td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">ENCODED BY:</td>
                      <td className="pb-1 pr-2">{e.item.U_ReleasedBy}</td>
                    </tr>
                    <tr className="">
                      <td className="pb-1 pr-2">PALLETING #</td>
                      <td className="pb-1 pr-2">
                        <div className="absolute">
                          {e.item.DocNums.split("|").map((item) => (
                            <>
                              <div>{item}</div>
                            </>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>

          <div className="absolute top-1  right-5 px-4 ">
            <QRCode
              size={186}
              value={e.item.PalletNum + "_" + e.item.U_palletid}
            />
          </div>

          <div className=" absolute top-40 ">
            <div className=" flex mt-32">
              <div className="mr-14 font-semibold">
                FG's Classification
                <div className="text-white border-2 w-fit border-black">
                  xxxx
                </div>
              </div>

              <div className="flex">
                <div className="text-center ">
                  <span className="font-semibold text-lg">Pallet Number</span>
                  <br></br>
                  <div className="text-7xl font-bold -mt-4">
                    {e.item.U_palletid}
                  </div>
                </div>
                <div className="text-center  ml-8">
                  <span className="font-semibold text-lg">Quantity</span>{" "}
                  <br></br>
                  <div className="text-7xl font-bold -mt-4">
                    {e.item.U_palletedQty}
                  </div>
                </div>
              </div>
            </div>

            <div className="font-semibold tracking-tighter  flex">
              <div>
                <div className="-mt-10 flex">QA Dispotion</div>
                <div className=" flex">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div
                    className="  "
                    style={{
                      width: "150px",
                    }}
                  >
                    Ok to transfer to controlling (For DMPI Sauce Products) okay
                    for delivery (DMPI Powder Products) passed on and offline
                  </div>
                </div>
              </div>

              <div>
                <div className=" flex mt-2">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div
                    className="  "
                    style={{
                      width: "140px",
                    }}
                  >
                    For Recasing
                  </div>
                </div>
                <div className=" flex  mt-2">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div
                    className="  "
                    style={{
                      width: "80px",
                    }}
                  >
                    HOLD/ For Sorting
                  </div>
                </div>
              </div>

              <div>
                <div className=" flex mt-2">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div
                    className="  "
                    style={{
                      width: "140px",
                    }}
                  >
                    For Promo Bundling
                  </div>
                </div>
                <div className=" flex  mt-2">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div className="  ">
                    REJECTED<br></br> for Dumping
                  </div>
                </div>
              </div>

              <div className="ml-20">
                <div className=" flex mt-4">
                  <div className="text-white border-2 h-6 px-0.5    w-fit border-black">
                    xxxx
                  </div>

                  <div
                    className="  "
                    style={{
                      width: "140px",
                    }}
                  >
                    For Re-processing
                  </div>
                </div>

                <div className="  mt-2">
                  <div>QC:</div>
                  <div>QA:</div>
                </div>
              </div>
            </div>
            <p className="font-semibold">PD-16 Rev.6 (06/22/22)</p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {RP_palletingInfo.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className="print-container"
            style={{ margin: "0", padding: "0" }}
          >
            <div className=" ">
              <div className={"page-break block"}></div>
              <SubReport item={item} TYPE={"B"} />
              <div className="border-dashed border-b-2 border-black mb-2"></div>
              <SubReport item={item} TYPE={"C"} />
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}
