import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  Footer,
  Label,
  Logo,
  NoteInfo,
} from "./ComponentList";

export default function Approval() {
  const q = window.location.search;
  const urlp = new URLSearchParams(q);
  const [loadingapprove, setLoadingapprove] = useState(false);
  const [loadingdisap, setLoadingdisap] = useState(false);
  const [NoteDetails, setNoteDetails] = useState({
    title: "Sample Error",
    body: "Body",
    type: "e",
    visible: false,
  });

  const [objects, setObjects] = useState([
    {
      id: "vendor",
      label: "Vendor",
      type: "Text",
    },
    {
      id: "docnum",
      label: "Document #",
      type: "Text",
    },
    {
      id: "vendorName",
      label: "Name",
      type: "Text",
    },

    {
      id: "status",
      label: "Status",
      type: "text",
    },
    {
      id: "branch",
      label: "Branch",
      type: "Text",
    },
    {
      id: "postingdate",
      label: "Posting Date",
      type: "Text",
    },
    {
      id: "",
      label: "",
      type: "",
    },
    {
      id: "deliverydate",
      label: "Delivery Date",
      type: "Text",
    },

    {
      id: "",
      label: "",
      type: "",
    },
    {
      id: "type",
      label: "Item/Service Type",
      type: "text",
    },
  ]);

  const [objects2, setObjects2] = useState([
    {
      id: "TBD",
      label: "Total Before Discount",
      type: "Text",
    },
    {
      id: "owner",
      label: "Owner",
      type: "Text",
    },

    {
      id: "discount",
      label: "Discount",
      type: "Text",
    },
    {
      id: "",
      label: "",
      type: "",
    },
    {
      id: "tax",
      label: "Tax",
      type: "Text",
    },
    {
      id: "",
      label: "",
      type: "",
    },
    {
      id: "TPD",
      label: "Total Payment Due",
      type: "text",
    },
    {
      id: "",
      label: "",
      type: "",
    },
    {
      id: "remarks",
      label: "Remarks",
      type: "Text",
    },
  ]);

  const columns = [
    {
      name: "ItemCode",
      colspan: 1,
    },
    {
      name: "Dscription",
      colspan: 1,
    },
    {
      name: "Quantity",
      colspan: 1,
    },
    {
      name: "UomCode",
      colspan: 1,
    },
    {
      name: "Price",
      colspan: 1,
    },
    {
      name: "MnfDate",
      colspan: 1,
    },
    {
      name: "LineTotal",
      colspan: 1,
    },
    {
      name: "GTotalFC",
      colspan: 1,
    },
    {
      name: "GLAccount",
      colspan: 1,
    },
    {
      name: "Profit Center",
      colspan: 1,
    },
    {
      name: "Cost Center",
      colspan: 1,
    },
    {
      name: "Section",
      colspan: 1,
    },
  ];
  const [rows, setrows] = useState([]);

  const [userToLogin, setUserTologin] = useState({
    id: 0,
    username: "admin",
    password: "1nro9g",
    remarks: "1nro9g",
  });
  const LoginInfo = (val) => {
    const { name, value } = val.target;
    setUserTologin((preState) => ({ ...preState, [name]: value }));
    console.log(value);
  };
  const [sqlRes996, setSqlRes996] = useState([
    {
      STATUS: 0,
      remarks: "",
    },
  ]);

  const [sqlReturn, setSqlReturn] = useState([
    {
      ID: 0,
    },
  ]);

  const [Lines, setLines] = useState([{}]);
  const decide = async (e) => {
    setLoadingapprove(true);
    if (e.target.value === "A") {
      EXEC_SQL_InsertOne(
        999,
        setSqlReturn,
        urlp.get("id"),
        userToLogin.username,
        e.value,
        userToLogin.username,
        userToLogin.password,
        userToLogin.remarks
      );
    } else {
      console.log({ sqlReturn });
    }

    // await EXEC_SQL_InsertOne (996,setSqlRes996,)
  };

  const getLines = async (e) => {
    if (urlp.get("id") > 0) {
      EXEC_SQL_InsertOne(993, setLines, urlp.get("id"));
    } else {
      console.log(urlp.get("id"));
    }
    // await EXEC_SQL_InsertOne (996,setSqlRes996,)
  };

  const HandleshowPassword = async () => {
    if (showPassword === "text") {
      setshowPassword("password");
    } else {
      setshowPassword("text");
    }
  };

  useEffect(() => {
    if (sqlReturn[0].ID != 0) {
      setLoadingapprove(true);
      EXEC_SQL_InsertOne(996, setSqlRes996, sqlReturn[0].ID);
    }
  }, [sqlReturn]);
  useEffect(() => {
    if (sqlRes996[0].remarks != "") {
      if ("wrong login credentials" === sqlRes996[0].remarks) {
        setNoteDetails({
          body: sqlRes996[0].remarks,
          title: "SAP LOGIN ERROR",
          type: "e",
          visible: true,
        });
        setLoadingapprove(false);
      } else {
        let remarks = sqlRes996[0].remarks;
        if (remarks == "1nro9g")
          remarks = "request done; please check your approval status on sap";
        setNoteDetails({
          body: remarks,
          title: "!",
          type: undefined,
          visible: true,
        });
        setLoadingapprove(false);
      }
      setLoadingapprove(false);
    }
  }, [sqlRes996]);
  useEffect(() => {
    getLines();
  }, []);

  const [showPassword, setshowPassword] = useState("password");
  return (
    <>
      <div className="relative flex min-h-full justify-center">
        <div>
          <div className="flex  w-full mt-10">
            <div className="mx-auto flex">
              <div
                className="bg-mainLink w-fit pl-2 pr-4"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 67% 50%, 0 50%)",
                }}
              >
                <p className="pb-2 col font-bold ">SAP</p>
              </div>

              <Label text="Approval" />
            </div>
          </div>
          <div
            style={{
              width: "480px",
              border: "1px #21262d solid",
            }}
            className="frame"
          >
            <DefInput
              id="username"
              handler={LoginInfo}
              type="text"
              Lcss="mt-2 mb-1"
              label="SAP Account"
            />
            <DefInput
              id="password"
              handler={LoginInfo}
              type={showPassword}
              label="SAP Password"
              Lcss="mt-2 mb-1"
            />
            <DefInput
              id="remarks"
              handler={LoginInfo}
              type="text"
              label="Remarks"
              Lcss="mt-2 mb-1"
            />
            <DefButton
              text={showPassword === "text" ? "Hide Password" : "Show Password"}
              onClick={HandleshowPassword}
              css=""
              type="3"
              className="mt-1 text-right mr-2"
            />
            <div className="flex gap-2">
              {loadingapprove ? (
                <button className="bg-gray-800 w-full h-8 mt-3 font-sans text-sm text-github_FontColor font-medium rounded-md ">
                  <LoadingSpinner />
                </button>
              ) : (
                <DefButton
                  text="Approve"
                  onClick={decide}
                  css="my-3  "
                  value="A"
                />
              )}

              {loadingdisap ? (
                <button className="bg-gray-800 w-full h-8 mt-3 font-sans text-sm text-github_FontColor font-medium rounded-md ">
                  <LoadingSpinner />
                </button>
              ) : (
                <DefButton
                  text="Reject"
                  onClick={decide}
                  css="my-3  "
                  type={5}
                  value="R"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <NoteInfo
        title={NoteDetails.title}
        body={NoteDetails.body}
        className="mt-4"
        type={NoteDetails.type}
        visible={NoteDetails.visible}
      />
      <div className=" frame">
        <div className="bg-SAP-header border-b-SAP-headerLine border-b-4">
          <Label
            text={Lines.length === 0 ? "" : `${Lines[0].DocTypeName} - Draft`}
            className="text-black ml-2 font-semibold"
          />
        </div>
        <div className=" grid grid-cols-2 gap-x-10 p-2">
          {objects.map((item, index) => (
            <div key={index}>
              {item.label === "" ? (
                ""
              ) : (
                <DefInput
                  id={item.id}
                  type={item.type}
                  Lcss="mt-2 text-black"
                  label={item.label}
                  className="rounded-sm shadow-none  text-black border-gray-800"
                  value={
                    Lines.length <= 0
                      ? ""
                      : item.id === "vendor"
                      ? Lines[0].Vendor
                      : item.id === "vendorName"
                      ? Lines[0].VendorName
                      : item.id === "branch"
                      ? Lines[0].Branch
                      : item.id === "status"
                      ? Lines[0].Status
                      : item.id === "postingdate"
                      ? Lines[0].DocDate
                      : item.id === "deliverydate"
                      ? Lines[0].DocDueDate
                      : item.id === "docnum"
                      ? Lines[0].DocNum
                      : item.id === "type"
                      ? Lines[0].DocType
                      : ""
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div
          className="mt-2  overflow-auto frame"
          style={{
            maxHeight: "24rem",
          }}
        >
          <DefTable
            columns={columns}
            rows={Lines}
            // handleOption={handleOption}
            btnLabel="scan"
            disabled={true}
            classNametrHead="bg-SAP-header text-black -p-0 -m-0"
            classNameTable="bg-white frame text-black"
            classNameth="bg-SAP-black frame text-black"
            classNametr1="bg-SAP-form text-SAP-form border frame text-black"
            classNametr2="bg-SAP-form text-SAP-form frame text-black"
            className="bg-SAP-form   frame text-black"
            spanCSS="text-black"
          />
        </div>
        <div className=" grid grid-cols-2 gap-x-10 p-2">
          {objects2.map((item, index) => (
            <div key={index}>
              {item.label === "" ? (
                ""
              ) : (
                <div>
                  {item.id === "remarks" ? (
                    <div className="">
                      <Label text="Remarks" className="text-black" />
                      <br></br>
                      <textarea
                        value={Lines[0].Remarks}
                        className="text-black w-full"
                        rows={8}
                      ></textarea>
                    </div>
                  ) : (
                    <DefInput
                      id={item.id}
                      type={item.type}
                      Lcss="mt-2 text-black"
                      label={item.label}
                      className="rounded-sm shadow-none  text-black  border-gray-800"
                      value={
                        Lines.length <= 0
                          ? ""
                          : item.id === "TBD"
                          ? Lines[0].TBD
                          : item.id === "TPD"
                          ? Lines[0].TPB
                          : item.id === "discount"
                          ? Lines[0].DiscPrcnt
                          : item.id === "remarks"
                          ? Lines[0].Remarks
                          : item.id === "owner"
                          ? Lines[0].Owner
                          : ""
                      }
                    />
                  )}
                </div>
              )}
            </div>
          ))}
          {Lines.length <= 0 ? "" : ""}
        </div>
      </div>
      <Footer />
    </>
  );
}
