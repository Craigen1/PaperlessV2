import React, { useState } from "react";
import PortfHeader from "./PortfHeader";
import PotfTabs from "./PotfTabs";
import PortfExp from "./PortfExp";
import PortfAbout from "./PortfAbout";
import PortfProjects from "./PortfProjects";

export default function Portf() {
  const [tabIndex, settabIndex] = useState("0");
  return (
    <>
      <PortfHeader />
      <div className="h-2" />
      <PotfTabs tabIndex={tabIndex} settabIndex={settabIndex} />
      <div className="h-6" />
      {tabIndex == 0 ? <PortfAbout /> : ""}
      {tabIndex == 1 ? <PortfExp /> : ""}
      {tabIndex == 2 ? <PortfProjects /> : ""}
    </>
  );
}
