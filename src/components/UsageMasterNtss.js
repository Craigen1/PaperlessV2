import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../hooks/TopContext";
import {
  cssTH,
  DefaultButtonStyle,
  EXEC_SQL_InsertOne,
  Label,
} from "./ComponentList";

export default function UsageMasterNtss(props) {
  const { setPop, setpopTitle, setpopLabel, qrInfo } = useContext(ITopContext);

  const [sqlreturn, setsqlreturn] = useState([]);
  const [NTSSVer, setNTSSVer] = useState([]);

  const [Components, setComponents] = useState([
    {
      Label: "NTSS",
      Value: 0,
      Type: "number",
      Min: 0,
    },
    {
      Label: "PASTE",
      Value: 0,
      Type: "number",
      Min: 0,
    },
    {
      Label: "WATER",
      Value: 0,
      Type: "number",
      Min: 0,
    },
  ]);

  const [NTSSDetails, setNTSSDetails] = useState({
    NTSSVer: "",
    NTSS: "",
    PASTE: "",
    WATER: "",
  });

  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setNTSSDetails((p) => ({ ...p, [id]: value }));
  };
  const InsertNTSS = () => {
    let x = true;
    x = handleInsert(props.Proration, "Proration");
    x = handleInsert(props.Revision, "Revision");
    x = handleInsert(props.Size, "Size");
    x = handleInsert(NTSSDetails.NTSSVer, "NTSSVer");
    x = handleInsert(NTSSDetails.NTSS, "NTSS");
    x = handleInsert(NTSSDetails.PASTE, "PASTE");
    x = handleInsert(NTSSDetails.NTSSVer, "NTSSVer");
    x = handleInsert(NTSSDetails.WATER, "WATER");
    if (x != undefined) return;
    EXEC_SQL_InsertOne(
      40,
      setsqlreturn,
      props.Proration,
      props.Revision,
      props.Size,
      NTSSDetails.NTSSVer,
      NTSSDetails.NTSS,
      NTSSDetails.PASTE,
      NTSSDetails.WATER
    );
  };

  const handleInsert = (p, l) => {
    if (p == "") {
      setpopTitle("Scan Result");
      setpopLabel(`[${l}] needs to be filled`);
      setPop(true);
      return false;
    }
  };
  useEffect(() => {
    EXEC_SQL_InsertOne(
      41,
      setsqlreturn,
      props.Proration,
      props.Revision,
      props.Size
    );
    EXEC_SQL_InsertOne(
      42,
      setNTSSVer,
      props.Proration,
      props.Revision,
      props.Size
    );
  }, [props]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <datalist id="NtssVerList">
            {NTSSVer.map((items) => (
              <option value={items.NtssVer}>{items.NtssVer} </option>
            ))}
          </datalist>
          <Label text="NTSS Ver" />
          <div className="flex">
            <input
              type="text"
              id="NTSSVer"
              onChange={onChangeHandler}
              list="NtssVerList"
              autocomplete="off"
            />
          </div>
        </div>
        {Components.map((item) => (
          <div>
            <Label text={item.Label} />
            <input
              type={item.Type}
              min={item.Min}
              id={item.Label}
              onChange={onChangeHandler}
            />
          </div>
        ))}
      </div>

      <button
        className={DefaultButtonStyle}
        onClick={() => {
          InsertNTSS();
        }}
      >
        Add
      </button>

      <table className="w-full mb-5">
        <tr className="w-full">
          <th className={cssTH}>NTSS Ver</th>
          <th className={cssTH}>NTSS</th>
          <th className={cssTH}>PASTE</th>
          <th className={cssTH}>WATER</th>
        </tr>

        {sqlreturn.map((item, index) => (
          <tr className="">
            <td className={cssTH}>{item.NtssVer}</td>
            <td className={cssTH}>{item.NTSSperc}</td>
            <td className={cssTH}>{item.Paste}</td>
            <td className={cssTH}>{item.Water}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
