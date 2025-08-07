import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function GoodsIssueTest() {
  const [loading, setloading] = useState(false);
  const [additem, setadditem] = useState(false);
  const [posted, setposted] = useState(false);
  const { DateNow, userInfo } = useContext(ITopContext);
  const components = [
    {
      type: "text",
      id: 1,
      label: "Number",
      name: "Docnum",
    },
    {
      type: "date",
      id: 1,
      label: "Posting Date",
      name: "PostingDate",
      disabled: true,
    },

    {
      type: "text",
      id: 1,
      label: "TransactionType",
      name: "TransType",
      dropDownId: 915,
    },
    {
      type: "date",
      id: 1,
      label: "Document Date",
      name: "DocDate",
    },
    {
      type: "text",
      id: 1,
      label: "Department",
      name: "Dep",
      dropDownId: 912,
    },
    {
      type: "text",
      id: 1,
      label: "Released By",
      name: "ReleaseBy",
      dropDownId: 911,
    },

    {
      type: "text",
      id: 1,
      label: "Received By",
      name: "ReceivedBy",
      disabled: true,
    },
    // {
    //   type: "text",
    //   id: 1,
    //   label: "Profit Center",
    //   name: "ProfitCenter",
    //   dropDownId: 910,
    // },
    {
      type: "text",
      id: 1,
      label: "Cost Center",
      name: "CostCenter",
      dropDownId: 909,
      selected: true,
      defvalue: "",
    },

    {
      type: "text",
      id: 1,
      label: "Section",
      name: "Section",
      dropDownId: 908,
      selected: true,
      defvalue: "",
    },
    {
      type: "text",
      id: 1,
      label: "Account Code",
      name: "AccountCode",
      disabled: true,
    },

    {
      type: "text",
      id: 1,
      label: "Machine",
      name: "Machine",
      dropDownId: 896,
    },
    {
      type: "text",
      id: 1,
      label: "Project",
      name: "Project",
      dropDownId: 895,
      disabled: true,
    },

    {
      type: "text",
      id: 1,
      label: "Remarks",
      name: "Remarks",
    },
    {
      type: "text",
      id: 1,
      label: "Approval Remarks",
      name: "ApprovalRemarks",
    },
  ];
  const AddItemsComp = [
    {
      type: "text",
      id: 1,
      label: "Item No.",
      name: "ItemNo",
    },
    {
      type: "text",
      id: 1,
      label: "Quantity",
      name: "Quantity",
    },
    {
      type: "text",
      id: 1,
      label: "Whse",
      name: "Whse",
      disabled: true,
    },
    {
      type: "text",
      id: 1,
      label: "Qty in Whse",
      name: "QtyinWhse",
      disabled: true,
    },

    {
      type: "text",
      id: 1,
      label: "UoM Code",
      name: "UoMCode",
      disabled: true,
    },

    {
      type: "text",
      id: 1,
      label: "Bin Location Allocation",
      name: "BinLocationAllocation",
      disabled: true,
    },
    {
      type: "text",
      id: 1,
      label: "Bin Location Allocation ID",
      name: "BinLocationAllocationID",
      disabled: true,
    },
  ];
  const columns = [
    {
      name: "ItemNo",
      disabled: true,
      colspan: 2,
    },

    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },
    {
      name: "Quantity",
      disabled: true,
    },
    {
      name: "Whse",
      disabled: true,
    },

    {
      name: "UoMCode",
      disabled: true,
    },
    {
      name: "Bin_ID",
      disabled: true,
    },
    {
      name: "Option",
    },
  ];
  const [rows, setRows] = useState([]);
  const handleOption = (e) => {
    const { value, id, name } = e.target;
    const newMap = [...rows];
    newMap.splice(Number(id), 1);
    setRows(newMap);
  };

  const [AddItemVisible, setAddItemVisible] = useState(false);
  const [errorMsgs, seterrorMsgs] = useState({});
  const [HeaderErrorMsg, setHeaderErrorMsg] = useState({});
  const [transTypeHolder, settransTypeHolder] = useState([
    {
      U_APP_GLCode: 0,
    },
  ]);
  const [SelectedItemValues, setSelectedItemValues] = useState({
    ItemNo: "",
    name: "",
    Whse: "",
    Quantity: 0,
    QtyinWhse: "",
    AccountCode: "",
    Whse: "",
    UoMCode: "",
    ProfitCenter: "",
    CostCenter: "",
    Section: "",
    BinLocationAllocation: "",
    BinLocationAllocationID: "",
  });

  const [NumberHolder, setNumberHolder] = useState([
    {
      NextNumber: 0,
    },
  ]);
  const [headerValues, setheaderValues] = useState({
    Machine: "",
    Project: "",
  });
  const [OnHandList, setOnHandList] = useState([]);
  const GetAvailableItems = async () => {
    await EXEC_SQL(916, setOnHandList);
  };

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  const [SapLoginStatus, setSapLoginStatus] = useState("");

  const SapLogin = async (e) => {
    setloading(true);
    setadditem(false);
    if (rows.length <= 0) setadditem(true);

    components.map((item, index) => {
      if (headerValues[item.name] == "" || headerValues[item.name] == undefined)
        setHeaderErrorMsg((l) => ({ ...l, [item.name]: "" }));
    });

    let hasInv = false;
    components.map((item, index) => {
      console.log(headerValues.TransType);
      console.log(item.name);

      if (
        headerValues[item.name] == "" ||
        headerValues[item.name] == undefined
      ) {
        if (
          headerValues.TransType != "GI28" &&
          (item.name == "Machine" || item.name == "Project")
        ) {
          console.log("xx");
        } else {
          setHeaderErrorMsg((l) => ({ ...l, [item.name]: "Required" }));
          hasInv = true;
        }
      } else {
        setHeaderErrorMsg((l) => ({ ...l, [item.name]: "" }));
      }
    });
    if (hasInv || rows.length <= 0) {
      setloading(false);
      return;
    }

    try {
      const Login_API = await fetch("LOGIN_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          USER: "B1i",
        }),
      });
      const d = await Login_API.json();
      console.log(d.SessionId);
      setSapLoginStatus(d.SessionId);
    } catch (error) {}
  };
  const ClearButtonTrigger = () => {
    let clearButtons = document.getElementsByClassName("clearButton");
    for (let i = 0; i < clearButtons.length; i++) {
      clearButtons[i].click();
    }
  };
  const postGI = async (e) => {
    console.log({ rows });
    // setloading(false);
    // setadditem(true);
    // return;
    var header = JSON.stringify({
      DocType: "dDocument_Items",
      DocDate: headerValues.PostingDate,
      DocDueDate: headerValues.DocDate,
      DocObjectCode: "oInventoryGenExit",
      BPL_IDAssignedToInvoice: 1,
      Comments: headerValues.Remarks,
      U_APP_TransType: headerValues.TransType,
      U_APP_Dept: headerValues.Dep,
      U_APP_RECEIVEDBY: headerValues.ReceivedBy,
      U_APP_RELEASEDBY: headerValues.ReleaseBy,
    });

    header = header.substring(0, header.length - 1);
    header += ' ,"DocumentLines": [ ';
    rows.map((item, index) => {
      var x = JSON.stringify({
        LineNum: index,
        ItemCode: item.ItemNo,
        Quantity: item.Quantity,
        WarehouseCode: item.Whse,
        AccountCode: headerValues.AccountCode,
        UseBaseUnits: "tYES",
        // CostingCode: "10",
        CostingCode2: headerValues.CostCenter,
        CostingCode3: headerValues.Section,
        U_Machine: headerValues.Machine,
        ProjectCode: headerValues.Project,
        DocumentLinesBinAllocations: [
          {
            BinAbsEntry: item.Bin_ID,
            Quantity: item.Quantity,
            AllowNegativeQuantity: "tNO",
            SerialAndBatchNumbersBaseLine: -1,
            BaseLineNumber: index,
          },
        ],
      });

      header += "  " + x + ",";
    });

    var approvalx = JSON.stringify({
      Document_ApprovalRequests: [
        {
          ApprovalTemplatesID: 120,
          Remarks: headerValues.ApprovalRemarks,
        },
      ],
    });
    header = header.substring(0, header.length - 1);
    header += "],";
    approvalx = approvalx.substring(1, approvalx.length);
    approvalx = approvalx.substring(0, approvalx.length - 1);

    header += approvalx + " }";
    console.log(header);

    try {
      const postGoodsIsse = await fetch("GI_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          json: header,
          session: SapLoginStatus,
        }),
      })
        .then((res) => res.json())
        .catch(function (error) {
          console.log(error);
          return error;
        });
      console.log({ postGoodsIsse });
      if (postGoodsIsse.error != undefined) {
        alert(postGoodsIsse.error.message.value);
        return;
      }
      setSapLoginStatus("");
      setloading(false);
      setRows([]);

      components.map((item) => {
        setheaderValues((e) => ({ ...e, [item.name]: "" }));
      });
      await EXEC_SQL(914, setNumberHolder);
      ClearButtonTrigger();
      setposted(true);
    } catch (error) {
      setloading(false);
      setSapLoginStatus("");
    }
  };
  const AddItems = (e) => {
    console.log({ SelectedItemValues });

    const { id } = e.target;
    setAddItemVisible(true);

    if (
      SelectedItemValues.Quantity == 0 ||
      SelectedItemValues.Quantity == NaN ||
      SelectedItemValues.Quantity < SelectedItemValues.QtySelected
    ) {
      seterrorMsgs((l) => ({ ...l, Quantity: "Invalid" }));
    } else {
      seterrorMsgs((l) => ({ ...l, Quantity: "" }));
      setAddItemVisible(!AddItemVisible);
    }

    if (id != "add") return;

    setRows((p) => [
      ...p,
      {
        ItemNo: SelectedItemValues.ItemNo,
        ItemName: SelectedItemValues.name,
        Quantity: SelectedItemValues.Quantity,
        Whse: SelectedItemValues.Whse,
        UoMCode: SelectedItemValues.UoMCode,
        Bin_ID: SelectedItemValues.BinLocationAllocationID,
      },
    ]);
    setSelectedItemValues({
      ItemNo: "",
      name: "",
      Whse: "",
      Quantity: 0,
      QtyinWhse: "",
      AccountCode: "",
      Whse: "",
      UoMCode: "",
      ProfitCenter: "",
      CostCenter: "",
      Section: "",
      BinLocationAllocation: "",
      BinLocationAllocationID: "",
    });
  };
  const [projectDisabled, setProjectDisabled] = useState(false);
  const headerHandler = async (e) => {
    setposted(false);
    console.log({ headerValues });
    try {
      const { value, id, name } = e.target;
      console.log({ value, id, name });
      setheaderValues((e) => ({ ...e, [id]: value }));
      if (id == "TransType") {
        await EXEC_SQL_InsertOne(913, settransTypeHolder, value);
        if (value == "GI28") {
          setProjectDisabled(true);
        } else {
          setProjectDisabled(!true);
        }
      }
    } catch (error) {
      setloading(false);
    }
  };
  let idIndex = 0;

  const ItemSelectionHandler = (e) => {
    try {
      const { value, id, name } = e.target;
      console.log({ value, id, name });
      console.log(parseFloat(SelectedItemValues.Quantity));
      console.log(parseFloat(value));

      if (
        parseFloat(value) > parseFloat(SelectedItemValues.QtyinWhse) &&
        id == "Quantity"
      ) {
        seterrorMsgs((l) => ({ ...l, QtySelected: value }));
        seterrorMsgs((l) => ({ ...l, [id]: "- Quantity is > on hand" }));
        return;
      } else if (
        parseFloat(value) > parseFloat(SelectedItemValues.QtyinWhse) &&
        id == "Quantity"
      ) {
        seterrorMsgs((l) => ({ ...l, [id]: "- Quantity is > on hand" }));
        return;
      } else {
        seterrorMsgs((l) => ({ ...l, [id]: "" }));
      }

      setSelectedItemValues((l) => ({ ...l, [id]: value }));

      if (value == "" && id == "ItemNo") {
        setSelectedItemValues({
          ItemNo: "",
          name: "",
          Whse: "",
          Quantity: 0,
          QtyinWhse: "",
          AccountCode: "",
          Whse: "",
          UoMCode: "",
          ProfitCenter: "",
          CostCenter: "",
          Section: "",
          BinLocationAllocation: "",
          BinLocationAllocationID: "",
        });
        return;
      }
      //  parseInt(value);
      console.log(value);
      if (id == "ItemNo") {
        // setSelectedItemValues((l) => ({
        //   ...l,
        //   BinLocationAllocation: OnHandList[parseInt(value)].BinCode,
        //   BinLocationAllocationID: OnHandList[parseInt(value)].AbsEntry,
        //   UoMCode: OnHandList[parseInt(value)].InvntryUom,
        //   Whse: OnHandList[parseInt(value)].WhsCode,
        //   QtyinWhse: OnHandList[parseInt(value)].OnHandQty,
        //   name: OnHandList[parseInt(value)].name,
        //   ItemNo: OnHandList[parseInt(value)].itemcode,
        // }));

        setSelectedItemValues({
          BinLocationAllocation: OnHandList[parseInt(value) - 1].BinCode,
          BinLocationAllocationID: OnHandList[parseInt(value) - 1].AbsEntry,
          UoMCode: OnHandList[parseInt(value) - 1].InvntryUom,
          Whse: OnHandList[parseInt(value) - 1].WhsCode,
          QtyinWhse: OnHandList[parseInt(value) - 1].OnHandQty,
          name: OnHandList[parseInt(value) - 1].name,
          ItemNo: OnHandList[parseInt(value) - 1].itemcode,
        });
      }
      console.log(OnHandList[parseInt(value)].BinCode);
    } catch (error) {}
  };

  useEffect(() => {
    EXEC_SQL(914, setNumberHolder);
  }, []);
  useEffect(() => {
    if (NumberHolder[0].NextNumber == undefined) return;
    setheaderValues((e) => ({
      ...e,
      Docnum: NumberHolder[0].NextNumber,
      PostingDate: DateNow,
      DocDate: DateNow,
      ReceivedBy:
        userInfo.firstname.substring(0, 1).toUpperCase() +
        " " +
        userInfo.lastname.toUpperCase(),
    }));
  }, [NumberHolder]);
  useEffect(() => {
    GetAvailableItems();
  }, []);
  useEffect(() => {
    setheaderValues((e) => ({
      ...e,
      AccountCode: transTypeHolder[0].U_APP_GLCode,
    }));
  }, [transTypeHolder]);
  useEffect(() => {
    if (SapLoginStatus == "") return;
    postGI();
  }, [SapLoginStatus]);

  useEffect(() => {
    setheaderValues((e) => ({ ...e, CostCenter: userInfo.U_cost }));
    setheaderValues((e) => ({ ...e, Section: userInfo.U_section }));
  }, []);

  return (
    <>
      <div className="frame ">
        <div className="grid  md:grid-cols-2 gap-x-2 pb-2">
          {components.map((item, index) => (
            <>
              <div>
                <DefInput
                  label={item.label}
                  id={item.name}
                  // clearid={item.name}
                  type={item.type}
                  dropDownId={item.dropDownId}
                  handler={headerHandler}
                  disabled={
                    item.name == "Project" ? !projectDisabled : item.disabled
                  }
                  errorMsg={HeaderErrorMsg[item.name]}
                  value={headerValues[item.name]}
                  defvalue={item.defvalue}
                  defCode={
                    item.name == "CostCenter"
                      ? userInfo.U_cost
                      : item.name == "Section"
                      ? userInfo.U_section
                      : ""
                  }
                  defName={
                    item.name == "CostCenter"
                      ? userInfo.costName
                      : item.name == "Section"
                      ? userInfo.sectionname
                      : ""
                  }
                  sethasSelected={item.selected}
                />
              </div>
            </>
          ))}
        </div>
        {/* <DefButton type="2B" text="Login" onClick={SapLogin} /> */}
      </div>
      <div className="frame pb-4 ">
        {additem ? (
          <span className="float-left ml-2 font-semibold text-red-500 animate-pulse">
            Add an item
          </span>
        ) : (
          ""
        )}

        <div className="w-fit float-right">
          <DefButton
            type="2B"
            text="Add Item"
            onClick={AddItems}
            className=" w-fit "
          />
        </div>
      </div>
      {AddItemVisible ? (
        <div className="center fixed top-0 left-0 z-50 bg-WhiteMode-Background000 w-full h-full">
          <div className="frame mt-2   gap-x-2 pb-2 min-w-min">
            <DefButton
              type="2B"
              text="Close"
              id="close"
              onClick={AddItems}
              className="ml-auto"
            />
            {AddItemsComp.map((item, index) => (
              <div className="">
                <DefInput
                  label={item.label}
                  id={item.name}
                  clearid={item.name}
                  type={item.type}
                  dropDownId={item.name == "ItemNo" ? 99999 : item.dropDownId}
                  handler={ItemSelectionHandler}
                  map={item.name == "ItemNo" ? OnHandList : undefined}
                  disabled={item.disabled}
                  errorMsg={errorMsgs[item.name]}
                  value={SelectedItemValues[item.name]}
                />
              </div>
            ))}

            <DefButton
              type="2B"
              id="add"
              text="Add Item"
              onClick={AddItems}
              className=""
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="frame overflow-auto">
        <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Remove"
          spanCSS="w-full"
          className=""
          handleOption={handleOption}
        />
      </div>
      {posted ? (
        <div className=" mx-2 rounded-md px-2 mb-2  bg-github_ButtonGreen text-white">
          <span className="mx-auto ">Goods Issue Requested !</span>
        </div>
      ) : (
        ""
      )}
      <div className="frame pb-4 ">
        <div className="w-fit float-right">
          <DefButton
            type="2B"
            text="Post"
            onClick={SapLogin}
            loading={loading}
            className=" w-fit "
          />
        </div>
      </div>
      {/* 
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: "9999",
          transition: "all 0.5s ease-in-out",
          transform: open ? "translateY(0)" : "translateY(-100%)",
        }}
        onClick={toggleMenu}
      >
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div> */}
    </>
  );
}
