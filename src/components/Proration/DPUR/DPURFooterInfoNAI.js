import React, { useEffect, useState } from "react";

export default function DPURFooterInfoNAI(p) {
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
      UOM: "",
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
      Label: "Production Samples",
      UOM: "CS",
    },
    {
      Label: "LIbrary Samples",
      UOM: "CS",
    },
    {
      Label: "Total Samples",
      UOM: "CS",
    },

    {
      Label: "",
      UOM: "",
    },

    {
      Label: "Batch Size",
      UOM: "PC",
    },

    {
      Label: "Std. Conversion",
      UOM: "KG",
    },
    {
      Label: "Yield Recovery(%)",
      UOM: "KG",
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

  const [TotalWeight, setTotalWeight] = useState(0);
  const [totalUsage, settotalUsage] = useState(0);
  const [stdConvertion, setstdConvertion] = useState(0);
  const [YeildRecoveryPerc, setYeildRecoveryPerc] = useState(0);
  const [BatchSize, setBatchSize] = useState(0);

  const getTotal = () => {
    let totals = 0;
    settotalUsage(0);
    console.log(p.Usage);
    p.Usage.map((e) => {
      console.log(e.ItemGroup);
      if (e.ItemGroup == "Raw Materials") totals += e.Quantity;
    });
    settotalUsage(totals.toFixed(3));
    setstdConvertion(
      (p.HeaderInfo[0].U_APP_PCPercase * p.Usage[0].grams).toFixed(0) / 1000
    );
  };

  useEffect(() => {
    if (BatchSize <= 0) return;
    if (TotalWeight <= 0) return;
    console.log({ TotalWeight });
    console.log({ BatchSize });
    setYeildRecoveryPerc(((BatchSize / TotalWeight) * 100).toFixed(2));
  }, [BatchSize, TotalWeight]);

  useEffect(() => {
    console.log({ stdConvertion });
    if (stdConvertion <= 0) return;
    if (p.EquivalentTotal <= 0) return;
    console.log({ stdConvertion });
    console.log(p.EquivalentTotal);
    setBatchSize((p.EquivalentTotal * stdConvertion).toFixed(2));
  }, [stdConvertion, p.EquivalentTotal]);

  const TotalWeightx = () => {
    let totals = 0;
    console.log(p.Usage);
    setTotalWeight(0);

    p.Usage.map((e) => {
      if (e.ItemGroup != "Packaging Materials") totals += e.Quantity;
      console.log(e.ItemGroup, ":", e.Quantity);
    });
    setTotalWeight(p.Usage[0].eq);
  };

  useEffect(() => {
    console.log("asd");
    if (!Array.isArray(p.Usage)) return;
    if (p.Usage.length == 0) return;
    getTotal();
    TotalWeightx();
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
                    ? TotalWeight
                    : e.Label == "Total Samples"
                    ? p.SampleEQ
                    : e.Label == "Equivalent"
                    ? p.EquivalentTotal.toFixed(3)
                    : e.Label == "Total Samples"
                    ? ""
                    : e.Label == "Std. Conversion"
                    ? stdConvertion
                    : e.Label == "Batch Size"
                    ? BatchSize
                    : e.Label == "Yield Recovery(%)"
                    ? YeildRecoveryPerc
                    : e.Label == "Total Samples"
                    ? ""
                    : e.Label == "Total Samples"
                    ? ""
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
