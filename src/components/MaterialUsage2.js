import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import { formatDate } from "date-fns";

import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  Label,
  NoteInfo,
} from "./ComponentList";
import MsgBox from "./MsgBox";
import MaterialUsageHistory from "./MaterialUsageHistory";
import MaterialUsagePM from "./MaterialUsagePM";
import { ajaxPrefilter } from "jquery";
import MaterialUsageHistory2 from "./MaterialUsageHistory2";
import MaterialUsage2PREWeighSheet from "./MaterialUsage2PREWeighSheet";

export default function MaterialUsage2() {
  const { qrInfo, setPopScannerModal, setloading, userInfo } =
    useContext(ITopContext);
  const QuantityBtn = useRef("");
  const [scanType, setscanType] = useState("");
  const [viewBatchSelection, setViewBatchSelection] = useState(false);
  const [NoteDetails, setNoteDetails] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });

  const columns = [
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },

    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "BarCode",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Qty",
      disabled: true,
    },
    {
      name: "Batch",
      disabled: true,
    },
    {
      name: "MnfDate",
      disabled: true,
    },
    {
      name: "ExpDate",
      disabled: true,
    },
    {
      name: "Option",
    },
  ];

  const [rows, setRows] = useState([]);
  const [docEntry, setDocEntry] = useState(0);
  const Components = [
    // {
    //   id: "Status",
    //   label: "Status",
    //   type: "text",
    //   colspan: "1",
    // },
    {
      id: "ProrationType",
      SQLid: "ProrationTypeID",
      label: "Proration Type",
      type: "text",
      dropDownId: 978,
      colspan: "1",
      disabled: true,
    },
    {
      id: "Revision",
      SQLid: "RevisionId",
      label: "Revision",
      type: "text",
      dropDownId: 99999,
      colspan: "1",
      disabled: true,
    },
    {
      id: "Size",
      SQLid: "Size",
      label: "Size",
      type: "text",
      dropDownId: 99999,
      colspan: "1",
      disabled: true,
    },
    {
      id: "MNF",
      SQLid: "MNFdate",
      label: "Manufacturing Date",
      type: "text",
      colspan: "1",
    },
    {
      id: "Batch",
      label: "Batch",
      type: "number",
      colspan: "1",
    },
    {
      id: "Warehouse",

      label: "Warehouse",
      type: "text",
      colspan: "2",
      dropDownId: 965,
      // disabled: true,
    },
    {
      id: "Station",
      SQLid: "Station",
      label: "Station",
      type: "text",
      dropDownId: 967,
      colspan: "2",
      disabled: true,
    },
    // {
    //   id: "Machine",
    //   label: "Machine",
    //   type: "text",
    //   dropDownId: 981,
    //   colspan: "1",
    // },
  ];
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
  const [revMap, setRevMap] = useState([]);
  const [SizeMap, setSizeMap] = useState([]);
  const [headerHolder, setHeaderHolder] = useState({});
  const [HeaderHolderTrigger, setHeaderHolderTrigger] = useState(false);
  const [ErrorNote, setErrorNote] = useState({
    title: "",
    body: "",
    type: "",
    visible: "",
  });
  const [ErrorNoteBatch, setErrorNoteBatch] = useState({
    title: "",
    body: "",
    type: "",
    visible: "",
  });

  const headerOnChangeHandler = async (e) => {
    setgetHeaderLoading(false);
    setErrorNote({
      title: "",
      body: "",
      type: "",
      visible: "",
    });

    const { id, name, value } = e.target;
    console.log({ id, name, value });
    if (id == "ProrationType") await EXEC_SQL_InsertOne(977, setRevMap, value);
    if (id == "Revision") {
      await EXEC_SQL_InsertOne(
        976,
        setSizeMap,
        headerHolder.ProrationType,
        value
      );
    }
    setHeaderHolder((p) => ({ ...p, [id]: value }));
    if (value == "") {
      setRows([]);
      setGetScannedOutp([]);
      setDocEntry(0);
    }
  };
  const Confirm = () => {
    console.log({ headerHolder });
  };

  const handleScanned = async (e) => {
    setHeaderHolder({});
    const { id, name } = e.target;
    setscanType(id);
    qrInfo.data = "";
    qrInfo.type = "";
    setPopScannerModal(true);
    setErrorfound(false);
    setErrorNote({
      title: "Record retrieved",
      body: "Record retrieved you can now select materials",
      type: "s",
      visible: false,
    });
  };

  const [tab, setTab] = useState("1");
  const handleTabs = async (e) => {
    setTab(e.target.id);
    setDocEntry(0);
    setRows([]);
    setGetScannedOutp([]);
    setgetTemplateNames([]);
    setHeaderHolder([]);
    setDocEntryFromUpdate(-1);
    setErrorNote({
      title: "",
      body: "",
      type: "e",
      visible: false,
    });
  };

  const [GetScannedOutp, setGetScannedOutp] = useState([]);
  // const [getTemplate, setgetTemplate] = useState([]);
  const [getTemplateNames, setgetTemplateNames] = useState({});
  const TestGet = async (e) => {
    await EXEC_SQL_InsertOne(906, setHeaderHolder, qrInfo.data);
    // await EXEC_SQL_InsertOne(906, setgetTemplate, qrInfo.data);
  };
  const handleGetScanned = async (val) => {
    if (scanType == "Template") {
      await EXEC_SQL_InsertOne(906, setHeaderHolder, qrInfo.data);
      setHeaderHolderTrigger(true);
    } else {
      setloading(true);
      if (val.charAt(0).toUpperCase() == "W") {
        await EXEC_SQL_InsertOne(
          968,
          setGetScannedOutp,
          val,
          headerHolder.Warehouse,
          docEntry,
          userInfo.ID
        );
      } else {
        await EXEC_SQL_InsertOne(
          966,
          setGetScannedOutp,
          val,
          headerHolder.Warehouse,
          docEntry,
          userInfo.ID
        );
      }
      setloading(false);
    }
    setloading(false);
  };
  const batchDetailsOnChangeQty = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setGetScannedOutp([
      {
        BarCode: GetScannedOutp[0].BarCode,
        ItemCode: GetScannedOutp[0].ItemCode,
        ItemName: GetScannedOutp[0].ItemName,
        UoM: GetScannedOutp[0].UoM,
        Batch: GetScannedOutp[0].Batch,
        MnfDate: GetScannedOutp[0].MnfDate,
        ExpDate: GetScannedOutp[0].ExpDate,
        QuantityQty: GetScannedOutp[0].QuantityQty,
        createdby: GetScannedOutp[0].VAL4,
        CodeType: GetScannedOutp[0].CodeType,
        BatCode: GetScannedOutp[0].BarCode,
        Qty: value,
        Quantity: value,
        void: "1",
        docEntry: GetScannedOutp[0].VAL3,
      },
    ]);
  };
  const handleCancel = () => {
    setNoteDetails({
      visible: false,
    });
    setViewBatchSelection(false);
  };

  const SelectedbatchAdd = (e) => {
    let counter = 0;

    rows.map((item) => {
      console.log(GetScannedOutp[0].ItemCode);
      console.log(item.ItemCode);
      if (GetScannedOutp[0].ItemCode == item.ItemCode) {
        counter = parseFloat(counter) + parseFloat(item.Quantity);
      }
    });
    console.log({ counter });
    console.log({ rows });

    if (
      parseFloat(GetScannedOutp[0].Qty) + parseFloat(counter) >
        parseFloat(GetScannedOutp[0].Quantity) ||
      parseFloat(GetScannedOutp[0].Quantity) == 0
    ) {
      setErrorNoteBatch({
        title: "Error",
        body: "[Quantity] + Selected Quantity is greater than on hand Quantity",
        type: "e",
        visible: true,
      });
      setErrorfound(true);
      return;
    }

    setErrorNoteBatch({
      title: "",
      body: "",
      type: "",
      visible: false,
    });
    console.log({ GetScannedOutp });
    setRows((e) => [
      ...e,
      {
        ...GetScannedOutp[0],
        docEntry: docEntry,
        void: 1,
        BatCode: GetScannedOutp[0].BarCode,
      },
    ]);
    console.log({ GetScannedOutp });
    setViewBatchSelection(false);

    return;
    setRows((e) => [...e, { ...GetScannedOutp[0] }]);
    if (parseFloat(GetScannedOutp[0].QuantityQty) === 0) {
      return;
    }

    if (
      (parseFloat(GetScannedOutp[0].Qty) + parseFloat(counter) >
        parseFloat(GetScannedOutp[0].QuantityQty)) &
      parseFloat(GetScannedOutp[0].QuantityQty)
    ) {
      setNoteDetails({
        body: `Quantity is greater than Weighed quantity  + Scanned quantity, Weighed Qty: 
        ${parseFloat(GetScannedOutp[0].QuantityQty)} ,  Scanned quantity : 
        ${counter}
         `,
        title: "Input Error",
        type: "e",
        visible: true,
      });
      return;
    } else {
      setNoteDetails({
        body: `${GetScannedOutp[0].Qty} - ${GetScannedOutp[0].QuantityQty}`,
        title: "",
        type: "s",
        visible: true,
      });
      setRows((e) => [...e, { ...GetScannedOutp[0] }]);
      setNoteDetails({
        visible: false,
      });
      setViewBatchSelection(false);
    }
  };
  const handleOption = (e) => {
    let id = e.target.value;
    const TempContainer = [...rows];
    TempContainer.splice(id, 1);
    setRows(TempContainer);
    console.log({ TempContainer });
  };
  const [disscan, setdisscan] = useState(false);

  const colsSQL = [
    {
      name: "docEntry",
    },
    {
      name: "ItemCode",
    },
    {
      name: "Batch",
    },
    {
      name: "UoM",
    },
    {
      name: "BatCode",
    },
    {
      name: "Quantity",
    },
    {
      name: "CodeType",
    },
    {
      name: "void",
    },
  ];
  const optionalSQL = "update MUD1 set void ='0' where docEntry = " + docEntry;
  const [ExecRes, setExecRes] = useState([]);
  const handleUpdate = async () => {
    console.log({ rows, colsSQL });
    await EXEC_SQL_InsertMulti_V2(
      884,
      setExecRes,
      colsSQL,
      rows,
      "MUD1",
      optionalSQL
    );
  };

  const [HeaderID, setHeaderID] = useState([]);

  const [isHasError, setisHasError] = useState("");
  function errorHandler(iString, header) {
    if (iString === undefined || iString == "") {
      setErrorNote({
        title: "Error",
        body: "[" + header + "] field is required",
        type: "e",
        visible: true,
      });
      console.log("Error " + iString);
      return false;
    } else {
      console.log("Good to Go " + iString);
      return true;
    }
  }
  const [GetOrPostheaderState, setGetOrPostheaderState] = useState([]);
  const GetOrPostheader = async (e) => {
    Confirm();

    if (docEntry == 0) return;
    await handleUpdate();
    setDocEntry(0);
    setRows([]);
    setGetScannedOutp([]);
    GetOrPostLine();
  };
  const [getHeaderLoading, setgetHeaderLoading] = useState(false);
  const GetOrPostLine = async (e) => {
    console.log({ headerHolder });

    await handlerInsertHead();
  };

  const GetPostedLine = async (e) => {
    await EXEC_SQL_InsertOne(954, setRows, docEntry);
  };

  const handlerInsertHead = async (e) => {
    setgetHeaderLoading(true);
    setHeaderID({
      ID: 0,
    });
    setErrorNote({
      title: "",
      body: "",
      type: "",
      visible: false,
    });
    console.log({ headerHolder });
    // if (!errorHandler(headerHolder.docEntry, "docEntry")) return;
    if (!errorHandler(headerHolder.ProrationType, "ProrationType")) return;
    if (!errorHandler(headerHolder.Revision, "Revision")) return;
    if (!errorHandler(headerHolder.Size, "Size")) return;
    if (!errorHandler(headerHolder[0].MnfDate, "MNF")) return;
    if (!errorHandler(headerHolder.Station, "Station")) return;
    if (!errorHandler(headerHolder.Batch, "Batch")) return;
    if (!errorHandler(headerHolder.Warehouse, "Warehouse")) return;
    qrInfo.data = "";
    qrInfo.type = "";
    console.log({ headerHolder });
    // return;
    await EXEC_SQL_InsertOne(
      955,
      setHeaderID,
      userInfo.ID,
      headerHolder.ProrationTypeID,
      headerHolder.RevisionId,
      headerHolder.Size,
      headerHolder[0].MnfDate,
      headerHolder.Batch,
      headerHolder.Warehouse,
      headerHolder.Station
    );
    setErrorNote({
      title: "Record retrieved",
      body: "Record retrieved you can now select materials",
      type: "s",
      visible: true,
    });
    setgetHeaderLoading(false);
  };
  const PostLInes = async (e) => {
    console.log({ headerHolder });
    return;
    await EXEC_SQL_InsertMulti_V2(
      884,
      setExecRes,
      colsSQL,
      rows,
      "MUD1",
      optionalSQL,
      "select @@IDENTITY ID "
    );
    await GetPostedLine();
    alert("Document Posted");
  };
  useEffect(() => {
    if (!Array.isArray(headerHolder)) return;
    if (headerHolder.length <= 0) return;

    if (!HeaderHolderTrigger) return;
    setHeaderHolderTrigger(false);

    setHeaderHolder((p) => ({
      ...p,
      CreatedBy: headerHolder[0].CreatedBy,
      CreatedTime: headerHolder[0].CreatedTime,
      Machine: headerHolder[0].Machine,
      ProrType: headerHolder[0].ProrType,
      ProrationType: headerHolder[0].ProrationType,
      ProrationTypeID: headerHolder[0].ProrationTypeID,
      Revision: headerHolder[0].Revision,
      RevisionId: headerHolder[0].RevisionId,
      Size: headerHolder[0].Size,
      Station: headerHolder[0].Station,
      Status: headerHolder[0].Status,
      Batch: headerHolder[0].batch,
      MNF: headerHolder[0].MnfDate,
      Warehouse: headerHolder[0].WhsName,
    }));
  }, [HeaderHolderTrigger]);

  useEffect(() => {
    try {
      if (HeaderID[0].ID != undefined) {
        if (HeaderID[0].ID != 0) {
        }
        setDocEntry(HeaderID[0].ID);
      }
    } catch (error) {}
  }, [HeaderID]);

  useEffect(() => {
    try {
      if (docEntry != 0) {
        GetPostedLine();
      }
    } catch (error) {}
  }, [docEntry]);

  useEffect(() => {
    if (!docEntry == 0) {
      setdisscan(false);
    } else {
      setdisscan(true);
    }
  }, [docEntry]);

  useEffect(() => {
    if (!docEntry == 0) return;
    setHeaderHolder((p) => ({
      ...p,
      docEntry: docEntry,
    }));
  }, [docEntry]);

  useEffect(() => {
    if (qrInfo.data != "") {
      handleGetScanned(qrInfo.data);
    }
  }, [qrInfo.data]);

  const [Errorfound, setErrorfound] = useState(false);
  const [NotificationProp, setNotificationProp] = useState({
    type: "e",
    msg: "e",
    error: false,
  });
  useEffect(() => {
    // setRows((e) => [...e, ...GetScannedOutp]);
    setErrorNoteBatch({
      title: "",
      body: "",
      type: "",
      visible: false,
    });
    if (GetScannedOutp.length > 0) {
      console.log({ GetScannedOutp });
      if (GetScannedOutp[0].error === undefined) {
        setViewBatchSelection(true);
      } else {
        setErrorfound(true);
      }
    }
  }, [GetScannedOutp]);

  // useEffect(() => {
  //   if (getTemplate.length <= 0) return;
  //   setgetTemplateNames(getTemplate[0]);
  //   Components.map((item) =>
  //     setHeaderHolder((p) => ({
  //       ...p,
  //       [item.id]: getTemplate[0][item.SQL],
  //     }))
  //   );
  // }, [getTemplate]);

  const [DocEntryFromUpdate, setDocEntryFromUpdate] = useState(-1);
  const getHeaderWithUpdate = async () => {
    await EXEC_SQL_InsertOne(9550, setHeaderHolder, DocEntryFromUpdate);
    setHeaderHolderTrigger(true);
  };
  useEffect(() => {
    if (DocEntryFromUpdate == -1) return;

    setTab(1);

    setDocEntry(DocEntryFromUpdate);
    getHeaderWithUpdate();
  }, [DocEntryFromUpdate]);

  return (
    <>
      <div className="   mt-2   w-full    ">
        <div className="flex">
          <DefButton
            onClick={handleTabs}
            className="mt-2  mx-1 btn btn-sm btn-ghost border"
            text="RM"
            id={"1"}
            type={tab == "1" ? "2" : "2B"}
          />
          <p className="font-bold mt-1.5 mx-2">.</p>
          <DefButton
            onClick={handleTabs}
            className="mt-2  mx-1 btn btn-sm btn-ghost border"
            text="History"
            id={"3"}
            type={tab == "3" ? "2" : "2B"}
          />

          <p className="font-bold mt-1.5 mx-2">.</p>
          <DefButton
            onClick={handleTabs}
            className="mt-2  mx-1 btn btn-sm btn-ghost border"
            text="Pre-Weighing Sheet"
            id={"4"}
            type={tab == "3" ? "2" : "2B"}
          />
        </div>
        <br></br>
      </div>
      {tab == 1 && (
        <div className=" flex justify-between   w-full    ">
          <div className=" w-full">
            <DefButton
              id="Template"
              onClick={handleScanned}
              // onClick={TestGet}
              className="w-full btn-primary  "
              text="Scan Template"
              // disabled={disscan}
              type={"2B"}
            />
          </div>
          <p className="font-bold mt-2 mx-2">.</p>
          <div className=" w-full">
            <DefButton
              id="Material"
              onClick={handleScanned}
              className={
                disscan
                  ? "  mt-2 btn-disabled btn-primary w-full   right-0 text-gray-400"
                  : "  mt-2 btn-primary w-full   right-0 "
              }
              text="Scan Material"
              disabled={disscan}
              type={disscan ? "6" : undefined}
            />
          </div>
        </div>
      )}
      <div className="frame p-0 rounded-md shadow-sm ">
        <NoteInfo
          title={ErrorNote.title}
          body={ErrorNote.body}
          className="mt-2"
          type={ErrorNote.type}
          visible={ErrorNote.visible}
        />
      </div>
      {tab == "1" ? (
        <>
          {/* <div className="grid grid-cols-2 gap-x-2 py-2 frame"> */}
          <div className=" py-2 frame">
            <div className={`col-span-2 `}>
              <DefInput
                label={"DocEntry"}
                id={"Docentry"}
                clearid={"Docentry"}
                type={"text"}
                value={docEntry}
                handler={headerOnChangeHandler}
              />
            </div>
            {headerHolder.length > 0 ? (
              ""
            ) : (
              <>
                {Components.map((item, index) => (
                  <div className={`col-span-${item.colspan} `}>
                    <DefInput
                      label={item.id}
                      id={item.id}
                      clearid={item.id}
                      type={DocEntryFromUpdate == -1 ? item.type : "text"}
                      disabled={DocEntryFromUpdate == -1 ? item.disabled : true}
                      value={headerHolder[item.id]}
                      handler={headerOnChangeHandler}
                      dropDownId={
                        DocEntryFromUpdate == -1
                          ? item.id == "Warehouse"
                            ? item.dropDownId
                            : undefined
                          : undefined
                      }
                    />

                    {item.label == "Station" ? <div></div> : ""}
                  </div>
                ))}
              </>
            )}
          </div>

          {DocEntryFromUpdate == -1 && (
            <div className="frame">
              <div className="mr-auto bg-red w-full">
                <DefButton
                  text="Post/Get header"
                  type="2B"
                  className="w-fit float-right mt-0.5 btn-primary btn btn-sm"
                  onClick={GetOrPostLine}
                  loading={getHeaderLoading}

                  // onClick={() => {
                  //   console.log({ Components });
                  // }}
                />
                <br></br>
              </div>
            </div>
          )}
          <br></br>
          <div className="overflow-auto mt-2 frame  pb-2   ">
            <DefTable
              columns={columns}
              rows={rows}
              btnLabel="Remove"
              spanCSS="w-full"
              className=""
              handleOption={handleOption}
            />
          </div>
          <br></br>

          {/* <div className="float-right mr-2 frame py-1">
            <DefButton
              text="check"
              onClick={handlerInsertHead}
              className="whitespace-nowrap h-fit px-2"
            />
          </div> */}
          <div className="frame">
            <div className="mr-auto bg-red w-full">
              {rows.length > 0 && HeaderID.length > 0 && (
                <DefButton
                  text="Post Lines"
                  type="2B"
                  className={`w-fit float-right mt-0.5 btn ${
                    HeaderID[0].CanUpdate == "True"
                      ? "btn-primary"
                      : "btn-disabled"
                  }`}
                  disabled={HeaderID[0].CanUpdate == "True" ? true : false}
                  onClick={PostLInes}
                />
              )}

              <br></br>
            </div>
          </div>
          {viewBatchSelection && !disscan ? (
            <div className="absolute left-0 top-0 w-full h-full  ">
              {/* <div className="w-full h-full bg-trans50 "> */}
              <div className="mt-2"></div>
              <div
                className=" mx-auto  bg-white frame py-2 shadow-xl border"
                style={{ width: "420px" }}
              >
                <div className="bg-SAP-header border-b-4 border-SAP-headerLine">
                  <Label
                    text="Batch Details"
                    className=" mx-2 my-0.5 text-black"
                  />
                </div>

                <div className="mb-4  px-2 grid grid-cols-2 gap-x-4 ">
                  {compsBach.map((item, index) => (
                    <div className={`col-span-${item.colspan}`} key={index}>
                      <DefInput
                        id={item.IDx}
                        label={item.IDx}
                        type={item.type}
                        name={item.IDx}
                        defvalue={item.defvalue}
                        disabled={item.disabled}
                        handler={batchDetailsOnChangeQty}
                        value={
                          GetScannedOutp.length > 0
                            ? compsBach.length > 0
                              ? item.IDx === "item"
                                ? GetScannedOutp[0].ItemCode +
                                  " - " +
                                  GetScannedOutp[0].ItemName
                                : item.IDx === "Quantity"
                                ? GetScannedOutp[0].Qty
                                : item.IDx === "MnfDate"
                                ? GetScannedOutp[0].MnfDate
                                : item.IDx === "ExpDate"
                                ? GetScannedOutp[0].ExpDate
                                : item.IDx === "batch"
                                ? GetScannedOutp[0].Batch
                                : item.IDx === "UomCode"
                                ? GetScannedOutp[0].UoM
                                : ""
                              : ""
                            : ""
                        }
                      />
                    </div>
                  ))}
                </div>
                {!compsBach[0].error === undefined ? "" : ""}

                <div className="flex gap-2 mb-2 px-2 justify-between mx-4">
                  <DefButton
                    text="Cancel"
                    type="5"
                    className="btn btn-warning mt-2"
                    onClick={handleCancel}
                  />
                  <DefButton
                    text="Select Batch"
                    className="btn btn-primary"
                    onClick={SelectedbatchAdd}
                  />
                </div>
                <NoteInfo
                  title={ErrorNoteBatch.title}
                  body={ErrorNoteBatch.body}
                  className="mt-4"
                  type={"e"}
                  visible={ErrorNoteBatch.visible}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <>{tab == "2" ? <>{/* <MaterialUsagePM /> */}</> : <></>}</>
      <>
        {tab == "3" && (
          <>
            <MaterialUsageHistory2
              setDocEntryFromUpdate={setDocEntryFromUpdate}
            />
          </>
        )}
      </>
      {tab == 4 && (
        <>
          <MaterialUsage2PREWeighSheet />
        </>
      )}
      <br />
      <br />
      <NoteInfo
        title={"Note ⚠️"}
        body={
          "\n After 12hrs from initial posting this document will automatically be closed and unable to be updated"
        }
        className="mt-2"
        type={ErrorNote.type}
        visible={ErrorNote.visible}
      />
      {Array.isArray(HeaderID) &&
        HeaderID.length > 0 &&
        HeaderID[0].CanUpdate == "True" && (
          <>
            <NoteInfo
              title={"Note ⚠️"}
              body={
                "\n  12hrs have past from initial posting this document will automatically  closed and unable to be updated"
              }
              className="mt-2"
              type={"w"}
              visible={true}
            />
          </>
        )}
    </>
  );
}
