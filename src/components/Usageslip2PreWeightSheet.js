import React, { useContext, useState } from "react";
import { DefButton, DefMenus } from "./ComponentList";
import Usageslip2menu from "./Usageslip2menu";
import Usageslip2Headers from "./Usageslip2Headers";
import Usageslip2Table from "./Usageslip2Table";
import { ITopContext } from "../hooks/TopContext";
import Usageslip2Post from "./Usageslip2Post";
import UsageSlipHistory from "./UsageSlipHistory";
import Usageslip2History from "./Usageslip2History";
import Help from "./Help";
import MaterialUsage2PREWeighSheet from "./MaterialUsage2PREWeighSheet";
import Usageslip2PreWeightSheetTable from "./Usageslip2PreWeightSheetTable";

export default function Usageslip2PreWeightSheet() {
  const [SelectedMenu, setSelectedMenu] = useState(0);
  const [Bom, setBom] = useState([]);
  const [MachineList, setMachineList] = useState([]);

  const [headerInfo, setheaderInfo] = useState({});
  const menus = [
    {
      id: 0,
      text: "Request",
    },
    {
      id: 1,
      text: "History",
    },
    {
      id: 2,
      text: "History - Horizontal ",
    },
    {
      id: 3,
      text: "Help",
    },
  ];
  return (
    <>
      {/* <Usageslip2menu
        setSelectedMenu={setSelectedMenu}
        SelectedMenu={SelectedMenu}
      /> */}

      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />

      {SelectedMenu == 0 && (
        <div className="max-w-4xl">
          <Usageslip2Headers
            setMachineList={setMachineList}
            MachineList={MachineList}
            setBom={setBom}
            setheaderInfo={setheaderInfo}
          />
          <Usageslip2Table Bom={Bom} setBom={setBom} />
          <Usageslip2Post
            headerInfo={headerInfo}
            setheaderInfo={setheaderInfo}
            Bom={Bom}
            MachineList={MachineList}
            setMachineList={setMachineList}
            setBom={setBom}
          />
        </div>
      )}
      {SelectedMenu == 1 && <Usageslip2History />}
      {SelectedMenu == 3 && (
        <Help
          titl="How to Usage Usage Slip "
          link="https://app.tango.us/app/embed/c00ff925-7563-43ed-bf24-2972da66962b"
        />
      )}

      {SelectedMenu == 2 && <Usageslip2PreWeightSheetTable />}
    </>
  );
}
