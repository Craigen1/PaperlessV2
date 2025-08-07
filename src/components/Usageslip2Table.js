import React, { useState } from "react";
import { DefTable } from "./ComponentList";

export default function Usageslip2Table(p) {
  const columns = [
    {
      name: "ItemCode",
      disabled: true,
      colspan: 2,
    },
    {
      name: "ItemName",
      disabled: true,
      colspan: 0,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Qty",
      type: "number",
      disabled: true,
    },
    {
      name: "adj",
      type: "number",
    },
    {
      name: "Option",
      type: "number",
    },
  ];

  const [rows, setrows] = useState([]);

  const handleOption = (e) => {
    let id = e.target.value;
    console.log(e.target);
    const TempContainer = [...p.Bom];
    TempContainer.splice(id, 1);
    setrows(TempContainer);
    console.log({ TempContainer });
    p.setBom(TempContainer);
  };

  const handleCHange = (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    const updatedList = p.Bom.map((item, index) => {
      console.log({ item });
      console.log({ id });
      if (index == id) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    p.setBom(updatedList);
  };

  return (
    <>
      <div className="frame py-1">
        <DefTable
          columns={columns}
          rows={p.Bom}
          btnCss="w-fit "
          btnLabel="Remove"
          spanCSS="w-full"
          handleOption={handleOption}
          onChange={handleCHange}
        />
      </div>
    </>
  );
}
