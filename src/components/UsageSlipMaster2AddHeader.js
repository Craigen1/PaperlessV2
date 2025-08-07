import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  NoteInfo,
} from "./ComponentList";

export default function UsageSlipMaster2AddHeader() {
  const { userInfo } = useContext(ITopContext);
  const Datenw = new Date();
  const [addnoteinfoVisible, setAddnoteinfoVisible] = useState(false);
  const [addSizeMap, setAddSizeMap] = useState([]);
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

  const [btnSelectId, setBtnSelectId] = useState(1);
  const [btnSelectIDLine, setbtnSelectID] = useState(1);
  const btnSelectIDonClick = async (e) => {
    setAddnoteinfoVisible(false);

    setBtnSelectId(e.target.id);
  };
  const btnSelectLineOnClick = async (e) => {
    setbtnSelectID(e.target.id);
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
    const updatedList = rows.map((item) => {
      if (parseInt(item.ID) == parseInt(id)) {
        console.log("xxxx");
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
      rowsID = rows[rows.length - 1].ID + 1;
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
  const [msgSQ, setmsgSQ] = useState([
    {
      return: -0,
    },
  ]);

  const [addProrationStr, setAddProrationStr] = useState("");
  const [addRev, setAddRev] = useState("");
  const [addSize, setAddSize] = useState("");

  const addHeadertypeHandler = async (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    if (id == "AddProration") {
      await EXEC_SQL_InsertOne(25, setmsgSQ, addProrationStr);
    } else if (id == "AddRev") {
      await EXEC_SQL_InsertOne(26, setmsgSQ, addRev, addProrationStr);
    } else if (id == "AddSize") {
      await EXEC_SQL_InsertOne(27, setmsgSQ, addProrationStr, addRev, addSize);
    }
    setAddnoteinfoVisible(true);
  };
  const [searChValue, setSearChValue] = useState("");
  const onChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });

    if (id == "searchItem") {
      setSearChValue(value);
    } else if (id == "addItemTolist") {
      await EXEC_SQL_InsertOne(979, setgetItemInfo, searChValue);
    } else if (id == "HeaderProration") {
      setHeaderProration(value);
    } else if (id == "clearProration") {
      setHeaderProration("");
      setHeaderSize("");
      setHeaderRev("");
    } else if (id == "HeaderRevision") {
      setHeaderRev(value);
    } else if (id == "ForAddProrationtType") {
      setAddProrationStr(value);
    } else if (id == "revProrationType") {
      setAddProrationStr(value);
    } else if (id == "ProrationTypeAddSize") {
      setAddProrationStr(value);
      await EXEC_SQL_InsertOne(977, setAddSizeMap, value);
    } else if (id == "AddRev") {
      setAddRev(value);
    } else if (id == "RevAddSize") {
      setAddRev(value);
    } else if (id == "AddSize") {
      setAddSize(value);
    }
  };
  const GetSelectRevision = async () => {
    await EXEC_SQL_InsertOne(977, setRevMap, HeaderProration);
  };
  const GetSelectSize = async () => {
    await EXEC_SQL_InsertOne(976, setSizeMap, HeaderProration, HeaderRev);
  };
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
      <div classname="h-[100hv] bg-red-500">
        <>
          <div role="tablist" class="tabs tabs-sm tabs-lifted w-fit mt-2">
            <button
              onClick={btnSelectIDonClick}
              id={1}
              role="tab"
              class="tab tab-active"
              className={btnSelectId == 1 ? "tab tab-active" : "tab "}
            >
              Add Proration Type
            </button>
            <button
              onClick={btnSelectIDonClick}
              id={2}
              role="tab"
              class="tab tab-active"
              className={btnSelectId == 2 ? "tab tab-active" : "tab "}
            >
              Add Revision
            </button>
            <button
              onClick={btnSelectIDonClick}
              id={3}
              role="tab"
              class="tab tab-active"
              className={btnSelectId == 3 ? "tab tab-active" : "tab "}
            >
              Add Size
            </button>
          </div>

          <NoteInfo
            body={
              msgSQ[0].return == "1"
                ? "Data already existing  "
                : "Data Added!!"
            }
            type={msgSQ[0].return == "1" ? "e" : "s"}
            title={msgSQ[0].return == "1" ? "(-001)" : "(0)"}
            visible={addnoteinfoVisible}
          />
          <div className="frame">
            {/* Add Proration */}
            {btnSelectId == 1 ? (
              <div className="">
                <div>
                  <DefInput
                    label="Proration Type"
                    id="ForAddProrationtType"
                    type="Text"
                    handler={onChangeHandler}
                  />
                </div>
                <div className="mx-auto w-fit">
                  <DefButton
                    text="Add Proration Type"
                    className=" w-fit px-2 mt-2"
                    id="AddProration"
                    onClick={addHeadertypeHandler}
                  />
                </div>
              </div>
            ) : btnSelectId == 2 ? (
              <>
                {/* Add Revision */}
                <div className="">
                  <div>
                    <DefInput
                      label="Select Proration Type"
                      id="revProrationType"
                      type="Text"
                      dropDownId={978}
                      handler={onChangeHandler}
                    />
                    <DefInput
                      label="Add Revision."
                      id="AddRev"
                      type="Text"
                      handler={onChangeHandler}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                  <div className="mx-auto w-fit">
                    <DefButton
                      text="Add Revision"
                      className=" w-fit px-2 mt-2"
                      id="AddRev"
                      onClick={addHeadertypeHandler}
                    />
                  </div>
                </div>
              </>
            ) : btnSelectId == 3 ? (
              <>
                {/* Add Size */}
                <div className=" h-[100vh]">
                  <div>
                    <DefInput
                      label="Select Proration Type"
                      id="ProrationTypeAddSize"
                      type="Text"
                      dropDownId={978}
                      handler={onChangeHandler}
                    />
                    <DefInput
                      label="Select Revision "
                      id="RevAddSize"
                      type="Text"
                      dropDownId={99999}
                      map={addSizeMap}
                      handler={onChangeHandler}
                    />
                    <DefInput
                      label="Add Size"
                      id="AddSize"
                      type="Text"
                      handler={onChangeHandler}
                    />
                  </div>
                  <div className="mx-auto w-fit">
                    <DefButton
                      text="Add Size"
                      className=" w-fit px-2 mt-2"
                      id="AddSize"
                      onClick={addHeadertypeHandler}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      </div>
    </>
  );
}
