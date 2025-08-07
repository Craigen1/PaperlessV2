import React, { Component, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";
import {
  cssTH,
  delay,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  InputStyleBox,
  Label,
  PageHeader,
  smalBtn,
  UserInfoForPost,
} from "./ComponentList";

export default function MaterialUsage(props) {
  const { setPopScannerModal, qrInfo, setQrInfo, userInfo } =
    useContext(ITopContext);

  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [prorationList, setProrationList] = useState([]);
  const [stationList, setstationList] = useState([]);
  const [SelectedScannedItem, setSelectedScannedItem] = useState([]);
  const [Size, setSize] = useState([]);
  const [SizeLoad, setSizeLoad] = useState(false);
  const [usagemax, setUsagemax] = useState(0);
  const dateToday = new Date().toISOString().substring(0, 10);
  const [ScannedList, setScannedList] = useState([
    {
      BarCode: "",
      ItemCode: "",
      ItemName: "",
      Qty: 0,
      UoM: "",
      Batch: "",
    },
  ]);
  useEffect(() => {
    setScannedList([
      {
        BarCode: "",
        ItemCode: "",
        ItemName: "",
        Qty: 0,
        UoM: "",
        Batch: "",
      },
    ]);
  }, []);

  const [ScannedListB, setScannedListB] = useState([
    {
      BarCode: "",
      ItemCode: "",
      ItemName: "",
      Qty: 0,
      UoM: "",
      Batch: "",
    },
  ]);

  const [SetSchema, setSetSchema] = useState({
    allocationNumber: 1,
    status: "Open",
    postingDate: dateToday,
    productionDate: dateToday,
    prorationType: "",
    materialType: "",
    size: "",
  });
  const schemaOnChange = async (e) => {
    const { name, value } = e.target;
    setSetSchema((e) => ({ ...e, [name]: [value] }));
    console.log({ name, value });
    setSizeLoad(true);
    await delay(1000);
    if (name === "prorationType") await EXEC_SQL(29, setSize, value);
    setSizeLoad(false);
  };
  const getStationList = async () => {
    await EXEC_SQL(32, setstationList);
  };

  const HandleUsage = (e) => {
    if (e.target.value != "") {
      console.log(e.target);

      if (parseFloat(e.target.value) < parseFloat(e.target.min)) {
        e.target.value = e.target.min;
      }
      if (parseFloat(e.target.value) > usagemax) {
        e.target.value = e.target.max;
      }
      setScannedList((xe) => [
        {
          BarCode: ScannedList[0].BarCode,
          ItemCode: ScannedList[0].ItemCode,
          ItemName: ScannedList[0].ItemName,
          Qty: parseFloat(e.target.value),
          UoM: ScannedList[0].UoM,
          Batch: ScannedList[0].Batch,
        },
      ]);
      console.log(e.target.value);
    }
  };
  useEffect(() => {
    getStationList();
  }, []);

  // >>> Scanner Handler
  const [ShowScanedInfo, setShowScanedInfo] = useState(false);
  const getScannedItem = async () => {
    await EXEC_SQL(35, setScannedListB, qrInfo.data);
    setQrInfo({ type: "", data: "" });
    // await EXEC_SQL(35, setScannedListB, "W604");
  };

  const iReduce = async () => {
    let actCounterPerBarCode = 0;

    SelectedScannedItem.map((item, index) => {
      if (
        item.ItemCode === ScannedListB[0].ItemCode &&
        item.BarCode === ScannedListB[0].BarCode
      ) {
        actCounterPerBarCode += parseFloat(item.Qty);
        console.log("sadasd");
      }
    });
    // await delay(500);

    console.log({ actCounterPerBarCode });
    const newS = ScannedListB.map((item, index) => {
      console.log(index);
      console.log({ item });
      if (Number(item.Qty - parseFloat(actCounterPerBarCode)).toFixed(3) <= 0) {
        const newData = {
          ...item,
          Qty: 0,
        };
        console.log("A");
        console.log({ newData });
        return newData;
      } else {
        console.log({ actCounterPerBarCode });

        const newData = {
          ...item,
          Qty: Number(item.Qty - parseFloat(actCounterPerBarCode)).toFixed(3),
        };
        setUsagemax(
          Number(item.Qty - parseFloat(actCounterPerBarCode)).toFixed(3)
        );
        console.log("B");
        console.log({ newData });
        return newData;
      }
    });
    console.log({ newS });
    setScannedList(newS);
    setloading(false);

    actCounterPerBarCode = 0;
  };
  useEffect(() => {
    iReduce();
  }, [ScannedListB]);

  useEffect(() => {
    if (qrInfo.data == "") return;
    setloading(true);
    getScannedItem();
    setShowScanedInfo(true);
  }, [qrInfo.data]);
  useEffect(() => {
    EXEC_SQL(28, setProrationList);
  }, []);

  // end of >>> Scanner Handler

  return (
    <div className="px-2">
      <h1 class="text-2xl font-bold text-mainText  ">Marerial Usage</h1>

      <UserInfoForPost userInfo={userInfo} />

      {/* <PageHeader text="Page Header" /> */}
      <div className="grow flex flex-row- gap-x-4 mt-2">
        <div className="w-1/2">
          <Label text="Allocation Number" />
          <div className={InputStyleBox}>
            <input
              id="DocNum"
              name="DocNum"
              disabled="true"
              value={SetSchema.allocationNumber}
              className="w-full bg-transparent"
            ></input>
          </div>
        </div>
        <div className="w-1/2">
          <Label text="Status" />
          <div className={InputStyleBox}>
            <input
              id="status"
              name="status"
              value={SetSchema.status}
              disabled="true"
              className="w-full bg-transparent"
            ></input>
          </div>
        </div>
      </div>

      <div className="grow flex flex-row- gap-x-4 mt-4">
        {/* <div className="w-1/2">
          <Label text="Posting Date" />
          <div className={InputStyleBox}>
            <input
              id="postingDate"
              name="postingDate"
              type="date"
              disabled="true"
              value={SetSchema.postingDate}
              className="w-full bg-transparent"
            ></input>
          </div>
        </div> */}

        <div className="w-1/2">
          <div className="flex w-full ">
            <div className="w-full">
              <Label text="Production Date" />
            </div>
          </div>
          <div className={InputStyleBox}>
            <input
              id="productionDate"
              name="productionDate"
              type="date"
              disabled="true"
              value={SetSchema.productionDate}
              className="w-full bg-transparent"
            ></input>

            <input
              id="productionDate"
              name="productionDate"
              type="date"
              onChange={schemaOnChange}
              className="w-10 bg-transparent text-transparent"
            ></input>
          </div>
        </div>
        <div className="w-1/2">
          <Label text="Proration Type" />
          <div className={InputStyleBox}>
            <select
              id="prorationType"
              name="prorationType"
              className="w-full bg-transparent"
              onChange={schemaOnChange}
            >
              <option value="" className="bg-black"></option>

              {prorationList.map((item, index) => (
                <option value={item.Code} className="bg-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grow flex flex-row- gap-x-4 mt-4">
        <div className="w-1/2 pr-1.5">
          <div className="flex">
            <Label text="Size(G)" />
            <div className="-mt-1 ml-2">
              {SizeLoad ? <LoadingSpinner /> : <></>}
            </div>
          </div>
          <div className={InputStyleBox}>
            <select
              id="size"
              name="size"
              className="w-full bg-transparent"
              disabled={SizeLoad}
            >
              {Size.map((item, index) => (
                <option className="bg-black" value="PM">
                  {item.Size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-1/2">
          <Label text="Station" />
          <div className={InputStyleBox}>
            <select
              id="Station"
              name="Station"
              className="w-full bg-transparent"
              // onChange={schemaOnChange}
            >
              <option value="default"></option>

              {stationList.map((item, index) => (
                <option className="bg-black" value={item.Code}>
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grow flex flex-row- gap-x-4 my-4"></div>

      <div className="overflow-auto">
        <div className="float-right">
          <button
            className={smalBtn}
            onClick={() => {
              setPopScannerModal(true);
            }}
          >
            <div className="float-right m-1">📷 Scan M+aterial </div>
          </button>
          {/* <button
            className={smalBtn + " bg-gray-710"}
            onClick={() => {
              let totalOnItem = 0;

              // EXEC_SQL_InsertOne(35, setScannedList, "W604");
              getScannedItem();
              setShowScanedInfo(true);
            }}
          >
            <div className="float-right">📷 Scan Material WEB </div>
          </button> */}
        </div>
        <table className="w-full mb-5">
          <tr className="w-full">
            <th className={cssTH}>Item</th>
            <th className={cssTH}>Usage</th>
            <th className={cssTH}>Batch</th>
          </tr>

          {SelectedScannedItem.map((item, index) => (
            <tr className="" key={index}>
              <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-fit  ">
                <div>
                  <div className="w-full grow flex flex-row  ">
                    <span className="w-full">{item.ItemCode}</span>
                    <span className="block float-right ">{item.UoM}</span>
                  </div>
                  <input
                    className=" w-full px-1 bg-transparent "
                    value={item.ItemName}
                    disabled="disabled"
                  ></input>
                </div>
              </td>
              <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap  ">
                <span className="w-full">{item.Qty}</span>
              </td>

              <td className=" text-mainText border-2 border-gray-900 px-1  py-0 whitespace-nowrap  ">
                <span className="w-full">{item.Batch}</span>
                <br></br>
                <span className="w-full">{item.BarCode}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div>
        {ShowScanedInfo ? (
          <>
            <div className=" w-full h-full z-50 fixed top-0 left-0 ">
              <div className="bg-mainButton h-72  mx-8 mt-36 p-2 rounded-md">
                <button
                  className={smalBtn + " float-right"}
                  onClick={() => {
                    setShowScanedInfo(false);
                  }}
                >
                  <div className="float-right">❌ Esc </div>
                </button>
                <div className="w-full px-1 mt-2">
                  <Label text="Item" />
                  <div className={InputStyleBox}>
                    <input
                      id="item"
                      name="item"
                      disabled="true"
                      value={
                        ScannedList[0] != undefined
                          ? ScannedList[0].ItemCode +
                            " - " +
                            ScannedList[0].ItemName
                          : ""
                      }
                      className="w-full bg-transparent"
                    ></input>
                  </div>
                </div>
                <div className="grow flex flex-row- gap-x-4 mt-2">
                  <div className="w-1/5">
                    <Label text="UoM" />
                    <div className={InputStyleBox}>
                      <input
                        id="UoM"
                        name="UoM"
                        value={ScannedList[0].UoM}
                        disabled="true"
                        className="w-full bg-transparent"
                      ></input>
                    </div>
                  </div>
                  <div className="w-full pr-1.5">
                    <Label text="Batch" />
                    <div className={InputStyleBox}>
                      <input
                        id="Batch"
                        name="Batch"
                        disabled="true"
                        value={ScannedList[0].Batch}
                        className="w-full bg-transparent"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="grow flex flex-row">
                  <div className="w-4/5">
                    <Label text="Usage" />
                    <div className={InputStyleBox}>
                      <input
                        type="number"
                        id="Usage"
                        name="Usage"
                        // defaultValue={ScannedList[0].Qty}
                        Value={ScannedList[0].Qty}
                        max={usagemax}
                        step={0.1}
                        min="0"
                        className=" bg-transparent h-14 text-5xl w-full"
                        onChange={(e) => {
                          HandleUsage(e);
                        }}
                      ></input>
                    </div>
                  </div>
                  {loading ? (
                    <></>
                  ) : (
                    <>
                      <div className="w-2/5  self-end items-center mt-1 pt-2">
                        <button
                          className={smalBtn + " float-right"}
                          onClick={() => {
                            setShowScanedInfo(false);
                          }}
                        >
                          <div className="float-right w-24">
                            ❌
                            <span className="whitespace-nowrap">
                              Clear Usage
                            </span>
                          </div>
                        </button>
                        <button
                          className={smalBtn + " float-right"}
                          onClick={() => {
                            setShowScanedInfo(false);
                            setSelectedScannedItem((e) => [
                              ...e,
                              ...ScannedList,
                            ]);
                            setScannedList((xe) => [
                              {
                                BarCode: ScannedList[0].BarCode,
                                ItemCode: ScannedList[0].ItemCode,
                                ItemName: ScannedList[0].ItemName,
                                Qty: 0,
                                UoM: ScannedList[0].UoM,
                                Batch: ScannedList[0].Batch,
                              },
                            ]);
                          }}
                        >
                          <div className="float-right  w-24   ">
                            ✔️ <br></br>
                            <span className="whitespace-nowrap">Add Usage</span>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="fixed left-0 bottom-3  items-center justify-center flex w-full">
        <button className={smalBtn} onClick={async () => {}}>
          <div className="mx-2 my-2">🚀 Transfer xl</div>
        </button>
      </div>
    </div>
  );
}
