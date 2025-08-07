import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  QrcodeIcon,
} from "@heroicons/react/outline";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import { Tab } from "@headlessui/react";
import {
  ConfirmButton,
  ConfirmButtonSM,
  DefaultButtonStyle,
  DefaultButtonStyleNullified,
  DefaultFontStypex,
  delay,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  HandleItemRemove,
  Kbd,
} from "./ComponentList";
import { Button, Dropdown } from "bootstrap";
import { DropdownButton } from "react-bootstrap";
import UsageMasterNtss from "./UsageMasterNtss";

export default function UsageSlipMaster() {
  const cssTH =
    "font-semibold text-mainText border-2 border-gray-900 px-2 py-1 text-left";
  const cssTD =
    "text-mainText border-2 border-gray-900 px-1   whitespace-nowrap";
  let icoutn = 0;
  const [HeaderInfo, setHeaderInfo] = useState({
    ProrationType: "",
    Revision: "",
    Size: "",
  });

  const { setPop, setpopLabel, setpopTitle, settoastMsg, settoastVisible } =
    useContext(ITopContext);

  const [selectedOption, SetselectedOption] = useState(0);
  const [ProrationList, SetProrationList] = useState([]);
  const [SelectedMaterial, SetSelectedMaterial] = useState([]);
  const [selectedItemsForaddition, SetselectedItemsForaddition] = useState([]);
  const [Revision, SetRevision] = useState([]);
  const [Size, SetSize] = useState([]);
  const [ShowOption, SetShowOption] = useState(false);
  const [ShowSearch, SetShowSearch] = useState(false);
  const [SearchText, SetSearchText] = useState("");
  const [ItemList, setItemList] = useState([]);
  const [newProration, setnewProration] = useState(false);
  const [newRevision, setnewRevision] = useState(false);
  const [newSize, setnewSize] = useState(false);
  const [ProrationAddMsg, setProrationAddMsg] = useState("");
  const isearchChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    SetSearchText(value);
  };
  const newProcTypeHandler = async () => {
    console.log(HeaderInfo.ProrationType);
    if (!HeaderInfo.ProrationType === "") {
      await EXEC_SQL_InsertOne(
        26,
        setProrationAddMsg,
        HeaderInfo.Revision,
        HeaderInfo.ProrationType
      );

      await EXEC_SQL(7, SetProrationList, "");
      console.log(HeaderInfo.ProrationType);
      EXEC_SQL(22, SetRevision, HeaderInfo.ProrationType);
      setnewRevision(false);
      console.log(HeaderInfo.ProrationType);
    }
  };

  const InsertUsageSlip = async () => {
    const iInsertUsageSlip = await fetch("insertUsageMaster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        MaterialList: SelectedMaterial,
        HeaderInfo: HeaderInfo,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        setpopTitle("Error");
        setpopLabel(
          "Please make sure you are connected to the internet and please check inputs"
        );
        setPop(true);
        return;
      });
    setpopTitle("Error");
    setpopLabel(
      "Please make sure you are connected to the internet and please check inputs"
    );
    setPop(true);
  };

  const HandleHeadersOnchange = async (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setHeaderInfo((p) => ({ ...p, [name]: value }));
  };

  const HandleMaterialListSelection = async (a, b, c) => {
    if (SelectedMaterial.length === 0) {
      icoutn = 1;
    } else {
      icoutn = SelectedMaterial[SelectedMaterial.length - 1].id + 1;
    }
    // SelectedMaterial.map((e) => (icoutn = icoutn + 1));
    SetSelectedMaterial((p) => [
      ...p,
      {
        id: icoutn,
        itemcode: a,
        itemname: b,
        qty: 0,
        adj: 0,
        uom: c,
      },
    ]);
  };
  const HandleQtyAdjChange = async (e) => {
    const { name, value, id } = e.target;
    const newState = SelectedMaterial.map((n) => {
      if (id == n.id) {
        const toInsert = { ...n, [name]: parseFloat(value) };
        return toInsert;
      } else {
        return n;
      }
    });
    console.log({ newState });
    SetSelectedMaterial(newState);
    console.log({ newState });
  };

  const HandleHeaders = async (e) => {
    console.log(Revision);
    const { name, value } = e.target;
    console.log({ name, value });

    if (value == "NEW") {
      SetRevision([
        {
          Revision: "",
          ID: "",
        },
      ]);
      return;
    }
    console.log({ name, value });
    setHeaderInfo((p) => ({ ...p, [name]: value }));
    if (name === "ProrationType") {
      SetRevision([]);
      await delay(100);

      await EXEC_SQL(22, SetRevision, value);
    }
    if (name === "Revision") EXEC_SQL(23, SetSize, value);
  };
  useEffect(() => {
    EXEC_SQL(7, SetProrationList, "");
  }, []);
  useEffect(() => {
    if (HeaderInfo.ProrationType !== "" && !isNaN(HeaderInfo.ProrationType))
      EXEC_SQL(22, SetRevision, HeaderInfo.ProrationType);
    // alert(HeaderInfo.ProrationType);
  }, [HeaderInfo.ProrationType]);

  return (
    <>
      <>
        <div className="w-full mt-7">
          <div>
            {newProration ? (
              <div className="mb-2">
                <label
                  for="username"
                  className="block text-sm font-medium text-mainText"
                >
                  New Proration Type
                </label>
                <div className="flex">
                  <input
                    text="text"
                    onChange={HandleHeadersOnchange}
                    id="ProrationType"
                    name="ProrationType"
                    className=" block w-full appearance-none rounded-md   px-3 py-1 text-mainText placeholder-gray-400  outline-none "
                  ></input>
                  <button
                    type="button"
                    onClick={async () => {
                      await EXEC_SQL_InsertOne(
                        25,
                        setProrationAddMsg,
                        HeaderInfo.ProrationType
                      );
                      await EXEC_SQL(7, SetProrationList, "");
                      setnewProration(false);
                    }}
                    className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="inline-flex w-full">
              <p className={DefaultFontStypex} style={{ width: "100%" }}>
                Proration Type
              </p>
              <button
                type="button"
                onClick={() => {
                  newProration ? setnewProration(false) : setnewProration(true);
                }}
                className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
              >
                {newProration ? (
                  <MinusIcon className="h-5 w-5  text-mainTextblack" />
                ) : (
                  <PlusIcon className="h-5 w-5  text-mainTextblack" />
                )}
              </button>
            </div>
            <select
              onChange={HandleHeaders}
              id="ProrationType"
              name="ProrationType"
              className="w-full bg-mainButton  appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0  "
            >
              {ProrationList.map((item) => (
                <option className="bg-mainButton text-mainText" value={item.ID}>
                  {item.PRORATIONTYPE}
                </option>
              ))}

              <option className="bg-main  " value="NEW">
                {/* Define new */}
              </option>
            </select>
          </div>
        </div>
        <div className="grow flex flex-row- gap-x-4 mt-4">
          <div className="w-1/2">
            {newRevision ? (
              <div className="mb-2">
                <label
                  for="username"
                  className="block text-sm font-medium text-mainText"
                >
                  New Revision Code
                </label>
                <div className="flex">
                  <input
                    text="text"
                    onChange={HandleHeadersOnchange}
                    id="Revision"
                    name="Revision"
                    className="  block w-full appearance-none rounded-md   px-3 py-1 text-mainText placeholder-gray-400  outline-none "
                  ></input>
                  <button
                    type="button"
                    onClick={newProcTypeHandler}
                    className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="inline-flex w-full">
              <p className={DefaultFontStypex} style={{ width: "100%" }}>
                Revision
              </p>
              <button
                type="button"
                onClick={() => {
                  newRevision ? setnewRevision(false) : setnewRevision(true);
                }}
                className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
              >
                {newRevision ? (
                  <MinusIcon className="h-5 w-5  text-mainTextblack" />
                ) : (
                  <PlusIcon className="h-5 w-5  text-mainTextblack" />
                )}
              </button>
            </div>
            <select
              onChange={HandleHeaders}
              id="Revision"
              name="Revision"
              className="w-full bg-mainButton  appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0  "
            >
              {Revision.length == 0
                ? ""
                : Revision.map((item) => (
                    <option
                      className="bg-mainButton text-mainText"
                      value={item.ID}
                    >
                      {item.Revision}
                    </option>
                  ))}
              <option className="bg-main  " value="">
                {/* Define new */}
              </option>
            </select>
          </div>
          <div className="w-1/2">
            {newSize ? (
              <div className="mb-2">
                <label
                  for="username"
                  className="block text-sm font-medium text-mainText"
                >
                  New Size Code
                </label>
                <div className="flex">
                  <input
                    text="text"
                    onChange={HandleHeadersOnchange}
                    id="Size"
                    name="Size"
                    className=" block w-full appearance-none rounded-md   px-3 py-1 text-mainText placeholder-gray-400  outline-none "
                  ></input>
                  <button
                    type="button"
                    onClick={async () => {
                      await EXEC_SQL_InsertOne(
                        27,
                        setProrationAddMsg,
                        HeaderInfo.ProrationType,
                        HeaderInfo.Revision,
                        HeaderInfo.Size
                      );
                      // await EXEC_SQL(7, SetProrationList, "");
                      // console.log(HeaderInfo.ProrationType);
                      await EXEC_SQL(23, SetSize, HeaderInfo.Revision);
                      setnewSize(false);
                    }}
                    className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="inline-flex w-full">
              <p className={DefaultFontStypex} style={{ width: "100%" }}>
                Size
              </p>
              <button
                type="button"
                onClick={() => {
                  newSize ? setnewSize(false) : setnewSize(true);
                }}
                className="float-right   inline-flex justify-center rounded-md   border-transparent  p-0.5 text-sm font-medium text-mainTextblack  bg-main"
              >
                {newSize ? (
                  <MinusIcon className="h-5 w-5  text-mainTextblack" />
                ) : (
                  <PlusIcon className="h-5 w-5  text-mainTextblack" />
                )}
              </button>
            </div>
            <select
              onChange={HandleHeaders}
              id="Size"
              name="Size"
              className="w-full bg-mainButton  appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0  "
            >
              {Size.map((item) => (
                <option className="bg-mainButton text-mainText" value={item.ID}>
                  {item.SIZE}
                </option>
              ))}
              <option className="bg-main  " value="">
                {/* Define new */}
              </option>
            </select>
          </div>
        </div>
      </>
      <div className="  w-full   ">
        <div className="mx-auto px-auto flex justify-center my-4 bg-mainButton w-fit rounded-full py-0.5 px-1">
          <button
            className={
              selectedOption == 0
                ? DefaultButtonStyle
                : DefaultButtonStyleNullified
            }
            onClick={() => {
              SetselectedOption(0);
            }}
          >
            Slip
          </button>

          <button
            className={
              selectedOption == 1
                ? DefaultButtonStyle
                : DefaultButtonStyleNullified
            }
            onClick={() => {
              SetselectedOption(1);
            }}
          >
            NTSS
          </button>
        </div>
      </div>

      {selectedOption == 0 ? (
        <>
          <Tab.Group>
            <Tab.List className="justify-center flex gap-4 mt-4 ">
              <div className="px-1 py-0.5 pt-0 bg-mainButton rounded-3xl">
                <Tab
                  className={({ selected }) =>
                    selected ? DefaultButtonStyle : DefaultButtonStyleNullified
                  }
                >
                  Usage Slip Master
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected ? DefaultButtonStyle : DefaultButtonStyleNullified
                  }
                >
                  Material List
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <table className="w-full  ">
                  <tr className="w-full">
                    <th className="font-semibold text-mainText  border-2 border-gray-900  px-2 py-1 text-left "></th>
                    <th className="font-semibold text-mainText border-2 border-gray-900 px-2 py-1 text-left  w-full">
                      ITEM
                    </th>
                    <th className="font-semibold text-mainText border-2 border-gray-900 px-2 py-1 text-left  w-full">
                      QTY
                    </th>
                    <th className="font-semibold text-mainText border-2 border-gray-900 px-2 py-1 text-left  w-full">
                      ADJ
                    </th>
                    {/* <th className="font-semibold text-mainText border-2 border-gray-900 px-2 py-1 text-left  w-full">
                            UOM
                          </th> */}
                  </tr>
                  {SelectedMaterial.map((item, index) => (
                    <>
                      {item.itemcode === "" ? (
                        <></>
                      ) : (
                        <tr className="" key={index}>
                          <td className=" text-mainText border-2  px-1 w-fit    border-gray-900">
                            <button
                              className="w-fit "
                              type="button"
                              onClick={() => {
                                HandleItemRemove(
                                  index,
                                  SetSelectedMaterial,
                                  SelectedMaterial
                                );
                                settoastMsg(
                                  `${item.itemcode} removed from list 🔥`
                                );
                                settoastVisible(true);
                              }}
                            >
                              {/* Remove */}❌
                            </button>
                          </td>
                          <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-full  ">
                            <div>
                              <div className="w-full  grow flex flex-row  ">
                                <span className="w-full">{item.itemcode}</span>
                                <span className="block float-right ">
                                  {/* {item.UoM} */}
                                </span>
                              </div>
                              <input
                                className="text-xs w-full px-1 bg-transparent "
                                value={item.itemname}
                                disabled="disabled"
                              ></input>
                            </div>
                          </td>
                          <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap  ">
                            <input
                              type="number"
                              className="w-20 rounded-md px-2"
                              name="qty"
                              autoComplete="qty"
                              defaultValue={item.qty}
                              id={item.id}
                              // value={item.Qty}
                              onChange={HandleQtyAdjChange}
                            ></input>
                          </td>

                          <td className=" text-mainText border-2 border-gray-900 px-1  py-0 whitespace-nowrap  ">
                            <input
                              type="number"
                              className="w-10 px-0.5 rounded-md"
                              name="adj"
                              autoComplete="adj"
                              defaultValue={item.adj}
                              id={item.id}
                              // value={item.Qty}
                              onChange={HandleQtyAdjChange}
                            ></input>
                          </td>
                          <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-full ">
                            {item.uom}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </table>
              </Tab.Panel>
              <Tab.Panel>
                <>
                  {/*   
              <div className="float-right pt-3">
                <button
                  type="button"
                  className={ConfirmButtonSM}
                  onClick={() => {
                    ShowOption ? SetShowOption(false) : SetShowOption(true);
                  }}
                >
                  <PencilIcon className="h-6 w-6  text-white" />
                </button>
              </div>
              <div className="float-right mt-14 mr-24 ">
                {ShowOption ? (
                  <>
                    <div className="row w-40 absolute mt-14 pt-2   ">
                      <button
                        className="text-black bg-white rounded-t-md"
                        onClick={() => {
                          //  onChange = { HandleHeaders };
                          //  id = "ProrationType";
                          //  name = "ProrationType";
                          SetShowSearch(true);
                          SetShowOption(false);
                        }}
                      >
                        Add Item
                      </button>
                      <button
                        className="text-black bg-white rounded-b-md"
                        onClick={() => {
                          // alert("asd");
                          SetShowOption(true);
                        }}
                      >
                        Remove Selected
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div> */}
                  <div className=" "></div>
                  <div className="grow flex-row flex bg-mainButton rounded-md mt-2">
                    <input
                      autoComplete="ValTraceQrCode"
                      onChange={isearchChange}
                      className="  block w-full appearance-none rounded-md  bg-transparent   px-3.5 py-1 text-mainText focus:border-0"
                    ></input>
                    <button
                      className="mr-2 text-mainText "
                      onClick={() => {
                        // alert(SearchText);
                        EXEC_SQL(24, setItemList, SearchText);
                        // EXEC_SQL(7, SetProratiyonList, "");
                      }}
                    >
                      Search
                    </button>
                  </div>

                  <div className=" h-96 overflow-auto">
                    <table className="w-full">
                      <tr className="w-full">
                        <th className={cssTH}></th>
                        <th className={cssTH}>ITEMCODE</th>
                        <th className={cssTH}>ITEMNAME</th>
                        <th className={cssTH}>UOM</th>
                      </tr>

                      {ItemList.map((item, index) => (
                        <tr
                          className=""
                          onClick={async () => {
                            await HandleMaterialListSelection(
                              item.itemcode,
                              item.ItemName,
                              item.Uom
                            );
                            await HandleItemRemove(
                              index,
                              setItemList,
                              ItemList
                            );
                            settoastMsg(`${item.itemcode} added to list 🛒`);
                            settoastVisible(true);
                          }}
                        >
                          <td className={cssTD}>
                            <button className="">➕</button>
                          </td>
                          <td className={cssTD}>{item.itemcode}</td>
                          <td className={cssTD}>
                            <input
                              className="bg-transparent w-full"
                              value={item.ItemName}
                            ></input>
                          </td>
                          <td className={cssTD}>{item.Uom}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
            <button
              type="button"
              className={ConfirmButton}
              onClick={async () => {
                // console.log({ HeaderInfo });
                await InsertUsageSlip();
              }}
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        ""
      )}

      {selectedOption == 1 ? (
        <UsageMasterNtss
          Proration={HeaderInfo.ProrationType}
          Revision={HeaderInfo.Revision}
          Size={HeaderInfo.Size}
        />
      ) : (
        ""
      )}
    </>
  );
}
