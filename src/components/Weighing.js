import {
  SearchIcon,
  QrcodeIcon,
  ArrowLeftIcon,
  ClipboardListIcon,
  ArchiveIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import React, { useState, useContext, useEffect, useRef } from "react";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";
import {
  ConfirmButton,
  DefButton,
  DefInput,
  DefMenus,
  DefTable,
  delay,
  EXEC_SQL,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  IStep,
  NoteInfo,
  smalBtn,
} from "./ComponentList";
import WPrinter from "./printers/WeighingPrinter/WPrinter";
import MaterialListA from "./MaterialList/MaterialListA";
import SampleForm from "./AbcFiles/SampleForm";
import Usageslip2PreWeightSheet from "./Usageslip2PreWeightSheet";
import Usageslip2PreWeightSheetTable from "./Usageslip2PreWeightSheetTable";
export default function Weighing() {
  const {
    userid,
    setpopLabel,
    setPop,
    setpopTitle,
    setCanNavigate,
    setPopScannerModal,
    qrInfo,
    setWeighingPrinterObject,
    userInfo,
  } = useContext(ITopContext);
  const [printLoading, setPrintLoading] = useState(false);
  const [loadingOnPost, setloadingOnPost] = useState(false);
  const [GenBarcode, setGenBarcode] = useState(true);
  const [iBom, setiBom] = useState({});
  const [iBom2, setiBom2] = useState([]);
  const Datenw2 = new Date();
  const Datenw = new Date();
  const [BatchSelected, setBatchSelected] = useState(true);
  const [SelectedItemForBatch, setSelectedItemForBatch] = useState(0);
  const [iSelectedHistory, setiSelectedHistory] = useState(true);
  const [Searchloading, setSearchloading] = useState(false);
  const [loading, setloading] = useState(false);
  const [stationList, setstationList] = useState([]);
  const [station, setstation] = useState("");

  const [SelectedMenuId, setSelectedMenuId] = useState(0);
  const menus = [
    {
      id: 0,
      text: "Usage Slip",
    },
    {
      id: 1,
      text: "Weighed  Batch",
    },
  ];

  const columns = [
    {
      name: "Batch",
      disabled: true,
    },
    {
      name: "Qty",
      disabled: true,
    },
    {
      name: "PD",
      disabled: true,
    },
    {
      name: "ED",
      disabled: true,
    },

    {
      name: "Option",
      type: "number",
    },
  ];

  const [PostedRow, setPostedRow] = useState([]);

  const [selectedHistoryInfo, setSelectedHistoryInfo] = useState({
    id: 0,
    ProrationType: "",
    MNFdate: "",
    CreatedTime: "",
    Status: "",
    CreatedBy: "",
    remarks: "",
    station: "",
    needed: "",
  });

  const [Batch, setBatch] = useState({
    id: "",
    index: "",
    batch: "",
    PD: "",
    ED: "",
    QR: "",
    quantity: 0,
    DocEntry: 0,
  });
  const [BatchHolder, setBatchHolder] = useState([]);
  const [ScannedBatchInfo, setScannedBatchInfo] = useState(false);

  const HandlePostedBatchOption = () => {
    return (
      <>
        <div className="bg-red-500 w-10 h-10 absolute">
          <DefButton text="A" />
          <DefButton text="B" />
        </div>
      </>
    );
  };
  const flotbtn = useRef(null);
  const [flotBtnVis, setFlotBtnVis] = useState(false);
  const [flotbtnPos, setFlotbtnPos] = useState({
    left: 0,
    top: 0,
  });
  const [loadPrint, setLoadPrint] = useState(false);
  const [optionsID, setoptionsID] = useState(0);
  const handleOption = async (e) => {
    setFlotBtnVis(true);
    setLoadPrint(true);
    const { value, id, name } = e.target;
    setFlotbtnPos({
      left: e.pageX - 100,
      top: e.pageY,
    });
    await EXEC_SQL_InsertOne(971, setWeighingPrinterObject, id);
    console.log({ value, id, name });
    setLoadPrint(false);
    setoptionsID(id);
  };
  const HandleOptionsPostedBatch = async (e) => {
    // 1 = X   , 2 = Print , 3 = delete e.target.id
    const { id, name, value } = e.target;
    if (id == 2) {
      setGenBarcode(false);
    }
    if (id == 3) {
      await EXEC_SQL_InsertOne(
        970,
        setPostedRow,
        selectedHistoryInfo.id,
        iBom[SelectedItemForBatch].ItemCode,
        optionsID
      );
    }
    setFlotBtnVis(false);
  };
  const HandlePrintAllWeighedMats = async (e) => {
    await EXEC_SQL_InsertOne(
      969,
      setWeighingPrinterObject,
      selectedHistoryInfo.id
    );
    setGenBarcode(false);
  };
  // useEffect(() => {
  //   goToBot();
  // }, [PostedRow]);

  useEffect(() => {
    console.log({ SelectedMenuId });
    if (Array.isArray(HeaderInfo) === false) return;
    if (HeaderInfo.length <= 0) return;
    getPostedBatchofItem(HeaderInfo[0].id);
  }, [SelectedMenuId]);

  useEffect(() => {
    if (BatchHolder.length > 0) {
      setBatch((p) => ({
        ...p,
        batch: BatchHolder[0].batch,
        PD: BatchHolder[0].PD,
        ED: BatchHolder[0].ED,
        quantity: BatchHolder[0].quantity,
        itemcode: BatchHolder[0].itemcode,
        itemname: BatchHolder[0].itemname,
      }));
      let index = 0;
      iBom.map((ee, ii) => {
        if (ee.id == BatchHolder[0].itemId) index = ii;
      });
      setSelectedItemForBatch(index);
    } else {
      setBatch((p) => ({
        // ...p,
        batch: "",
        PD: "",
        ED: "",
        quantity: "",
      }));
    }
  }, [BatchHolder]);

  const SubLines = (p) => {
    return (
      <>
        {/* <span className="text-xs   text-right  ">{p.title}</span>

        <div>
          <span className="text-xs  w-fit float-left  bg-WhiteMode-Background000 px-2  rounded-md mr-1">
            {p.value}
          </span>
        </div> */}
        <div>
          <DefInput label={p.title} value={p.value} className="frame" />
        </div>
      </>
    );
  };

  const SubLines2 = (p) => {
    return (
      <>
        <div>
          <span className="text-xs  w-fill  float-left text-WhiteMode-ButtonBackground000  bg-transparent   rounded-md ">
            {p.value}
          </span>
        </div>
      </>
    );
  };
  const SubLinesTitle = (p) => {
    return (
      <>
        <div>
          <span className="font-semibold  float-left text-WhiteMode-Font    rounded-md  ">
            {p.title}
          </span>
        </div>
      </>
    );
  };
  const sBatch = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setBatch((p) => ({ ...p, [id]: value }));
    console.log({ Batch });
  };

  const stationHandler = async (e) => {
    const { value, name } = e.target;
    console.log({ value });
    console.log({ name });
    setstation(value);
  };
  const [BatchContainer, setBatchContainer] = useState([]);
  Datenw2.setDate(Datenw2.getDate() - 7);
  const datex = new Date(Datenw2);
  const [MNFInfo, setMNFInfo] = useState({
    DateFrom: datex.toISOString().substring(0, 10),
    DateTo: Datenw.toISOString().substring(0, 10),
  });
  const [HeaderInfo, setHeaderInfo] = useState([]);
  const MNFHandler = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setMNFInfo((preState) => ({ ...preState, [name]: value }));
    console.log(MNFInfo);
  };
  const iFetchUsageSlipHistory = async () => {
    console.log(MNFInfo);
    setSearchloading(true);
    setCanNavigate(false);
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
          setpopTitle("Connection Erro asdr");
          setpopLabel("101 Please make sure you are connected to the internet");
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
          setpopTitle("Connection Error asd");
          setpopLabel("10 Please make sure you are connected to the internet");
          setPop(true);
        });
      setiBom(iGetSelected);
      setiBom2(iGetSelected);

      console.log(iGetSelected);
      setiSelectedHistory(false);
      return;
      const getPostedBatch = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "14",
          DOCNUM: eDocEntry,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Connection Error");
          setpopLabel(
            "14 Please make sure you are connected to the internet: cant get batch"
          );
          setPop(true);
        });
      setBatchContainer(getPostedBatch);
      console.log(getPostedBatch);
    } catch (error) {
      setpopTitle("Something Went wrong");
      setpopLabel("Please try again later");
      setPop(true);
    }
  };
  const [ExecRes, setExecRes] = useState([]);
  const InsertWeighingBatch = async (eDocEntry) => {
    if (BatchContainer[0].docEntry == undefined) {
      console.log("pasok!");
      const HoldBatchContainer = [...BatchContainer];
      HoldBatchContainer.splice(1, 1);
      console.log(HoldBatchContainer);
      setBatchContainer(HoldBatchContainer);
    }

    let overallNeed = 0;
    iBom.map((item, index) => {
      overallNeed += parseFloat(item.needed);
    });

    console.log({ BatchContainer });
    console.log({ overallNeed });
    console.log(selectedHistoryInfo.id);
    const colsSQL = [
      {
        name: "docEntry",
      },
      {
        name: "lineNum",
      },
      {
        name: "Batch",
      },
      {
        name: "Qty",
      },
      {
        name: "CreatedTime",
      },
      {
        name: "CreatedBy",
      },
      {
        name: "void",
      },
    ];
    await EXEC_SQL_InsertMulti_V2(
      1000,
      setExecRes,
      colsSQL,
      BatchContainer,
      "USG2"
    );

    return;
    try {
      const iGetSelected = await fetch("InsertWeighingBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          BATCH: BatchContainer,
          OVERNEED: overallNeed,
          DOCENTRY: selectedHistoryInfo.id,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Connection Error  asd");
          setpopLabel("192 Please make sure you are connected to the internet");
          setPop(true);
          setloadingOnPost(false);
        });

      try {
        console.log(iGetSelected[0].ID);
        UpdateSelectedUsageToClose(iGetSelected[0].ID);
        setloadingOnPost(false);

        setpopTitle("Batch Weighing Created");
        setpopLabel("Weighing Batch Created Successfully");
        setPop(true);
      } catch (error) {
        setpopTitle("Something Went wrong");
        setpopLabel("Please check your inputs!!");
        setPop(true);
      }
    } catch (error) {
      setpopTitle("Batch Details Error");
      setpopLabel(error);
      setPop(true);
      setloadingOnPost(false);
    }
  };

  const getBatchFromDB = async () => {
    console.log(selectedHistoryInfo.id);
    try {
      const batch = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "13",
          DOCNUM: selectedHistoryInfo.id,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Connection Error x");
          setpopLabel("235 Please make sure you are connected to the internet");
          setPop(true);
        });
      setWeighingPrinterObject(batch);
      setGenBarcode(false);
      console.log(batch);
    } catch (error) {
      console.log(error);
    }
  };

  function UpdateSelectedUsageToClose(eDocEntry) {
    let overallNeed = 0;
    console.log({ iBom });
    iBom.map((item, index) => {
      overallNeed += parseFloat(item.needed);
    });
    if (overallNeed === 0) {
      const newBatch = HeaderInfo.map((item, index) => {
        if (item.id === eDocEntry) {
          console.log(eDocEntry);
          return {
            ...item,
            Status: "CLOSE",
          };
        } else {
          return item;
        }
      });
      setHeaderInfo(newBatch);
      setSelectedHistoryInfo((p) => ({ ...p, Status: "CLOSE" }));
      console.log(newBatch);
    }
  }
  function blockng() {
    if (
      Batch.batch === "" ||
      Batch.PD === "" ||
      Batch.ED === "" ||
      Batch.quantity <= 0
    ) {
      setpopTitle("Batch Detials Error");
      setpopLabel("Please check the batch detials");
      setPop(true);
      return true;
    }
    return neededHandler();
  }
  function neededHandler() {
    if (iBom2[SelectedItemForBatch].needed < Batch.quantity) {
      setpopTitle("Batch Detials Error");
      setpopLabel("[Quantity] is greater than needed");
      setPop(true);
      return true;
    }

    console.log(iBom[SelectedItemForBatch]);
  }

  function removeBatch(itemIndex, qty) {
    console.log({ itemIndex });
    const HoldBatchContainer = [...BatchContainer];
    HoldBatchContainer.splice(itemIndex, 1);
    console.log(HoldBatchContainer);
    setBatchContainer(HoldBatchContainer);

    const newBatch = iBom.map((item, index) => {
      if (index === SelectedItemForBatch) {
        return {
          ...item,
          needed: Number((item.needed + qty).toFixed(3)),
        };
      } else {
        return item;
      }
    });

    setiBom(newBatch);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  const [addBatchReturnResult, setaddBatchReturnResult] = useState([]);
  const addBatch = async (batch) => {
    console.log({ batch });
    if (blockng()) return;
    setBatchContainer((p) => [
      ...p,
      {
        id: batch.length + 1,
        index: SelectedItemForBatch,
        lineNum: SelectedItemForBatch,
        batch: Batch.batch,
        Batch: Batch.batch,
        quantity: Number(Batch.quantity),
        Qty: Number(Batch.quantity),
        PD: Batch.PD,
        ED: Batch.ED,
        DocEntry: iBom[SelectedItemForBatch].DocEntry,
        docEntry: iBom[SelectedItemForBatch].DocEntry,
        User: userid,
        CreatedBy: userid,
        CreatedTime: "@NOWTIME",
        void: "1",
      },
    ]);

    // insert one
    // console.log(iBom[SelectedItemForBatch]);
    await EXEC_SQL_InsertOne(
      840,
      setaddBatchReturnResult,
      iBom[SelectedItemForBatch].DocEntry, //1
      Batch.batch, //2
      Number(Batch.quantity), //3
      userid //4
    );

    setBatch((p) => ({
      ...p,
      batch: "",
      PD: "",
      ED: "",
      quantity: "",
    }));

    const newBatch = iBom.map((item, index) => {
      if (index === SelectedItemForBatch) {
        return {
          ...item,
          needed: Number((item.needed - Batch.quantity).toFixed(3)),
        };
      } else {
        return item;
      }
    });

    setiBom(newBatch);

    getPostedBatchofItem();
  };
  const getStationList = async () => {
    await EXEC_SQL(32, setstationList);
  };
  const igetBatchInfo = async () => {
    console.log(
      qrInfo.data,
      iBom[SelectedItemForBatch].ItemCode,
      HeaderInfo[0].id
    );
    setBatchHolder([]);
    setloading(true);
    await EXEC_SQL_InsertOne(
      974,
      setBatchHolder,
      qrInfo.data,
      iBom[SelectedItemForBatch].ItemCode,
      HeaderInfo[0].id
    );
    setloading(false);
    setScannedBatchInfo(true);
    return;
    try {
      // alert("1");
      //   --alert(qrInfo.data);
      // --  alert(iBom[SelectedItemForBatch].ItemCode);
      const iGetBatchInfo = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "11",
          BATCH: qrInfo.data,
          ITEMCODE: iBom[SelectedItemForBatch].ItemCode,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          setpopTitle("Scanning Error");
          setpopLabel("Please make sure your scanning the right item/batch");
          setPop(true);
        });
      // alert("2");

      // // // // // alert(iGetBatchInfo[0].MnfDate);
      // if (!iGetBatchInfo.length > 0) {
      if (iGetBatchInfo[0].Batch !== "") {
        setBatch((p) => ({
          ...p,
          batch: qrInfo.data,
          PD: iGetBatchInfo[0].MnfDate,
          ED: iGetBatchInfo[0].ExpDate,
          quantity: iGetBatchInfo[0].Quantity,
        }));
      } else {
        setpopTitle("-01 Batch Not Found");
        setpopLabel("Please check the barcode;");
        setPop(true);
      }
    } catch (error) {
      setpopTitle("-02 Batch Not Found");
      setpopLabel("Please check the barcode;");
      setPop(true);
    }
  };
  function iRestart() {
    try {
      setBatchContainer([{}]);
    } catch (error) {
      console.log(error);
    }
  }
  const [iLoaded, setiLoaded] = useState(false);
  const newiBom = async () => {
    const newbox = iBom.map((item) => {
      return { ...item, needed: parseFloat(item.needed.toFixed(2)) };
    });
    console.log({ newbox });
    setiBom(newbox);
  };
  const goToBot = () => {
    window.scrollBy(0, 100000);
  };
  const [loadingGetBatch, setloadingGetBatch] = useState(false);
  const getPostedBatchofItem = async (entry) => {
    setloadingGetBatch(true);
    setFlotBtnVis(false);
    setPostedRow([]);
    await EXEC_SQL_InsertOne(
      973,
      setPostedRow,
      entry
      // items.DocEntryx,
      // items.ItemCode
    );
    setloadingGetBatch(false);
  };

  // useEffect(() => {
  //   getPostedBatchofItem();
  // }, [SelectedItemForBatch]);

  useEffect(() => {
    if (!iSelectedHistory) newiBom();
  }, [iSelectedHistory]);

  useEffect(() => {
    try {
      if (!iLoaded) {
        return;
      }
      if (qrInfo.data !== "") {
        console.log(qrInfo.data);
        igetBatchInfo();
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }, [qrInfo.data]);
  useEffect(() => {
    const rePrint = async () => {
      await delay(500);
      setGenBarcode(true);
      console.log("asd");
    };
    rePrint();
  }, [GenBarcode]);

  useEffect(() => {
    getStationList();
  }, []);

  const iStep = [
    {
      title: "Search",
      icon: SearchIcon,
    },
    {
      title: "Usage Slip ",
      icon: ClipboardListIcon,
    },
    {
      title: "Material ",
      icon: ArchiveIcon,
    },
    {
      title: "Batch ",
      icon: CubeIcon,
    },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div id="magazin">
      <>
        <div className="px-2">
          <div
            ref={flotbtn}
            className="w-20 absolute  z-30 bg-gray-410 p-1 rounded-md"
            style={{
              left: `${flotbtnPos.left}px`,
              top: `${flotbtnPos.top}px`,
              visibility: flotBtnVis ? "visible" : "hidden",
            }}
          >
            <DefButton
              id="1"
              text="X"
              className="mb-1 btn-secondary w-full "
              type="2"
              onClick={HandleOptionsPostedBatch}
            />
            <DefButton
              id="2"
              text="Print"
              loading={loadPrint}
              className="mb-1 btn-primary w-full"
              onClick={HandleOptionsPostedBatch}
            />
            <br />
            <br />
            <DefButton
              id="3"
              text="Delete"
              onClick={HandleOptionsPostedBatch}
              className="btn-secondary w-full"
            />
          </div>
          <div className="mx-2 bg-WhiteMode-FromBackground000 pt-1 mt-2 px-2 rounded-md shadow-sm  ">
            <IStep components={iStep} current={currentStep} />
          </div>

          <div className="mb-4 mx-2 ">
            {iSelectedHistory ? (
              <>
                <p>Select Usage Slip</p>

                <div className="grow flex flex-row gap-x-3 mb-2  rounded-md  py-1 bg-white px-2">
                  <div className="">
                    <input
                      id="DateFrom"
                      type="Date"
                      name="DateFrom"
                      autoCapitalize="DateFrom"
                      required=""
                      defaultValue={datex.toISOString().substring(0, 10)}
                      onChange={MNFHandler}
                      className="input input-sm "
                    />
                  </div>

                  <div className=" ">
                    <input
                      type="date"
                      id="DateTo"
                      name="DateTo"
                      autoCapitalize="DateTo"
                      defaultValue={Datenw.toISOString().substring(0, 10)}
                      onChange={MNFHandler}
                      className="input  input-sm"
                    />
                  </div>
                  <div className="">
                    <button
                      disabled={Searchloading}
                      onClick={() => {
                        iFetchUsageSlipHistory();
                        setiSelectedHistory(true);
                        setCurrentStep(2);
                      }}
                      className="btn btn-primary m-0 btn-sm"
                    >
                      {Searchloading ? (
                        <div className="ml-2 -mt-1 animate-pulse">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <SearchIcon className="flex-shrink-0 h-4 w-4 ml-2 text-white  text-center" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 stickyHead  ">
                  <SubLinesTitle title={"SlipID"} />
                  <SubLinesTitle title={"Proration"} />
                  <SubLinesTitle title={"Size"} />
                  <SubLinesTitle title={"MNF"} />
                  <SubLinesTitle title={"Batch"} />
                  <SubLinesTitle title={"Station"} />
                  <SubLinesTitle title={"Machine"} />
                </div>
                {HeaderInfo.map((item, index) => (
                  <div className="mt-2">
                    <button
                      onClick={async () => {
                        setSelectedHistoryInfo({ ...item });
                        iGetSelectedUsageSlp(item.id);
                        setCurrentStep(3);
                      }}
                      type="button"
                      className="w-full focus:ring-2 focus:animate-pulse border-black border   bg-white   flex flex-row gap-x-3 px-2   rounded-t-md shadow-md   "
                    >
                      <div className="grid grid-cols-7  rounded-md ">
                        <>
                          <SubLines2 value={item.id} id={index} />
                          <SubLines2 value={item.UsageType} id={index} />
                          <SubLines2 value={item.size} id={index} />
                          <SubLines2 value={item.MNFdate} id={index} />
                          <SubLines2 value={item.batch} id={index} />
                          <SubLines2 value={item.station} id={index} />
                          <SubLines2 value={item.Machine} id={index} />
                        </>
                      </div>
                      <br></br>
                    </button>

                    <div className="flex">
                      <div
                        className="bg-github_ButtonGreen   h-1 mb-2"
                        style={{
                          width: `${item.doneperc}%`,
                        }}
                      ></div>
                      <div
                        className="bg-red-500   h-1 mb-2"
                        style={{
                          width: `${100 - item.doneperc}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <>
                  <>
                    {/* <div className="  m-auto  w-11/12     justify-center  flex flex-grow  font-bold  text-sm bg-gray-700  text-mainText   text-center  rounded-xl px-3">
                  <p className=" text-xs text-mainText -pb-0 mb-1 py-1.5 ">
                    <span className="rounded-full border-2 border-gray-900 italic  px-1.5  mr-2 ">
                      i
                    </span>
                    Selected Usage Slip
                  </p>
                </div> */}
                    <div className="grid grid-cols-2">
                      <h1 class=" text-black text-xl font-bold ">
                        Selected Usage Slip
                      </h1>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setiSelectedHistory(true);
                            setBatchSelected(true);
                            setCurrentStep(2);

                            iRestart();
                          }}
                          className=" float-right mt-1  rounded-md bg-main flex-shrink-0 h-8 w-8 text-center  focus:ring-2 "
                        >
                          <ArrowLeftIcon className="  w-7 text-WhiteMode-ButtonBackground000  text-end  self-end inline-block " />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <SubLines
                        title="Usage Slip ID"
                        value={selectedHistoryInfo.id}
                      />
                      <SubLines
                        title="Proration"
                        value={selectedHistoryInfo.UsageType}
                      />
                      <SubLines
                        title="Revision"
                        value={selectedHistoryInfo.RevDesc}
                      />
                      <SubLines title="Size" value={selectedHistoryInfo.size} />
                      <SubLines
                        title="MNF Date"
                        value={selectedHistoryInfo.MNFdate}
                      />
                      <SubLines
                        title="Batch"
                        value={selectedHistoryInfo.batch}
                      />
                      <SubLines
                        title="Station"
                        value={selectedHistoryInfo.station}
                      />
                      <SubLines
                        title="Machine"
                        value={selectedHistoryInfo.Machine}
                      />
                    </div>
                    {/* item line and batch  */}
                    <div className="flex gap-2 w-full justify-between  ">
                      <div>
                        <DefMenus
                          menus={menus}
                          SelectedMenuId={SelectedMenuId}
                          setSelectedMenuId={setSelectedMenuId}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 full relative">
                      <div className="w-full">
                        <DefButton
                          text="Print Weighed Mats"
                          className=" btn-primary w-full"
                          onClick={HandlePrintAllWeighedMats}
                        />
                      </div>
                      <div className="w-full">
                        <DefButton
                          onClick={() => {
                            qrInfo.data = "";
                            qrInfo.type = "";
                            setBatchSelected(false);
                            setPopScannerModal(true);
                            setiLoaded(true);
                          }}
                          loading={loading}
                          text="Scan"
                          className="btn btn-primary w-full btn-sm float-right"
                        />
                      </div>
                    </div>
                    {SelectedMenuId == 0 && (
                      <>
                        <div class="overflow-x-auto">
                          <table class="table  ">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Item</th>
                                <th></th>
                                <th>Uom</th>
                                <th>Qty</th>
                                <th>Adj</th>
                                <th>Needed</th>
                              </tr>
                            </thead>
                            <tbody>
                              {iBom.map((item, index) => (
                                <tr
                                // onClick={() => {
                                //   console.log({ item });
                                //   if (selectedHistoryInfo.Status !== "OPEN") {
                                //     return;
                                //   }
                                //   setSelectedItemForBatch(index);
                                //   setBatchSelected(false);
                                //   setCurrentStep(4);
                                //   getPostedBatchofItem(item);
                                // }}
                                // className="cursor-pointer"
                                >
                                  <td className="font-semibold">{index + 1}</td>
                                  <td className="font-semibold">
                                    {item.ItemCode}
                                  </td>
                                  <td className="font-semibold">
                                    {item.ItemName}
                                  </td>
                                  <td className="font-semibold">{item.UoM}</td>
                                  <td className="font-semibold">{item.qty}</td>
                                  <td className="font-semibold">{item.adj}</td>

                                  <td className="font-semibold">
                                    {(item.qty - item.selected).toFixed(3)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {BatchSelected ? (
                          <div className="">
                            <h1 class=" text-black text-xl font-bold  mt-4"></h1>
                            <div className="w-full focus:ring-2  rounded-md my-1  grow  flex flex-row gap-x-3 px-2       ">
                              <div className=" my-0.5 py-1 rounded-md bg-white w-full ">
                                <table className="table table-xs"></table>

                                {selectedHistoryInfo.Status === "OPEN" ? (
                                  <>
                                    {/* <div className=" w-fit mx-auto  group     items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                                      <br></br>
                                      <br></br>
                                      <DefButton
                                        text="Print Weighed Mats"
                                        className="w-full btn-primary"
                                        onClick={HandlePrintAllWeighedMats}
                                      />
                                    </div> */}
                                  </>
                                ) : (
                                  <>
                                    <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                                      <button
                                        type="button"
                                        className={ConfirmButton}
                                        onClick={() => {
                                          // setWeighingPrinterObject(iBom);
                                          getBatchFromDB();
                                        }}
                                      >
                                        {printLoading ? (
                                          <span>
                                            <LoadingSpinner />
                                          </span>
                                        ) : (
                                          <>Print Barcode</>
                                        )}
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* <div className=" ">
                          

                            <div
                              className="grid grid-cols-2 mb-10 pb-10"
                              id="bot"
                            >
                              <h1 class=" text-black text-xl font-bold  mt-3">
                                Material List
                              </h1>
                              <div className="">
                                <button
                                  onClick={() => {
                                    setCurrentStep(3);
                                    setBatchSelected(true);
                                  }}
                                  type="button"
                                  className="float-right mt-2 
                              rounded-md bg-main flex-shrink-0 h-8 w-8 text-center  focus:ring-2 focus:animate-ping  "
                                >
                                  <ArrowLeftIcon className="  w-7 text-black  text-end   inline-block " />
                                </button>
                              </div>
                            </div>
                            <div className="bg-white mx-2 rounded-md">
                              <div className="float-right"></div>
                              <div className="   mx-auto    w-11/12    font-bold  ">
                               
                              </div>
                              <div className="mb-2  "></div>
                              <div className="">
                                <table className="w-full pt-40">
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
                                      OPEN
                                    </th>
                                    <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                                      UOM
                                    </th>
                                  </tr>
                                  <tr className="w-full">
                                    <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                      <div>
                                        <p className=" -mb-2">
                                          {iBom[SelectedItemForBatch].ItemCode}
                                        </p>
                                        <input
                                          className="border-0 bg-transparent"
                                          value={
                                            iBom[SelectedItemForBatch].ItemName
                                          }
                                          disabled="disabled"
                                        ></input>
                                      </div>
                                    </td>
                                    <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                      {iBom[SelectedItemForBatch].qty}
                                    </td>
                                    <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                      {iBom[SelectedItemForBatch].adj}
                                    </td>
                                    <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                      {iBom[SelectedItemForBatch].needed}
                                    </td>
                                    <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                      {iBom[SelectedItemForBatch].UoM}
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                         

                            <div>
                              <h1 class=" text-black text-xl font-bold  mt-3">
                                {`Posted Batch of ${iBom[SelectedItemForBatch].ItemCode}`}
                              </h1>

                              <DefTable
                                columns={columns}
                                rows={PostedRow}
                                btnCss="w-full "
                                btnLabel="..."
                                spanCSS="w-full"
                                handleOption={handleOption}
                                // onChange={handleCHange}
                              />
                            </div>
                           
                            <div className="bg-white mx-2 rounded-md py-1 mt-2 pb-2">
                              <>
                                <table className="w-full  mt-2">
                                  <tr className="">
                                    <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                                      BATCH
                                    </th>
                                    <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                                      QTY
                                    </th>
                                    <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                                      PD
                                    </th>
                                    <th className=" font-semibold text-sm px-2  pt-0.5 text-left border">
                                      ED
                                    </th>
                                  </tr>

                                  {BatchContainer.map((item, index) => (
                                    <>
                                      {SelectedItemForBatch === item.index ? (
                                        <tr className="hover:bg-gray-710 cursor-pointer  ">
                                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                            <button
                                              className="bg-red-700 rounded-full p-0.5 mr-2 my-1"
                                              onClick={() => {
                                                removeBatch(
                                                  index,
                                                  item.quantity
                                                );
                                              }}
                                            >
                                              <span>
                                              </span>
                                            </button>
                                            {item.batch}
                                          </td>
                                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                            {item.quantity}
                                          </td>
                                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                            {item.PD}
                                          </td>
                                          <td className="font-semibold text-sm px-2  pt-0.5 text-left border">
                                            {item.ED}
                                          </td>
                                        </tr>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ))}
                                </table>
                              </>

                            
                              <br />

                              <div className="grid grid-cols-2">
                                <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                                  <button
                                    type="button"
                                    className={smalBtn}
                                    onClick={() => {
                                      setBatch({
                                        id: "",
                                        index: "",
                                        batch: "",
                                        PD: "",
                                        ED: "",
                                        QR: "",
                                        quantity: 0,
                                        DocEntry: 0,
                                      });
                                    }}
                                  >
                                    <span>
                                      Clear <span aria-hidden="true"> </span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2"></div>
                            <NoteInfo
                              title="Note"
                              body="Scanning Parameter : Selected[Itemcode,Scanned Barcode]"
                            />
                          </div> */}
                          </>
                        )}
                      </>
                    )}

                    {SelectedMenuId == 1 && (
                      <>
                        <DefTable
                          columns={columns}
                          rows={PostedRow}
                          btnCss="w-full "
                          btnLabel="..."
                          spanCSS="w-full"
                          handleOption={handleOption}
                          // onChange={handleCHange}
                        />
                      </>
                    )}
                  </>
                </>
                {GenBarcode ? (
                  <></>
                ) : (
                  // if not barcode
                  <>
                    <div className="invisible absolute top-0">
                      <button
                        onClick={() => {
                          setGenBarcode(true);
                        }}
                      >
                        Back
                      </button>
                      <WPrinter />
                    </div>
                  </>
                )}
              </>
            )}

            {HeaderInfo.length > 0 ? (
              <></>
            ) : (
              <NoteInfo
                title="Note"
                body="If searching does not return value it means that the
                  Usage Slip has not been created yet."
              />
            )}
          </div>
        </div>
      </>
      {/* <Usageslip2PreWeightSheetTable /> */}

      {ScannedBatchInfo && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-trans50">
            <div className="bg-white max-w-[412px] px-2 mt-4 mx-auto rounded-md">
              <div className="flex w-full justify-between">
                <p className=" btn-primary bg-[#000000bd]  ">
                  Scanned Batch Information
                </p>
                <button
                  className="float-right btn-primary btn  "
                  onClick={() => {
                    setScannedBatchInfo(false);
                  }}
                >
                  X
                </button>
              </div>
              <br />
              <br />
              <DefInput
                className=""
                label="Item"
                name="itemcode"
                id="itemcode"
                handler={sBatch}
                value={Batch.itemcode}
              />
              <DefInput
                className=""
                label=""
                name="itemname"
                id="itemname"
                handler={sBatch}
                value={Batch.itemname}
              />
              <DefInput
                className=""
                label="Batch"
                name="batch"
                id="batch"
                handler={sBatch}
                value={Batch.batch}
              />
              <DefInput
                className=""
                label="Quantity"
                name="quantity"
                id="quantity"
                handler={sBatch}
                value={Batch.quantity}
              />
              <DefInput
                className="w-full"
                label="PD"
                name="PD"
                id="PD"
                handler={sBatch}
                value={Batch.PD}
              />
              <DefInput
                className="w-full"
                label="ED"
                name="ED"
                id="ED"
                handler={sBatch}
                value={Batch.ED}
              />

              <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                <button
                  type="button"
                  className={`${ConfirmButton} btn btn-primary btn-sm`}
                  onClick={() => {
                    addBatch("");
                    iGetSelectedUsageSlp(HeaderInfo[0].id);
                    setScannedBatchInfo(false);
                  }}
                >
                  <span>
                    Add Batch <span aria-hidden="true"> → </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
