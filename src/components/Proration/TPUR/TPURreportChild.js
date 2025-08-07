import React, { useEffect, useState } from "react";
import { useUserStore } from "../../userStore/useUserStore";

export default function TPURreportChild(p) {
  const [totalUsage, settotalUsage] = useState(0);
  const [totalSolids, settotalSolids] = useState(0);
  const [totalRejects, settotalRejects] = useState(0);
  const [Totalqty, setTotalqty] = useState(0);
  const {
    setTotalQtyTPUR_MJ,
    setTotalRejectsTPUR_MJ,
    setTotalUsageTPUR_MJ,
    setTotalSolidsTPUR_MJ,
  } = useUserStore();

  useEffect(() => {
    settotalUsage(0);
    settotalSolids(0);
    settotalRejects(0);
    setTotalqty(0);

    setTotalQtyTPUR_MJ(0);
    setTotalRejectsTPUR_MJ(0);
    setTotalUsageTPUR_MJ(0);
    setTotalSolidsTPUR_MJ(0);
    if (p.Usage.length <= 0) return;

    let total = 0;
    let solid = 0;
    let Rejects = 0;
    let totalQty = 0;
    p.Usage.filter((ee) => ee.Fgx == p.Item).map((e, i) => {
      total += e.TOTAL;
      solid += e.SOLIDS;
      Rejects += e.Reject;
      totalQty += e.Quantity;
    });
    setTotalqty(totalQty);
    settotalUsage(total);
    settotalSolids(solid);
    settotalRejects(Rejects);

    setTotalQtyTPUR_MJ(totalQty);
    setTotalRejectsTPUR_MJ(Rejects);
    setTotalUsageTPUR_MJ(total);
    setTotalSolidsTPUR_MJ(solid);
  }, [p.Usage]);

  return (
    <>
      <tr>
        <td className="DPUR_TD">PO#</td>
        <td className="DPUR_TD bg-[#0096FF]">{p.po}</td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
      </tr>
      {p.Usage.filter((ee) => ee.Fgx == p.Item).map((e, i, y) => (
        <>
          <tr>
            <td className="DPUR_TD">{e.Item}</td>
            <td className="DPUR_TD">{e.BatchNum}</td>
            <td className="DPUR_TD">{e.Quantity}</td>
            <td className="DPUR_TD">-</td>
            <td className="DPUR_TD">{e.Reject}</td>
            <td className="DPUR_TD">{e.TOTAL}</td>
            <td className="DPUR_TD">{e.U_NTSSQty}</td>
            <td className="DPUR_TD">{e.SOLIDS.toFixed(3)}</td>
          </tr>
        </>
      ))}

      <tr>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD">{Totalqty.toFixed(3)}</td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD">{totalRejects.toFixed(3)}</td>
        <td className="DPUR_TD  bg-[#0096FF]">{totalUsage.toFixed(3)}</td>
        <td className="DPUR_TD"></td>
        <td className="DPUR_TD">{totalSolids.toFixed(3)}</td>
      </tr>
    </>
  );
}
