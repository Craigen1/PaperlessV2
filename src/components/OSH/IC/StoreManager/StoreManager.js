import React, { useContext, useEffect, useState } from "react";
import StoreManagerHead from "./StoreManagerHead";
import {
  DefButton,
  DefInput,
  DefTableV2,
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertOne,
  RemoveFromGrid,
} from "../../../ComponentList";
import { PencilAltIcon } from "@heroicons/react/outline";
import { ITopContext } from "../../../../hooks/TopContext";

export default function StoreManager() {
  const [HeaderValues, setHeaderValues] = useState([]);
  const [rows, setrows] = useState([]);
  const [getTaskLoad, setgetTaskLoad] = useState(false);
  const { userInfo } = useContext(ITopContext);

  const columns = [
    {
      name: "",
      label: "Remove",
      id: "Option",
      width: "30px",
      editable: "false",
    },
    {
      name: "Assignee",
      label: "Assignee",
      id: "Assignee",
      width: "180px",
      icon: PencilAltIcon,
      editable: "true",
    },
    {
      name: "Store",
      label: "Store",
      id: "Store",
      width: "180px",
      editable: "true",
      icon: PencilAltIcon,
    },
    {
      name: "StoreName",
      label: "StoreName",
      id: "StoreName",
      width: "100%",
      editable: "true",
      icon: PencilAltIcon,
    },
  ];
  const StoreHeader = [
    {
      type: "text",
      label: "Assignee",
      id: "Assignee",
      dropDownId: 860,
    },
    {
      type: "text",
      label: "Store",
      id: "Store",
      dropDownId: 828,
    },
  ];

  function customCss(rows, index) {
    let css = "";
    if (index == 2 && rows == "Done")
      return "my-2 bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 2 && rows == "Pending")
      return "my-2 bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 2 && rows == "In Progress")
      return "my-2 bg-[#96abff] w-fit px-1.5 py-0  rounded-lg text-[#2c3c7b]";

    if (index == 6 && rows == "Medium")
      return "my-2 bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 6 && rows == "Low")
      return "my-2 bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 6 && rows == "High")
      return "my-2 bg-[#ff9696] w-fit px-1.5 py-0  rounded-lg text-[#7b2c2c]";
  }

  const OnChange = (e) => {
    const { id, name, value } = e.target;

    setheader((e) => ({ ...e, [id]: value }));
    console.log({ header });
  };

  const [header, setheader] = useState([]);

  const OptionHandler = async (e) => {
    const { id, name, value, lang } = e.target;
    console.log({ id, name, value, lang });

    await EXEC_SQL_InsertOne(825, setrows, rows[lang].id);
  };

  const onKeyDown = async (e) => {
    const { id, lang } = e.target;
    let xx = e.target.textContent;
    if (e.key != "Enter") return;
  };

  const onChange = (e) => {
    console.log(e);
  };

  const getList = async () => {
    await EXEC_SQL_InsertOne(826, setrows);
  };
  const [addToListResult, setAddToListResult] = useState([]);
  const addTOlist = async (e) => {
    // add to lsit insert
    console.log(header);
    await EXEC_SQL_InsertOne(
      827,
      setAddToListResult,
      userInfo.ID,
      header.Store,
      header.Assignee
    );
    getList();
    alert("Updated!");
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="max-w-[700px] mx-2">
      {/* <StoreManagerHead /> */}
      {StoreHeader.map((item, index) => (
        <div key={index}>
          <DefInput
            label={item.label}
            value={HeaderValues[item.label]}
            handler={OnChange}
            id={item.id}
            dropDownId={item.dropDownId}
            classname=""
          />
        </div>
      ))}

      <div className="flex">
        <div className="w-full"></div>
        <DefButton
          type="10"
          text="Add To List"
          className="whitespace-nowrap  mt-2 mr-1"
          onClick={addTOlist}
        />
      </div>

      <DefTableV2
        columns={columns}
        rows={rows}
        customCss={customCss}
        OptionHandler={OptionHandler}
        loading={getTaskLoad}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
