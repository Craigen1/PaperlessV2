import { UserCircleIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import ChildMenu from "./ChildMenu";
import { ITopContext } from "../../hooks/TopContext";

export default function FatherMenu(p) {
  const {
    setCanNavigate,
    setuserid,
    setSelectedModule,
    SelectedModule,
    setAllowedModuleids,
  } = useContext(ITopContext);
  const [retract, setretract] = useState(true);
  const [hasChild, sethasChild] = useState(true);
  return (
    <>
      {hasChild && (
        <button
          className="mb-2"
          onClick={() => {
            setretract(!retract);
          }}
        >
          <div className="flex  gap-x-2 px-2 rounded-md bg-[#f8f8f8] hover:bg-trans20 w-48 mx-2 py-1">
            <p.icon className="text-black w-6 h-6" />
            <span className="font-semibold ">{p.label}</span>
          </div>
        </button>
      )}

      <ChildMenu
        folder={retract && p.module}
        module={p.module}
        finalModule={p.finalModule}
        setSelectedModuleid={p.setSelectedModuleid}
        setSelectedModule={p.setSelectedModule}
        setretract2={p.setretract2}
        matches={p.matches}
        sethasChild={sethasChild}
      />
    </>
  );
}
