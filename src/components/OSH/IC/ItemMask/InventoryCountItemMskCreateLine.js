import React, { useState } from "react";
import { DefTableV2 } from "../../../ComponentList";
import {
  MenuAlt1Icon,
  PencilAltIcon,
  SparklesIcon,
} from "@heroicons/react/outline";

export default function InventoryCountItemMskCreateLine(p) {
  const columns = [
    {
      name: "",
      label: "Remove",
      id: "Option",
      width: "30px",
      editable: "false",
    },
    {
      name: "SAPItemCode",
      label: "SAP ItemCode",
      id: "SAPItemCode",
      width: "300px",
      icon: MenuAlt1Icon,
      editable: "true",
      dropDownId: [879],
    },

    {
      name: "Mask",
      label: "Mask",
      id: "Mask",
      width: "120px",
      editable: "true",
      icon: SparklesIcon,
    },
  ];

  const [rows, setrows] = useState([]);
  function customCss(rows, index) {
    let css = "";
    if (index == 2 && rows == "Done")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 2 && rows == "Pending")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 2 && rows == "In Progress")
      return "bg-[#96abff] w-fit px-1.5 py-0  rounded-lg text-[#2c3c7b]";

    if (index == 6 && rows == "Medium")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 6 && rows == "Low")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 6 && rows == "High")
      return "bg-[#ff9696] w-fit px-1.5 py-0  rounded-lg text-[#7b2c2c]";
  }

  const OptionHandler = (e) => {
    const { id, name, value, lang } = e.target;
    console.log(e.target);
  };

  const dropDownHandler = (e, ColName, rowIndex) => {
    const { id, name, value, lang } = e.target;
    console.log(e.target, ColName, rowIndex);
    if (id == "clear") return;
    const newRows = rows.map((item, index) => {
      if (index == rowIndex) return { ...item, [ColName]: name, FGCode: value };
    });
    setrows(newRows);
  };

  const [getTaskLoad, setgetTaskLoad] = useState(false);

  const onChange = (e) => {
    console.log(e);
  };

  const onKeyDown = async (e) => {
    // const { id, lang } = e.target;
    // let xx = e.target.textContent;
    // xx = "" + xx + "";
    // if (e.key != "Enter") return;
    // console.log(rows[id]);
  };

  return (
    <div className="">
      <DefTableV2
        columns={columns}
        rows={p.rows}
        customCss={customCss}
        OptionHandler={OptionHandler}
        dropDownHandler={dropDownHandler}
        loading={getTaskLoad}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
