import React, { useEffect, useState } from "react";
export default function LineLoss(p) {
  const [UniqueMaterials, setUniqueMaterials] = useState([]);
  const [LineLoss, setLineLoss] = useState(0);
  const [Unit, setUnit] = useState(0.8);
  const stndUsageCHange = (e) => {
    const { id, value } = e.target;
    let newUniqueMaterials = UniqueMaterials.map((e, i) => {
      if (id == i) {
        return { ...e, Standard: value };
      } else {
        return { ...e };
      }
    });
    setUniqueMaterials(newUniqueMaterials);
  };

  useEffect(() => {
    if (p.MaterialUsage.length == 0) return;
    setUniqueMaterials([]);
    let newUniqueMaterials = [];
    if (Array.isArray(p.MaterialUsage.map) == false) return;
    if (p.MaterialUsage.length <= 0) return;
    p.MaterialUsage.map((e) => {
      // // // console.log(e);
      let une = newUniqueMaterials.filter((f) => f.ItemCode == e.ItemCode);
      if (une.length == 0) newUniqueMaterials.push(e);
    });
    let x = 0;

    let newUni = newUniqueMaterials.map((e, i) => {
      x = 0;
      p.MaterialUsage.filter((ee) => ee.ItemCode == e.ItemCode).map((m) => {
        x = x + m.Actual;
      });
      return {
        ...e,
        Total: x,
      };
    });
    // // // console.log({ newUni });
    setUniqueMaterials(newUni);
  }, [p.MaterialUsage]);
  function UsageWLineLoss(s) {
    let standardx = (s.Standard * LineLoss) / 1000;
    return <>{((standardx * Unit) / 100 + standardx).toFixed(3)}</>;
  }

  function LineLossF(s) {
    let F1 = (s.Standard * LineLoss) / 1000;
    return <>{(((parseFloat(s.usage) - F1) / F1) * 100).toFixed(3)}</>;
  }

  function HitMiss(s) {
    let F1 = (s.Standard * LineLoss) / 1000;
    let PercEnt = ((parseFloat(s.usage) - F1) / F1) * 100;
    let HitMiss = Unit * 100 >= PercEnt ? "Miss" : "Hit";
    return (
      <span
        className={
          HitMiss === "Miss"
            ? "bg-warning px-2 rounded-md"
            : "bg-success text-white px-2 rounded-md"
        }
      >
        {HitMiss}
      </span>
    );
  }

  return (
    <div className="-z-10">
      Line Loss
      <input onChange={(e) => parseFloat(setLineLoss(e.target.value))} />
      Unit
      <input
        onChange={(e) => parseFloat(setUnit(e.target.value))}
        value={Unit}
      />
      {LineLoss}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className="p-0">
              <th></th>
              <th>ItemCode</th>
              <th>ItemName</th>
              <th>BoM</th>
              <th>Std Usage</th>
              <th>Std Usage w/Line Loss</th>
              <th>Actual Usage</th>
              <th>%</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {UniqueMaterials.map((e, i) => (
              <>
                <tr className="p-0" key={i}>
                  <th>{i}</th>
                  <td>{e.ItemCode}</td>
                  <td>{e.ItemName}</td>
                  <td>
                    <input
                      id={i}
                      onChange={stndUsageCHange}
                      value={e.Standard}
                      type="number"
                      className="p-0 m-0"
                    />
                  </td>
                  <td>{((e.Standard * LineLoss) / 1000).toFixed(3)}</td>
                  <td>
                    <UsageWLineLoss Standard={e.Standard} />
                  </td>
                  <td>{e.Total}</td>
                  <td>
                    <LineLossF Standard={e.Standard} usage={e.Total} />
                  </td>
                  <td>
                    <HitMiss Standard={e.Standard} usage={e.Total} />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
