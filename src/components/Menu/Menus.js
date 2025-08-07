import {
  BackspaceIcon,
  CubeIcon,
  DocumentReportIcon,
  HandIcon,
  LightningBoltIcon,
  PresentationChartLineIcon,
  PuzzleIcon,
  QuestionMarkCircleIcon,
  ScissorsIcon,
  SwitchHorizontalIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  VariableIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useContext } from "react";
import FatherMenu from "./FatherMenu";
import IconViews from "../IconViews";
import { ITopContext } from "../../hooks/TopContext";

export default function Menus(p) {
  const {
    setCanNavigate,
    setuserid,
    setSelectedModule,
    SelectedModule,
    setAllowedModuleids,
    setmsg,
    setretract2,
  } = useContext(ITopContext);
  const MenuComp = [
    {
      module: "production",
      label: "Production",
      finalModule: "Inventory Push",
      icon: CubeIcon,
    },

    {
      module: "logistics",
      label: "Logistics",
      finalModule: "InventoryxPush",
      icon: SwitchHorizontalIcon,
    },
    {
      module: "sales",
      label: "Sales - A/R",
      finalModule: "Selfbilling",
      icon: PresentationChartLineIcon,
    },
    // {
    //   module: "accounting",
    //   label: "Cost Model",
    //   finalModule: "Cost Model",
    //   icon: VariableIcon,
    // },
    // {
    //   module: "safety",
    //   label: "Safety Modules",
    //   finalModule: "How's To Module",
    //   icon: HandIcon,
    // },
    {
      module: "admin",
      label: "Administrator",
      finalModule: "Get Tickets",
      icon: UserGroupIcon,
    },
    {
      module: "reports",
      label: "Reports&Queries",
      finalModule: "Fifo Cardx",
      icon: DocumentReportIcon,
    },
    {
      module: "tools",
      label: "Tools",
      finalModule: "Tools",
      icon: ScissorsIcon,
    },
    // {
    //   module: "test",
    //   label: "Test Realm",
    //   finalModule: "Goods Issue ",
    //   icon: PuzzleIcon,
    // },
    {
      module: "CRM",
      label: "CRM",
      finalModule: "Goods Issue ",
      icon: PuzzleIcon,
    },
  ];

  return (
    <div className="relative h-full ">
      <div className="py-2 h-[100vh flex]  mt-4">
        <div className="overflow-x-hidden   max-h-[100%] min-h-[100%]  ">
          {MenuComp.map((item, index) => (
            <div key={index}>
              <FatherMenu
                module={item.module}
                label={item.label}
                finalModule={item.finalModule}
                icon={item.icon}
                setSelectedModuleid={p.setSelectedModuleid}
                setSelectedModule={p.setSelectedModule}
                setretract2={p.setretract2}
                matches={p.matches}
              />
            </div>
          ))}
        </div>
        {/* <div className="w-full border-b-2 border-trans20 my-2 "></div> */}
        <button
          className=""
          onClick={() => {
            setSelectedModule(32);
            if (p.matches != true) p.setretract2(false);

            setmsg({
              type: "",
              text: ``,
            });
          }}
        >
          <div className="flex  gap-x-2 px-2 rounded-md   mx-2 py-1">
            <UserIcon className="text-black w-6 h-6" />
            <span className="font-semibold">Settings</span>
          </div>
        </button>
        <br />

        <button
          className=""
          onClick={() => {
            // setSelectedModule(32);
            if (p.matches != true) p.setretract2(false);
            setmsg({
              type: "",
              text: ``,
            });
          }}
        >
          <div className="flex  gap-x-2 px-2 rounded-md   mx-2 py-1">
            <QuestionMarkCircleIcon className="text-black w-6 h-6" />
            <span className="font-semibold">Help</span>
          </div>
        </button>
        <br />

        <button
          className=""
          onClick={() => {
            setCanNavigate(true);
            setuserid(0);
            setSelectedModule(44);
            setAllowedModuleids([]);
            setmsg({
              type: "",
              text: ``,
            });
          }}
        >
          <div className="flex  gap-x-2 px-2 rounded-md   mx-2 py-1">
            <BackspaceIcon className="text-black w-6 h-6" />
            <span className="font-semibold">Logout</span>
          </div>
        </button>
      </div>

      {/* <IconViews /> */}
    </div>
  );
}
