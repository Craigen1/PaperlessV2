import React, { useState } from "react";
import { DefInput, DefTable } from "../ComponentList";

export default function DeliveryScheduleBooking() {
  const comp = [
    {
      colspan: "1",
      label: "Docnum",
      id: "docnum",
      type: "text",
      disabled: false,
    },
    {
      colspan: "1",
      label: "DocDate",
      id: "docDate",
      type: "text",
      disabled: false,
    },
    {
      colspan: "1",
      label: "Booking Date",
      id: "BookDate",
      type: "date",
      disabled: false,
    },
    {
      colspan: "1",
      label: "Booking Time",
      id: "bookTime",
      type: "time",
      disabled: false,
    },
    {
      id: "warehouse",
      label: "Warehouse",
      type: "text",
      dropDownId: 928,
      colspan: "2",
    },
    {
      colspan: "2",
      label: "Client",
      id: "client",
      type: "text",
      disabled: false,
      dropDownId: 927,
    },
    {
      colspan: "2",
      label: "Remarks",
      id: "remarks",
      type: "text",
      disabled: false,
    },
  ];

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
      name: "BarCode",
      disabled: true,
    },

    {
      name: "UoM",
      disabled: true,
    },
    {
      name: "Qty",
      disabled: true,
    },
    {
      name: "Option",
    },
  ];

  const [rows, setRows] = useState([]);

  const headerOnChangeHandler = async (e) => {};

  const handleOption = (e) => {};
  return (
    <>
      <div className="frame">
        <div className="grid grid-cols-2 gap-x-2 py-2 frame">
          {comp.map((item, index) => (
            <div className={`col-span-${item.colspan} `}>
              <DefInput
                label={item.label}
                id={item.id}
                clearid={item.id}
                type={item.type}
                dropDownId={item.dropDownId}
                handler={headerOnChangeHandler}
                //   map={
                //     item.id == "Revision"
                //       ? revMap
                //       : item.id == "Size"
                //       ? SizeMap
                //       : undefined
                //   }
              />

              {item.label == "Station" ? <div></div> : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-auto mt-2 frame  pb-2   ">
        <DefTable
          columns={columns}
          rows={rows}
          btnLabel="Remove"
          spanCSS="w-full"
          className=""
          handleOption={handleOption}
        />
      </div>
    </>
  );
}
