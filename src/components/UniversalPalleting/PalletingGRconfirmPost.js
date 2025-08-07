import React, { useContext, useEffect, useState } from "react";
import { DefButton } from "../ComponentList";
import { formatDate } from "date-fns";
import { ITopContext } from "../../hooks/TopContext";

export default function PalletingGRconfirmPost(p) {
  const { userInfo } = useContext(ITopContext);
  const [PrmiseHandler, setPrmiseHandler] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingLbl, setloadingLbl] = useState(
    " Are you sure you want to post this document?"
  );

  const PostPalleting = async (sessionid) => {
    console.log(p.returns);
    setloadingLbl("Posting Document...");
    setloading(true);
    try {
      console.log("A");
      console.log(p.returns);
      const headerObj = {
        DocType: "dDocument_Items",
        Series: 19,
        BPL_IDAssignedToInvoice: 1,
        U_APP_TransType: "GR01",
        BPLName: "IPIC - VAL",
        U_APP_CheckedBy: p.ComponentValue.CheckedBy,
        U_APP_QAAcceptdBy: p.ComponentValue.QAAcceptedBy,
        U_APP_COANo: p.ComponentValue.CheckedBy,
        U_STONo: p.ComponentValue.STONo,
        U_SupplierName: p.ComponentValue.SupplierName,
        Reference2: p.ComponentValue.FullDr,
        Comments: `${p.ComponentValue.Remarks} By: ${userInfo.firstname
          .substring(1, 2)
          .toUpperCase()} ${userInfo.lastname.toUpperCase()}`,
        DocumentLines: [],
      };
      for (let i = 0; i < p.rows.length; i++) {
        const item = p.rows[i];
        const docLine = {
          LineNum: i,
          ItemCode: item.ITEM,
          Quantity: parseFloat(item.Quantity),
          WarehouseCode: p.ComponentValue.WarehouseCode,
          AccountCode: p.ComponentValue.AccountCode,
          CostingCode: p.ComponentValue.CostingCode,
          CostingCode2: p.ComponentValue.CostingCode2,
          CostingCode3: p.ComponentValue.CostingCode3,
          UoMCode: item.UoM,
          BatchNumbers: [],
        };

        for (let j = 0; j < p.returns.length; j++) {
          const item2 = p.returns[j];
          if (
            item2.itemCode === item.ITEM &&
            formatDate(item.MNF, "yyyy-MM-dd") ===
              formatDate(item2.MnfDete, "yyyy-MM-dd")
          ) {
            docLine.BatchNumbers.push({
              BatchNumber: item2.Batch,
              ExpiryDate: formatDate(item2.ExpDate, "yyyy-MM-dd"),
              ManufacturingDate: formatDate(item2.MnfDete, "yyyy-MM-dd"),
              Quantity: parseFloat(item2.PalletQty),
              BaseLineNumber: i,
              U_APP_PalId: item2.palletId,
              ItemCode: item2.itemCode,
              U_FullDRNum: p.ComponentValue.FullDr,
              U_Drum: item2.DRUMNO,
              U_NetWeight: item2.NETWGT,
            });
          }
        }

        if (docLine.BatchNumbers.length > 0) {
          headerObj.DocumentLines.push(docLine);
        }
      }
      console.log("Returns", p.returns);
      console.log("GR Payload", headerObj);

      const response = await fetch(`GRBATCH_MJ`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          batchcode: p.returns.map((row) => row?.Batch).flat(),
          itemcode: p.returns.map((row) => row?.itemCode).flat(),
          fulldrnum: p.ComponentValue.FullDr,
        }),
      });
      const data = await response.json();

      const normalizeString = (str) => {
        return str.replace(/[^a-zA-Z0-9]/g, "");
      };
      let distNumbers = data.batch
        .map((item) => item?.DistNumber)
        .filter(Boolean);
      let batchcodes = p.rows.map((item) => item?.BATCHCODE).filter(Boolean);
      const isMatch = distNumbers.some((distNumber) => {
        return batchcodes.some((batch) => {
          return normalizeString(distNumber).includes(normalizeString(batch));
        });
      });

      console.log("Batch Numbers from SAP", distNumbers);

      console.log("Data from SAP", data);
      // if (data && data.dr[0]?.DRNum === p.ComponentValue.FullDr) {
      //   setloading(false);
      //   setloadingLbl(
      //     `DR# ${data.dr[0]?.DRNum} has already been posted. Posting is not allowed.`
      //   );
      // } else
      if (data && isMatch) {
        setloading(false);
        setloadingLbl(
          `BatchCode "${batchcodes}" has already been used. Posting is not allowed.`
        );
      } else {
        const postResponse = await fetch("SERVERLAYER_POST_APIV3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify(headerObj),
            session: sessionid,
            objectType: "InventoryGenEntries",
          }),
        });
        const postData = await postResponse.json();
        setPrmiseHandler(postData);
        // setloadingLbl("Posted pero joke lang!");
        setloading(false);
      }
    } catch (error) {
      console.log("Error during posting:", error);
      setloadingLbl("An error occurred");
      setloading(false);
    }
  };

  const Login = async (e) => {
    setloadingLbl("Logging into SAP");
    setloading(true);
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
      setloadingLbl(`Logged in to SAP, ID `);
      if (d.SessionId !== undefined) {
        await PostPalleting(d.SessionId);
      }
    } catch (error) {
      console.log("Error during login:", error);
      setloading(false);
    }
  };
  useEffect(() => {
    if (PrmiseHandler == "") return;
    if (PrmiseHandler == "200") {
      p.setSelectedMenu(1);
      alert(`${PrmiseHandler}: Posted, you' re the best! 😉`);
      setloadingLbl(`${PrmiseHandler}: "Posted, you' re the best! 😉"`);
    }

    if (PrmiseHandler == "400") {
      setloadingLbl(`${PrmiseHandler}: Document Posted`);
      alert(
        `${PrmiseHandler}: Something went wrong please contact your Administrator`
      );
    }
    setPrmiseHandler("");
  }, [PrmiseHandler]);

  return (
    <div className="flex flex-col mt-2">
      <p className="text-center mt-2 text-lg whitespace-nowrap">{loadingLbl}</p>
      <div className="flex gap-6 justify-center">
        <button
          className="text-white bg-[#f51818] py-1 px-3 rounded-lg"
          onClick={() => p.setsureToPost(false)}
        >
          Cancel
        </button>
        <button
          className="text-white bg-[#1f9232] py-1 px-3 rounded-lg"
          onClick={Login}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
