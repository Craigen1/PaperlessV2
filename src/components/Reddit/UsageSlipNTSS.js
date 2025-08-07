import {
  ClipboardListIcon,
  PlusIcon,
  ScaleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "../../assets/SVGs";
import { ITopContext } from "../../hooks/TopContext";
import {
  DefaultFontStypex,
  DefaultFontStypexLink,
  DefaultFontStypexMuted,
  DefButton,
  DefTable,
  delay,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertMultix,
  EXEC_SQL_InsertOne,
  IStep,
  smalBtn,
  UserInfoForPost,
} from "../ComponentList";
import UsageSlipNTSSList from "./UsageSlipNTSSList";

export default function UsageSlipNTSS(props) {
  const Datenw = new Date();
  const [onEditMode, setonEditMode] = useState(false);
  const {
    userInfo,
    setpopLabel,
    setPop,
    setpopTitle,
    settoastVisible,
    settoastMsg,
  } = useContext(ITopContext);
  const [selectedNTSSID, setSelectedNTSSID] = useState(0);

  const columns = [
    {
      name: "ROW_NUM",
    },
    {
      name: "ntss",
      type: "number",
    },
    {
      name: "water",
      type: "number",
    },
    {
      name: "solid",
      type: "number",
    },
    {
      name: "Option",
      type: "number",
    },
  ];

  const colsSQL = [
    {
      name: "createdby",
    },
    {
      name: "createDateTime",
    },
    {
      name: "ntss",
    },
    {
      name: "solid",
    },
    {
      name: "water",
    },
    {
      name: "void",
    },
    {
      name: "USAGEdocEntry",
    },
    {
      name: "docLine",
    },
  ];
  const [ntssSearchContainer, setntssSearchContainer] = useState([{}]);
  const [station, setstation] = useState("");
  const [Duplicate, setDuplicate] = useState(false);
  const [iBom, setiBom] = useState([]);
  const [iBomCls, setiBomCls] = useState([
    {
      name: "ItemCode",
      colspan: 1,
    },
    {
      name: "ItemName",
      colspan: 1,
    },

    {
      name: "qty",
      colspan: 2,
    },
    {
      name: "UoM",
      colspan: 0,
    },
    {
      name: "adj",
      colspan: 1,
    },
  ]);
  const [sql49, setSql49] = useState([]);
  const [iSelectedHistory, setiSelectedHistory] = useState(true);
  const [NTSSVer, setNTSSVer] = useState([]);
  const [stationList, setstationList] = useState([]);
  const [Searchloading, setSearchloading] = useState(false);

  const [Size, setSize] = useState({ CODE: "", NAME: "" });
  const [ProrationType, setProrationType] = useState({ CODE: "", NAME: "" });
  const [Revision, setRevision] = useState({ CODE: "", NAME: "" });
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState([
    {
      title: "Search",
      icon: SearchIcon,
    },
    {
      title: "Usage Selection",
      icon: ClipboardListIcon,
    },
    {
      title: "NTSS Update",
      icon: ScaleIcon,
    },
  ]);

  const [NTSSlist, setNTSSlist] = useState([]);

  const [NTSSlistSolidAndWater, setNTSSlistSolidAndWater] = useState([
    {
      NTSSperc: 0,
      Paste: 0,
      Water: 0,
    },
  ]);

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
    size: "",
  });
  const [HeaderInfo, setHeaderInfo] = useState({
    NTSSVer: "",
    NTSS: "",
  });
  const [HeaderInfo2, setHeaderInfo2] = useState([]);

  const [MNFInfo, setMNFInfo] = useState({
    DateFrom: Datenw.toISOString().substring(0, 10),
    DateTo: Datenw.toISOString().substring(0, 10),
  });
  const HeaderHandler = (e) => {
    const { name, value } = e.target;
    setHeaderInfo({ ...HeaderInfo, [name]: value });
    if (name == "NTSSVer") {
      EXEC_SQL_InsertOne(43, setNTSSlist, value);
    }
    if (name == "NTSS") {
      EXEC_SQL_InsertOne(
        44,
        setNTSSlistSolidAndWater,
        HeaderInfo.NTSSVer,
        value
      );
    }
  };
  const [rows, setrows] = useState([
    {
      ROW_NUM: "",
      createdby: userInfo.ID,
      createDateTime: Datenw.toISOString().substring(0, 10),
      ntss: 0,
      water: 0,
      solid: 0,
      void: 1,
      USAGEdocEntry: selectedNTSSID,
      docLine: 0,
    },
  ]);
  const stationHandler = async (e) => {
    const { value, name } = e.target;
    console.log({ value });
    console.log({ name });
    setstation(value);
  };

  const MNFHandler = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setMNFInfo((preState) => ({ ...preState, [name]: value }));

    console.log(MNFInfo);
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
      // console.log(iHistory);
      setHeaderInfo2(iHistory);
      if (iHistory.length != 0) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
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

  const setSql49handler = async () => {
    handleUpdate();
    return;
    console.log({ HeaderInfo });
    if (HeaderInfo.NTSSVer === "" || HeaderInfo.NTSS === "") {
      settoastVisible(true);
      settoastMsg("NTSS Ver and NTSS is required");
      return;
    } else {
      await EXEC_SQL_InsertOne(
        49,
        setSql49,
        selectedHistoryInfo.id,
        HeaderInfo.NTSSVer,
        HeaderInfo.NTSS,
        NTSSlistSolidAndWater[0].Paste,
        NTSSlistSolidAndWater[0].Water
      );
      setHeaderInfo({
        NTSS: "",
        NTSSVer: "",
      });
      await iFetchUsageSlipHistory();
      await setiSelectedHistory(true);
      await setonEditMode(false);

      settoastVisible(true);
      settoastMsg("NTSS Updated");
    }
  };
  const handleAddNTSSrow = () => {
    if (rows.length === 0) {
      setrows((p) => [
        ...p,
        {
          ROW_NUM: "",
          ID: 1,
          createdby: userInfo.ID,
          createDateTime: Datenw.toISOString().substring(0, 10),
          ntss: 0,
          water: 0,
          solid: 0,
          void: 1,
          USAGEdocEntry: selectedNTSSID,
          docLine: 1,
        },
      ]);
    } else {
      setrows((p) => [
        ...p,
        {
          ROW_NUM: "",
          ID: rows[rows.length - 1].ID + 1,
          createdby: userInfo.ID,
          createDateTime: Datenw.toISOString().substring(0, 10),
          ntss: 0,
          water: 0,
          solid: 0,
          void: 1,
          USAGEdocEntry: selectedNTSSID,
          docLine: rows[rows.length - 1].ID + 1,
        },
      ]);
    }
    return;

    console.log(rows);
  };

  const handleDelete = async (e) => {
    setrows([]);
    const id = e.target.id;
    let indexx = 0;
    rows.map((item, inex) => {
      if (Number(id) === Number(item.ID)) {
        indexx = inex;
      }
    });
    await delay(100);
    console.log(indexx);
    const newrows = [...rows];
    newrows.splice(indexx, 1);
    console.log(newrows);
    setrows(newrows);
  };

  const defTableOnChange = (e) => {
    const { name, id, value } = e.target;

    const newrows = rows.map((item, index) => {
      if (index === parseInt(id)) {
        return {
          ...item,
          [name]: value,
        };
      } else {
        return item;
      }
    });

    setrows(newrows);
  };

  const handleUsageDocEntry = (value) => {
    const newrows = rows.map((item, index) => {
      if (index === parseInt(0)) {
        return {
          ...item,
          USAGEdocEntry: value,
        };
      } else {
        return item;
      }
    });

    setrows(newrows);
  };

  const [ExecRes, setExecRes] = useState();
  const [updateMsg, setupdateMsg] = useState();
  let optionalSQL = `update NTS2 set void  = '0' where  USAGEdocEntry = ${selectedNTSSID} SELECT 'updated' ID `;
  const handleUpdate = async () => {
    // EXEC_SQL(990, setupdateMsg, selectedNTSSID);
    await EXEC_SQL_InsertMulti_V2(
      1000,
      setExecRes,
      colsSQL,
      rows,
      "NTS2",
      optionalSQL
    );
    alert("Updated!!");
  };

  const handleOption = async (e) => {
    console.log(e.target.id);
  };
  // useEffect(() => {
  //  ExecRes;
  // }, [thExecResird]);

  useEffect(() => {
    EXEC_SQL_InsertOne(
      42,
      setNTSSVer,
      selectedHistoryInfo.ProrType,
      selectedHistoryInfo.Revision,
      selectedHistoryInfo.size
    );
  }, [selectedHistoryInfo]);

  useEffect(() => {
    handleUsageDocEntry(selectedNTSSID);
    EXEC_SQL(991, setrows, selectedNTSSID);
  }, [selectedNTSSID]);

  return (
    <>
      <div className="bg-white  px-2 mx-2 mt-2 rounded-md shadow-sm mb-2">
        <IStep components={steps} current={currentStep} />
      </div>

      <div className=" flex flex-row gap-x-3 mb-2  rounded-md  py-1 mx-2 bg-white px-2 shadow-md pt-1.5">
        <div className="w-1/3">
          <input
            id="DateFrom"
            type="Date"
            name="DateFrom"
            autoCapitalize="DateFrom"
            required=""
            defaultValue={Datenw.toISOString().substring(0, 10)}
            onChange={MNFHandler}
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3.5 py-1 text-gray-900 placeholder-gray-400 "
          />
        </div>

        <div className="w-1/3 ">
          <input
            type="date"
            id="DateTo"
            name="DateTo"
            autoCapitalize="DateTo"
            defaultValue={Datenw.toISOString().substring(0, 10)}
            onChange={MNFHandler}
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-gray-900 placeholder-gray-400 "
          />
        </div>

        <div className="w-1/3 ">
          <select
            id="STATION"
            name="STATION"
            className="rounded-md bg-white py-1.5 px-2.5 w-full"
            onChange={stationHandler}
          >
            <option value="%%">*</option>

            {stationList.map((item, index) => (
              <option value={item.Code}>{item.Name}</option>
            ))}
          </select>
        </div>

        <div className="">
          <button
            disabled={Searchloading}
            onClick={() => {
              iFetchUsageSlipHistory();
              setiSelectedHistory(true);
              setonEditMode(false);
              setSelectedNTSSID(0);
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
              <SearchIcon className="flex-shrink-0 h-4 w-4 ml-2 text-WhiteMode-FontButton  text-center" />
            )}
          </button>
        </div>
      </div>

      {onEditMode ? (
        <div>
          <div className="mx-2 shadow-md">
            <UserInfoForPost userInfo={userInfo} />
          </div>

          {/* update NTSS */}

          <div className="w-full focus:ring-2  rounded-md my-1  grow  flex flex-row gap-x-3 px-2       ">
            <div className="px-2 my-0.5 py-1 rounded-md bg-white w-full ">
              {/* <button
                type="button"
                onClick={() => {
                  setDuplicate(false);
                  setiSelectedHistory(true);
                }}
                className=" float-right right-6 mt-1  rounded-md bg-gray-990 flex-shrink-0 h-8 w-8 text-center  focus:ring-2 focus:animate-ping  "
              >
                <PlusIcon className="  w-7 text-WhiteMode-FontButton  text-end rotate-45 self-end inline-block " />
              </button> */}
              <p className="text-xs text-start">
                posted by
                <span className="px-1.5 font-semibold">
                  u/{selectedHistoryInfo.CreatedBy}
                </span>
                {"t/"}
                {selectedHistoryInfo.MNFdate}
              </p>
              <div className="grow flex flex-row -my-1">
                <p className="font-bold px-2   text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit ">
                  B:{selectedHistoryInfo.batch}
                </p>
                <p className="font-bold px-2  ml-2  text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit ">
                  STN:{selectedHistoryInfo.station}
                </p>
                <p
                  className={
                    selectedHistoryInfo.Status === "OPEN"
                      ? "font-bold px-2  ml-2  text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit "
                      : "font-bold px-2  ml-2  text-sm bg-white  text-gray-900   text-center   rounded-md w-fit "
                  }
                >
                  {selectedHistoryInfo.Status}
                </p>
                <p className="w-fit text-sm px-2 -py-0">
                  <span className={DefaultFontStypexMuted}>MNF:</span>
                  <span className={DefaultFontStypex}>
                    {selectedHistoryInfo.MNFdate}
                  </span>
                </p>
              </div>
              <p className="text-start">{selectedHistoryInfo.remarks}</p>
            </div>
          </div>

          <div className="mt-1  overflow-hidden py-2 mx-2 bg-white shadow-md rounded-md">
            <div className="mx-2">
              <DefTable
                columns={columns}
                rows={rows}
                btnCss="w-fit "
                btnLabel="Remove"
                spanCSS="w-full"
                // handleOption={handleOption}
                handleOption={handleDelete}
                onChange={defTableOnChange}
                className=""
              />
            </div>
            <div className="w-full ">
              <div className="mx-auto w-fit my-2">
                <DefButton
                  text="Add Row"
                  className=" w-36 mt-1 mx-auto "
                  onClick={handleAddNTSSrow}
                />
              </div>
            </div>
          </div>

          <div className="mt-2  overflow-auto rounded-md mx-2 bg-white my-2 py-2">
            <div className="px-2">
              <DefTable
                columns={iBomCls}
                rows={iBom}
                disabled={true}
                classNametr1="border-b border-b-white"
                classNametr2="border-b border-b-white"
                className=""
              />
            </div>
          </div>

          <div className="mx-auto w-fit">
            <DefButton
              text="Update"
              className="mx-2 mt-1"
              onClick={setSql49handler}
            />
          </div>
        </div>
      ) : (
        <>
          {HeaderInfo2.map((item, index) => (
            <>
              <button
                key={index}
                onClick={() => {
                  setSelectedHistoryInfo({ ...item });
                  iGetSelectedUsageSlp(item.id);
                  setSelectedNTSSID(item.id);
                  setonEditMode(true);
                  setSize({
                    CODE: item.ID,
                    NAME: item.SIZE,
                  });
                  setCurrentStep(3);
                }}
                type="button"
                className={
                  item.Status === "OPEN"
                    ? " bg-white rounded-md  hover:border-l-gray-900 border-l-8 border-l-main w-full   my-1  grow   gap-x-3 px-2   shadow-md    "
                    : " bg-white rounded-md  hover:border-l-gray-900 border-l-8 border-l-gray-900 w-full   my-1  grow   gap-x-3 px-2   shadow-md    "
                }
              >
                <div className="px-2    w-full  ">
                  <p className="text-xs text-start">
                    posted by
                    <span className="px-1.5 font-semibold">
                      u/{item.CreatedBy}
                    </span>
                    {"t/"}
                    {item.MNFdate}
                  </p>
                  <div className="grow flex flex-row -my-1">
                    <p className="font-bold px-2   text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit ">
                      BATCH: {item.batch}
                    </p>
                    <p className="font-bold px-2  ml-2  text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit ">
                      STN: {item.station}
                    </p>
                    <p
                      className={
                        item.Status === "OPEN"
                          ? "font-bold px-2  ml-2  text-sm bg-white  text-WhiteMode-Font   text-center   rounded-md w-fit "
                          : "font-bold px-2  ml-2  text-sm bg-white  text-gray-900   text-center   rounded-md w-fit "
                      }
                    >
                      {item.Status}
                    </p>
                    <p className="w-fit text-sm px-2 -py-0">
                      <span className={DefaultFontStypexMuted}>MNF:</span>
                      <span className={DefaultFontStypexLink}>
                        {item.MNFdate}
                      </span>
                    </p>
                  </div>
                  <p className="text-start">{item.remarks}</p>
                </div>
                <UsageSlipNTSSList id={item.id} />
              </button>
            </>
          ))}
        </>
      )}
    </>
  );
}
