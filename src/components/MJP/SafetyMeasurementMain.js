import React from "react";
import { useState } from "react";
import { DefButton } from "../ComponentList";
import SafetyMeasurementHeader1 from "./SafetyMeasurementHeader1";
import ConfinedSpaceB from "./ConfinedSpaceB";
import Dismantling from "./Dismantling";
import ElectricalWorks from "./ElectricalWorks";
import Handling from "./HandlingOfHazardous";
import HotWorksB from "./HotWorksB";
import PaintingWorks from "./PaintingWorks";
import SpecialSafety from "./SpecialSafety";
import MajorLift from "./MajorLift";
import WorkOnProcess from "./WorksOnProcess";
import PersonalProtective from "./PersonalProtective";
import WorkingAtHeights from "./WorkingAtHeights";
import JobHazardAnalysis from "./JobHazardAnalysis";
import PersonnelUndertaking from "./PersonnelUndertaking";
import SiteInspection from "./SiteInspection";
import JobAuthorization from "./JobAuthorization";
import SignatoriesConfirm from "./SignatoriesConfirm";

export default function SafetyMeasurementMain() {
  const [ConfinedS, setConfinedS] = useState([]);
  const [DismantlingD, setDismantling] = useState([]);
  const [SafetyMsmntH, setSafetyMsmntH] = useState([]);
  const [BriefDesc, setDesc] = useState([]);
  const [HotWorksH, setHotWorks] = useState([]);
  const [SpecialSafetyS, setSpecialSafety] = useState([]);
  const [JobAuthorizationJ, setJobAuthorization] = useState([]);
  const [SignatoriesC, setSignatories] = useState([]);
  const [Table1, setTableSample] = useState([]);
  const [Table2, setTableSample2] = useState([]);
  const [Yname, setYname] = useState([]);
  const [Dtoday, setDtoday] = useState([]);
  const [PPE, setPPE] = useState([]);
  const [WorkingAH, setWorkingAH] = useState([]);
  const [JHAResult, setResult] = useState([]);
  const [JHA, setJHA] = useState([]);

  const handleGetData = () => {
    const formData = {
      SafetyMsmntH,
      BriefDesc,
      ConfinedS,
      DismantlingD,
      HotWorksH,
      SpecialSafetyS,
      JobAuthorizationJ,
      SignatoriesC,
      Table1,
      Table2,
      Yname,
      Dtoday,
      PPE,
      WorkingAH,
      JHAResult,
      JHA,
    };
    console.log(formData);
  };
  return (
    <>
      <main className="bg-[#FFFFFF] text-[#0E0D0D] px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-4xl text-[#0E0D0D]">
            iPiC <span className="text-[#8D4DD0]">WORK PERMIT</span>
          </h1>
        </div>
        <hr />
        <SafetyMeasurementHeader1
          setDesc={setDesc}
          setSafetyMsmntH={setSafetyMsmntH}
        />

        <i className="text-xs text-[#8D4DD0]">
          *Please fill out of your selected work
        </i>
        <ConfinedSpaceB setConfinedS={setConfinedS} />
        <Dismantling setDismantling={setDismantling} />
        <HotWorksB setHotWorks={setHotWorks} />
        <SpecialSafety setSpecialSafety={setSpecialSafety} />
        <ElectricalWorks />
        <Handling />
        <PaintingWorks />
        <MajorLift />
        <WorkOnProcess />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <PersonalProtective setPPE={setPPE} />
          </div>
          <div>
            <WorkingAtHeights setWorkingAH={setWorkingAH} />
          </div>
        </div>

        <JobHazardAnalysis setJHA={setJHA} setResult={setResult} />
        <PersonnelUndertaking setTableSample={setTableSample} />
        <SiteInspection
          setTableSample2={setTableSample2}
          setYname={setYname}
          setDtoday={setDtoday}
        />
        <JobAuthorization setJobAuthorization={setJobAuthorization} />
        <hr />
        <SignatoriesConfirm setSignatories={setSignatories} />
        <div className="mt-2">
          <DefButton
            onClick={handleGetData}
            className="bg-[#8D4DD0] hover:bg-[#6C2CAF] border-none mt-2 h-10 rounded-md w-full text-white cursor-pointer"
            text="Submit"
          />
        </div>
      </main>
    </>
  );
}
