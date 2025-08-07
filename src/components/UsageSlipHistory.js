import { PlusIcon, SearchIcon } from "@heroicons/react/outline";
import React, { useState, useContext, useEffect } from "react";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";
import {
  DefaultFontStypex,
  DefaultFontStypexMuted,
  DefButton,
  DefInput,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  IStep,
  Label,
  NoteInfo,
  smalBtn,
} from "./ComponentList";
import CalendarPicker from "./CalendarPicker";
export default function UsageSlipHistory() {
  const { setpopLabel, setPop, setpopTitle } = useContext(ITopContext);
  const [stationList, setstationList] = useState([]);
  const [SelectedID, setSelectedID] = useState(0);
  const [openEdit, setopenEdit] = useState(0);

  const [sql48Return, setsql48Return] = useState([]);
  const [iBom, setiBom] = useState({});
  const [dupliationInfo, setdupliationInfo] = useState([]);
  const Datenw = new Date();
  const [DuplicateLoading, setDuplicateLoading] = useState(false);
  const [iSelectedHistory, setiSelectedHistory] = useState(true);
  const [Searchloading, setSearchloading] = useState(false);
  const [selectedUsageSlip, setSelectedUsageSlip] = useState(0);
  const [BatchNumForDuplicate, setBatchNumForDuplicate] = useState(0);
  const [selectedHistoryInfo, setSelectedHistoryInfo] = useState({
    id: 0,
    ProrationType: "",
    MNFdate: "",
    CreatedTime: "",
    Status: "",
    CreatedBy: "",
    remarks: "",
    station: "",
    batch: "",
  });
  const [MNFInfo, setMNFInfo] = useState({
    DateFrom: Datenw.toISOString().substring(0, 10),
    DateTo: Datenw.toISOString().substring(0, 10),
  });

  const today = new Date();
  const [From, setFrom] = useState(today);
  const [To, setTo] = useState(today);

  const [Duplicate, setDuplicate] = useState(false);
  const [station, setstation] = useState("");
  const [HeaderInfo, setHeaderInfo] = useState([]);
  const MNFHandler = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setMNFInfo((preState) => ({ ...preState, [name]: value }));
    console.log(MNFInfo);
  };
  useEffect(() => {
    setMNFInfo((p) => ({
      ...p,
      DateFrom: From.toISOString().substring(0, 10),
    }));
  }, [From]);

  useEffect(() => {
    setMNFInfo((p) => ({ ...p, DateTo: To.toISOString().substring(0, 10) }));
    console.log(To);
  }, [To]);

  const stationHandler = async (e) => {
    const { value, name } = e.target;
    console.log({ value });
    console.log({ name });
    setstation(value);
  };

  const getStationList = async () => {
    await EXEC_SQL(32, setstationList);
  };
  const iFetchUsageSlipHistory = async () => {
    console.log(MNFInfo);
    setSearchloading(true);
    setDuplicate(false);
    try {
      const iHistory = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "9",
          DATEFROM: MNFInfo.DateFrom,
          DATETO: MNFInfo.DateTo,
          VAL: station,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Connection Error");
          setpopLabel("Please make sure you are connected to the internet");
          setPop(true);
          setSearchloading(false);
        });
      setSearchloading(false);
      console.log(iHistory);
      setHeaderInfo(iHistory);
    } catch (error) {
      console.log(error);
    }
  };

  const iGetSelectedUsageSlp = async (eDocEntry) => {
    try {
      const iGetSelected = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "10",
          DOCNUM: eDocEntry,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Connection Error");
          setpopLabel("Please make sure you are connected to the internet");
          setPop(true);
        });
      setiBom(iGetSelected);
      console.log(iGetSelected);
      setiSelectedHistory(false);
    } catch (error) {
      setpopTitle("Something Went wrong");
      setpopLabel("Please try again later");
      setPop(true);
    }
  };
  const AdjEditHandle = (e) => {
    const { name, value } = e.target;
    setAd(value);
  };
  const [ad, setAd] = useState([]);
  const AdjEditconfrm = () => {
    EXEC_SQL_InsertOne(48, setsql48Return, ad, openEdit);
    setopenEdit(0);
    iGetSelectedUsageSlp(SelectedID);
  };

  useEffect(() => {
    getStationList();
  }, []);

  const iStep = [
    {
      title: "Search",
      icon: SearchIcon,
    },
  ];
  const [currentStep, setCurrentStep] = useState(1);

  const headerOnChangeHandler = async (e) => {};

  return (
    <div>
      <>
        {/* <div className="frame ">
          <IStep
            components={iStep}
            current={currentStep}
            className="-mb-12 mt-2"
          />
        </div> */}
        <div className="px-2 pt-4">
          <div className=" frame px-2 flex">
            <div className="frame grid grid-cols-2">
              <div className=" whitespace-nowrap w-fit">
                <DefInput
                  id="machine"
                  clearid="machineClear"
                  dropDownId={99999}
                  handler={headerOnChangeHandler}
                  map={stationList}
                  className="w-44"
                />
              </div>
              <div className=" whitespace-nowrap w-fit">
                <CalendarPicker setFrom={setFrom} setTo={setTo} />
              </div>
            </div>

            {/* <select
              id="STATION"
              name="STATION"
              className="rounded-md bg-mainButton py-1.5 px-2.5 w-full"
              onChange={stationHandler}
            >
              <option value="%%">*</option>

              {stationList.map((item, index) => (
                <option value={item.Code}>{item.Name}</option>
              ))}
            </select> */}
            <div className="">
              <button
                disabled={Searchloading}
                onClick={() => {
                  iFetchUsageSlipHistory();
                  setiSelectedHistory(true);
                }}
                className={
                  Searchloading
                    ? "rounded-md bg-gray-970 flex-shrink-0 h-8 w-8 text-center  animate-pulse"
                    : "rounded-md bg-gray-990 flex-shrink-0 h-8 w-8 text-center"
                }
              >
                {Searchloading ? (
                  <div className="ml-2 -mt-1 animate-pulse">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <SearchIcon className="flex-shrink-0 h-4 w-4 ml-2   text-center" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            {iSelectedHistory ? (
              <>
                {HeaderInfo.map((item) => (
                  <>
                    <button
                      onClick={() => {
                        setSelectedHistoryInfo({ ...item });
                        iGetSelectedUsageSlp(item.id);
                        setSelectedID(item.id);
                        console.log({ item });
                      }}
                      type="button"
                      className=" w-full text-left"
                      // className={
                      //   item.Status === "OPEN"
                      //     ? "bg-redditBadgeBG hover:border-l-gray-900 border-l-8 border-l-main w-full  rounded-r-md my-1  grow  flex flex-row gap-x-3 px-2   shadow-md    "
                      //     : "bg-redditBadgeBG hover:border-l-gray-900 border-l-8 border-l-gray-900 w-full  rounded-r-md my-1  grow  flex flex-row gap-x-3 px-2   shadow-md    "
                      // }
                    >
                      <div className="px-2  frame   w-full  ">
                        <p className="text-xs text-start">
                          posted by
                          <span className="px-1.5 font-semibold">
                            u/{item.CreatedBy}
                          </span>
                          {"t/"}
                          {item.MNFdate}
                        </p>

                        <div className=" flex flex-wrap">
                          <div className="frame">Batch: {item.batch}</div>
                          <div className="frame">Machine: {item.Machine}</div>
                        </div>
                        <p className="text-start">{item.remarks}</p>
                        <div className="flex h-2 round-md ">
                          <div
                            className="text-transparent "
                            style={{
                              width: `${item.doneperc}%`,
                              backgroundColor: "green",
                            }}
                          >
                            0
                          </div>

                          <div
                            className="text-transparent "
                            style={{
                              width: `${100 - item.doneperc}%`,
                              backgroundColor: "red",
                            }}
                          >
                            0
                          </div>
                        </div>
                      </div>
                    </button>
                  </>
                ))}
              </>
            ) : (
              <>
                <div className="w-full focus:ring-2  rounded-md my-1  grow  flex flex-row gap-x-3 px-2       ">
                  <div className=" frame w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setDuplicate(false);
                        setiSelectedHistory(true);
                      }}
                      className=" float-right right-6 mt-1  rounded-md bg-gray-990 flex-shrink-0 h-8 w-8 text-center  focus:ring-2 focus:animate-ping  "
                    >
                      <PlusIcon className="  w-7   text-end rotate-45 self-end inline-block " />
                    </button>
                    <p className="text-xs text-start">
                      posted by
                      <span className="px-1.5 font-semibold">
                        u/{selectedHistoryInfo.CreatedBy}
                      </span>
                      {"t/"}
                      {selectedHistoryInfo.MNFdate}
                    </p>
                    <div className="grow flex flex-row -my-1">
                      <p className="font-bold px-2   text-sm     text-center   rounded-md w-fit ">
                        B:{selectedHistoryInfo.batch}
                      </p>
                      <p className="font-bold px-2  ml-2  text-sm     text-center   rounded-md w-fit ">
                        STN:{selectedHistoryInfo.station}
                      </p>
                      <p
                        className={
                          selectedHistoryInfo.Status === "OPEN"
                            ? "font-bold px-2  ml-2  text-sm     text-center   rounded-md w-fit "
                            : "font-bold px-2  ml-2  text-sm   text-gray-900   text-center   rounded-md w-fit "
                        }
                      >
                        {selectedHistoryInfo.Status}
                      </p>
                      <p className="w-fit text-sm px-2 -py-0">
                        <span className={DefaultFontStypexMuted}>MNF:</span>
                        <span className={DefaultFontStypex}>
                          {" "}
                          {selectedHistoryInfo.MNFdate}
                        </span>
                      </p>
                    </div>
                    <p className="text-start">{selectedHistoryInfo.remarks}</p>
                  </div>
                </div>

                <div className="w-full focus:ring-2  rounded-md my-1  grow  flex flex-row gap-x-3 px-2       ">
                  <div className="  frame w-full ">
                    <table className="w-full  ">
                      <tr className="">
                        <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                          ITEM
                        </th>
                        <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                          QTY
                        </th>
                        <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                          ADJ
                        </th>
                        <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                          UOM
                        </th>
                      </tr>
                      {iBom.map((item) => (
                        <tr>
                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                            <div>
                              <p className=" -mb-2">{item.ItemCode}</p>
                              <input
                                className="text-xs w-full border-0 bg-transparent"
                                defaultValue={item.ItemName}
                              ></input>
                            </div>
                          </td>
                          <td className="font-semibold text-sm px-2 pt-0.5 text-left border">
                            {item.qty}
                          </td>
                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                            {item.adj}
                          </td>
                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                            {item.UoM}
                          </td>
                          <td className="font-semibold text-sm pl-2  pt-0.5 text-left border">
                            <button
                              onClick={() => setopenEdit(item.id)}
                              className={smalBtn}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </table>
                    <div className="fixed left-0 bottom-3 items-center justify-center  w-full">
                      {Duplicate ? (
                        <div className=" grow appearance-none rounded-md   w-4/5  mx-auto border bg-mainButton my-4 px-4">
                          <Label text="🚨 Are you sure you want to duplicate this Batch?" />
                          <Label
                            text={`👀 Note that the batch # will be ${
                              parseInt(selectedHistoryInfo.batch) + 1
                            }`}
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <div className=" justify-center flex w-full">
                        {Duplicate ? (
                          <button
                            className={smalBtn}
                            onClick={async () => {
                              setDuplicateLoading(true);
                              setDuplicate(!Duplicate);

                              await EXEC_SQL(
                                39,
                                setdupliationInfo,
                                selectedHistoryInfo.id
                              );
                              await iFetchUsageSlipHistory();
                              setiSelectedHistory(true);
                              setDuplicateLoading(false);
                            }}
                          >
                            {!DuplicateLoading ? (
                              <div className="mx-2 my-2">👍 Confirm </div>
                            ) : (
                              <div className="ml-2 -mt-1 animate-pulse">
                                <LoadingSpinner />
                              </div>
                            )}
                          </button>
                        ) : (
                          <button
                            className={smalBtn}
                            onClick={async () => {
                              setDuplicate(!Duplicate);
                            }}
                          >
                            <div className="mx-2 my-2">✍️ Duplicate </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="  mx-2   justify-center  flex flex-grow  font-bold  text-sm bg-gray-700  text-gray-900   text-center  rounded-lg px-3">
                  <p className=" text-xs text-gray-900 -pb-0 mb-1 py-1.5 ">
                    <span className="rounded-full border-2 border-gray-900 italic  px-1.5  mr-2 ">
                      i
                    </span>
                    Search for Usage Slip by MNF <br></br>
                    <br></br> If searching does not return value it means that
                    the Usage Slip has not been created yet.
                  </p>
                  
                </div> */}
              </>
            )}
            {HeaderInfo.length > 0 ? (
              <></>
            ) : (
              <NoteInfo
                title="Note"
                body="If searching does not return value it means that the Usage
          Slip has not been created yet."
              />
            )}
          </div>
          {openEdit > 0 ? (
            <div className="absolute h-screen w-screen top-1/3 left-0">
              <div className="w-96 h-fit bg-github_FormBackGround mx-auto rounded-md border ">
                <div className="mx-4">
                  <DefInput
                    id="Adj"
                    handler={AdjEditHandle}
                    type="text"
                    Lcss="mt-2 mb-1"
                  />

                  <DefButton text="Update" onClick={AdjEditconfrm} css="my-3" />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
