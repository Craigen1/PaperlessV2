import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefMenus,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  Label,
  NoteInfo,
  UserInfoForPost,
} from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";
import { LoadingSpinner } from "../assets/SVGs";
import InventoryTransfer2History from "./InventoryTransfer2History";

export default function InventoryTransfer2(props) {
  const [NoteDetails, setNoteDetails] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });
  const [NoteDetails2, setNoteDetails2] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });
  const [moduleType, setModuleType] = useState(1);
  const { setPopScannerModal, qrInfo, userInfo, setloading, DateNow } =
    useContext(ITopContext);
  const [viewBatchSelection, setViewBatchSelection] = useState(false);
  const Datenw = new Date();
  const [TabSelectBatch, setTabSelectBatch] = useState(false); // false = selection 1
  const columns = [
    {
      name: "Option",
      colspan: 1,
    },
    {
      name: "AbsEntry",
      colspan: 1,
    },
    {
      name: "ItemCode",
      colspan: 1,
    },
    {
      name: "Dscription",
      colspan: 1,
    },
    {
      name: "UoM",
      colspan: 1,
    },
    {
      name: "QTY",
      colspan: 1,
    },
    {
      name: "QTYScan",
      colspan: 1,
    },

    {
      name: "Batch",
      colspan: 1,
    },
    {
      name: "MnfDate",
      colspan: 1,
    },
    {
      name: "ExpDate",
      colspan: 1,
    },
  ];
  const columns2 = [
    {
      name: "Option",
      colspan: 1,
    },
    {
      name: "ItemCode",
      colspan: 2,
    },
    {
      name: "itemname",
      colspan: 0,
    },
    {
      name: "Quantity",
      colspan: 2,
      type: "number",
    },
    {
      name: "UoM",
      colspan: 0,
    },
    {
      name: "Batch",
      colspan: 1,
    },
    {
      name: "MnfDate",
      colspan: 2,
    },
    {
      name: "ExpDate",
      colspan: 0,
    },
  ];
  const [QtyMax, setQtyMax] = useState(0);
  const [rows, setrows] = useState([]);
  const [rows2, setrows2] = useState([]);
  const [headers, setheaders] = useState([
    {
      DocNum: 0,
    },
  ]);

  const [comps, setcomps] = useState([
    {
      id: "DocNum",
      label: "Document",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      id: "RIRS",
      label: "RIRS",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      id: "Status",
      label: "Status",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      id: "Createddate",
      label: "Created Date",
      type: "date",
      defvalue: Datenw.toISOString().substring(0, 10),
      disabled: false,
      value: Datenw.toISOString().substring(0, 10),
      colspan: "1",
    },
    {
      id: "WhsFrom",
      label: "Warehouse From",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      id: "WhsTo",
      label: "Warehouse To",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    // {
    //   id: "SAPacc",
    //   label: "SAP Account",
    //   type: "text",
    //   defvalue: "",
    //   disabled: false,
    //   colspan: "1",
    // },
    // {
    //   id: "SAPPass",
    //   label: "SAP Password",
    //   type: "password",
    //   defvalue: "",
    //   disabled: false,
    //   colspan: "1",
    // },
    {
      id: "Remarks",
      label: "Remarks",
      type: "text",
      defvalue: "",
      disabled: false,
      colspan: "2",
    },
  ]);

  const [compsBach, setcompsBach] = useState([
    {
      IDx: "item",
      label: "Item",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "2",
    },
    {
      IDx: "batch",
      label: "Batch",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "2",
    },
    {
      IDx: "MnfDate",
      label: "Mnf Date",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      IDx: "ExpDate",
      label: "Exp Date",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
    {
      IDx: "Quantity",
      label: "Quantity",
      type: "text",
      defvalue: "",
      disabled: false,
      colspan: "1",
    },
    {
      IDx: "UomCode",
      label: "UoM",
      type: "text",
      defvalue: "",
      disabled: true,
      colspan: "1",
    },
  ]);
  const [selectedItem, setselectedItem] = useState("");

  const ModuleTypeHandler = async (e) => {
    try {
      setModuleType(parseInt(e.target.id));
    } catch (error) {}
  };
  const handleCancel = () => {
    setNoteDetails({
      visible: false,
    });
    setViewBatchSelection(false);
  };
  const handleOption = (e) => {
    qrInfo.data = "";
    qrInfo.type = "";
    setIsHeader(false);
    setPopScannerModal(true);
    setselectedItem(e.target.value);
  };
  const handleOptionRemove = (e) => {
    const newrows2 = [...rows2];
    newrows2.splice(e.target.id, 1);
    console.log(newrows2);
    setrows2(newrows2);
  };
  const [ExecRes, setExecRes] = useState([
    {
      ID: 0,
    },
  ]);
  const colsSQL = [
    {
      name: "Batch",
    },
    {
      name: "BatchQuantity",
    },
    {
      name: "CreateDate",
    },
    {
      name: "RIRS",
    },
    {
      name: "QTY",
    },
    {
      name: "ItemCode",
    },

    {
      name: "AbsEntry",
    },
    {
      name: "QTYScan",
    },
    {
      name: "SAPacc",
    },
    {
      name: "SAPPass",
    },
    {
      name: "IDx",
    },
    {
      name: "approvalStats",
    },
  ];
  const handleRowsConsole = async (e) => {
    setuseSmalBtns(!useSmalBtns);
    setbridgeLoading(true);
    console.log({ rows });
    // await EXEC_SQL_InsertMulti(885, setExecRes, colsSQL, rows, "OWTR2");

    await EXEC_SQL_InsertMulti_V2(
      885,
      setExecRes,
      colsSQL,
      rows,
      "OWTR2",
      "",
      "SELECT @@IDENTITY AS ID"
    );
    setbridgeLoading(false);
  };
  const [waitBridgeRes, setWaitBridgeRes] = useState([]);
  const [bridgeLoading, setbridgeLoading] = useState(false);
  const handleWaitBridge = async () => {
    if (ExecRes.length > 0) {
      if (ExecRes == "error") return;
      setbridgeLoading(true);

      console.log({ ExecRes });
      // handleRowsConsole();
      // await EXEC_SQL_InsertOne(982, setWaitBridgeRes, headers[0]asdasd.RIRS);
      await EXEC_SQL_InsertOne(982, setWaitBridgeRes, ExecRes[0].ID);

      setExecRes([]);
      setbridgeLoading(false);
      setbridgeLoading(false);
    } else {
      setbridgeLoading(false);
      setbridgeLoading(false);
    }
  };

  const [NoteDetails3, setNoteDetails3] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });
  useEffect(() => {
    console.log({ ExecRes });
    if (ExecRes.length <= 0) return;
    if (qrInfo.data == "") return;

    handleWaitBridge();
  }, [ExecRes]);

  const [getForReturn, setgetForReturn] = useState([]);

  const ReturnUnScanned = async () => {
    setNoteDetails3({
      title: "Posted ",
      body: waitBridgeRes[0].bridgeMsg,
      type: "s",
      visible: true,
    });
    await EXEC_SQL_InsertOne(985, setgetForReturn, headers[0].RIRS);
  };

  const Exe_Retrun_IT = async () => {
    //POSTMAN IT WITH REQUEST<

    let raw = "";
    raw = JSON.stringify({
      Series: 21,
      DocDate: DateNow,
      Comments: "AUTO-RETURN BY PAPERLESS IT-REF#:",
      FromWarehouse: getForReturn[0].WhsFrom,
      ToWarehouse: getForReturn[0].WhsTo,
      BPLID: 1,
      U_APP_TransferType: "RET",
    });

    raw = raw.substring(0, raw.length - 1);

    raw += ' ,"StockTransferLines": [ ';
    getForReturn.map((item, index) => {
      var x = JSON.stringify({
        LineNum: index,
        ItemCode: getForReturn[index].ItemCode,
        Quantity: getForReturn[index].QTYtoTrans,
        WarehouseCode: getForReturn[index].WhsTo,
        FromWarehouseCode: getForReturn[index].WhsFrom,
        DistributionRule2: getForReturn[index].OcrCode2,
        DistributionRule3: getForReturn[index].OcrCode3,
        UseBaseUnits: getForReturn[index].UseBaseUn,
        UoMEntry: getForReturn[index].UomEntry,
        BatchNumbers: [
          {
            BatchNumber: getForReturn[index].Batch,
            Quantity: getForReturn[index].QTYtoTrans,
            BaseLineNumber: index,
            ItemCode: getForReturn[index].ItemCode,
          },
        ],
      });

      raw += "  " + x + ",";
    });
    raw = raw.substring(0, raw.length - 1);
    raw = raw + "],";
    raw += JSON.stringify({
      StockTransfer_ApprovalRequests: [
        {
          ApprovalTemplatesID: 125,
          Remarks: "PAPERLESS AUTO RETURN - " + getForReturn[0].DocNum,
        },
      ],
    }).substring(1, raw.length - 1);
    await login_RetrunAgent(raw);
  };

  const login_RetrunAgent = async (raw) => {
    try {
      const Login_API = await fetch("SERVICELAYER_LOGIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: "B1_Return_ITR_IT",
          pass: "P@ssw0rd12",
        }),
      });
      const d = await Login_API.json();
      console.log(d.SessionId);
      const x = await fetch("SERVERLAYER_POST_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: raw,
          session: d.SessionId,
          objectType: "StockTransfers",
        }),
      });
      console.log({ x });

      setNoteDetails3({
        title: "UnScanned Quantity waiting for approval",
        body: "",
        type: "s",
        visible: true,
      });
      setbridgeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Exe_Retrun_IT();
  }, [getForReturn]);

  useEffect(() => {
    if (waitBridgeRes[0] != undefined) {
      console.log({ waitBridgeRes });
      if (
        waitBridgeRes[0].approvalStats == 1 ||
        waitBridgeRes[0].approvalStats == 2 ||
        waitBridgeRes[0].approvalStats == 999
      ) {
        setNoteDetails3({
          title: "Entry successful",
          body: waitBridgeRes[0].bridgeMsg,
          type: "s",
          visible: true,
        });

        if (waitBridgeRes[0].approvalStats == 999) ReturnUnScanned();

        clearx();
      } else {
        if (waitBridgeRes.length == 0) {
          setbridgeLoading(true);
          EXEC_SQL_InsertOne(982, setWaitBridgeRes, ExecRes[0].ID);
          setExecRes([]);
          setbridgeLoading(false);
        } else {
          setbridgeLoading(false);
          setNoteDetails3({
            title: "Something went wrong",
            body: waitBridgeRes[0].bridgeMsg,
            type: "e",
            visible: true,
          });
        }
      }
    }
  }, [waitBridgeRes]);

  const [useSmalBtns, setuseSmalBtns] = useState(false);
  const confirmTransferx = () => {
    setNoteDetails3({
      title: "",
      body: "",
      type: "",
      visible: true,
    });
    console.log({ rows });
    setuseSmalBtns(!useSmalBtns);
    setNoteDetails2({
      body: "Are you sure you want to proceed?",
      title: "Confirm Transaction",
      type: "e",
      visible: true,
    });
  };
  const [canTransfer, setCanTransfer] = useState(false);
  const canTransferConst = () => {
    if (!headers[0].RIRS > 0 || !headers[0].Status === "Pending") {
      setCanTransfer(false);
    } else {
      setCanTransfer(true);
    }
    let OverAllScannedQTY = 0;
    rows.map((item, index) => {
      OverAllScannedQTY += item.QTYScan;
    });
    if (OverAllScannedQTY <= 0) setCanTransfer(false);
  };
  const confirmTransferxCancel = () => {
    setuseSmalBtns(!useSmalBtns);
    setNoteDetails2({
      visible: false,
    });
    setheaders([]);

    // clearx();
  };
  const clearx = () => {
    setrows([]);
    setrows2([]);
    setWaitBridgeRes([]);
    setheaders([
      {
        DocNum: "",
        SAPacc: "",
        SAPPass: "",
        Remarks: "",
        WhsFrom: "",
        WhsFrom: "",
        RIRS: "",
      },
    ]);
  };
  const [isHeader, setIsHeader] = useState(false);
  const handleScanITR = () => {
    // EXEC_SQL_InsertOne(990, setheaders, qrInfo.data);
    // EXEC_SQL_InsertOne(990, setrows, qrInfo.data);
    if (isNaN(qrInfo.data)) return;
    EXEC_SQL_InsertOne(990, setheaders, qrInfo.data);
    EXEC_SQL_InsertOne(990, setrows, qrInfo.data);
  };
  const handleScanITRHeader = () => {
    clearx();
    qrInfo.data = "";
    qrInfo.type = "";
    setbridgeLoading(false);
    setloading(false);
    setIsHeader(true);
    setPopScannerModal(true);
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setheaders();
    const newQty = headers.map((item, index) => {
      return {
        ...item,
        [name]: value,
      };
    });
    setheaders(newQty);

    const newQtyx = rows.map((item, index) => {
      return {
        ...item,
        [name]: value,
        SAPacc: "B1_Checker_ITR_IT",
        SAPPass: "@Lion34907",
      };
    });
    setrows(newQtyx);
    console.log({ newQtyx });
  };
  const [BatchSelectedOnScan, setBatchSelectedOnScan] = useState([]);
  const batchDetailsOnChangeQty = (e) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setBatchSelectedOnScan([
      {
        IDx: BatchSelectedOnScan[0].IDx,
        UomCode: BatchSelectedOnScan[0].UomCode,
        reqQuantity: BatchSelectedOnScan[0].reqQuantity,
        Batch: BatchSelectedOnScan[0].Batch,
        qty: value,
        item: BatchSelectedOnScan[0].item,
        ItemCode: BatchSelectedOnScan[0].ItemCode,
        itemName: BatchSelectedOnScan[0].itemName,
        MnfDate: BatchSelectedOnScan[0].MnfDate,
        ExpDate: BatchSelectedOnScan[0].ExpDate,
        QuantityQty: BatchSelectedOnScan[0].QuantityQty,
      },
    ]);

    // this is how to handle onChange Text on Inputs
  };
  const tabhandler = (e) => {
    if (e.target.value === "1") setTabSelectBatch(false);
    if (e.target.value === "2") setTabSelectBatch(true);
  };
  const [confirmTransfer, SetconfirmTransfer] = useState(false);
  const SelectedbatchAdd = (e) => {
    if (BatchSelectedOnScan[0].qty > BatchSelectedOnScan[0].QuantityQty) {
      setNoteDetails({
        body: `Quantity is greater than declared quantity , Declared Qty: ${BatchSelectedOnScan[0].QuantityQty}`,
        title: "Input Error",
        type: "e",
        visible: true,
      });
      return;
    }

    const newQty = rows.map((item, index) => {
      if (
        BatchSelectedOnScan[0].Batch === item.Batch &&
        BatchSelectedOnScan[0].ItemCode === item.ItemCode
      ) {
        return {
          ...item,
          QTYScan: BatchSelectedOnScan[0].qty,
          SAPacc: "B1_Checker_ITR_IT",
          SAPPass: "@Lion34907",
        };
      } else {
        return item;
      }
    });
    setrows(newQty);
    canTransferConst();
    setrows2((e) => [
      ...e,
      {
        Quantity: BatchSelectedOnScan[0].qty,
        MnfDate: BatchSelectedOnScan[0].MnfDate,
        ExpDate: BatchSelectedOnScan[0].ExpDate,
        Batch: BatchSelectedOnScan[0].Batch,
        ItemCode: BatchSelectedOnScan[0].ItemCode,
        itemName: BatchSelectedOnScan[0].itemName,
        RIRS: headers[0].RIRS,
      },
    ]);
    setViewBatchSelection(false);
    setNoteDetails({
      visible: false,
    });
  };

  const Tabs = () => {
    return (
      <>
        <div className=" ml-auto mr-2   mb-8 flex">
          <div className=" flex  frame    mt-1  rounded-lg py-0 px-1 gap-1 mr-5">
            <DefButton
              onClick={ModuleTypeHandler}
              id={1}
              text="ITR"
              type={moduleType == 1 ? "2" : "2B"}
              className=" px-2 my-0.5  "
            />
            <DefButton
              onClick={ModuleTypeHandler}
              id={2}
              text="History"
              type={moduleType == 2 ? "2" : "2B"}
              className=" px-2 my-0.5  "
            />
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    if (qrInfo.data !== "") {
      if (isHeader) {
        handleScanITR();
      } else {
        setloading(true);
        EXEC_SQL_InsertOne(
          989,
          setBatchSelectedOnScan,
          qrInfo.data,
          selectedItem,
          headers[0].RIRS
        );
        setloading(false);
      }
    }
  }, [qrInfo.data]);

  useEffect(() => {
    canTransferConst();
  }, [headers]);

  useEffect(() => {
    canTransferConst();
  }, [rows]);

  useEffect(() => {
    if (BatchSelectedOnScan.length === 0) return;
    if (BatchSelectedOnScan[0].item === undefined) return;

    setViewBatchSelection(true);
  }, [BatchSelectedOnScan]);
  useEffect(() => {}, []);
  const menus = [
    {
      id: 0,
      text: "Approval",
    },
    {
      id: 1,
      text: "History",
    },
    {
      id: 2,
      text: "Help",
    },
  ];
  const [SelectedMenuId, setSelectedMenuId] = useState(0);

  return (
    <>
      <DefMenus
        menus={menus}
        SelectedMenuId={moduleType}
        setSelectedMenuId={setModuleType}
      />
      {moduleType == 0 ? (
        <>
          <div className="flex justify-between    w-full  px-2">
            <div>{/* <Tabs /> */}</div>
            <div className=" gap-2 flex">
              <DefButton
                text="Clear"
                onClick={() => {
                  setbridgeLoading(false);
                  setheaders([
                    {
                      DocNum: 0,
                    },
                  ]);

                  {
                    comps.map((item, index) => (
                      <>{(document.getElementById(item.id).value = "")}</>
                    ));
                  }
                  setrows([]);
                }}
                className="btn-warning"
              />
              <DefButton
                text="Scan ITR"
                onClick={handleScanITRHeader}
                className="btn-primary m-0 mr-2"
              />
            </div>
          </div>
          <NoteInfo
            title={NoteDetails3.title}
            body={NoteDetails3.body}
            className=""
            type={NoteDetails3.type}
            visible={NoteDetails3.visible}
          />

          <div className="mx-2">
            <UserInfoForPost userInfo={userInfo} className="mb-2  shadow-sm" />
          </div>

          <div className=" gap-2 bg-WhiteMode-FromBackground000 mx-2   rounded-md shadow-md py-2 px-2  ">
            {comps.map((item, index) => (
              <div className={`col-span-${item.colspan}`}>
                <DefInput
                  id={item.id}
                  label={item.label}
                  type={item.type}
                  name={item.id}
                  defvalue={item.defvalue}
                  value={
                    comps.length > 0
                      ? item.id === "DocNum"
                        ? headers[0].DocNum
                        : item.id === "SAPacc"
                        ? headers[0].SAPacc
                        : item.id === "SAPPass"
                        ? headers[0].SAPPass
                        : item.id === "Remarks"
                        ? headers[0].Remarks
                        : item.id === "Status"
                        ? headers[0].Status
                        : item.id === "Createddate"
                        ? Datenw.toISOString().substring(0, 10)
                        : item.id === "WhsFrom"
                        ? headers[0].WhsFrom
                        : item.id === "WhsTo"
                        ? headers[0].WhsFrom
                        : item.id === "RIRS"
                        ? headers[0].RIRS
                        : ""
                      : ""
                  }
                  disabled={item.disabled}
                  handler={inputHandler}
                />
              </div>
            ))}
          </div>
          <div className="flex  mt-2 rounded-xl border-main border-4 w-fit mx-auto invisible">
            <DefButton
              text="Batch Selection"
              type={TabSelectBatch ? "4B" : "4"}
              className="px-2 rounded-md border-black border-2"
              onClick={tabhandler}
              value="1"
            />
            <DefButton
              text="Batch Selected"
              type={TabSelectBatch ? "4" : "4B"}
              className="px-2 rounded-md  border-black border-2"
              onClick={tabhandler}
              value="2"
            />
          </div>

          {!TabSelectBatch ? (
            <div className=" overflow-auto py-2  mx-2 bg-WhiteMode-FromBackground000 rounded-md">
              <DefTable
                columns={columns}
                rows={rows}
                handleOption={handleOption}
                btnLabel="Scan"
                disabled={true}
                spanCSS=""
                classNametr1="border-b border-b-white"
                classNametr2="border-b border-b-white"
              />
            </div>
          ) : (
            <div className="mt-2  overflow-auto py-2">
              <DefTable
                columns={columns2}
                rows={rows2}
                handleOption={handleOptionRemove}
                btnLabel="Remove"
                disabled={true}
                spanCSS=""
                classNametr1="border-b border-b-white"
                classNametr2="border-b border-b-white"
              />
            </div>
          )}

          {bridgeLoading ? (
            <div className="mx-auto mt-10 w-5">
              <LoadingSpinner />
            </div>
          ) : (
            <div
              className={
                canTransfer
                  ? "w-60 mx-auto mt-2 "
                  : "w-60 mx-auto mt-2 invisible "
              }
            >
              <NoteInfo
                title={NoteDetails2.title}
                body={NoteDetails2.body}
                className="mt-4"
                type="w"
                visible={useSmalBtns}
              />
              <DefButton
                text="Transfer"
                onClick={confirmTransferx}
                visible={!useSmalBtns}
              />
              <div className="flex gap-2">
                <DefButton
                  text="Confirm"
                  onClick={handleRowsConsole}
                  visible={useSmalBtns}
                />
                {/* <DefButton
              text="Confirm"
              onClick={handleWaitBridge}
              visible={useSmalBtns}
            /> */}

                {/* <DefButton
              text="Cancel"
              onClick={confirmTransferxCancel}
              type="5"
              visible={useSmalBtns}
            /> */}
              </div>
            </div>
          )}
          {viewBatchSelection ? (
            <div className="fixed left-0 top-0 w-full h-full bg-trans50 ">
              {/* <div className="w-full h-full bg-trans50 "> */}
              <div
                className="mx-auto  border-2 border-x-white border-b-white bg-white"
                style={{ width: "420px" }}
              >
                <div className="bg-SAP-header border-b-4 border-SAP-headerLine">
                  <Label
                    text="Batch Details"
                    className=" mx-2 my-0.5 text-black"
                  />
                </div>
                <div className="mb-2  px-2 grid grid-cols-2 gap-x-4 ">
                  {compsBach.map((item, index) => (
                    <div className={`col-span-${item.colspan}`}>
                      <DefInput
                        id={item.IDx}
                        label={item.IDx}
                        type={item.type}
                        name={item.IDx}
                        defvalue={item.defvalue}
                        disabled={item.disabled}
                        handler={batchDetailsOnChangeQty}
                        value={
                          BatchSelectedOnScan.length > 0
                            ? compsBach.length > 0
                              ? item.IDx === "item"
                                ? BatchSelectedOnScan[0].item
                                : item.IDx === "Quantity"
                                ? BatchSelectedOnScan[0].qty
                                : item.IDx === "MnfDate"
                                ? BatchSelectedOnScan[0].MnfDate
                                : item.IDx === "ExpDate"
                                ? BatchSelectedOnScan[0].ExpDate
                                : item.IDx === "batch"
                                ? BatchSelectedOnScan[0].Batch
                                : item.IDx === "UomCode"
                                ? BatchSelectedOnScan[0].UomCode
                                : ""
                              : ""
                            : ""
                        }
                      />
                    </div>
                  ))}
                </div>
                <NoteInfo
                  title={NoteDetails.title}
                  body={NoteDetails.body}
                  className="mt-4"
                  type={NoteDetails.type}
                  visible={NoteDetails.visible}
                />
                <div className="flex gap-2 mb-2 px-2">
                  <DefButton text="Cancel" type="5" onClick={handleCancel} />
                  <DefButton text="Select Batch" onClick={SelectedbatchAdd} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between   mx-2 w-full ">
            {/* <div>
              <Tabs />
            </div> */}
            <div className="invisible">
              <DefButton
                text="Scan ITR"
                onClick={handleScanITRHeader}
                className="px-2 h-5 mt-2 w-24"
              />
            </div>
          </div>
          <InventoryTransfer2History />
        </>
      )}
    </>
  );
}
