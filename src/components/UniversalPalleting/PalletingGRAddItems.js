import React, { useEffect, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../ComponentList";

export default function PalletingGRAddItems(p) {
  const components = [
    {
      text: "ITEM",
      id: "ITEM",
      type: "text",
      colspan: "2   ",
      disabled: false,
      dropDownId: 804,
    },
    {
      text: "Quantity",
      id: "Quantity",
      type: "number",
      colspan: "1",
      disabled: false,
    },
    {
      text: "Suffix",
      id: "Suffix",
      type: "type",
      colspan: "1",
      disabled: false,
    },
    {
      text: "MNF",
      id: "MNF",
      type: "date",
      colspan: "1",
      disabled: false,
    },
    {
      text: "EXP",
      id: "EXP",
      type: "date",
      colspan: "1",
      disabled: false,
    },
    {
      text: "UoM",
      id: "UoM",
      type: "text",
      colspan: "1",
      disabled: true,
    },

    {
      text: "PALLET SIZE",
      id: "PalletSize",
      type: "number",
      colspan: "1",
      disabled: true,
    },
  ];

  const [compValue, setcompValue] = useState({ Quantity: 0 });
  const [ItemInfo, setItemInfo] = useState([]);
  const compHandler = async (e) => {
    const { value, id, name } = e.target;
    setInvalids([]);
    setcompValue((e) => ({ ...e, [id]: value }));
  };
  const [getLoading, setgetLoading] = useState(false);
  const [refreshme, setrefreshme] = useState(true);

  const handleAdd = (e) => {
    let isAllow = true;
    components.map((item) => {
      isAllow = invalidsChecker(compValue[item.id], item.id, isAllow);
    });

    p.rows.map((item) => {
      if (isAllow == false) return;
      if (item.ITEM == compValue.ITEM && item.MNF == compValue.MNF) {
        isAllow = false;
        alert("Item Already  added (same itemcode and MNF Date)");
      }
    });
    if (isAllow === false) return;

    p.setrows((e) => [...e, { ...compValue }]);
    let clearButtons = document.getElementsByClassName("additemsComp");
    for (let i = 0; i < clearButtons.length; i++) {
      clearButtons[i].value = "";
    }
    alert("Item Added");
    setItemInfo([]);
    setcompValue([]);
  };
  const [invalids, setInvalids] = useState([]);
  const invalidsChecker = (obj, lbl, isAllow) => {
    if (isAllow === false) return false;
    if (obj == "" || obj == undefined) {
      setInvalids((e) => ({ ...e, [lbl]: "invalid" }));
      return false;
    } else {
      return true;
    }
  };
  const getItemInfo = async (e) => {
    setgetLoading(true);
    await EXEC_SQL_InsertOne(805, setItemInfo, compValue.ITEM);
    setgetLoading(false);
  };

  useEffect(() => {
    getItemInfo();
  }, [compValue.ITEM]);

  useEffect(() => {
    console.log("X");
    if (ItemInfo.length > 0) {
      setcompValue((e) => ({ ...e, PalletSize: ItemInfo[0].PalletSize }));
      setcompValue((e) => ({ ...e, UoM: ItemInfo[0].Uom }));
    }
  }, [ItemInfo]);

  return (
    <div>
      <div className="absolute top-0 left-0 bg-[#00000033] w-[100%]  h-[100vh] ">
        <div className="   h-[100vh]  max-w-[512px] frame bg-white mx-auto   shadow-md absolute right-0 top-0">
          <div className="flex w-full">
            <h2 className="font-sans p-2 m-2 w-full pb-4">Add Item</h2>
          </div>
          <div className="">
            {refreshme && (
              <>
                {components.map((item, index) => (
                  <div className={`col-span-${item.colspan}`}>
                    <DefInput
                      label={item.text}
                      type={item.type}
                      id={item.id}
                      disabled={item.disabled}
                      className="min-w-[350px] max-w-[350px] additemsComp"
                      dropDownId={item.dropDownId}
                      handler={compHandler}
                      value={compValue[item.id]}
                      setvalue={setcompValue}
                      errorMsg={invalids[item.id]}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="w-full flex mt-2 justify-between px-2">
            <DefButton
              type="11"
              text="Close"
              className="btn-warning mt-2"
              onClick={() => p.setcloseModal(false)}
            />
            <DefButton
              type="10"
              text="Add"
              className="btn-primary"
              onClick={handleAdd}
              loading={getLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
