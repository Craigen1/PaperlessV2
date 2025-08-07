import React, { useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "./ComponentList";

export default function Usageslip2Headers(p) {
  const components = [
    {
      type: "text",
      label: "Proration Type",
      name: "ProrationType",
      span: "6",
      dropDownId: 7,
    },

    {
      type: "text",
      label: "Revision #",
      name: "Revision",
      span: "6",
      dropDownId: 99999,
    },
    {
      type: "text",
      label: "Size",
      name: "Size",
      span: "6",
      dropDownId: 99999,
    },
    {
      type: "date",
      label: "Mnf Date",
      name: "MnfDate",
      span: "3",
    },
    {
      type: "number",
      label: "Batch",
      name: "Batch",
      span: "3",
    },

    {
      type: "text",
      label: "Remarks",
      name: "Remarks",
      span: "6",
    },

    {
      type: "text",
      label: "Station",
      name: "Station",
      span: "3",
      dropDownId: 32,
    },
    {
      type: "text",
      label: "Machine",
      name: "Machine",
      span: "3",
      dropDownId: 905,
    },
  ];
  const [ComponentValueContainer, setComponentValueContainer] = useState({});
  const [RevMap, setRevMap] = useState([]);
  const [SizeMap, setSizeMap] = useState([]);
  const [BomMap, setBomMap] = useState([]);

  const headerHandler = async (e) => {
    const { id, name, value } = e.target;
    console.log({ id, name, value });
    setComponentValueContainer((p) => ({ ...p, [id]: value }));
    if (id === "ProrationType") {
      await EXEC_SQL_InsertOne(977, setRevMap, value);
    } else if (id === "Revision") {
      await EXEC_SQL_InsertOne(
        976,
        setSizeMap,
        ComponentValueContainer["ProrationType"],
        value
      );
    } else if (id === "Size") {
      await EXEC_SQL_InsertOne(
        904,
        //   setBomMap,
        p.setBom,
        ComponentValueContainer["ProrationType"],
        ComponentValueContainer["Revision"],
        value
      );
    } else if (
      id === "SizeClear" ||
      id === "RevisionClear" ||
      id === "ProrationTypeClear"
    ) {
      p.setBom([]);
    }

    if (id === "Machine")
      p.setMachineList((e) => [...e, { code: name, name: value }]);

    if (id === "ProrationTypeClear") handleClear("ProrationType");
    if (id === "RevisionClear") handleClear("Revision");
    if (id === "SizeClear") handleClear("Size");
    if (id === "MachineClear") handleClear("Machine");
    if (id === "StationClear") handleClear("Station");
  };

  const handleClear = (clearID) => {
    setComponentValueContainer((p) => ({ ...p, [clearID]: "" }));
  };

  useEffect(() => {
    p.setheaderInfo(ComponentValueContainer);
  }, [ComponentValueContainer]);
  //   useEffect(() => {

  //   }, [BomMap]);

  return (
    <div className="frame grid   gap-2 py-2">
      {components.map((item, index) => (
        <div key={index}>
          <DefInput
            label={item.name}
            id={item.name}
            clearid={item.name + "Clear"}
            type={item.type}
            dropDownId={item.dropDownId}
            handler={headerHandler}
            disabled={item.disabled}
            map={
              item.name == "Revision"
                ? RevMap
                : item.name == "Size"
                ? SizeMap
                : undefined
            }
            // errorMsg={HeaderErrorMsg[item.name]}
            value={ComponentValueContainer[item.name]}
          />
        </div>
      ))}
      {p.MachineList.map((e, i) => (
        <li key={i}>
          {e.code} - {e.name}
        </li>
      ))}
      <DefButton
        text="Clear Machine"
        onClick={() => p.setMachineList([])}
        className="btn btn-warning w-fit"
      />
    </div>
  );
}
