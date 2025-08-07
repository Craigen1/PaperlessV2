import React, { useEffect, useState } from "react";
import { DefInput, EXEC_SQL } from "../../ComponentList";

export default function PalletingOshHeader(p) {
  const components = [
    { name: "Document #", id: "DocNUm", disabled: true, css: "" },

    { name: "RFP#", id: "RFP", disabled: false, css: "col-span-2" },
    { name: "PO#", id: "PO", disabled: true, css: "" },
    {
      name: "Warehouse From",
      id: "WhseFrom",
      disabled: true,
      css: "col-span-4",
    },
    {
      name: "Customer",
      id: "Customer",
      disabled: true,
      css: "col-span-4",
    },
    // { name: "Warehouse To", id: "WhsTo", disabled: true, css: "col-span-4" },
    { name: "Release By", id: "ReleaseBy", disabled: false, css: "col-span-2" },
    {
      name: "Palletizer",
      id: "Palletizer",
      disabled: false,
      css: "col-span-2",
    },
    {
      name: "Received By",
      id: "ReceivedBy",
      disabled: false,
      css: "col-span-2",
    },
    { name: "Packer", id: "Packer", disabled: false, css: "col-span-2" },
    { name: "Owner", id: "Owner", disabled: false, css: "col-span-2" },
    {
      name: "Customer Ref. No.",
      id: "CustomerRef",
      disabled: false,
      css: "col-span-2",
    },

    {
      name: "Remarks",
      id: "Remarks",
      disabled: false,
      css: "col-span-4",
    },
  ];
  const [disabledComValues, setDisabledComValues] = useState([]);
  const [HeaderValues, setHeaderValues] = useState({});

  const onCHangeHandler = async (e) => {
    const { value, id, name } = e.target;
    if (id == "RFP") {
      await EXEC_SQL(869, setDisabledComValues, value);
      await EXEC_SQL(868, p.setheaderRows, value);
      p.setRfp(value);
    }
    if (id == "RFPClear") {
      p.setheaderRows([]);
      p.setPalleted([]);
      p.setLoosePalletDetails([]);
      setHeaderValues((e) => ({
        DocNUm: "",
        PO: "",
        Packer: "",
        Palletizer: "",
        ReceivedBy: "",
        ReleaseBy: "",
        WhsTo: "",
        WhseFrom: "",
      }));
    }
    if (id != "RFPClear") {
      setHeaderValues((e) => ({
        ...e,
        [id]: value,
      }));
    }
  };

  useEffect(() => {
    if (disabledComValues.length <= 0) return;
    setHeaderValues((e) => ({
      ...e,
      PO: disabledComValues[0].BaseRef,
      WhseFrom: disabledComValues[0].FromwhsName,
      WhsTo: disabledComValues[0].TowhsName,
      DocNUm: disabledComValues[0].DocNum,
      Customer: "OSH0000001 - OH! SO HEALTHY",
    }));
  }, [disabledComValues]);
  useEffect(() => {
    p.setFinalHeader(HeaderValues);
  }, [HeaderValues]);

  const [errors, seterrors] = useState({});
  const errorHandler = (name, value) => {
    seterrors((e) => ({ ...e, [name]: value }));
  };
  return (
    <>
      <div className="frame  grid grid-cols-4 gap-x-2">
        {components.map((item, index) => (
          <div className={`${item.css}`} key={index}>
            <DefInput
              id={item.id}
              name={item.id}
              label={item.id}
              disabled={item.disabled}
              handler={onCHangeHandler}
              errorMsg={errors[item.id]}
              dropDownId={
                item.id == "RFP" ? 870 : item.id == "Owner" ? 866 : undefined
              }
              value={HeaderValues[item.id]}
              clearid={
                item.id == "RFP"
                  ? "RFPClear"
                  : item.id == "Owner"
                  ? "OwnerClear"
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
