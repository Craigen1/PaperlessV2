import React, { useContext, useState } from "react";
import { DefButton, EXEC_SQL_InsertOne } from "./ComponentList";
import { ITopContext } from "../hooks/TopContext";

export default function UsermasterSapLicense(p) {
  const { userInfo } = useContext(ITopContext);

  const [Users, setUsers] = useState([
    { code: "manager", name: "manager", id: "70" },
    { code: "manager2", name: "Manager Test Account", id: "71" },
    { code: "CABLFIN01", name: "Purchasing - CAB", id: "3" },
    { code: "CABLLOG01", name: "Production Staff *", id: "4" },
    { code: "CABLLOG02", name: "Production Supervisor", id: "5" },

    { code: "CABLLOG03", name: "CABLLOG03", id: "88" },
    { code: "CABLLOG04", name: "CABLLOG04", id: "89" },
    { code: "CABLLOG05", name: "CABLLOG05", id: "90" },
    { code: "CABLLOG06", name: "CABLLOG06", id: "91" },
    {
      code: "IPICGCEN01",
      name: "Centralized Requester 1",
      id: "8",
    },
    { code: "IPICGCEN02", name: "Centralized Requester 2", id: "9" },
    { code: "IPICLLOG01", name: "Production", id: "10" },
    { code: "IPICLLOG02", name: "QA, R&D, Safety and HR", id: "17" },
    { code: "IPICLLOG03", name: "Engineering & Utilities *", id: "112" },
    { code: "IPICLLOG05", name: "IPICLLOG05", id: "95" },
    { code: "IPICLLOG07", name: "Production Staff", id: "18" },
    {
      code: "IPICLLOG08",
      name: "IBL Logistic Staff - DMPI",
      id: "84",
    },
    { code: "IPICLLOG09", name: "R&D Staff", id: "23" },
    { code: "IPICLLOG10", name: "Safety Staff", id: "25" },
    { code: "IPICLLOG11", name: "HR Staff", id: "26" },
    { code: "IPICLLOG13", name: "Inventory/FA Staff", id: "27" },
    { code: "IPICLLOG14", name: "IBL Logistics Staff", id: "29" },
    { code: "IPICLLOG15", name: "R&D Supervisor", id: "30" },
    { code: "IPICLLOG16", name: "IBL Logistics Supervisor", id: "31" },
    { code: "IPICLLOG17", name: "Production Supervisor 1", id: "32" },
    {
      code: "IPICLLOG18",
      name: "Engineering & Utilities Supervisor",
      id: "33",
    },
    { code: "IPICLLOG19", name: "QA Supervisor", id: "34" },
    { code: "IPICLLOG20", name: "OBL Logistic Staff", id: "35" },
    { code: "IPICLLOG21", name: "OBL Logistic Supervisor", id: "36" },
    { code: "IPICLLOG22", name: "Production Staff - KKM *", id: "107" },
    { code: "IPICLLOG23", name: "IBL Logistic Staff - KKM", id: "37" },
    { code: "IPICLLOG24", name: "IBL Logistic Staff - DMPI", id: "39" },
    { code: "IPICLLOG25", name: "IBL Logistic Staff - DMPI", id: "83" },

    { code: "IPICLLOG26", name: "OBL Logistic Staff - DMPI/KKM", id: "40" },
    { code: "IPICLLOG28", name: "TPM", id: "42" },
    { code: "IPICLLOG29", name: "MMSM Dept.", id: "44" },
    { code: "IPICLLOG31", name: "IBL Logistic Supervisor - ULP", id: "45" },
    { code: "IPICLLOG32", name: "R&D Regulatory Officer", id: "47" },
    { code: "IPICLLOG33", name: "IBL Logistics Supervisor 2", id: "48" },
    { code: "IPICLLOG34", name: "IBL Logistic Staff - ULP 2", id: "49" },
    { code: "IPICLLOG35", name: "R&D Manager", id: "50" },
    { code: "IPICLLOG36", name: "Production Staff Sauce *", id: "108" },
    { code: "IPICLLOG37", name: "Production Staff Sauce *", id: "109" },
    { code: "IPICLLOG38", name: "Production Staff Sauce *", id: "110" },
    { code: "IPICLLOG39", name: "Production Staff Sauce *", id: "111" },
    { code: "IPICLLOG43", name: "OSH Staff", id: "51" },
    { code: "IPICLLOG44", name: "Health Department", id: "59" },
    { code: "IPICLLOG45", name: "Eng. Dep", id: "59" },
    { code: "IPICLLOG46", name: "OSH Logistic Supervisor 2", id: "86" },
    { code: "IPICLLOG47", name: "IPICPLOG47", id: "92" },
    { code: "IPICLLOG48", name: "IPICPLOG48", id: "93" },

    { code: "IPICPADM02", name: "SAP Lead", id: "60" },
    { code: "IPICPADM05", name: "Administrator", id: "62" },
    { code: "IPICPLOG01", name: "Logistics", id: "65" },
    { code: "IPICPLOG02", name: "Arth.KSL", id: "68" },
    { code: "IPICPLOG03", name: "SAP Operations", id: "69" },

    { code: "IPICPLOG04", name: "OSH Production Manager", id: "107" },
    { code: "OSHLCRM01", name: "OSH Sales & Marketing", id: "72" },
    { code: "OSHLCRM02", name: "OSH Sales & Marketing Staff", id: "73" },
    { code: "OSHLCRM03", name: "OSH Sales Supervisor", id: "74" },
    { code: "OSHLCRM04", name: "OSH Marketing Supervisor", id: "75" },
    { code: "OSHLCRM05", name: "OSH Sales Staff", id: "76" },
    { code: "OSHLCRM06", name: "OSH Supply Chain Supervisor", id: "77" },
    { code: "OSHLCRM07", name: "OSH Marketing Staff", id: "78" },
    { code: "OSHLCRM08", name: "OSH Marketing Staff 2", id: "79" },
    { code: "OSHLCRM09", name: "OSH Export Manager", id: "80" },
    { code: "OSHLSC01", name: "OSH - Logistics Staff 1", id: "81" },
    { code: "OSHLSC02", name: "OSH - Logistics Staff 2", id: "82" },

    { code: "IPICLLOG49", name: "OSH Production Encoder", id: "94" },
    { code: "IPICLLOG50", name: "Planner", id: "96" },
    { code: "IPICLLOG51", name: "QA Supervisor 2", id: "97" },
    { code: "IPICLLOG52", name: "Planning AIS Staff", id: "98" },
    { code: "IPICLLOG53", name: "Purchasing 3 *", id: "99" },
    { code: "IPICLLOG54", name: "Materials Planner", id: "106" },
    // { code: "IPICLLOG55", name: "IPICLLOG55", id: "100" },
    // { code: "IPICLLOG56", name: "IPICLLOG56", id: "101" },
    //  { code: "IPICLLOG57", name: "IPICLLOG57", id: "102" },
    // { code: "IPICLLOG58", name: "IPICLLOG58", id: "103" },
    // { code: "IPICLLOG59", name: "IPICLLOG59", id: "104" },
    // { code: "IPICLLOG60", name: "IPICLLOG60", id: "105" },
  ]);
  const [assignResult, setAssignResult] = useState([]);
  const AssignUserTo = async (e) => {
    const { id, type } = e.target;
    // console.log(Users[i]);
    await EXEC_SQL_InsertOne(
      924,
      setAssignResult,
      p.selectedUserInfo.id,
      Users[id].code
    );
  };

  return (
    <>
      <div className="">
        {Users.map((item, index) => (
          <div className=" flex shadow-sm" key={index}>
            <div className="mr-4">
              <DefButton
                type="2B"
                text="Assign"
                id={index}
                onClick={AssignUserTo}
              />
            </div>
            <div className="mr-4">{item.code}</div>
            <div className="">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
