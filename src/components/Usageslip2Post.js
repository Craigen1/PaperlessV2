import React, { useContext } from "react";
import { DefButton } from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function Usageslip2Postp(p) {
  const { userInfo, setmsg } = useContext(ITopContext);

  function ReturnNullFalse(s, px) {
    if (s == "" || s == undefined || s <= 0) {
      setmsg({
        type: "error",
        text: `Check your Header inputs, all header must not be empty - ${px}`,
      });

      alert(`Check your Header inputs, all header must not be empty - ${px}`);
      return false;
    }

    return true;
  }

  const clearAllHandler = () => {
    let clearButtons = document.getElementsByClassName("clearButton");
    for (let i = 0; i < clearButtons.length; i++) {
      clearButtons[i].click();
    }
  };

  const postUsageSlip = async () => {
    if (!ReturnNullFalse(p.headerInfo.ProrationType, "ProrationType")) return;
    if (!ReturnNullFalse(p.headerInfo.Batch, "Batch")) return;
    if (!ReturnNullFalse(p.headerInfo.Remarks, "Remarks")) return;
    if (!ReturnNullFalse(p.headerInfo.Station, "Station")) return;
    if (!ReturnNullFalse(p.headerInfo.Machine, "Machine")) return;
    if (!ReturnNullFalse(p.headerInfo.Size, "Size")) return;
    if (!ReturnNullFalse(p.headerInfo.Revision, "Revision")) return;
    if (!ReturnNullFalse(p.headerInfo.MnfDate, "MnfDate")) return;

    // console.log(p.headerInfo);
    // return;
    const iInsertUsageSlip = await fetch("InsertUsage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        BOM: p.Bom,
        PRORTYPE: p.headerInfo.ProrationType,
        VOLUME: "",
        BATCH: p.headerInfo.Batch,
        REMARKS: p.headerInfo.Remarks,
        STATION: p.headerInfo.Station,
        Machine: p.headerInfo.Machine,
        Size: p.headerInfo.Size,
        Revision: p.headerInfo.Revision,
        NTSSVer: p.headerInfo.NTSSVer,
        NTSS: 0,
        NTSSSolid: 0,
        NTSSWaer: 0,
        USERID: userInfo.ID,
        MnfDate: p.headerInfo.MnfDate,
        machines: p.MachineList,
        void: 1,
      }),
    }).then((res) => res.json());
    console.log(iInsertUsageSlip);
    if (iInsertUsageSlip.length > 0) {
      setmsg({
        type: "success",
        text: `Transaction success!!`,
      });

      alert(`Transaction success!!}`);
      p.setheaderInfo({});
      p.setBom({});
      clearAllHandler();
    } else {
      setmsg({
        type: "error",
        text: `Something went wrong, contact your admin`,
      });
      alert(`Something went wrong, contact your admin`);
    }
  };

  return (
    <div>
      <DefButton
        onClick={postUsageSlip}
        text="Post Usage Slip"
        className="float-right btn-primary mr-2"
      />
      <DefButton
        onClick={clearAllHandler}
        text="Clear"
        className="w-fit px-2   mr-2 frame btn-warning"
      />
    </div>
  );
}
