import { formatDate } from "date-fns";

import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  DefTableV3,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_TEST,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import InventoryPushMainPostScannedItems from "./InventoryPushMainPostScannedItems";
import { ITopContext } from "../../hooks/TopContext";
import { ajaxPrefilter } from "jquery";
import { LoadingSpinner } from "../../assets/SVGs";
export default function InventoryPushMainPost() {
  const { setPopScannerModal, qrInfo, setQrInfo, DateNow, userInfo } =
    useContext(ITopContext);
  const ComponentList = [
    {
      label: "ITR BaseEntry",
      name: "ITR",
      dropDownId: 891,
    },
    {
      label: "Doc Date",
      disabled: true,
      name: "DocDate",
    },
    {
      label: "Warehouse From",
      disabled: true,
      name: "whsFrom",
    },
    {
      label: "Warehouse To",
      disabled: true,
      name: "whsTo",
    },
    {
      label: "Remarks",
      disabled: true,
      name: "remarks",
      css: "md:col-span-2",
    },
  ];
  const ScannedItem = [
    {
      label: "Item",
      name: "item",
      disabled: true,
      css: "col-span-4",
    },
    {
      label: "Push Qty",
      name: "pushQty",
      disabled: false,
      css: "col-span-2",
      type: "number",
    },
    {
      label: "Onhand Qty",
      name: "onHandQuantity",
      disabled: true,
      css: "col-span-2",
    },
    {
      label: "Batch",
      name: "BatchNum",
      disabled: true,
      css: "col-span-2",
    },
    {
      label: "Pallet",
      name: "Pallet",
      disabled: true,
      css: "col-span-1",
    },
    {
      label: "UoM",
      name: "InvntryUom",
      disabled: true,
      css: "col-span-1",
    },
    {
      label: "PrdDate",
      name: "PrdDate",
      disabled: true,
      css: "col-span-2",
    },
    {
      label: "ExpDate",
      name: "ExpDate",
      disabled: true,
      css: "col-span-2",
    },
    {
      label: "Warehouse",
      name: "WhsCode",
      disabled: true,
      css: "col-span-4",
    },
  ];

  const [loading, setloading] = useState(false);
  const [hasScan, sethasScan] = useState(false);
  const [rows, setrows] = useState([]);
  const [ScannedBatchInfo, setScannedBatchInfo] = useState([{ ItemCode: "" }]);
  const [SelectedScannedItems, setSelectedScannedItems] = useState([]);
  const [pushQtyValue, setpushQtyValue] = useState(0);
  const [Rermaks, setRermaks] = useState();
  const [Showvalue, setShowvalue] = useState({});
  const [DocEntry, setDocEntry] = useState(0);
  const [ShowScanned, setShowScanned] = useState(false);
  const onClickCancelScanned = (e) => {
    setShowScanned(false);
  };
  const columns = [
    // {
    //   name: "Option",
    //   disabled: true,
    //   colspan: 1,
    // },
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "ITEMNAME",
      disabled: true,
      colspan: 0,
    },
    {
      name: "UoM",
      disabled: true,
      colspan: 1,
    },
    {
      name: "NEED_QTY",
      disabled: true,
      colspan: 1,
    },

    {
      name: "Scanned",
      disabled: true,
      colspan: 1,
    },
    // {
    //   name: "Pending",
    //   disabled: true,
    //   colspan: 1,
    // },
    {
      name: "UoM",
      disabled: true,
      colspan: 1,
    },
  ];

  const Login = async (e) => {
    setPostingLoading(true);
    await SaveAsDraft();
    try {
      const x = await fetch("API_LOGIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          USER: "B1_Push_ITR_IT",
          PASS: "B1P@ssw0rd",
        }),
      });
      const d = await x.json();
      console.log(d.SessionId);

      if (d.SessionId != undefined) {
        await Submit(d.SessionId);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const Submit = async (sessionid) => {
    console.log({ Showvalue });

    try {
      var header = JSON.stringify({
        Series: 21,
        Comments: `${Rermaks} - Paperless-ITR-IT : ${DocEntry}`,
        FromWarehouse: Showvalue.whsFromCode,
        ToWarehouse: Showvalue.whsToCode,
        DocObjectCode: "67",
        BPLID: 1,
      });

      header = header.substring(0, header.length - 1);
      header += ' ,"StockTransferLines": [ ';
      console.log({ rows });
      console.log({ SelectedScannedItems });
      rows.map((HeaderItem, HeaderIndex) => {
        if (HeaderItem.Scanned > 0) {
          header += JSON.stringify({
            LineNum: HeaderItem.LineNum,
            ItemCode: HeaderItem.ItemCode,
            Quantity: HeaderItem.Scanned,
            WarehouseCode: Showvalue.whsToCode,
            FromWarehouseCode: Showvalue.whsFromCode,
            UseBaseUnits: "tYES",
            UnitsOfMeasurment: 1,
            BaseType: "InventoryTransferRequest",
            BaseLine: HeaderItem.LineNum,
            BaseEntry: DocEntry,
            UoMEntry: HeaderItem.UomEntry,
            UoMCode: HeaderItem.UoM,
          });

          header = header.substring(0, header.length - 1);
          header += ' ,"BatchNumbers": [ ';
          SelectedScannedItems.map((item, index) => {
            item.LineNum == HeaderItem.LineNum &&
              (header += JSON.stringify({
                BatchNumber: item.BatchNum,
                Quantity: item.Qty,
                BaseLineNumber: HeaderItem.LineNum,
              }));
            item.LineNum == HeaderItem.LineNum && (header += ",");
          });
          header = header.substring(0, header.length - 1);
          header += "]},";
        }
      });

      header = header.substring(0, header.length - 2);
      header += "}]}";
      console.log({ header });

      const x = await fetch("SERVERLAYER_POST_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: header,
          session: sessionid,
          objectType: "StockTransfers",
        }),
      })
        .then((data) => {
          console.log({ data });
          alert("ITR Posted");
          setRermaks("");

          setrows([]);
          setDocEntry(0);
          setloading(false);
          setDraftSaved(false);
          setPostingLoading(false);
        })
        .catch((error) => {
          alert("Error");
          setPostingLoading(false);
        })
        .finally(() => {
          setPostingLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const colsSQL = [
    {
      name: "ITR_Entry",
    },
    {
      name: "baseLine",
    },
    {
      name: "batch",
    },
    {
      name: "itemcode",
    },
    {
      name: "qty",
    },
    {
      name: "uom",
    },
    {
      name: "void",
    },

    {
      name: "CreatedDate",
    },
    {
      name: "createdBy",
    },
  ];
  const [RowsToCreate, setRowsToCreate] = useState([]);
  const [ExecRes, setExecRes] = useState([]);
  const [DraftSaved, setDraftSaved] = useState(false);
  const [PostingLoading, setPostingLoading] = useState(false);

  const SaveAsDraft = async (e) => {
    console.log({ SelectedScannedItems });
    const clsSQL = SelectedScannedItems.map((item) => {
      return {
        ITR_Entry: DocEntry,
        baseLine: item.LineNum,
        batch: item.BatchNum,
        itemcode: item.ItemCode,
        qty: item.Qty,
        uom: item.uom,
        void: "1",
        CreatedDate: DateNow,
        createdBy: userInfo.ID,
      };
    });
    console.log({ clsSQL });
    let frontSQL = `	update OITP set void = 0	where ITR_Entry = ${DocEntry}`;
    let backSQL = `		
SELECT 
ITR_Entry,baseLine LineNum,batch BatchNum,A.itemcode ItemCode,sum(qty) Qty,uom,void,CreatedDate,createdBy ,B.ItemName
FROM OITP  A
LEFT JOIN SAPMain.DBO.OITM B on  B.itemcode = a.itemcode collate SQL_Latin1_General_CP850_CI_AS
where ITR_Entry =   ${DocEntry}  and void = 1 
group by ITR_Entry,baseLine,batch,A.itemcode,uom,void,CreatedDate,createdBy ,b.itemname`;
    await EXEC_SQL_InsertMulti_V2(
      888,
      setSelectedScannedItems,
      colsSQL,
      clsSQL,
      "OITP",
      frontSQL,
      backSQL
    );
    setDraftSaved(true);

    alert("Saved as draft!!");
  };
  const onChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    if (id === "ITR") setDocEntry(value);
    else if (id === "clearITR") {
      setrows([]);
      setDocEntry(0);
      setDraftSaved(false);
      setRermaks("");
    } else if (id === "pushQty") {
      setpushQtyValue(value);
    } else if (id === "Comment") {
      setRermaks(value);
    }
  };
  const getScanned = async () => {
    if (DocEntry == 0) return;
    await EXEC_SQL_InsertOne(890, setrows, DocEntry);
  };
  const onClickHandler = (e) => {
    if (parseFloat(pushQtyValue) <= 0) {
      alert("! Wrong Push Qty");
      return;
    }

    if (isNaN(+parseFloat(pushQtyValue))) {
      alert("! Wrong Push Qty");
      return;
    }
    let current = new Date();
    current = current.toLocaleDateString("en-CA");
    console.log(current);
    console.log({ ScannedBatchInfo });
    console.log(ScannedBatchInfo[0].ED);
    console.log(formatDate(ScannedBatchInfo[0].ED, "yyyy-MM-dd"));

    if (
      formatDate(ScannedBatchInfo[0].ED, "yyyy-MM-dd") <
      formatDate(current, "yyyy-MM-dd")
    ) {
      alert("! Selected Batch Already Expired");
      return;
    }

    // if (ScannedBatchInfo[0].ExpDatef != tabBatchList[0].ExpDate) {
    //   alert("Selected  Batch does not follow fifo rule ");
    //   return;
    // }
    const { value, id, name } = e.target;
    console.log({ value, id, name });

    if (pushQtyValue > ScannedBatchInfo[0].Allowable) {
      alert("Quantity is greater than needed/onhand");
      return;
    }
    let canGo = true;

    let BathSelectionTotalScanned = 0;
    SelectedScannedItems.map((item, index) => {
      if (ScannedBatchInfo[0].LineNum == item.LineNum) {
        BathSelectionTotalScanned += parseFloat(item.Qty);
      }
    });
    //  OpenQty == scanned
    BathSelectionTotalScanned += parseFloat(pushQtyValue);
    if (BathSelectionTotalScanned > ScannedBatchInfo[0].OpenQty) {
      canGo = false;
      alert("Selected Quantity is greater than scanned quantity");
    }
    // rows.map((item, index) => {
    //   if (ScannedBatchInfo[0].LineNum == item.LineNum) {

    //     item.Scanned >=
    //   }
    // });
    if (!canGo) return;

    // console.log({ tempRows });
    setSelectedScannedItems((e) => [
      ...e,
      { ...ScannedBatchInfo[0], Qty: pushQtyValue },
    ]);

    setShowScanned(false);
    setpushQtyValue(0);
  };

  const ScannItems = (e) => {
    setPopScannerModal(true);
  };
  const handleOption = (e) => {};
  const sqlGetScannedBatch = async (e) => {
    //      let  getScanned  = rows.map((item) = {
    //      if(item.ItemCode ==  )
    //     })
    setloading(true);
    sethasScan(true);
    await EXEC_SQL_InsertOne(
      889,
      setScannedBatchInfo,
      DocEntry,
      qrInfo.data,
      rows[0].FromWhsCode
    );
    setloading(false);

    setQrInfo({ type: "", data: "" });
  };

  useEffect(() => {
    getScanned();
  }, [DocEntry]);
  const [tabBatchList, settabBatchList] = useState([]);
  const cols = [
    {
      name: "",
    },
    {
      name: "Quantity",
    },
    {
      name: "BatchNum",
    },
    {
      name: "MnfDate",
    },
    {
      name: "ExpDate",
    },
  ];
  const getGBatchList = async () => {
    await EXEC_SQL_InsertOne(
      786,
      settabBatchList,
      ScannedBatchInfo[0]["ItemCode"]
    );
  };
  useEffect(() => {
    if (ScannedBatchInfo.length == 0) return;
    getGBatchList();
    setpushQtyValue(ScannedBatchInfo[0].pushQty);
  }, [ScannedBatchInfo]);

  useEffect(() => {
    if (!hasScan) return;
    if (ScannedBatchInfo.length > 0) {
      setShowScanned(true);
    } else {
      alert("!no matching stacks found ");
      // setScannedBatchInfo([]);
    }
  }, [ScannedBatchInfo]);

  useEffect(() => {
    if (!hasScan) return;
    if (ScannedBatchInfo.length > 0) return;
  }, [loading]);

  useEffect(() => {
    if (rows.length > 0) {
      setShowvalue({
        whsTo: rows[0].ToWhsCode + " " + rows[0].ToWhsName,
        whsToCode: rows[0].ToWhsCode,
        whsFrom: rows[0].FromWhsCode + " " + rows[0].FromWhsName,
        whsFromCode: rows[0].FromWhsCode,
        remarks: rows[0].Comments,
        DocDate: rows[0].DocDate,
        Comment: rows[0].Comment,
      });
    } else {
      setShowvalue({
        whsTo: "",
        whsFrom: "",
        remarks: "",
        DocDate: "",
      });
    }
  }, [rows]);

  useEffect(() => {
    console.log(qrInfo.data);
    if (qrInfo.data != "") sqlGetScannedBatch();
  }, [qrInfo]);
  const [SapLoginStatus, setSapLoginStatus] = useState("");

  useEffect(() => {
    EXEC_SQL(887, setSelectedScannedItems, DocEntry);
    setPostingLoading(false);
  }, [DocEntry]);
  useEffect(() => {
    setSelectedScannedItems([]);
  }, []);
  const CalculateScanned = () => {
    const newrows = rows.map((item) => {
      let newScannedCount = 0;
      SelectedScannedItems.map((itemx) => {
        console.log({ SelectedScannedItems });
        if (item.LineNum == itemx.LineNum)
          newScannedCount += parseFloat(itemx.Qty);
      });
      return { ...item, Scanned: newScannedCount };
    });
    setrows(newrows);
  };
  useEffect(() => {
    CalculateScanned();
  }, [SelectedScannedItems]);
  const [tabBatch, settabBatch] = useState(0);
  return (
    <>
      <div>
        <div className="frame  grid    gap-x-2 pb-2 ">
          {ComponentList.map((item, index) => (
            <div key={index} className={item.css}>
              <DefInput
                label={item.name}
                name={item.name}
                id={item.name}
                handler={onChangeHandler}
                dropDownId={item.dropDownId}
                disabled={item.disabled}
                className=""
                value={Showvalue[item.name]}
                clearid="clearITR"
              />
            </div>
          ))}
        </div>
        <div className="pb-2 flex ">
          <div className="frame w-full font-semibold title">
            Requested Items
          </div>
        </div>
        <div className=" ">
          <div className="frame overflow-auto ">
            <DefTable
              columns={columns}
              rows={rows}
              btnLabel="filter"
              spanCSS="w-full"
              className=""
              handleOption={handleOption}
            />
          </div>
        </div>
      </div>

      {/* Item Inventory Information */}

      {ShowScanned && (
        <>
          <div className="fixed top-0 left-0 h-full w-full bg-trans50 z-10">
            <div className="frame bg-white px-2 rounded-sm w-96 h-fit pb-2 mx-auto mt-10 grid grid-cols-4 gap-x-2">
              <div className="flex col-span-4">
                <div role="tablist" class="tabs tabs-bordered">
                  <button
                    role="tab"
                    id={0}
                    onClick={(e) => settabBatch(e.target.id)}
                    className={
                      tabBatch == 0
                        ? "tab whitespace-nowrap tab-active"
                        : "tab whitespace-nowrap "
                    }
                  >
                    Scanning
                  </button>
                  <button
                    role="tab"
                    id={1}
                    onClick={(e) => settabBatch(e.target.id)}
                    className={
                      tabBatch == 1
                        ? "tab whitespace-nowrap tab-active"
                        : "tab whitespace-nowrap "
                    }
                  >
                    Batch List
                  </button>
                </div>

                <div className="w-full">
                  <DefButton
                    text="Close"
                    onClick={onClickCancelScanned}
                    type="2B"
                    className=" float-right  btn-warning mt-2"
                  />
                </div>
              </div>
              <div className="w-full col-span-4"></div>
              {tabBatch == 0 && (
                <>
                  {ScannedItem.map((item, index) => (
                    <div className={item.css} key={index}>
                      <DefInput
                        label={item.name}
                        name={item.name}
                        disabled={item.disabled}
                        id={item.name}
                        handler={onChangeHandler}
                        min={0}
                        value={
                          item.name == "pushQty"
                            ? pushQtyValue
                            : ScannedBatchInfo[0][item.name]
                        }
                        className="text-black"
                        type={item.name == "pushQty" ? "number" : "text"}
                      />
                    </div>
                  ))}
                  <div className="col-span-4 text-transparent">x</div>
                  {/* <DefButton
                text="Cancel"
                onClick={onClickCancelScanned}
                type="6"
                className="h-fit py-1 col-span-2  mt-2 btn-warning"
              /> */}
                  <DefButton
                    text="Select"
                    name="select"
                    id="select"
                    onClick={onClickHandler}
                    className="h-fit py-1 col-span-4  mt-2  btn-primary w-full"
                  />
                </>
              )}
              {tabBatch == 1 && (
                <div className="col-span-4 overflow-auto h-[80vh] ">
                  <DefTableV3 rows={tabBatchList} cols={cols} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className="border-t border-WhiteMode-FromBackground000 pt-2"></div>
      <div className="frame ">
        {DocEntry > 0 && (
          <DefButton
            text="Scan Items"
            onClick={ScannItems}
            type="4"
            loading={loading}
            className="btn-primary float-right mb-4 "
          />
        )}
      </div>
      <InventoryPushMainPostScannedItems
        rows={SelectedScannedItems}
        setrows={setSelectedScannedItems}
      />
      <div className="frame pb-2">
        <DefInput
          label="Comment"
          name="Comment"
          id="Comment"
          handler={onChangeHandler}
          value={Rermaks}
        />
      </div>
      <DefButton
        text="Refresh Scanned"
        onClick={CalculateScanned}
        type="2B"
        className="w-fit px-2  frame absolute btn-secondary mt-2"
      />
      <div>
        {!PostingLoading ? (
          <>
            {DraftSaved && (
              <DefButton
                text="Post"
                onClick={Login}
                type="2B"
                className="w-fit px-2 float-right frame"
              />
            )}
            {SelectedScannedItems.length > 0 && (
              <DefButton
                text="Save As Draft"
                onClick={SaveAsDraft}
                type="2B"
                className="w-fit px-2 float-right frame btn-primary"
              />
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}
