import React from "react";
import { DefInput } from "../../ComponentList";

export default function PalletingOshAdditionalOptions(p) {
  const onCHangeHandler = async (e) => {
    const { value, id } = e.target;
    p.setLoosePalletDetails((e) => ({ ...e, [id]: value }));
  };
  const components = [
    {
      name: "MNF Date",
      id: "MNFDate",
      type: "date",
      disabled: false,
      css: "x",
    },
    {
      name: "Quantity",
      id: "Quantity",
      type: "number",
      disabled: false,
      css: "x",
    },

    {
      name: "Pallet Id",
      id: "PalletId",
      type: "number",
      disabled: false,
      css: "x",
    },
    {
      name: "LoosePallet",
      id: "LoosePallet",
      type: "text",
      disabled: true,
      css: "x",
    },
    { name: "IT Num", id: "ITNum", type: "text", disabled: true, css: "x" },
  ];

  return (
    <>
      <p>Loose Pallet</p>
      <div className="frame grid grid-cols-2 gap-x-2">
        {components.map((item, index) => (
          <div>
            <DefInput
              id={item.id}
              name={item.id}
              label={item.id}
              disabled={item.disabled}
              handler={onCHangeHandler}
              type={item.type}
              value={p.LoosePalletDetails[item.id]}
            />
          </div>
        ))}
      </div>
    </>
  );
}
