import React, { useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  DefaultFontStype,
  DefaultButtonStyle,
  DefaultButtonStyleNullified,
  ConfirmButton,
  NoteInfo,
  Label,
  EXEC_SQL_InsertOne,
  smalBtn,
  EXEC_SQL,
  UserInfoForPost,
} from "./ComponentList";
import UsageSlipHistory from "./UsageSlipHistory";
import Pager from "./Pager";
export default function UsageSlip() {
  const [loading, setLoading] = useState(false);
  const [stationList, setstationList] = useState([]);
  const [machine, setmachine] = useState([]);
  const [Total, setTotal] = useState(0);
  const [NoteDetails, setNoteDetails] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });
  const [prorationLoading, setProrationLoading] = useState(false);
  const [RevisionLoad, setRevisionLoad] = useState(false);
  const [SetSizeLoad, setSetSizeLoad] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);
  const DefaultFontStypex = DefaultFontStype + "-p-0 -m-0";
  const [ratio, setRatio] = useState(0);
  const Datenw = new Date();
  const ProrationInist = { ID: 0, PRORATIONTYPE: "" };
  const RevisionInist = { ID: 0, REVISION: "" };
  const SizeInist = { ID: 0, SIZE: "" };
  const [itemSearchText, setitemSearchText] = useState("");
  const BomInitailState = {};
  const {
    setSelectedPOnumInfo,
    userInfo,
    setPopLoadBol,
    setPop,
    setpopLabel,
    setpopTitle,
    setResetModule,
    PageNpagination,
    setPageCount,
    setSearchParam,
    SelectedPage,
    setSelectedPage,

    settoastMsg,
    settoastVisible,
  } = useContext(ITopContext);
  const [NTSSVer, setNTSSVer] = useState([]);

  const [SearchedItemsList, setSearchedItemsList] = useState([]);
  const [ProrationType, setProrationType] = useState({ CODE: "", NAME: "" });
  const [Revision, setRevision] = useState({ CODE: "", NAME: "" });
  const [Size, setSize] = useState({ CODE: "", NAME: "" });
  const [HeaderInfo, setHeaderInfo] = useState({
    REMARKS: "",
    BATCH: "",
    STATION: "",
    MNFDATE: Datenw.toISOString().substring(0, 10),
    NTSSVer: "",
    NTSS: "",
  });
  const getStationList = async () => {
    await EXEC_SQL(32, setstationList);
    await EXEC_SQL(50, setmachine);
  };
  const HeaderHandler = (e) => {
    const { name, value } = e.target;
    console.log({ name });
    console.log({ value });
    console.log(HeaderInfo.NTSSVer);
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

  const [NTSSlistSolidAndWater, setNTSSlistSolidAndWater] = useState([
    {
      NTSSperc: 0,
      Paste: 0,
      Water: 0,
    },
  ]);
  const [NTSSlist, setNTSSlist] = useState([]);
  const [Bom, setBom] = useState([BomInitailState]);
  const [Volume, setVolume] = useState(0);
  // const [BATCH, setBATCH] = useState("");

  const [PorationList, setPorationList] = useState([ProrationInist]);
  const [RevesionList, setRevesionList] = useState([RevisionInist]);
  const [SizeList, SetSizeList] = useState([SizeInist]);
  const removeBom = async (index) => {
    const holderBom = Bom;
    setBom([BomInitailState]);
    // await delay(500);
    setBom(holderBom.filter((o, i) => i !== index));
    // console.log(Bom.filter((1, index)));
  };

  const getSearched = async () => {
    await EXEC_SQL_InsertOne(
      30,
      setSearchedItemsList,
      itemSearchText,
      SelectedPage,
      PageNpagination.PageRowCount
    );
  };
  const getSearchedSearched = async () => {
    await EXEC_SQL_InsertOne(
      30,
      setSearchedItemsList,
      itemSearchText
      // 1,
      // PageNpagination.PageRowCount
    );
  };

  const UpdateTabInput = (val, ROWx) => {
    try {
      const { name, value, id } = val.target;
      console.log(name, value, id);
      const newState = Bom.map((item) => {
        if (parseInt(item.ROW) == parseInt(id)) {
          const newData = { ...item, [name]: parseFloat(value) };
          return newData;
        } else {
          return item;
        }
      });
      //console.log(newState);
      setBom(newState);
      console.log({ newState });
      setTotal(
        newState.reduce(
          (p, c, i) => p + (parseFloat(c.Qty) + parseFloat(c.adj)),
          0
        )
      );
    } catch (error) {
      //console.log(error);
    }
  };
  const addBom = (i) => {
    try {
      setBom((e) => [
        ...e,
        {
          ROW: Bom.length,
          ItemCode: i.ItemCode,
          ItemName: i.ItemName,
          Qty: 0,
          adj: 0,
          UoM: i.InvntryUom,
        },
      ]);
    } catch (error) {
      console.log({ error });
    }
  };

  const GetProrationList = async () => {
    try {
      const iProrationList = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "7",
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          // setpopTitle("Connection Error");
          // setpopLabel("Please make sure you are connected to the internet");
          // setPop(true);

          setNoteDetails({
            body: "Please make sure you are connected to the internet and please check inputs",
            title: "Connection Error",
            type: "e",
            visible: true,
          });
          //setPopLoadBol(false);
          return;
        });
      setPorationList(iProrationList);
      ////console.log(iProrationList);
    } catch (error) {}
  };
  const GetSize = async (ProrationCode, RevisionCode) => {
    try {
      //setPopLoadBol(true);
      console.log({ ProrationCode, RevisionCode });
      const iGetPoBom = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "15",
          TYPEENTRY: ProrationCode,
          REVENTRY: RevisionCode,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          // setpopTitle("Connection Error");
          // setpopLabel("Please make sure you are connected to the internet");
          // setPop(true);

          setNoteDetails({
            body: "Please make sure you are connected to the internet",
            title: "Connection Error",
            type: "e",
            visible: true,
          });
          //setPopLoadBol(false);
          setRevisionLoad(false);
          return;
        });
      // //console.log(iGetPoBom);
      SetSizeList(iGetPoBom);
      setRevisionLoad(false);
      return;
      //setPopLoadBol(false);
    } catch (error) {}
  };

  useEffect(() => {
    EXEC_SQL_InsertOne(
      42,
      setNTSSVer,
      ProrationType.CODE,
      Revision.CODE,
      Size.CODE
    );
  }, [Size]);
  const GetPoBom = async (SizeCode) => {
    setBom([BomInitailState]);

    try {
      //setPopLoadBol(true);
      const iGetPoBom = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "8",
          TYPEENTRY: ProrationType.CODE,
          REVENTRY: Revision.CODE,
          SIZE: SizeCode,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          // setpopTitle("Connection Error");
          // setpopLabel("Please make sure you are connected to the internet");
          // setPop(true);

          setNoteDetails({
            body: "Please make sure you are connected to the internet and please check inputs",
            title: "Connection Error",
            type: "e",
            visible: true,
          });
          //setPopLoadBol(false);
          setProrationLoading(false);

          return;
        });
      // //console.log(iGetPoBom);
      setBom(iGetPoBom);
      setProrationLoading(false);
      setTotal(iGetPoBom.reduce((p, c, i) => p + parseFloat(c.Qty), 0));

      return;
      //setPopLoadBol(false);
    } catch (error) {}
  };

  const GetRevision = async (RevisionCode) => {
    try {
      //setPopLoadBol(true);
      const iGetPoBom = await fetch("EXEC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "14",
          DOCNUM: RevisionCode,
        }),
      })
        .then((res) => res.json())
        .catch(() => {
          // setpopTitle("Connection Error");
          // setpopLabel("Please make sure you are connected to the internet");
          // setPop(true);

          setNoteDetails({
            body: "Please make sure you are connected to the internet and please check inputs",
            title: "Connection Error",
            type: "e",
            visible: true,
          });

          setProrationLoading(false);
          return;
        });

      setRevesionList(iGetPoBom);
      setProrationLoading(false);

      return;
    } catch (error) {}
  };

  const Resetx = () => {
    setBom([BomInitailState]);
    setProrationType({ CODE: "", NAME: "" });
    // setpopTitle("Document Posted");
    // setpopLabel("Document Posted Successfully");

    setNoteDetails({
      body: "Usage Posted",
      title: "Document Posted Successfully",
      type: "s",
      visible: true,
    });

    setHeaderInfo({ BATCH: "", STATION: "", MNFDATE: "" });
    // setPop(true);
  };

  useEffect(() => {
    getStationList();
  }, []);

  useEffect(() => {
    // console.log("used effectedsxsad");
    getSearched();
  }, [SelectedPage]);

  useEffect(() => {
    setSelectedPOnumInfo({
      DocNum: "",
      ItemCode: "",
      ItemName: "",
    });
    if ((PorationList.length = 1)) {
      try {
        GetProrationList();
      } catch (error) {
        //console.log(error);
      }
    }
    return;
  }, []);
  // useEffect(() => {
  //   if (ProrationType !== "") {
  //     GetPoBom();
  //   }

  //   // //console.log("useEffect SelectedPOnumInfo.DocNum");
  // }, [ProrationType]);
  const InsertUsageSlip = async () => {
    let lethasError = false;
    if (
      HeaderInfo.MNFDATE.length === 0 ||
      HeaderInfo.BATCH.length === 0 ||
      HeaderInfo.STATION.length === 0 ||
      HeaderInfo.Machine.length === 0
    ) {
      lethasError = true;
      console.log(
        HeaderInfo.MNFDATE.length +
          " " +
          HeaderInfo.BATCH.length +
          " " +
          HeaderInfo.STATION.length
      );

      // setPop(true);
      setNoteDetails({
        body: "🚨Required Field [BATCH] [Station]  [Machine] [Mnfdate] or renew the fields ",
        title: "Required Field",
        type: "e",
        visible: true,
      });
      setPopLoadBol(false);
      setLoading(false);
      return;
    }

    console.log("X");
    let totalUsage = 0;
    try {
      Bom.map((item) => {
        totalUsage += item.Qty;
        // console.log({ item });
      });
    } catch (error) {
      //console.log(error);
    }
    console.log("XX");

    if (totalUsage === 0) {
      setpopTitle("⚠️ Zero usage!");
      setpopLabel("🚨 Please input a usage!");
      setPop(true);
      setPopLoadBol(false);
      setLoading(false);
      lethasError = true;
      return;
    }
    if (lethasError) return;
    const iInsertUsageSlip = await fetch("InsertUsage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        BOM: Bom,
        PRORTYPE: ProrationType.CODE,
        VOLUME: Volume,
        BATCH: HeaderInfo.BATCH,
        REMARKS: HeaderInfo.REMARKS,
        STATION: HeaderInfo.STATION,
        Machine: HeaderInfo.Machine,
        Size: Size.CODE,
        Revision: Revision.CODE,
        NTSSVer: HeaderInfo.NTSSVer,
        NTSS: NTSSlistSolidAndWater[0].NTSSperc,
        NTSSSolid: NTSSlistSolidAndWater[0].Paste,
        NTSSWaer: NTSSlistSolidAndWater[0].Water,
        USERID: userInfo.ID,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        // setpopTitle("Error");
        // setpopLabel(
        //   "Please make sure you are connected to the internet and please check inputs"
        // );
        // setPop(true);
        // setPopLoadBol(false);

        setNoteDetails({
          body: "Please make sure you are connected to the internet and please check inputs",
          title: "Error",
          type: "e",
          visible: true,
        });
        setLoading(false);
        iHasError = true;
        return;
      });

    const iHasError = false;
    setLoading(false);
    setPopLoadBol(false);
    if (iHasError === false) {
      //console.log(iInsertUsageSlip);
      Resetx();
      setLoading(false);
      setPopLoadBol(false);
      setResetModule(true);
    }
  };

  return (
    <>
      <Tab.Group>
        <div className=" flex -mt-10 ">
          {/* <h1 class="text-2xl font-bold text-white  ">Usage Slip</h1> */}
          <div className="ml-auto order-2 mt-1.5 mr-2 ">
            <Tab.List className=" flex gap-4 -mt-1">
              <div className="    py-0.5 pt-0  bg-mainButton rounded-3xl">
                <Tab
                  className={({ selected }) =>
                    selected ? DefaultButtonStyle : DefaultButtonStyleNullified
                  }
                >
                  Create
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected ? DefaultButtonStyle : DefaultButtonStyleNullified
                  }
                >
                  History
                </Tab>
              </div>
            </Tab.List>
          </div>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            {/* Usage slip tab */}
            <>
              <div>
                <div className="mx-2">
                  <div id="Inv" className="pt-4">
                    <UserInfoForPost
                      userInfo={userInfo}
                      className="mt-3 shadow-sm"
                    />
                    <form
                      action="#"
                      className="grid grid-cols-1 gap-y-2 gap-x-3 mb-3  mt-2 bg-WhiteMode-FromBackground000 px-2 rounded-md  pb-2 shadow-md "
                    >
                      {/* <h1 class="text-3xl font-bold text-white">Header Details </h1> */}

                      <div className="w-full ">
                        <p className={DefaultFontStypex}>
                          Proration Type
                          {prorationLoading ? (
                            <span>
                              <LoadingSpinner />
                            </span>
                          ) : (
                            <></>
                          )}
                        </p>
                        <div className="flex">
                          <input
                            id="ProrationType"
                            value={ProrationType.NAME}
                            name="ProrationType"
                            autoComplete="ProrationType"
                            disabled="disabled"
                            text="number"
                          ></input>

                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="inline-flex justify-end rounded-md w-10  -m-0  p-0  ">
                                <ChevronDownIcon
                                  className=" h-5 w-5 text-mainBG  mr-2 mt-1.5"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>
                            <Menu.Items className="-ml-80 origin-top-left absolute top-4  z-20 mt-2 w-80 rounded-md    bg-mainButton shadow-sm border">
                              <div className="py-1 mb-20">
                                {PorationList.map((ITEM, i) => (
                                  <Menu.Item key={i}>
                                    <button
                                      className={
                                        i % 2
                                          ? " bg-mainButton  text-white w-full my-0.5 "
                                          : " bg-mainBG  text-white w-full my-0.5 "
                                      }
                                      onClick={() => {
                                        setProrationLoading(true);
                                        setProrationType({
                                          CODE: ITEM.ID,
                                          NAME: ITEM.PRORATIONTYPE,
                                        });

                                        setSize({ CODE: "", NAME: "" });
                                        setRevision({ CODE: "", NAME: "" });
                                        //GetPoBom(ITEM.ID);
                                        GetRevision(ITEM.ID);
                                        setBom([BomInitailState]);
                                      }}
                                    >
                                      {ITEM.PRORATIONTYPE}
                                    </button>
                                  </Menu.Item>
                                ))}
                              </div>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>

                      <div className="w-full">
                        <p className={DefaultFontStypex}>
                          Revision
                          {RevisionLoad ? (
                            <span>
                              <LoadingSpinner />
                            </span>
                          ) : (
                            <></>
                          )}
                        </p>
                        <div className="flex">
                          <input
                            id="ProrationType"
                            value={Revision.NAME}
                            name="ProrationType"
                            autoComplete="ProrationType"
                            disabled="disabled"
                            text="number"
                          ></input>
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="inline-flex justify-end rounded-md w-10  -m-0  p-0  ">
                                <ChevronDownIcon
                                  className=" h-5 w-5 text-mainBG mr-2 mt-1.5"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>
                            <Menu.Items className="-ml-80 origin-top-left absolute top-4  z-20 mt-2 w-80 rounded-md    bg-mainButton shadow-sm border">
                              <div className="py-1 mb-20">
                                {RevesionList.map((ITEM, i) => (
                                  <Menu.Item key={i}>
                                    <button
                                      className={
                                        i % 2
                                          ? " bg-mainButton  text-white w-full my-0.5 "
                                          : " bg-mainBG  text-white w-full my-0.5 "
                                      }
                                      onClick={() => {
                                        setRevisionLoad(true);
                                        setRevision({
                                          CODE: ITEM.ID,
                                          NAME: ITEM.REVISION,
                                        });
                                        console.log(ITEM.ID);
                                        setSize({ CODE: "", NAME: "" });
                                        GetSize(ProrationType.CODE, ITEM.ID);
                                        setBom([BomInitailState]);

                                        //get Revision
                                      }}
                                    >
                                      {ITEM.REVISION}
                                    </button>
                                  </Menu.Item>
                                ))}

                                {RevesionList.length > 1 ? (
                                  <></>
                                ) : (
                                  <p className="text-center">
                                    Select [Proraiton Type] first
                                  </p>
                                )}
                              </div>
                            </Menu.Items>
                          </Menu>
                        </div>
                      </div>
                      {/* proration */}

                      <div className="grow flex flex-row gap-x-3">
                        <div className="w-1/2 pl-1">
                          <p className={DefaultFontStypex}>Size</p>
                          <div className="flex">
                            <input
                              id="ProrationType"
                              value={Size.NAME}
                              name="ProrationType"
                              autoComplete="ProrationType"
                              disabled="disabled"
                              text="number"
                            ></input>
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex justify-end rounded-md w-10  -m-0  p-0  ">
                                  <ChevronDownIcon
                                    className=" h-5 w-5 mt-1.5 mr-2 text-mainBG"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                              <Menu.Items className="-ml-36 origin-top-left absolute top-4  z-20 mt-2 w-80 rounded-md    bg-mainButton shadow-sm border">
                                <div className="py-1 mb-20">
                                  {SizeList.map((ITEM, i) => (
                                    <Menu.Item key={i}>
                                      <button
                                        className={
                                          i % 2
                                            ? " bg-mainButton  text-white w-full my-0.5 "
                                            : " bg-mainBG  text-white w-full my-0.5 "
                                        }
                                        onClick={() => {
                                          setSetSizeLoad(true);
                                          setSize({
                                            CODE: ITEM.ID,
                                            NAME: ITEM.SIZE,
                                          });
                                          // console.log(ITEM.ID);
                                          //GetPoBom(ITEM.ID);
                                          GetPoBom(ITEM.ID);
                                          //get Revision
                                        }}
                                      >
                                        {ITEM.SIZE}
                                      </button>
                                    </Menu.Item>
                                  ))}
                                  {SizeList.length > 1 ? (
                                    <></>
                                  ) : (
                                    <p className="text-center">
                                      Select [Revision] first
                                    </p>
                                  )}
                                </div>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </div>

                        <div className="w-1/2 pl-1">
                          <p className={DefaultFontStypex}>
                            Manufacturing Date
                          </p>

                          <div>
                            <div className=" w-full  grow flex flex-row    appearance-none rounded-md      bg-transparent ">
                              <input
                                type="date"
                                id="MNFDATE"
                                name="MNFDATE"
                                onChange={HeaderHandler}
                                defaultValue={Datenw.toISOString().substring(
                                  0,
                                  10
                                )}
                                className="rounded-md bg-white py-1.5 px-2.5 w-full"
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <Label text="Batch" />

                          {/* <div> */}
                          <input
                            id="BATCH"
                            type="number"
                            name="BATCH"
                            defaultValue={HeaderInfo.BATCH}
                            onChange={HeaderHandler}
                            // disabled="disabled"
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                          />
                          {/* </div> */}
                        </div>
                        <div className="w-1/2">
                          <Label text="Machine" />

                          <select
                            id="Machine"
                            name="Machine"
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                            onChange={HeaderHandler}
                          >
                            <option value="default"></option>

                            {machine.map((item, index) => (
                              <option value={item.Code}>{item.Name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="w-1/2">
                          <Label text="Station" />
                          <select
                            id="STATION"
                            name="STATION"
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                            onChange={HeaderHandler}
                          >
                            <option value="default"></option>

                            {stationList.map((item, index) => (
                              <option value={item.Code}>{item.Name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* </div> */}

                      {/* <div className="flex gap-x-2">
                        <div className="w-1/2 ">
                          <p className={DefaultFontStypex}>NTSS Ver</p>

                          <select
                            id="NTSSVer"
                            name="NTSSVer"
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                            onChange={HeaderHandler}
                          >
                            <option value="*"></option>

                            {NTSSVer.map((item, index) => (
                              <option value={item.NtssVer}>
                                {item.NtssVer}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-1/2">
                          <p className={DefaultFontStypex}>NTSS</p>
                          <select
                            id="NTSS"
                            name="NTSS"
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                            onChange={HeaderHandler}
                          >
                            <option value="*"></option>

                            {NTSSlist.map((item, index) => (
                              <option value={item.NtssVer}>
                                {item.NTSSperc}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-x-2">
                        <div className="w-1/2">
                          <p className={DefaultFontStypex}>Solid</p>
                          <input
                            id="Solid"
                            type="number"
                            name="Solid"
                            value={NTSSlistSolidAndWater[0].Paste}
                            disabled="disabled"
                            // onChange={HeaderHandler}
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                          />
                        </div>

                        <div className="w-1/2">
                          <p className={DefaultFontStypex}>Water</p>
                          <input
                            id="Water"
                            type="number"
                            name="Water"
                            value={NTSSlistSolidAndWater[0].Water}
                            required=""
                            disabled="disabled"
                            // onChange={HeaderHandler}
                            className="rounded-md bg-white py-1.5 px-2.5 w-full"
                          />
                        </div>
                      </div> */}

                      <p className={DefaultFontStypex}>Remarks</p>
                      <input
                        id="REMARKS"
                        type="text"
                        name="REMARKS"
                        defaultValue={HeaderInfo.REMARKS}
                        required=""
                        // disabled="disabled"
                        onChange={HeaderHandler}
                        className="rounded-md bg-white py-1.5 px-2.5"
                      />
                    </form>
                    {/* <h1 class="text-3xl font-bold text-white ml-6">Line Details</h1> */}

                    <div className="overflow-x-auto mb-4  bg-white rounded-md shadow-md ">
                      <table className="w-full  ">
                        <tr className="w-full ">
                          <th className="font-semibold text-black  border rounded-md border-gray-900  px-2 py-1 text-left ">
                            {/* <button onClick={() => setAddItemModal(true)}>
                              ➕
                            </button>

                            <Label text="Search Raw Materials" /> */}
                            <button
                              className={smalBtn}
                              onClick={() => setAddItemModal(true)}
                            >
                              <div className=" grow flex flex-row">
                                <div>➕ </div>
                                Add ITEM
                              </div>
                            </button>
                            {/* additem */}
                          </th>
                          <th className="font-semibold text-black border border-gray-900 px-2 py-1 text-left  w-full">
                            QTY
                          </th>
                          <th className="font-semibold text-black border border-gray-900 px-2 py-1 text-left  w-full">
                            ADJ
                          </th>
                          {/* <th className="font-semibold text-white border border-gray-900 px-2 py-1 text-left  w-full">
                            UOM
                          </th> */}
                        </tr>
                        {Bom.map((item, index) => (
                          <>
                            {item.ItemCode === "" ? (
                              <></>
                            ) : (
                              <tr className="" key={index}>
                                {/* <td className=" text-white border  px-1 w-fit    border-gray-900">
                                  <button
                                    className={smalBtn}
                                    onClick={() => {
                                      removeBom(index);
                                      settoastMsg(
                                        `${item.ItemCode} - ${item.nam} Removed  ❌`
                                      );

                                      settoastVisible(true);
                                    }}
                                  > 
                                    <div className=" grow flex flex-row">
                                      <div>❌ </div>
                                      Delete
                                    </div>
                                  </button>

                                </td> */}
                                <td className=" text-black border border-gray-900 px-1   whitespace-nowrap w-full  ">
                                  <div>
                                    <div className="w-full  grow flex flex-row  ">
                                      <span className="w-full">
                                        {item.ItemCode}
                                      </span>
                                      <span className="block float-right ">
                                        {item.UoM}
                                      </span>
                                    </div>
                                    <input
                                      className="text-xs w-full px-1 bg-transparent  border-0"
                                      value={item.ItemName}
                                      disabled="disabled"
                                    ></input>
                                  </div>
                                </td>
                                <td className=" text-black border border-gray-900 px-1   whitespace-nowrap  ">
                                  <input
                                    type="number"
                                    className="w-20 rounded-md px-2 border-0"
                                    name="Qty"
                                    autoComplete="Qty"
                                    defaultValue={item.Qty}
                                    id={parseInt(item.ROW)}
                                    // value={item.Qty}
                                    onChange={UpdateTabInput}
                                  ></input>
                                </td>

                                <td className=" text-black border border-gray-900 px-1  py-0 whitespace-nowrap  ">
                                  <input
                                    type="number"
                                    className="w-10 px-0.5 rounded-md border-0"
                                    name="adj"
                                    autoComplete="adj"
                                    defaultValue={item.adj}
                                    id={index}
                                    // value={item.Qty}
                                    onChange={UpdateTabInput}
                                  ></input>
                                </td>
                                {/* <td className=" text-white border border-gray-900 px-1   whitespace-nowrap w-full ">
                                  {item.UoM}
                                </td> */}
                              </tr>
                            )}
                          </>
                        ))}

                        <tr className="">
                          <td className=" text-black border border-gray-900 px-1   whitespace-nowrap w-full  ">
                            Total
                          </td>
                          <td className=" text-black border border-gray-900 px-1   whitespace-nowrap w-full  ">
                            {Total}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                {Bom.length >= 1 ? (
                  <>
                    <NoteInfo
                      title="Note"
                      body="Items with zero [QTY] will not be added [Proration Type] [Proration Rate] and [Proration Amount] are required
                      
                        Legend : 
                        
                        ➕ - [Adds] Material to Usage Slip 
                        ❌ - [Removes] the Material on the respective row
                      
                      "
                      height="h-28"
                      visible={true}
                    />
                    <NoteInfo
                      title={NoteDetails.title}
                      body={NoteDetails.body}
                      className="mt-4"
                      type={NoteDetails.type}
                      visible={NoteDetails.visible}
                    />
                    <div className="relative bottom-2 flex w-full mt-3  ">
                      <div className="  mx-10 w-full group inline-flex items-center justify-center rounded-full py-1 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                        <button
                          type="button"
                          className={ConfirmButton}
                          id="BtnNote"
                          disabled={loading}
                          onClick={() => {
                            // setHeaderInfo({ BATCH: "", STATION: "", MNFDATE: "" });
                            setLoading(true);
                            setPopLoadBol(false);

                            InsertUsageSlip();
                            // console.log({ Bom });
                          }}
                        >
                          {loading ? (
                            <span>
                              <LoadingSpinner text={"Processing..."} />
                            </span>
                          ) : (
                            <span>👍 Confirm</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          </Tab.Panel>
          <Tab.Panel>
            {/* History  */}
            <UsageSlipHistory />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {addItemModal ? (
        <>
          <div className="fixed top-0  h-full w-full z-50  left-0">
            <div className="opacity-50 bg-mainBG h-full w-full absolute"></div>
            <div
              style={{ paddingTop: "20%" }}
              className="relative bottom-2 flex w-full mt-3"
            >
              <div className="  w-full  flex  items-center justify-center rounded-full py-1 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                <div className="p-4 bg-mainButton w-min">
                  <div className=" my-2">
                    <Label text="Search Raw Materials" />
                    <button
                      className={"float-right -mt-5 " + smalBtn}
                      onClick={() => setAddItemModal(false)}
                    >
                      <div className=" grow flex flex-row">
                        <div className="rotate-45">➕ </div>
                        Close
                      </div>
                    </button>
                  </div>
                  <div>
                    <input
                      className="bg-transparent w-full"
                      value={itemSearchText}
                      onChange={(e) => {
                        setitemSearchText(e.target.value);
                      }}
                    ></input>
                    <button
                      className={smalBtn}
                      onClick={async () => {
                        setSearchParam({
                          SQLID: 31,
                          SQLVAL: itemSearchText,
                        });
                        setSelectedPage(1);
                        await getSearchedSearched();
                      }}
                    >
                      <div className=" grow flex flex-row">
                        <div>🔍</div>
                        <div> Search</div>
                      </div>
                    </button>
                  </div>

                  <div className="w-full ">
                    <div className="h-full">
                      <table className="w-96 bg-white">
                        <tr className="w-full">
                          <th
                            className="font-semibold text-white  border border-gray-900  px-2 py-1 text-left  col-span-2"
                            colSpan={2}
                          >
                            ITEM
                          </th>
                        </tr>
                        <div className="h-80 overflow-auto">
                          {SearchedItemsList.map((item, index) => (
                            <tr className="" key={index}>
                              <td className=" text-white border border-gray-900 px-1   whitespace-nowrap w-fit ">
                                {/* <button
                                  className="h-8  "
                                  onClick={() => {
                                    addBom(item);
                                    settoastMsg(
                                      `${item.ItemCode} Added to the bottom on the list ➕`
                                    );

                                    settoastVisible(true);
                                  }}
                                >
                                  ➕
                                </button> */}

                                <button
                                  className={smalBtn}
                                  onClick={() => {
                                    addBom(item);
                                    settoastMsg(
                                      `${item.ItemCode} Added to the bottom on the list ➕`
                                    );

                                    settoastVisible(true);
                                  }}
                                >
                                  <div className=" grow flex flex-row">
                                    <div>➕ </div>
                                    Add to list
                                  </div>
                                </button>
                              </td>
                              <td className=" text-white border border-gray-900 px-1   whitespace-nowrap w-full  ">
                                <div>
                                  <div className="w-full  grow flex flex-row  ">
                                    <span className="w-full">
                                      {item.ItemCode}
                                    </span>
                                    <span className="block float-right ">
                                      {item.InvntryUom}
                                    </span>
                                  </div>
                                  <input
                                    className="text-xs w-full px-1 bg-transparent "
                                    value={item.ItemName}
                                    disabled="disabled"
                                  ></input>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </div>
                      </table>
                    </div>
                    {/* <Pager /> */}
                    {/* <div className=" w-full group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
                      <button
                        type="button"
                        className={ConfirmButton}
                        disabled={loading}
                        onClick={() => {
                          setAddItemModal(false);
                        }}
                      >
                        <span>
                          Confirm <span aria-hidden="true"> → </span>
                        </span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
