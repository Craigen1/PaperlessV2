import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL_InsertOne,
  RemoveFromGrid,
} from "../../../ComponentList";
import InventoryCountItemMskCreateLine from "./InventoryCountItemMskCreateLine";

export default function InventoryCountItemMskCreate() {
  const components = [
    {
      label: "Store",
      id: "Store",
      type: "text",
      placeholder: "Select Store",
      dropDownId: 880,
      disable: false,
      css: "",
    },

    {
      label: "Item Code",
      id: "ItemCode",
      type: "text",
      placeholder: "Select ItemCode",
      dropDownId: 879,
      disable: false,
      css: "",
    },

    {
      label: "Item Mask",
      id: "ItemMask",
      type: "text",
      placeholder: "Select Item Mask",
      disable: false,
      css: "",
    },
  ];
  const [rows, setRows] = useState([]);
  const [headerValues, setheaderValues] = useState([]);
  const columns = [
    {
      name: "Option",
      disabled: true,
      colspan: 1,
    },
    {
      name: "id",
      disabled: true,
      colspan: 1,
    },
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "ITEMNAME",
      disabled: true,
      colspan: 0,
    },
    {
      name: "ItemMask",
      disabled: true,
      colspan: 1,
    },
  ];
  const OnchangeHandler = async (e) => {
    const { value, id, name } = e.target;
    setheaderValues((e) => ({ ...e, [id]: value }));
    setInvalids((e) => ({ ...e, [id]: "" }));

    const Datenw = new Date();

    if (id == "Store")
      await EXEC_SQL_InsertOne(
        830,
        setRows,
        e.target.value,
        Datenw.toISOString().substring(0, 10)
      );
  };
  const [invalids, setInvalids] = useState([]);
  useEffect(() => {
    console.log({ headerValues });
  }, [headerValues]);

  const invalidsChecker = (isAllow, obj, lbl) => {
    console.log({ obj, lbl });
    if (isAllow == true) return isAllow;
    if (obj == "" || obj == undefined) {
      setInvalids((e) => ({ ...e, [lbl]: "invalid" }));
      return true;
    } else {
      return false;
    }
  };
  const handleOption = async (e) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      await EXEC_SQL_InsertOne(
        829,
        setRows,
        headerValues.Store,
        rows[e.target.id].id
      );
      RemoveFromGrid(rows, setRows, e.target.id);
      alert("Updated");
    } else {
      alert("nope");
    }
  };

  const Add = async (e) => {
    let isAllow = false;
    setInvalids([]);
    isAllow = invalidsChecker(isAllow, headerValues.Store, "Store");
    isAllow = invalidsChecker(isAllow, headerValues.ItemCode, "ItemCode");
    isAllow = invalidsChecker(isAllow, headerValues.ItemMask, "ItemMask");
    console.log(isAllow);
    if (isAllow) return;
    await EXEC_SQL_InsertOne(
      831,
      setRows,
      headerValues.Store,
      headerValues.ItemCode,
      headerValues.ItemMask
    );

    setheaderValues((e) => ({ ...e, ItemCode: "" }));
    setheaderValues((e) => ({ ...e, ItemMask: "" }));
  };
  return (
    <div className="max-w-[712px]">
      <div>
        {components.map((item, i) => (
          <>
            <DefInput
              label={item.id}
              id={item.id}
              placeholder={item.placeholder}
              type={item.type}
              dropDownId={item.dropDownId}
              handler={OnchangeHandler}
              // map={item.id == "Project" ? projectName : undefined}
              className="border-0"
              errorMsg={invalids[item.id]}
            />
          </>
        ))}
      </div>
      <div className="w-full flex">
        <div className="w-full"></div>
        <DefButton
          text="Update"
          type="10"
          className="mt-2 mr-2"
          onClick={Add}
        />
      </div>
      <br />
      <div className="overflow-auto mt-2p px-1 frame">
        <DefTable
          columns={columns}
          rows={rows}
          btnCss="w-fit "
          btnLabel="Remove"
          spanCSS="w-full"
          handleOption={handleOption}
          // onChange={handleCHange}
        />
      </div>
      {/* <InventoryCountItemMskCreateLine rows={rows} setrows={setRows} /> */}
    </div>
  );
}
