import React from "react";
import {
  DefButton,
  DefInput,
  DefMenus,
  DefTable,
  EXEC_SQL,
  RemoveFromGrid,
} from "../../ComponentList";
import { useState } from "react";
import { useEffect } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import { useContext } from "react";

export default function InventoryCountMainForm(props) {
  const columns = [
    {
      name: "Option",
      disabled: true,
      colspan: 1,
    },
    {
      name: "SKU",
      disabled: true,
      colspan: 2,
    },
    {
      name: "Itemname",
      disabled: true,

      colspan: 0,
    },

    {
      disabled: false,
      name: "System",
      type: "number",
      colspan: 1,
    },

    {
      disabled: false,
      name: "Selling",
      type: "number",
      colspan: 1,
    },

    {
      disabled: false,
      type: "number",

      name: "WH",
      type: "Number",
      colspan: 1,
      width: "80px",
    },
    {
      disabled: false,
      type: "number",

      name: "RTV",
      type: "Number",
      colspan: 1,
      width: "80px",
    },
    {
      disabled: true,
      name: "Total_Inv",
      type: "number",

      type: "Number",
      colspan: 1,
    },
    {
      disabled: false,
      name: "ExpDate",
      type: "date",
      colspan: 1,
    },
    {
      disabled: false,
      name: "Remarks",
      type: "text",
      width: "200px",
      colspan: 1,
    },
  ];
  const [rows, setrows] = useState([]);
  const handleOption = (e) => {
    RemoveFromGrid(rows, setrows, e.target.id);
  };
  const handleCHange = (e) => {
    const { id, name, value, type } = e.target;
    console.log({ type });
    const newRow = rows.map((ex, index) => {
      let system = ex.System;
      let Selling = ex.Selling;
      let WH = ex.WH;
      let RTV = ex.RTV;
      let total = 0;

      if (index == id)
        if (name == "System") {
          total =
            parseFloat(Selling) +
            parseFloat(WH) +
            parseFloat(RTV) +
            parseFloat(value);
        } else if (name == "Selling") {
          total =
            parseFloat(system) +
            parseFloat(WH) +
            parseFloat(RTV) +
            parseFloat(value);
        } else if (name == "WH") {
          total =
            parseFloat(system) +
            parseFloat(Selling) +
            parseFloat(RTV) +
            parseFloat(value);
        } else if (name == "RTV") {
          total =
            parseFloat(system) +
            parseFloat(Selling) +
            parseFloat(WH) +
            parseFloat(value);
        }

      if (index == id && type == "number") {
        return {
          ...ex,
          [name]: value,
          Total_Inv: total,
        };
      } else if (index == id) {
        return {
          ...ex,
          [name]: value,
        };
      } else return { ...ex };
    });
    setrows(newRow);
  };

  const { qrInfo, setPopScannerModal } = useContext(ITopContext);
  const [SelectedMenu, setSelectedMenu] = useState(3);
  const [rowHolder, setRowHolder] = useState([]);
  const menus = [
    {
      id: 0,
      text: "Scan",
    },
    {
      id: 1,
      text: "Select",
    },
  ];

  const SelectionHandler = (e) => {
    const { value, name } = e.target;
    console.log({ value, name });
    setrows((e) => [
      ...e,
      {
        SKU: value,
        Itemname: name,
        System: 0,
        Selling: 0,
        WH: 0,
        RTV: 0,
        Total_Inv: 0,
        ExpDate: "",
        Remarks: "",
      },
    ]);
    setSelectedMenu(-1);
  };
  const HandleClose = (e) => {
    console.log("closed");
    setSelectedMenu(-1);
  };
  const SetScan = () => {
    qrInfo.data = "";
    qrInfo.type = "";
    setPopScannerModal(true);
    setSelectedMenu(-1);
  };
  const [header, setHeader] = useState([]);
  const getPreRowItemsByWarehouse = async () => {
    if (props.StoreValue == "" || props.StoreValue == undefined) return;

    setrows([]);
    await EXEC_SQL(875, setRowHolder, props.StoreValue, props.Cdate);
    await EXEC_SQL(841, setHeader, props.StoreValue, props.Cdate);
  };
  useEffect(() => {
    if (SelectedMenu != 0) return;
    SetScan();
  }, [SelectedMenu]);

  useEffect(() => {
    getPreRowItemsByWarehouse();
  }, [props.StoreValue]);
  const [statusx, setstatusx] = useState("");
  useEffect(() => {
    try {
      if (header.length <= 0) return;
      props.setStatus(header[0].Status);
      setstatusx(header[0].Status);
    } catch (error) {}
  }, [header]);

  useEffect(() => {
    if (rowHolder.length > 0)
      try {
        rowHolder.map((item, index) => {
          setrows((e) => [
            ...e,
            {
              SKU: item.ItemCode,
              Itemname: item.ItemName,
              System: item.systemCount == undefined ? 0 : item.systemCount,
              Selling: item.sellingCount == undefined ? 0 : item.sellingCount,
              WH: item.whCount == undefined ? 0 : item.whCount,
              RTV: item.rtvCount == undefined ? 0 : item.rtvCount,
              Total_Inv: item.Total_Inv == undefined ? 0 : item.Total_Inv,
              ExpDate: item.ExpDate == undefined ? "" : item.ExpDate,
              Remarks: item.Remarks == undefined ? "" : item.Remarks,
            },
          ]);
        });
      } catch (error) {
        alert(error);
      }
  }, [rowHolder]);

  const [RowHolderScanned, setRowHolderScanned] = useState([]);

  const getItemBaseOnQrCode = async () => {
    if (qrInfo.data == "" || qrInfo.data == undefined) return;
    await EXEC_SQL(874, setRowHolderScanned, qrInfo.data);
  };

  useEffect(() => {
    getItemBaseOnQrCode();
  }, [qrInfo]);
  useEffect(() => {
    if (RowHolderScanned.length == 0) return;
    RowHolderScanned.map((item, index) => {
      setrows((e) => [
        ...e,
        {
          SKU: item.ItemCode,
          Itemname: item.ItemName,
          System: "",
          Selling: "",
          WH: "",
          RTV: "",
          Total_Inv: "",
          ExpDate: "",
          Remarks: "",
        },
      ]);
    });
    setRowHolderScanned([]);
  }, [RowHolderScanned]);

  useEffect(() => {
    props.setRowValues(rows);
  }, [rows]);
  useEffect(() => {}, []);

  return (
    <div>
      {SelectedMenu == 1 && (
        <div className="fixed w-full h-full top-0 left-0 bg-trans50 z-50">
          <div className="mx-auto   max-w-[812px] z-50 px-4 mt-20">
            <DefInput
              autofocus={true}
              dropDownId={879}
              type={"text"}
              id="x"
              name="x"
              label="List of FGs"
              closeHandler={HandleClose}
              handler={SelectionHandler}
            />
          </div>
        </div>
      )}
      <div className=" frame overflow-auto">
        <DefTable
          columns={columns}
          rows={rows}
          btnCss="w-fit "
          btnLabel="Remove"
          spanCSS="w-full text-sm"
          handleOption={handleOption}
          onChange={handleCHange}
        />
      </div>
      {statusx != "CLOSE" && (
        <DefMenus
          menus={menus}
          SelectedMenuId={SelectedMenu}
          setSelectedMenuId={setSelectedMenu}
          className="w-fit"
        />
      )}
    </div>
  );
}
