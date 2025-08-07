import React, { useEffect } from "react";
import { DefInput } from "../../ComponentList";
import { useContext } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import { useState } from "react";

export default function InventoryCountMainHeader(props) {
  const { DateNow, userInfo } = useContext(ITopContext);

  const [components, setcomponents] = useState([
    {
      name: "Document Number",
      id: "DocNum",
      type: "text",
      disabled: true,
    },
    {
      name: "Diser",
      id: "Diser",
      type: "text",
      disabled: true,
    },
    {
      name: "Count Date",
      id: "Cdate",
      type: "date",
      disabled: false,
      css: 4,
    },
    {
      name: "Status",
      id: "Status",
      type: "text",
      disabled: true,
      css: 4,
    },
    {
      name: "Store Name",
      id: "storeName",
      type: "text",
      disabled: true,
      css: "col-span-2",
    },

    {
      name: "Remarks",
      id: "Remarks",
      type: "text",
      disabled: false,
      css: "col-span-2",
    },
  ]);

  const [CompValue, setCompValue] = useState({
    storeName: "",
    date: DateNow,
    Status: props.Status,
    DiserID: userInfo.ID,
    Diser:
      userInfo.firstname.toUpperCase() + " " + userInfo.lastname.toUpperCase(),
  });

  const onChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    setCompValue((e) => ({ ...e, [id]: value }));

    if (id == "storeName" && name == "") {
      storeDisabled(true);
      setCompValue({
        storeName: "",
        Cdate: "",
        date: DateNow,
        Diser:
          userInfo.firstname.toUpperCase() +
          " " +
          userInfo.lastname.toUpperCase(),
      });
      props.setStatus("O - Open");
    } else if (id == "Cdate" && name != "") {
      storeDisabled(false);
    }
    if (id == "storeName") props.setStoreValue(value);
    if (id == "Cdate") props.setCdateValue(value);
  };

  const storeDisabled = (isDisabled) => {
    const oldComponents = components.map((item) => {
      if (item.id == "storeName") {
        return { ...item, disabled: isDisabled };
      } else return { ...item };
    });
    setcomponents(oldComponents);
  };
  const statusMap = [
    {
      code: "O",
      name: "Open",
    },
    {
      code: "D",
      name: "Draft",
    },
    {
      code: "C",
      name: "Close",
    },
  ];
  useEffect(() => {
    props.setHeaderValues(CompValue);
  }, [CompValue]);

  return (
    <>
      <div className="frame pb-2">
        <div className="grid  grid-cols-2 gap-x-2    ">
          {components.map((item, index) => (
            <div className={item.css}>
              <DefInput
                type={item.type}
                id={item.id}
                label={item.id}
                name={item.id}
                disabled={item.disabled}
                dropDownId={
                  item.id == "storeName"
                    ? 880
                    : // : item.id == "Status"
                      // ? 877
                      undefined
                }
                handler={onChangeHandler}
                value={
                  item.id == "DocNum"
                    ? props.DocNum
                    : item.id == "Status"
                    ? props.Status
                    : CompValue[item.id]
                }
                clearid={item.id}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="frame"></div>
    </>
  );
}
