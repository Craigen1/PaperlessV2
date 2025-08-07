import React, { useContext, useEffect, useState } from "react";
import PalletingOshHeader from "./PalletingOshHeader";
import PalletingOshForPalleting from "./PalletingOshForPalleting";
import PalletingOshPalleted from "./PalletingOshPalleted";
import PalletingOshAdditionalOptions from "./PalletingOshAdditionalOptions";
import {
  DefButton,
  DefMenus,
  EXEC_SQL,
  EXEC_SQLI,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
} from "../../ComponentList";
import { LoadingSpinner } from "../../../assets/SVGs";
import { ITopContext } from "../../../hooks/TopContext";
import { async } from "q";
import PalletingOshRefresh from "./PalletingOshRefresh";
import Palleting_OSHHistory from "./Palleting_OSHHistory";

export default function PalletingOsh() {
  const { userInfo, DateNow } = useContext(ITopContext);

  const [headerRows, setheaderRows] = useState([]);
  const [FinalHeader, setFinalHeader] = useState([]);
  const [PalletedRows, setPalletedRows] = useState([]);
  const [Rfp, setRfp] = useState(0);
  const [mnfDateLoose, setMnfDateLoose] = useState("");
  const [QtyLoose, setQtyLoose] = useState(0);
  const [isLoose, setisLoose] = useState(false);
  const [Palleted, setPalleted] = useState([]);

  const [GetLoosePalletHolder, setGetLoosePalletHolder] = useState([]);

  const [LoosePalletDetails, setLoosePalletDetails] = useState({
    MNFDate: "",
    Quantity: "",
    LoosePallet: "",
    ITNum: "",
  });
  const [loading867, setLoading867] = useState(false);
  const getLoosePallet = async (e) => {
    setLoading867(true);
    let mnf = headerRows[0].MnfDate.substring(0, 10);
    await EXEC_SQL_InsertOne(
      867,
      setGetLoosePalletHolder,
      headerRows[0].ItemCode,
      mnf,
      headerRows[0].Machine
    );
    setLoading867(!true);
  };
  const Login = async (e) => {
    try {
      const x = await fetch("API_LOGIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          USER: "B1_GENERAL",
          PASS: "!1@2P@ss",
        }),
      });
      const d = await x.json();
      console.log(d.SessionId);

      if (d.SessionId != undefined) {
        await PostPalleting(d.SessionId);
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const [prmiseHandler, setPrmiseHandler] = useState([]);
  const PostPalleting = async (sessionid) => {
    try {
      console.log({ FinalHeader });
      console.log({ headerRows });
      console.log({ Palleted });

      var header = JSON.stringify({
        DocType: "dDocument_Items",
        DocDate: DateNow,
        CardCode: "OSH0000001",
        NumAtCard: FinalHeader.CustomerRef,
        Comments: FinalHeader.Remarks, // remarks
        U_APP_DRNo: FinalHeader.DocNUm,
        Series: 6,
        BPL_IDAssignedToInvoice: 1,
        DocumentsOwner: FinalHeader.Owner, // -- to be add
        U_APP_PACKER: FinalHeader.Packer, // -- to be add
        U_APP_PALLETIZER: FinalHeader.Palletizer, // -- to be add
        U_APP_RECEIVEDBY: FinalHeader.ReceivedBy, // -- to be add
        U_APP_RELEASEDBY: FinalHeader.ReleaseBy, // -- to be add
      });

      header = header.substring(0, header.length - 1);
      header += ' ,"DocumentLines": [ ';

      Palleted.map((item, index) => {
        header += JSON.stringify({
          LineNum: index,
          ItemCode: headerRows[0].ItemCode,
          Quantity: item.palletQty,
          Price: headerRows[0].price,
          WarehouseCode: headerRows[0].WhseFrom,
          AccountCode: headerRows[0].AcctCode,
          COGSCostingCode2: headerRows[0].OcrCode2,
          COGSCostingCode3: headerRows[0].OcrCode3,
          U_APP_PalletNo: headerRows[0].OcrCode3,
          U_DPUR: headerRows[0].DPUR,
          U_MnfDate: headerRows[0].MnfDate,
          U_APP_PalletNo: item.palletId,
        });
        header = header.substring(0, header.length - 1);
        header += ' ,"BatchNumbers": [ ';
        header += JSON.stringify({
          BatchNumber: item.Batch,
          Quantity: item.palletQty,
          ItemCode: item.ItemCode,
          BaseLineNumber: index,
        });
        header = header.substring(0, header.length - 1);
        header += "}]},";
      });
      header = header.substring(0, header.length - 1);
      header += "]}";

      const req = await fetch("SERVERLAYER_POST_APIV4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          body: header,
          session: sessionid,
          objectType: "DeliveryNotes",
        }),
      });
      // .then((data) => {
      //   try {
      //     let xx = data.json().then((e) => {
      //       setPrmiseHandler(e);
      //     });
      //     console.log({ xx });
      //   } catch (error) {}
      // })
      // .then()
      // .catch((error) => {
      //   console.log({ error });
      // });

      const response = await req.json();
      //console.log("body is " + response.body.needToBeVoted);
      console.log("body is " + JSON.stringify(response.body));
      console.log("status is " + response.status);
      console.log("all response is " + JSON.stringify(response));
      console.log("bodyUsed " + JSON.stringify(response.bodyUsed));
      alert(
        JSON.stringify(response).length > 0 ? JSON.stringify(response) : "200"
      );
      alert(JSON.stringify(response));
      console.log(header);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    console.log("xx");
    if (PalletedRows.length > 0)
      setLoosePalletDetails({
        MNFDate: "",
        Quantity: "",
        LoosePallet: "",
        ITNum: "",
      });
    else getLoosePallet();
  }, [headerRows]);

  useEffect(() => {
    if (GetLoosePalletHolder.length <= 0) return;
    console.log("hey!");
    let mnfx = GetLoosePalletHolder[0].MNFDATE.substring(0, 10);
    console.log({ mnfx });
    setLoosePalletDetails({
      MNFDate: mnfx,
      Quantity: GetLoosePalletHolder[0].QTYSUM,
      LoosePallet: GetLoosePalletHolder[0].isLossPallet == 0 ? "True" : "False",
      ITNum: GetLoosePalletHolder[0].DocNum,
      PalletId: GetLoosePalletHolder[0].U_palletid,
    });
  }, [GetLoosePalletHolder]);

  // get palleted base on loose pallet
  const [palletizeCounter, setPalletizeCounter] = useState(0);
  const Palletize = async (e) => {
    console.log();
    await EXEC_SQL_InsertOne(
      871,
      setPalleted,
      LoosePalletDetails.PalletId,
      LoosePalletDetails.Quantity,
      Rfp,
      LoosePalletDetails.MNFDate
    );
  };

  const menus = [
    {
      id: 0,
      text: "Palletize",
    },
    {
      id: 1,
      text: "History",
    },
    {
      id: 2,
      text: "Help",
    },
    {
      id: 3,
      text: "Refresh",
    },
  ];
  const [SelectedMenuId, setSelectedMenuId] = useState(0);

  useEffect(() => {
    if (prmiseHandler == "200") {
      setLoosePalletDetails([]);
      setheaderRows([]);
      setFinalHeader([]);
      setSelectedMenuId(3);
      setPrmiseHandler("");
      alert("Document Posted");
    } else if (prmiseHandler != "")
      alert(`Document Error please contact your admin : ${prmiseHandler}`);
  }, [prmiseHandler]);

  return (
    <>
      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />

      {SelectedMenuId == "0" && (
        <>
          <div>
            <PalletingOshHeader
              setLoosePalletDetails={setLoosePalletDetails}
              setheaderRows={setheaderRows}
              setRfp={setRfp}
              setPalleted={setPalleted}
              setFinalHeader={setFinalHeader}
            />

            <PalletingOshForPalleting
              headerRows={headerRows}
              setheaderRows={setheaderRows}
            />

            <PalletingOshPalleted
              PalletedRows={Palleted}
              setheaderRows={setPalleted}
            />
            {!loading867 ? (
              <>
                <PalletingOshAdditionalOptions
                  LoosePalletDetails={LoosePalletDetails}
                  setLoosePalletDetails={setLoosePalletDetails}
                />

                <DefButton
                  type="10"
                  text="Palletize"
                  className=" "
                  onClick={Palletize}
                />
              </>
            ) : (
              <div className="flex">
                <p>Loose Pallet</p>
                <LoadingSpinner />
              </div>
            )}
            {/* {prmiseHandler.map((item) => (
        <>{item}</>
      ))} */}
            <DefButton
              type="10"
              text="Post"
              className=" mx -2 "
              onClick={Login}
            />
          </div>
        </>
      )}
      {SelectedMenuId == "1" && <Palleting_OSHHistory />}
      {SelectedMenuId == "3" && (
        <PalletingOshRefresh
          setSelectedMenuId={setSelectedMenuId}
          setLoosePalletDetails={setLoosePalletDetails}
          setheaderRows={setheaderRows}
          setRfp={setRfp}
          setPalleted={setPalleted}
          setFinalHeader={setFinalHeader}
        />
      )}
    </>
  );
}
