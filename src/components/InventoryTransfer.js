import React, { useContext, useEffect, useState } from "react";
import { PaperAirplaneIcon, QrcodeIcon } from "@heroicons/react/outline";
import { ITopContext } from "../hooks/TopContext";
import { Transition } from "@headlessui/react";
import { LoadingSpinner } from "../assets/SVGs";
import { Tab } from "@headlessui/react";
import {
  ConfirmButton,
  DefaultButtonStyle,
  DefaultButtonStyleNullified,
  DefaultFontStype,
  DefaultHeaderStyle,
  DefButton,
  Label,
  smalBtn,
} from "./ComponentList";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function InventoryTransfer(props) {
  const [DocNum, setDocNum] = useState("");
  const [APPROVALs, setAPPROVAL] = useState("");
  const [loading, setloading] = useState(false);
  const [Timer, setTimer] = useState(0);
  const [decision, setDecision] = useState("");
  const StatusSet = (event) => {
    console.log(event.target.value);
    setAPPROVAL(event.target.value);
  };

  const initialITR = {
    ROW: 0,
    ITEMCODE: "",
    ITEMNAME: "",
    QTY: "",
    UoM: "",
    BATCH: "",
    FROMWHSCODE: "",
    TOWHSCODE: "",
  };
  const [ITRtable, setITRtable] = useState([initialITR]);

  const {
    PopScannerModal,
    setPopScannerModal,
    qrInfo,
    setQrInfo,
    setPop,
    setpopLabel,
    setpopTitle,
    userInfo,
    // setPopLoad,
  } = useContext(ITopContext);

  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const fetchStatus = async () => {
    setloading(true);
    const myInterval = setInterval(() => {
      GetItrStatus(myInterval);
    }, 1000);
    return myInterval;
  };

  const [SAPinfo, setSAPinfo] = useState({});
  const handleSapInfo = (e) => {
    try {
      const { value, name } = e.target;
      setSAPinfo({ ...SAPinfo, [name]: value });
      console.log({ name, value });
    } catch (error) {
      console.log({ error });
    }
  };
  const GetItrStatus = async (interval) => {
    console.log("A");
    // setPopLoad(true);
    const ITRStatus = await fetch("/api/ITRStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        DOCNUM: DocNum,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        setpopTitle("Error");
        setpopLabel(err.message);
        setPop(true);
        console.log("B");

        // setPopLoad(false);
        return;
      });
    setDecision(ITRStatus[0].decision);
    console.log(ITRStatus[0].decision);
    console.log("cleared");

    if (
      ITRStatus[0].decision === "SAP Login Error" ||
      ITRStatus[0].decision === "Approved" ||
      ITRStatus[0].decision === "Disapproved"
    ) {
      // setPopLoad(false);
      clearInterval(interval);
      console.log("cleared");
      setpopTitle("Document Status");
      setpopLabel("Document Status: " + ITRStatus[0].decision + "\n" + "");
      setPop(true);
      setloading(false);
      setloading(false);
      console.log("cleared");
      return;
    }
  };

  const InsertDisition = async () => {
    //controls
    setloading(true);
    console.log("4");

    if (APPROVALs === "") {
      setpopTitle("⚠️ Required Condition");
      setpopLabel("Please select a [STATUS]");
      setPop(true);
      setloading(false);
      console.log("5");

      return;
    } else if (DocNum === "") {
      setpopTitle("⚠️ Required Condition");
      setpopLabel("Please SCAN a [DOCUMENT #]");
      setPop(true);
      setloading(false);
      console.log("6");

      return;
    }

    //end of controls
    // await fetchState();

    try {
      // setPopLoad(true);
      console.log("1");
      const pre_query = new Date();
      const iPostDisition = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "2",
          DOCNUM: DocNum,
          APPROVAL: APPROVALs,
          UESRID: userInfo.ID,
          VAL: SAPinfo.Username,
          VAL2: SAPinfo.Password,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          // setPopLoad(false);
          console.log("2");

          setpopTitle("Error");
          setpopLabel("No Record found");
          setPop(true);
          return;
        });
      // setPopLoad(false);
      console.log("3");
      console.log(iPostDisition[0].RETURNCODE);
      // do something here
      if (iPostDisition[0].RETURNCODE === 1) {
        setpopTitle("⚠️ Recurring Document");
        setpopLabel(iPostDisition[0].RETURNMSG);
        setPop(true);
        setloading(false);
        return;
      }

      const executed_query = new Date();
      console.log(executed_query - pre_query + "ms");
      fetchStatus();
    } catch (error) {
      console.log(error);
      // setPopLoad(false);
    }
  };

  const iSelectScannedITR = async () => {
    try {
      const ITRfetch = await fetch("/itr_draft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          DocNum: qrInfo.data,
          // DocNum: DocNum,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          setpopTitle("Connection Error");
          setpopLabel(err);
          setPop(true);
          return;
        });
      if (ITRfetch.length === 0) {
        setpopTitle("No ITR Found");
        setpopLabel("No ITR Found");
        setPop(true);
        restart();
        return;
      }
      setITRtable(ITRfetch);
      console.log(ITRfetch);
    } catch (error) {
      setpopTitle("Connection Error");
      setpopLabel(error);
      setPop(true);
    }
  };

  // scann handler and sql selector
  useEffect(() => {
    try {
      if (qrInfo.data > 0) {
        setDocNum(qrInfo.data);
        iSelectScannedITR();
        // alert("ITR Scanned");
      }
    } catch (error) {
      console.log(error);
    }
  }, [qrInfo.data]);
  // }, [DocNum]);
  const restart = () => {
    setDocNum("");
    setDecision("");
    setQrInfo({ ...[] });
    // setITRtable(initialITR);
  };
  useEffect(() => {
    restart();
    return;
  }, []);

  return (
    <div className="w-full      sm:px-0">
      <>
        <div className="">
          <div id="Inv">
            <form action="#" className="grid grid-cols-1 gap-y-3 mb-5 px-4">
              <div className="-mt-14">
                <div className=" float-right flex w-fit gap-2">
                  <DefButton
                    text="Scan ITR "
                    className="px-2 w-fit"
                    onClick={() => {
                      setPopScannerModal(true);
                    }}
                  />

                  {/* <DefButton
                    text="ITR "
                    className="px-2  w-fit"
                    onClick={() => {
                      setDocNum(131438);
                      iSelectScannedITR();
                    }}
                  /> */}
                </div>
              </div>
              {/* <h1 className={DefaultHeaderStyle}>Approval Process</h1> */}
              <div className="grow flex flex-row  ">
                <div className="w-1/2 pr-1">
                  <div className="grid grid-cols-2">
                    <Label text="Document #" className="w-full" />
                  </div>
                  <div>
                    <input
                      id="DocNum"
                      value={DocNum}
                      name="DocNum"
                      autocomplete="DocNum"
                      onChange={(e) => {
                        setDocNum(e.target.value);
                      }}
                      text="number"
                      className="w-full  "
                    ></input>
                  </div>
                </div>

                <div className="w-1/2 pl-1 invisible">
                  <Label text="Status" />
                  <div>
                    <select
                      id="Status"
                      name="Status"
                      value={APPROVALs}
                      onChange={(e) => {
                        StatusSet(e);
                      }}
                    >
                      <option selected>Select Status</option>
                      <option value="Approve">Approve</option>
                      <option value="Disapprove">Disapprove</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className=" rounded-md  bg-GitHub-Background000  borderdiv ">
                <Label
                  text="SAP Info"
                  className="bg-GitHub-Background100 w-full p-1 rounded-tl-md rounded-tr-md pl-2 "
                />
                <div className="px-2 pb-2">
                  <div className="flex ">
                    <div className="w-1/2 mr-1">
                      <Label text="Username" />

                      {/* <div className={InputStyleBox}> */}
                      <input
                        id="Username"
                        type="text"
                        name="Username"
                        onChange={handleSapInfo}
                      />
                      {/* </div> */}
                    </div>
                    <div className="w-1/2 ml-1">
                      <Label text="Password" />

                      {/* <div className={InputStyleBox}> */}
                      <input
                        id="Password"
                        name="Password"
                        type="password"
                        onChange={handleSapInfo}
                      />
                      {/* </div> */}
                    </div>
                  </div>

                  <Label text="Remarks" />

                  <input
                    id="Remarks"
                    type="text"
                    name="Remarks"
                    onChange={handleSapInfo}
                  />
                </div>
              </div>
              <div>
                <label for="From warehouse" className={DefaultFontStype}>
                  From warehouse
                </label>
                <input
                  id="From warehouse"
                  type="text"
                  value={ITRtable[0].FROMWHSCODE}
                  name="From warehouse"
                  // onChange={[]}
                  required=""
                  disabled="disabled"
                />
              </div>
              <div>
                <label for="To warehouse" className={DefaultFontStype}>
                  To warehouse
                </label>
                <input
                  id="To warehouse"
                  type="text"
                  name="To warehouse"
                  value={ITRtable[0].TOWHSCODE}
                  required=""
                  disabled="disabled"
                />
              </div>
            </form>
            {/* <h1 className="text-3xl font-bold text-mainText ml-4">
                        Line Details
                      </h1> */}
            {ITRtable.length > 1 ? (
              <>
                <div className="overflow-x-auto mb-14 w-full">
                  <table className="">
                    <tr>
                      <th className="font-semibold    text-left border  w-fit ">
                        <div>Item</div>
                      </th>
                      <th className="font-semibold   text-left border  w-full">
                        Qty <div className="separator"></div>UoM
                      </th>
                      <th className="font-semibold   text-left border  w-full">
                        Batch
                      </th>
                    </tr>
                    {ITRtable.map((item, index) => (
                      <tr key={index} className="">
                        <td className="  border whitespace-nowrap ">
                          <div>
                            <p className="border-b border-gray-700">
                              {item.ITEMCODE}
                            </p>
                            <p className="text-xs">{item.ITEMNAME}</p>
                          </div>
                        </td>
                        <td className="  border whitespace-nowrap">
                          <div>
                            <p> {item.QTY}</p>
                            <p> {item.UoM}</p>
                          </div>
                        </td>
                        <td className="  border whitespace-nowrap">
                          {item.BATCH}
                        </td>
                        <td className="  border whitespace-nowrap">
                          <button className="h-12 w-full font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-white  bg-github_ButtonGreen">
                            Approve
                          </button>
                          <br></br>
                          <button className="h-12  w-full  font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-white  bg-red-500">
                            Reject
                          </button>
                        </td>
                        <td className="  border whitespace-nowrap">
                          {item.BATCH}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className=" bottom-4 flex bg-transparent w-full ">
          <div className="mx-10 w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
            <button
              type="button"
              className={ConfirmButton}
              disabled={loading}
              onClick={() => {
                InsertDisition();
              }}
            >
              {loading ? (
                <span>
                  <LoadingSpinner text={"Processing..."} />
                </span>
              ) : (
                <span>
                  Confirm <span aria-hidden="true"> → </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </>
    </div>
  );
}

export default InventoryTransfer;
