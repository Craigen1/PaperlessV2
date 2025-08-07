import React, { useEffect, useState } from "react";
import { useUserStore } from "../../userStore/useUserStore";

export default function DPURFooterInfo(p) {
  const TableInfo = [
    {
      Label: "Yeild",
      UOM: "PC",
    },
    {
      Label: "Equivalent",
      UOM: "CS",
    },
    {
      Label: "",
      UOM: "",
    },
    {
      Label: "No. Of Batches",
      UOM: "KG",
    },
    {
      Label: "Total Weight",
      UOM: "KG",
    },
    {
      Label: "",
      UOM: "",
    },
    {
      Label: "SAP Doc. No.",
      UOM: "101",
    },
    {
      Label: "",
      UOM: "",
    },
    {
      Label: "Production Samples",
      UOM: "CS",
    },
    {
      Label: "QA Analysis Samples",
      UOM: "CS",
    },
    {
      Label: "Audit Routing Samples",
      UOM: "CS",
    },
    {
      Label: "Library Samples",
      UOM: "CS",
    },

    {
      Label: "",
      UOM: "",
    },

    {
      Label: "Total Samples",
      UOM: "PC",
    },
  ];

  const PreparedByTable = [
    {
      Label: "Prepared By",
    },
    {
      Label: "Checked By",
    },
    {
      Label: "Processed By",
    },
    {
      Label: "Reviewed By",
    },
  ];

  const [totalUsage, settotalUsage] = useState(0);
  const { setTotalUsage_MJ } = useUserStore();

  const getTotal = () => {
    let totals = 0;
    console.log(p.Usage);
    p.Usage.map((e) => {
      if (e.ItemGroup == "Raw Materials" || e.ItemGroup == "Consumables")
        totals += e.Quantity;
    });
    settotalUsage(totals.toFixed(0));
    setTotalUsage_MJ(totals.toFixed(0));
  };
  useEffect(() => {
    if (!Array.isArray(p.Usage)) return;
    getTotal();
  }, [p.Usage]);

  useEffect(() => {
    console.log({ p });
  }, [p]);

  return (
    <div className="mt-2  gap-10">
      <table>
        {Array.isArray(p.HeaderInfo) && p.HeaderInfo.length > 0 && (
          <>
            {TableInfo.map((e, i) => (
              <tr>
                <td className="DPUR_TD2 w-[280px]">
                  {e.Label ? e.Label : <>&nbsp;</>}
                </td>
                <td className="DPUR_TD">{e.UOM}</td>
                <td className="DPUR_TD">
                  {e.Label == "Yeild"
                    ? (
                        p.HeaderInfo[0].U_APP_PCPercase * p.EquivalentTotal
                      ).toFixed(3)
                    : e.Label == "No. Of Batches"
                    ? p.lastMnfD
                    : e.Label == "Total Weight"
                    ? totalUsage
                    : e.Label == "Total Samples"
                    ? (p.HeaderInfo[0].U_APP_PCPercase * p.SampleEQ).toFixed(0)
                    : ""}
                </td>
              </tr>
            ))}
          </>
        )}
      </table>

      <table className="mt-2">
        {PreparedByTable.map((e, i) => (
          <>
            <tr>
              <td className="DPUR_TD2 w-[180px]">{e.Label}</td>
              <td className="DPUR_TD px-4">Date</td>
            </tr>
            <tr>
              <td className="DPUR_TD2 w-[180px]">&nbsp;</td>
              <td className="DPUR_TD px-4"></td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}
