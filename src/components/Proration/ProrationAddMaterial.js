import React from "react";
import { DefButton } from "../ComponentList";

export default function ProrationAddMaterial(p) {
  return (
    <div className="frame">
      <table className="border">
        <tr>
          <td></td>
          <td className="font-bold px-1">ITEMCODE</td>
          <td className="font-bold px-1">ITEMNAME</td>
          <td className="font-bold px-1">UOM</td>
        </tr>

        {p.ChosnRows.map((e, i) => (
          <tr>
            <td>
              <DefButton type="4" text="Add To List" className="px-2 mx-2" />
            </td>
            <td className="px-1">{e.ItemCode} </td>
            <td className="px-1">ITEMNAME</td>
            <td className="px-1">UOM</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
