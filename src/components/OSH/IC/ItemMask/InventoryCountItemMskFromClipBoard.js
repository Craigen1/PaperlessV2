import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTableV2,
  EXEC_SQL_InsertMulti_V2,
} from "../../../ComponentList";
import {
  CashIcon,
  CubeIcon,
  CubeTransparentIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

export default function InventoryCountItemMskFromClipBoard() {
  const [row, setrow] = useState([]);
  const [columns, setcolumns] = useState([
    {
      name: "",
      label: "",
      id: "Option",
      width: "0px",
      editable: "false",
    },
    {
      name: "Mask",
      label: "Mask",
      id: "Mask",
      width: "100px",
      icon: CubeTransparentIcon,
      editable: "true",
    },
    {
      name: "SAPCode",
      label: "SAPCode",
      id: "SAPCode",
      width: "100px",
      icon: CubeIcon,
      editable: "true",
    },
    {
      name: "DESCRIPTION",
      label: "DESCRIPTION",
      id: "DESCRIPTION",
      width: "100%",
      icon: CubeIcon,
      editable: "true",
    },
  ]);

  function customCss(rows, index) {
    let css = "";
    return "p-1 ";
  }

  let constructJSONFromPastedInput = (pastedInput) => {
    let rawRows = pastedInput.split("\n");
    // let headersArray = rawRows[0].split("\t");
    let headersArray = ["Mask", "SAPCode", "DESCRIPTION"];
    let output = [];
    rawRows.forEach((rawRow, idx) => {
      if (idx >= 0) {
        let rowObject = {};
        let values = rawRow.split("\t");
        headersArray.forEach((header, idx) => {
          rowObject[header] = values[idx];
        });
        output.push(rowObject);
      }
    });
    setrow(output);
    return output;
  };

  const [clipboardValue, setclipboardValue] = useState("");
  useEffect(() => {
    if (clipboardValue == "") return;
    console.log(constructJSONFromPastedInput(clipboardValue));
  }, [clipboardValue]);

  function customCss(rows, index) {
    let css = "";
    return "p-1 ";
  }
  const [setStore, setsetStore] = useState("");
  const [storecode, setstorecode] = useState("");
  const OnchangeHandler = (e) => {
    setsetStore(e.target.value);
  };
  const SaveAsDraft = async (e) => {
    if (setStore == "") {
      alert("Store code is required");
      return;
    }
    if (row.length == 0) {
      alert("Rows are Empty");
      return;
    }
    const beforeSQL = `
    update OTMK 
set void = 0 where StoreCode = '${setStore}'
          `;

    const Cols = [
      {
        name: "StoreCode",
      },
      {
        name: "ItemCode",
      },
      {
        name: "ItemMask",
      },
      {
        name: "void",
      },
    ];
    console.log({ row });
    const sqlRows = row.map((item) => {
      return {
        StoreCode: setStore,
        ItemCode: item.SAPCode,
        ItemMask: item.Mask,
        void: "1",
      };
    });
    console.log({ sqlRows });

    await EXEC_SQL_InsertMulti_V2(
      884,
      setstorecode,
      Cols,
      sqlRows,
      "OTMK",
      beforeSQL,
      ""
    );
    alert("Item Mask Updated");
  };
  return (
    <div className="max-w-4xl">
      💡Please be aware this function will void latest MASK items before the
      data insertion. all you need to do is paste the values
      <br />
      <span className="font-semibold">
        ([Mask],[SAP CODE],[DESCRIPTION](not required))
      </span>
      <br />
      then select
      <span className="font-semibold"> ([Store])</span> <br />
      then hit
      <span className="font-semibold"> ([Update ])</span>
      <div>
        {/* <DefInput
          handler={(e) => setclipboardValue(e.target.value)}
          label="Paste Excel"
        /> */}

        <div className="frame">
          <p className="m-0 p-0 mt-2 font-semibold">Paste From Excel</p>
          <textarea
            value={clipboardValue}
            placeholder="Paste From Excel"
            onChange={(e) => setclipboardValue(e.target.value)}
            className="w-[100%] rounded-sm bg-trans20 p-1 mx-auto"
          />
        </div>

        <DefInput
          label={"store"}
          id={"store"}
          placeholder={"Select store"}
          type={"text"}
          dropDownId={880}
          handler={OnchangeHandler}
          // map={item.id == "Project" ? projectName : undefined}
          className="border-0"
          // errorMsg={invalids[item.id]}
        />

        <DefTableV2 columns={columns} rows={row} customCss={customCss} />
        <DefButton
          type="10"
          onClick={SaveAsDraft}
          text="Post"
          className="float-right"
        />
      </div>
    </div>
  );
}
