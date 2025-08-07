import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertMulti_V3,
  EXEC_SQL_InsertOne,
  NoteInfo,
} from "./ComponentList";
import UsageSlipMaster2AddHeader from "./UsageSlipMaster2AddHeader";
import UsageSlipMaster2Import from "./UsageSlipMaster2Import";

export default function UsageSlipMaster2() {
  const { userInfo } = useContext(ITopContext);
  const Datenw = new Date();
  const [LineTab, setLineTab] = useState(1);
  const [iMap, setiMap] = useState([
    {
      code: "x",
      name: "x",
    },
    {
      code: "2",
      name: "3",
    },
    {
      code: "4",
      name: "5",
    },
    {
      code: "d",
      name: "d",
    },
    {
      code: "s",
      name: "s",
    },
    {
      code: "x",
      name: "x",
    },
  ]);
  const [msg, setMsg] = useState({
    msg: "",
    type: "",
    title: "",
    visible: false,
  });
  const [btnSelectId, setBtnSelectId] = useState(1);
  const [btnSelectIDLine, setbtnSelectID] = useState(1);
  const btnSelectIDonClick = async (e) => {
    setBtnSelectId(e.target.id);
  };
  const btnSelectLineOnClick = async (e) => {
    setbtnSelectID(e.target.id);
    setHeaderProration("");
    setHeaderSize("");
    setHeaderRev("");
  };

  const columns = [
    {
      name: "Code",
      disabled: true,
    },
    {
      name: "Name",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Quantity",
      type: "number",
    },
    {
      name: "Option",
      type: "number",
    },
  ];

  const [rows, setrows] = useState([]);
  const [RevMap, setRevMap] = useState([]);
  const [SizeMap, setSizeMap] = useState([]);
  const [HeaderProration, setHeaderProration] = useState("");
  const [HeaderRev, setHeaderRev] = useState("");
  const [HeaderSize, setHeaderSize] = useState("");
  const handleOption = (e) => {
    let id = e.target.value;
    console.log(e.target);
    const TempContainer = [...rows];
    TempContainer.splice(id, 1);
    setrows(TempContainer);
    console.log({ TempContainer });
  };

  const handleCHange = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    const updatedList = rows.map((item) => {
      if (parseInt(item.ID) == parseInt(id)) {
        return { ...item, [name]: parseFloat(value) };
      } else {
        return item;
      }
    });
    setrows(updatedList);
    let asdasd = rows[parseInt(id)].Quantity;
    console.log({ updatedList });
  };
  const CompHeader = [
    {
      id: "HeaderProration",
      label: "Select Proration Type",
      type: "text",
      dropDownId: 978,
    },
    {
      id: "HeaderRevision",
      label: "Select Revision",
      type: "text",
      dropDownId: 980,
    },
    {
      id: "HeaderSize",
      label: "Select Size",
      type: "text",
      dropDownId: 980,
    },
  ];

  const Comp = {
    id: "searchItem",
    label: "Search RM",
    type: "text",
    dropDownId: 980,
  };
  const [getItemInfo, setgetItemInfo] = useState([]);
  const addSetRows = () => {
    console.log("add Line");
    let rowsID = 0;
    if (rows.length > 0) {
      rowsID = parseInt(rows[rows.length - 1].ID) + 1;
    }
    setrows((p) => [
      ...p,
      {
        ID: rowsID,
        Code: getItemInfo[0].ItemCode,
        Name: getItemInfo[0].ItemName,
        UoM: getItemInfo[0].UoM,
        Quantity: 0,
      },
    ]);
  };
  const [searChValue, setSearChValue] = useState("");
  const onChangeHandler = async (e) => {
    const { id, value, name } = e.target;
    console.log({ id, value, name });
    if (id == "searchItem") {
      setSearChValue(value);
    } else if (id == "addItemTolist") {
      console.log({ id, value, name });
      await EXEC_SQL_InsertOne(979, setgetItemInfo, searChValue);
    } else if (id == "HeaderProration") {
      setHeaderProration(value);
    } else if (id == "clearProration") {
      setHeaderProration("");
      setHeaderSize("");
      setHeaderRev("");
    } else if (id == "HeaderRevision") {
      setHeaderRev(value);
    } else if (id == "HeaderSize") {
      setHeaderSize(value);
    } else if (id == "HeaderSizeClear") {
      setHeaderSize(value);
    }
    console.log({ id, value, name });
  };

  const handler2 = async () => {
    if (HeaderSize != "" && HeaderRev != "" && HeaderProration != "") {
      await EXEC_SQL_InsertOne(
        975,
        setrows,
        HeaderProration,
        HeaderRev,
        HeaderSize
      );
    } else {
      setrows([]);
      console.log({ HeaderSize, HeaderRev, HeaderProration });
    }
  };
  useEffect(() => {
    handler2();
  }, [HeaderSize, HeaderRev, HeaderProration]);

  const GetSelectRevision = async () => {
    await EXEC_SQL_InsertOne(977, setRevMap, HeaderProration);
  };
  const GetSelectSize = async () => {
    await EXEC_SQL_InsertOne(
      976,
      setSizeMap,
      HeaderProration,
      HeaderRev,
      HeaderSize
    );
  };
  const [ExecRes, setExecRes] = useState([
    {
      msg: "",
      ID: 0,
    },
  ]);
  const colsSQL = [
    {
      name: "TypeEntry",
    },
    {
      name: "RevEntry",
    },
    {
      name: "Usage",
    },
    {
      name: "Size",
    },
    {
      name: "UoM",
    },
    {
      name: "Date",
    },
    {
      name: "ItemCode",
    },
    {
      name: "void",
    },
  ];

  const addUsageSlipTemplate = async () => {
    const newMap = rows.map((item) => {
      return {
        TypeEntry: HeaderProration,
        RevEntry: HeaderRev,
        Usage: item.Quantity,
        Size: HeaderSize,
        UoM: item.UoM,
        Date: Datenw.toISOString().substring(0, 10),
        ItemCode: item.Code,
        void: "1",
      };
    });
    console.log({ HeaderSize, HeaderRev, HeaderProration });
    console.log({ newMap });
    let addSQL = `
      update OUGS set void = '0'
      where TypeEntry= '${HeaderProration}' and
            RevEntry = '${HeaderRev}' and 
            Size='${HeaderSize}'
 `;
    await EXEC_SQL_InsertMulti_V3(
      1000,
      setExecRes,
      colsSQL,
      newMap,
      "OUGS",
      addSQL
    );
  };
  useEffect(() => {
    if (ExecRes[0].ID > 0) {
      setMsg({
        body: "successfully added",
        title: `(${ExecRes[0].ID})`,
        type: "2",
        visible: true,
      });
    }
  }, [ExecRes[0].ID]);

  useEffect(() => {
    GetSelectRevision();
  }, [HeaderProration]);
  useEffect(() => {
    GetSelectSize();
  }, [HeaderRev]);

  useEffect(() => {
    if (getItemInfo.length > 0) {
      console.log("triggerAdd");
      addSetRows();
      console.log({ rows });
    }
  }, [getItemInfo]);

  return (
    <>
      <div className=" h-full">
        <div className="flex gap-2 ">
          {/* <DefButton
            text="Edit Header"
            className={
              btnSelectIDLine == 2 ? "btn-primary btn-disabled" : "btn-primary "
            }
            onClick={btnSelectLineOnClick}
            id={2}
          />

          <DefButton
            text="Edit Line"
            className={
              btnSelectIDLine == 1
                ? "btn-primary border-b-2 border-black btn-disabled"
                : "btn-primary border-b-2 border-black "
            }
            onClick={btnSelectLineOnClick}
            id={1}
          /> */}

          <div role="tablist" class="tabs tabs-sm tabs-lifted">
            <button
              onClick={btnSelectLineOnClick}
              id={2}
              role="tab"
              class="tab tab-active"
              className={btnSelectIDLine == 2 ? "tab tab-active" : "tab "}
            >
              Edit Header
            </button>{" "}
            <button
              onClick={btnSelectLineOnClick}
              id={1}
              role="tab"
              class="tab tab-active"
              className={btnSelectIDLine == 1 ? "tab tab-active" : "tab "}
            >
              Edit Line
            </button>
          </div>
        </div>

        {btnSelectIDLine == 1 ? (
          <>
            <div className=" frame ">
              {/* {CompHeader.map((item, index) => ( */}
              <div>
                <DefInput
                  label="Select Proration Type"
                  id="HeaderProration"
                  type="text"
                  dropDownId={978}
                  handler={onChangeHandler}
                  clearid="clearProration"
                />
              </div>
              <div>
                <DefInput
                  label="Select Revision"
                  id="HeaderRevision"
                  type="text"
                  dropDownId={99999}
                  map={RevMap}
                  handler={onChangeHandler}
                />
              </div>
              <div>
                <DefInput
                  label="Select Size"
                  id="HeaderSize"
                  clearid="HeaderSizeClear"
                  type="text"
                  dropDownId={99999}
                  map={SizeMap}
                  handler={onChangeHandler}
                />
              </div>
            </div>

            <div role="tablist" className="tabs tabs-lifted mt-4 tabs-sm w-fit">
              <button
                role="tab"
                id="1"
                onClick={(e) => setLineTab(e.target.id)}
                className={LineTab == 1 ? "tab tab-active" : "tab"}
              >
                Manual Selection
              </button>
              <button
                role="tab"
                id="2"
                onClick={(e) => setLineTab(e.target.id)}
                className={LineTab == 2 ? "tab tab-active" : "tab"}
              >
                Export from excel
              </button>
            </div>
            {LineTab == 1 ? (
              <div className="frame overflow-auto">
                <div className=" flex frame pb-2">
                  <div className="w-full">
                    <DefInput
                      label={Comp.label}
                      id={Comp.id}
                      type={Comp.type}
                      dropDownId={Comp.dropDownId}
                      handler={onChangeHandler}
                      className=""
                    />
                  </div>
                  <div className="mt-1.5">
                    <DefButton
                      text="Add"
                      type="2"
                      className="w-fit px-1 mt-4  mx-2"
                      onClick={onChangeHandler}
                      id="addItemTolist"
                    />
                  </div>
                </div>

                <DefTable
                  columns={columns}
                  rows={rows}
                  btnCss="w-fit "
                  btnLabel="Removee"
                  spanCSS="w-full"
                  handleOption={handleOption}
                  onChange={handleCHange}
                />
                <div className="w-fit mx-auto">
                  <DefButton
                    text="Confirm"
                    className="w-fit px-2  py-0 my-0 mb-2"
                    onClick={addUsageSlipTemplate}
                    id={2}
                  />
                </div>
              </div>
            ) : LineTab == 2 ? (
              <UsageSlipMaster2Import
                HeaderSize={HeaderSize}
                HeaderRev={HeaderRev}
                HeaderProration={HeaderProration}
              />
            ) : (
              ""
            )}

            <NoteInfo
              body={msg.body}
              type={"s"}
              title={msg.title}
              visible={msg.visible}
            />
          </>
        ) : (
          <>
            <UsageSlipMaster2AddHeader />
          </>
        )}
      </div>
    </>
  );
}
