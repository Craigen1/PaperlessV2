import React, { useContext, useEffect, useState } from "react";
import { DefInput } from "../ComponentList";
import { InputGroupContext } from "rsuite/esm/InputGroup/InputGroup";
import { ITopContext } from "../../hooks/TopContext";

export default function ProrationAddHeaderComps(p) {
  const { DateNow, userInfo } = useContext(ITopContext);

  const components = [
    {
      id: "AllocationNumber",
      label: "Allocation Number",
      type: "text",
      disable: true,
    },
    {
      id: "PostingDate",
      label: "Posting Date",
      type: "date",
    },
    {
      id: "ProductionDate",
      label: "Production Date",
      type: "date",
    },

    {
      id: "Station",
      label: "Station",
      type: "text",
      dropDownId: 799,
    },

    {
      id: "ProrationType",
      label: "Proration Type",
      type: "text",

      dropDownId: 798,
    },

    {
      id: "MaterialType",
      label: "Material Type",
      type: "text",
      disable: true,
    },
    {
      id: "PreparedBy",
      label: "Prepared By",
      type: "text",
      disable: true,
    },
    {
      id: "Production Run",
      label: "Production Run",
      type: "text",
    },
  ];
  const compHandler = (e) => {
    const { value, id } = e.target;
    console.log({ value, id });
    p.setcompValues((e) => ({ ...e, [id]: value }));
  };
  useEffect(() => {
    p.setcompValues((e) => ({
      ...e,
      PostingDate: DateNow,
      ProductionDate: DateNow,
      PreparedBy: userInfo.firstname + " " + userInfo.lastname,
      MaterialType: "RM",
    }));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 max-w-[512px]">
        {components.map((e, i) => (
          <div key={i}>
            <DefInput
              label={e.id}
              id={e.id}
              type={e.type}
              dropDownId={e.dropDownId}
              handler={compHandler}
              value={
                e.id == "AllocationNumber"
                  ? Array.isArray(p.SaveAsDrafRes) &&
                    p.SaveAsDrafRes.length > 0 &&
                    p.SaveAsDrafRes[0].DraftID
                  : p.compValues[e.id]
              }
              disabled={e.disable}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
