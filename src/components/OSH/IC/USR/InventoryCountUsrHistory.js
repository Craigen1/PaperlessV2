import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTableV2,
  EXEC_SQL_InsertOne,
} from "../../../ComponentList";
import { ITopContext } from "../../../../hooks/TopContext";
import {
  CalendarIcon,
  PencilAltIcon,
  PencilIcon,
  SparklesIcon,
  StatusOnlineIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import InventoryCountUsrHistoryOption from "./InventoryCountUsrHistoryOption";

export default function InventoryCountUsrHistory(p) {
  const { DateNow, userInfo } = useContext(ITopContext);
  useEffect(() => {
    let z = new Date();
    z = new Date(z.getFullYear(), z.getMonth(), z.getDate() - 15);
    setDateCovered((e) => ({ ...e, [From]: z }));
  }, []);

  const [DateCovered, setDateCovered] = useState({
    From: DateNow,
    To: DateNow,
  });
  const [loading, setloading] = useState(false);
  const [rows, setrows] = useState([]);

  const columns = [
    {
      name: "",
      label: "Update",
      id: "Option",
      width: "20px",
      editable: "false",
    },
    // {
    //   name: "DocNum",
    //   label: "#",
    //   id: "DocNum",
    //   width: "px",
    //   // icon: ,
    //   editable: "false",
    // },
    {
      name: "StoreCode",
      label: "StoreCode",
      id: "StoreCode",
      width: "200px",
      icon: PencilAltIcon,
      editable: "false",
      colspan: 2,
    },
    {
      name: "StoreName",
      label: "StoreName",
      id: "StoreName",
      width: "180px",
      icon: PencilAltIcon,
      editable: "false",
      colspan: 0,
    },

    {
      name: "Diser",
      label: "Updated By",
      id: "Diser",
      width: "180px",
      editable: "false",
      icon: UserGroupIcon,
    },
    {
      name: "CountDate",
      label: "CountDate",
      id: "CountDate",
      width: "100px",
      editable: "false",
      icon: CalendarIcon,
    },
    {
      name: "status",
      label: "status",
      id: "status",
      width: "80px",
      editable: "false",
      icon: StatusOnlineIcon,
    },
    {
      name: "Remarks",
      label: "Remarks",
      id: "Remarks",
      width: "100%",
      editable: "false",
      icon: PencilIcon,
    },
  ];

  function customCss(rowsValue, Colindex) {
    let css = "";
    // console.log({ rowsValue, Colindex });
    if (Colindex == 5 && rowsValue == "Open")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (Colindex == 5 && rowsValue == "Close")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
  }
  const [OptionTaget, setOptionTaget] = useState();
  const OptionHandler = (e) => {
    const { id, name, value, lang } = e.target;
    setOptionTaget(e);
    console.log({ id, name, value, lang });

    p.setdocumentNum({
      DocNum: OptionTaget.target.id,
      Module: "History",
    });
  };
  const onChange = (e) => {};
  const onKeyDown = (e) => {};
  const Search = async (e) => {
    setloading(true);
    await EXEC_SQL_InsertOne(
      863,
      setrows,
      DateCovered.From,
      DateCovered.To,
      userInfo.ID
    );
    setloading(false);
  };
  const datehandler = (e) => {
    const { id, name, value } = e.target;
    console.log({ id, name, value });
    setDateCovered((e) => ({ ...e, [name]: value }));
  };
  return (
    <div>
      <div className="flex">
        <DefInput
          id="From"
          label="Count Date From"
          type="date"
          value={DateCovered.From}
          handler={datehandler}
        />
        <DefInput
          id="To"
          label="To"
          type="date"
          value={DateCovered.To}
          handler={datehandler}
        />
        <DefButton
          text="Search"
          type="10"
          className="h-fit mt-4"
          onClick={Search}
        />
      </div>
      <div className="overflow-auto">
        <DefTableV2
          columns={columns}
          rows={rows}
          customCss={customCss}
          OptionHandler={OptionHandler}
          loading={loading}
        />
      </div>
      {/* <div>
        <InventoryCountUsrHistoryOption
          documentNum={p.documentNum}
          setdocumentNum={p.setdocumentNum}
          OptionTaget={OptionTaget}
        />
      </div> */}
    </div>
  );
}
