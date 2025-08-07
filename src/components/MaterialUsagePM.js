import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  TimeLineMaped,
} from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";
import MaterialUsagePmScanSelectection from "./MaterialUsagePmScanSelectection";
import MaterialUsagePMHistory2 from "./MaterialUsagePMHistory2";

export default function MaterialUsagePM() {
  const { DateNow, userInfo } = useContext(ITopContext);
  const [ScanningShow, setScanningShow] = useState(false);
  const [Timelines, setTimelines] = useState([
    {
      id: 0,
      checked: true,
      label: "Select Proration Type",
    },
    {
      id: 1,
      checked: false,
      label: "Select PO",
    },
    {
      id: 2,
      checked: false,
      label: "Pick A Batch",
    },
    {
      id: 3,
      checked: false,
      label: "Scan Items",
    },
    {
      id: 4,
      checked: false,
      label: "Publish",
    },
  ]);
  const [iPosition, setIPosition] = useState(0);

  const UpdateChecked = (id) => {
    setTimelines(
      Timelines.map((items) => {
        if (items.id == id) {
          return { ...items, checked: true };
        } else {
          return items;
        }
      })
    );
  };

  const columns = [
    {
      name: "Option",
      disabled: true,
    },
    {
      name: "PMCode",
      disabled: true,
    },
    {
      name: "PMName",
      disabled: true,
    },
    {
      name: "UoM",
      disabled: true,
    },
  ];

  const columns2 = [
    {
      name: "Option",
      disabled: true,
    },
    {
      name: "PMCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "PMName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Quantity",
      disabled: true,
    },
    {
      name: "Batch",
      disabled: true,
    },
    {
      name: "linenum",
      disabled: true,
    },
  ];

  const { qrInfo, setPopScannerModal } = useContext(ITopContext);
  const [orderNoMap, setOrderNoMap] = useState([]);
  const [componentsValues, setcomponentsValues] = useState([]);
  const [Proration, setProration] = useState("");
  const [DocEntry, setDocEntry] = useState("");
  const [OrderNo, setOrderNo] = useState("");
  const [BatchSizeNum, setBatchSizeNum] = useState(0);
  const [MnfDate, setMnfDate] = useState(DateNow);
  const [OrderNoList, setOrderNoList] = useState([
    {
      PlannedQty: "",
      ItemCode: "",
      Warehouse: "",
      ItemName: "",
      WhsName: "",
    },
  ]);

  const components = [
    {
      id: "DocEntry",
      label: "DocEntry",
      type: "text",
      colspan: "1",
    },
    {
      id: "ProrationType",
      label: "Proration Type",
      type: "text",
      dropDownId: 936,
      colspan: "1",
    },
    {
      id: "OrderNo",
      label: "Order No.",
      type: "text",
      dropDownId: 99999,
      colspan: "2",
    },
    {
      id: "PlannedQuantity",
      label: "Planned Quantity",
      type: "text",
      colspan: "1",
      disabled: true,
    },
    {
      id: "ProductNo",
      label: "Product No.",
      type: "text",
      colspan: "1",
      disabled: true,
    },
    {
      id: "ProductDesc",
      label: "Product Description.",
      type: "text",
      colspan: "3",
      disabled: true,
    },
    {
      id: "WarehouseCode",
      label: "Warehouse Code",
      type: "text",
      colspan: "1",
      disabled: true,
    },
    {
      id: "WarehouseName",
      label: "Warehouse Name",
      type: "text",
      colspan: "2",
      disabled: true,
    },

    {
      id: "Batch",
      label: "Batch #",
      type: "number",
      colspan: "1",
    },
    {
      id: "Mnf",
      label: "Mnf Date #",
      type: "date",
      colspan: "1",
      disabled: false,
    },
  ];

  const [disscan, setdisscan] = useState(false);
  const [rows, setRows] = useState([]);
  const [GetScannedOutp, setGetScannedOutp] = useState([]);
  const [ErrorNote, setErrorNote] = useState({
    title: "",
    body: "",
    type: "",
    visible: "",
  });
  const [Temp, setTemp] = useState([]);
  const [tab, setTab] = useState("1");
  const handleTabs = async (e) => {
    setDocEntry(0);
    setRows([]);
    setGetScannedOutp([]);
    setErrorNote({
      title: "",
      body: "",
      type: "e",
      visible: false,
    });
    setisForUpdate(false);
    setTab(e.target.id);
  };
  useEffect(() => {
    if (isForUpdate) return;
    setDocEntry(0);
    setRows([]);
    setGetScannedOutp([]);
    setOrderNoList([]);
  }, [tab]);

  const handleScanned = async (e) => {
    qrInfo.data = "";
    qrInfo.type = "";
    setPopScannerModal(true);
    // setErrorfound(false);
  };
  const getCompValues = async (e) => {
    // await EXEC_SQL_InsertMulti(9999, setcomponentsValues,);
  };

  const getOrderNoHandlers = async (e) => {};
  const handler = async (e) => {
    const { value, id, name } = e.target;
    console.log(e.target);
    if (id == "ProrationType") {
      await EXEC_SQL(935, setOrderNoMap, e.target.value);
    }
    if (id == "ProrationType") setProration(value);
    if (id == "OrderNo") setOrderNo(value);

    if (id == "Batch") setBatchSizeNum(value);
    if (id == "Mnf") setMnfDate(value);

    if (id == "ProrationType") {
      if (value != "") {
        setIPosition(1);
      } else {
        setIPosition(1);
      }
    }

    if (id == "ProrationType") {
      if (value != "") {
        setIPosition(1);
        setBatchSizeNum(0);
      } else {
        setIPosition(0);
      }
      setBatchSizeNum(0);
    }

    if (id == "OrderNo") {
      if (value != "") {
        setIPosition(2);
      } else {
        setIPosition(1);
      }
      setBatchSizeNum(0);
    }

    if (id == "Batch") {
      if (value != "0") {
        setIPosition(3);
      } else {
        setIPosition(2);
      }
    }

    if (id == "OrderNo") {
      if (value == "") {
        setOrderNoList([
          {
            PlannedQty: "",
            ItemCode: "",
            Warehouse: "",
            ItemName: "",
            WhsName: "",
          },
        ]);
        return;
      }
      await EXEC_SQL(934, setOrderNoList, value);
    }
    console.log({ id, value });
  };
  const getDocEntry = async () => {
    if (OrderNo == "") return;
    if (BatchSizeNum == "") return;
    if (MnfDate == "") return;

    await EXEC_SQL_InsertOne(838, setRows, OrderNo, BatchSizeNum, MnfDate);
    await EXEC_SQL(934, setOrderNoList, OrderNo);
  };

  useEffect(() => {
    if (OrderNo == "") return;
    if (BatchSizeNum == "") return;
    if (MnfDate == "") return;
    getDocEntry();
  }, [OrderNo, BatchSizeNum, MnfDate]);
  useEffect(() => {
    if (rows.length == 0) return;
    if (rows[0].docEntry == undefined) return;
    setDocEntry(rows[0].docEntry);
  }, [rows]);

  const handleOption = (e) => {
    console.log({ OrderNoList });
    console.log(e.target.id);
    setTemp(OrderNoList[e.target.id]);
    setScanningShow(true);
  };
  const handleSelectedOption = (e) => {
    const { value, id, name } = e.target;
    const newMap = [...rows];
    newMap.splice(Number(id), 1);
    setRows(newMap);
  };
  const handlePostToifp = (e) => {
    const { value, id, name } = e.target;
    // SL_API_IFP(rows);
    console.log({ OrderNo });
  };
  const [headerResult, setHeaderResult] = useState([]);
  const PostPM = async (e) => {
    const { value, id, name } = e.target;
    const colsSQL = [
      {
        name: "DocEntry",
      },
      {
        name: "LineNum",
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
        name: "Void",
      },
      {
        name: "QUANTITY",
      },
    ];

    const x = rows.map((item) => {
      return {
        DocEntry: "@ID838",
        LineNum: item.linenum,
        ItemCode: item.PMCode,
        Batch: item.Batch,
        UoM: item.UoM,
        QUANTITY: item.Quantity,
        Void: "1",
      };
    });
    console.log({ x });
    let afterSQL = `
      declare @ID838 as varchar(5)  =0 
      SELECT @ID838 = id   FROM OIPM where po = ${OrderNo}	and batch = ${BatchSizeNum}and mnfDate = '${MnfDate}'
      if(@ID838 = 0 ) begin 
        INSERT INTO OIPM
              (CreatedDate	,CreatedBy	,Po		,Batch,MnfDate,void)
        VALUES(@NOW		,${userInfo.ID},		${OrderNo}	,${BatchSizeNum},'${MnfDate}',1) 
        SELECT @ID838 = @@IDENTITY   
     end 
     SELECT @ID838 ID
     update IPM1 set void = 0 where DocEntry =  @ID838
     `;
    await EXEC_SQL_InsertMulti_V2(
      884,
      setHeaderResult,
      colsSQL,
      x,
      "IPM1",
      afterSQL
    );

    alert("Document Updated!");
  };
  const foo = async () => {
    EXEC_SQL_InsertOne(933, setTemp, qrInfo.data, qrInfo.type);
    qrInfo.data = "";
  };
  useEffect(() => {
    if (qrInfo.data != "") foo();
  }, [qrInfo.data]);

  useEffect(() => {
    if (Temp.length > 0) setScanningShow(true);
  }, [Temp]);
  useEffect(() => {}, []);

  //  when click update on history
  const [isForUpdate, setisForUpdate] = useState(false);
  const ifIsForUpdateTrue = () => {
    setTab(1);
  };
  useEffect(() => {
    if (isForUpdate) ifIsForUpdateTrue();
  }, [isForUpdate]);

  return (
    <div>
      <div className="">
        <div className=" flex  mt-2  frame ">
          <div className="flex   w-full ">
            <DefButton
              onClick={handleTabs}
              className="mt-2 h-fit w-fit px-2 mb-2 whitespace-nowrap mx-1"
              text="RM"
              id={"1"}
              type={tab == "1" ? "2" : "2B"}
            />
            <p className="font-bold">.</p>
            <DefButton
              onClick={handleTabs}
              className="mt-2 h-fit w-fit  px-2 mb-2 mx-1"
              text="History"
              id={"3"}
              type={tab == "3" ? "2" : "2B"}
            />
            <div className="w-full"></div>
            <DefButton
              className="ml-4 mt-2 h-fit w-fit mr-2 px-2 mb-2 whitespace-nowrap mx-1 float-right"
              text="Scan"
              disabled={disscan}
              type={disscan ? "6" : undefined}
              onClick={handleScanned}
            />
          </div>
        </div>
      </div>
      {tab == 1 && (
        <>
          <div className="">
            {/* <TimeLineMaped map={Timelines} currentPosition={iPosition} /> */}
          </div>
          <div className="frame pb-2">
            <div className="tablet:grid grid-cols-4 gap-x-2 py-2 ">
              {components.map((item, index) => (
                <div className={`col-span-${item.colspan} `} key={index}>
                  <DefInput
                    label={item.id + "-" + iPosition}
                    id={item.id}
                    clearid={item.id}
                    type={isForUpdate ? undefined : item.type}
                    dropDownId={isForUpdate ? undefined : item.dropDownId}
                    handler={handler}
                    disabled={
                      item.id == "ProrationType"
                        ? false
                        : item.id == "OrderNo" && iPosition >= 1
                        ? false
                        : item.id == "Batch" && iPosition >= 2
                        ? false
                        : item.disabled
                    }
                    value={
                      item.id == "PlannedQuantity"
                        ? OrderNoList.length > 0
                          ? OrderNoList[0].PlannedQty
                          : ""
                        : item.id == "ProductNo"
                        ? OrderNoList.length > 0
                          ? OrderNoList[0].ItemCode
                          : ""
                        : item.id == "ProductDesc"
                        ? OrderNoList.length > 0
                          ? OrderNoList[0].ItemName
                          : ""
                        : item.id == "WarehouseCode"
                        ? OrderNoList.length > 0
                          ? OrderNoList[0].Warehouse
                          : ""
                        : item.id == "WarehouseName"
                        ? OrderNoList.length > 0
                          ? OrderNoList[0].WhsName
                          : ""
                        : item.id == "Batch"
                        ? BatchSizeNum
                        : item.id == "Mnf"
                        ? MnfDate
                        : item.id == "DocEntry"
                        ? DocEntry
                        : item.id == "ProrationType"
                        ? Proration
                        : item.id == "OrderNo"
                        ? OrderNo
                        : ""
                    }
                    map={item.id == "OrderNo" ? orderNoMap : undefined}
                  />
                  {item.label == "Station" ? <div></div> : ""}
                </div>
              ))}
            </div>
          </div>
          <div className="frame mt-3">
            <p className="-m-0 p-0">Available Items For Scanning</p>
          </div>
          <div className="frame overflow-auto">
            <DefTable
              columns={columns}
              rows={OrderNoList}
              btnLabel="Select"
              spanCSS="w-full"
              className=""
              handleOption={handleOption}
            />
          </div>

          <div className="frame  mb-0 mt-4 ">
            <p>Selected Batches</p>
          </div>
          <div className="frame ">
            <div className="overflow-auto">
              <DefTable
                columns={columns2}
                rows={rows}
                btnLabel="Remove"
                spanCSS="w-full"
                className=""
                handleOption={handleSelectedOption}
              />
            </div>
            {rows.length > 0 && (
              <DefButton
                type="2B"
                className="w-fit px-2 float-right "
                text="Post as IFP"
                onClick={PostPM}
              />
            )}
          </div>
          {ScanningShow ? (
            <MaterialUsagePmScanSelectection
              showme={setScanningShow}
              map={Temp}
              secRow={setRows}
              setScanningShow={setScanningShow}
            />
          ) : (
            ""
          )}
        </>
      )}

      {tab == 3 && (
        <MaterialUsagePMHistory2
          setisForUpdate={setisForUpdate}
          setOrderNo={setOrderNo}
          setBatchSizeNum={setBatchSizeNum}
          setMnfDate={setMnfDate}
          setProration={setProration}
        />
      )}
    </div>
  );
}
