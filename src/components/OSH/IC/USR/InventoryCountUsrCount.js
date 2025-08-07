import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  DefTableV2,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  EXEC_SQL,
  RemoveFromGrid,
} from "../../../ComponentList";
import { ITopContext } from "../../../../hooks/TopContext";
import { PencilAltIcon, SparklesIcon } from "@heroicons/react/outline";

export default function InventoryCountUsrCount(p) {
  const { DateNow, userInfo, qrInfo, setPopScannerModal } =
    useContext(ITopContext);
  const [DocNum, setDocNum] = useState(0);
  const [AddItemTriggered, setAddItemTriggered] = useState(false);
  const [StoreValue, setStoreValue] = useState("");
  const [freeze, setfreeze] = useState(false);
  const [components, setcomponents] = useState([
    // {
    //   name: "Document Number",
    //   id: "DocNum",
    //   type: "text",
    //   disabled: true,
    // },
    {
      name: "Document Number",
      id: "id",
      type: "text",
      disabled: true,
    },
    {
      name: "Updated By",
      id: "Diser",
      type: "text",
      disabled: true,
    },
    {
      name: "Count Date",
      id: "Cdate",
      type: "text",
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
  const [getTaskLoad, setgetTaskLoad] = useState(false);
  const [CompValue, setCompValue] = useState({
    storeName: "",
    date: DateNow,
    Status: "O - Open",
    DiserID: userInfo.ID,
    Diser:
      userInfo.firstname.toUpperCase() + " " + userInfo.lastname.toUpperCase(),
  });
  const [loading, setloading] = useState(false);
  const [submitLoading, setsubmitLoading] = useState(false);
  const [rows, setrows] = useState([]);
  const [headers, setheaders] = useState([]);
  const [RowValues, setRowValues] = useState([]);
  const [returns, setreturns] = useState([]);
  const [RowHolderScanned, setRowHolderScanned] = useState([]);
  const [ShowModalItemSelect, setShowModalItemSelect] = useState(false);
  const handleOption = (e) => {
    const uniqueTags = [];
    const uniqueTags2 = [];
    const holder = [...rows];
    // console.log({ holder });
    holder.splice(Number(e.target.id), 1);
    // console.log({ holder });

    holder.map((item) => {
      if (uniqueTags.indexOf(item.Sku) == -1) {
        uniqueTags.push(item.Sku);
      }
    });

    rows.map((item) => {
      if (uniqueTags2.indexOf(item.Sku) == -1) {
        uniqueTags2.push(item.Sku);
      }
    });
    if (uniqueTags.length == uniqueTags2.length)
      RemoveFromGrid(rows, setrows, e.target.id);
    if (uniqueTags.length != uniqueTags2.length)
      alert("Unable to remove, must have 1 unique item from the master list");
  };
  const [CompItemsValues, setCompItemsValues] = useState({
    RTVToAdd: 0,
    SellingToAdd: 0,
    TotalToAdd: 0,
    WHToAdd: 0,
  });
  const CompItems = [
    {
      label: "Item",
      id: "Itemcode",
      type: "text",
      dropDownId: 99999,
      autofocus: true,
    },
    {
      label: "Selling",
      id: "SellingToAdd",
      type: "number",
    },
    {
      label: "WH",
      id: "WHToAdd",
      type: "number",
    },
    {
      label: "RTV",
      id: "RTVToAdd",
      type: "number",
    },
    {
      label: "Total",
      id: "TotalToAdd",
      type: "number",
      disabled: "true",
    },
    {
      label: "Exp Date",
      id: "ExpDateToAdd",
      type: "Date",
    },
    {
      label: "Remarks",
      id: "RemarksToAdd",
      type: "Text",
    },
  ];
  const CompItemsValuesHandler = (e) => {
    const { id, value, name } = e.target;

    setCompItemsValues((x) => ({ ...x, [id]: value }));
    if (id == "Itemcode") setCompItemsValues((x) => ({ ...x, ItemName: name }));
  };

  const handleAddComponentsAddToList = () => {
    // // console.log({ CompItemsValues });
    setrows((e) => [
      ...e,
      {
        Sku: CompItemsValues.Itemcode,
        SKUName: CompItemsValues.ItemName,
        SYSTEM: 0,
        SELLING: CompItemsValues.SellingToAdd,
        WH: CompItemsValues.WHToAdd,
        RTV: CompItemsValues.RTVToAdd,
        TOTAL_INV: CompItemsValues.TotalToAdd,
        EXPDATE: CompItemsValues.ExpDateToAdd,
        Remarks: CompItemsValues.RemarksToAdd,
      },
    ]);
    setAddItemTriggered(false);
  };

  const handleAddModal = () => {
    setAddItemTriggered(true);
    setCompItemsValues({
      RTVToAdd: 0,
      SellingToAdd: 0,
      TotalToAdd: 0,
      WHToAdd: 0,
    });
  };
  useEffect(() => {
    let xx =
      parseFloat(CompItemsValues.RTVToAdd) +
      parseFloat(CompItemsValues.SellingToAdd) +
      parseFloat(CompItemsValues.WHToAdd);
    if (parseFloat(xx) == parseFloat(CompItemsValues.TotalToAdd)) return;
    // // console.log(xx);

    setCompItemsValues((x) => ({ ...x, TotalToAdd: parseFloat(xx) }));
  }, [CompItemsValues]);

  const scannUp = () => {
    qrInfo.data = "";
    qrInfo.type = "";
    setPopScannerModal(true);
    setfreeze(false);
  };
  const SelectItem = () => {
    setShowModalItemSelect(true);
  };
  function customCss(rows, index) {
    if (index == 2 && rows == "Done")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 2 && rows == "Pending")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 2 && rows == "In Progress")
      return "bg-[#96abff] w-fit px-1.5 py-0  rounded-lg text-[#2c3c7b]";

    if (index == 6 && rows == "Medium")
      return "bg-[#baffb6] w-fit px-1.5 py-0  rounded-lg text-[#497a4e]";
    if (index == 6 && rows == "Low")
      return "bg-[#d6d6d6] w-fit px-1.5 py-0  rounded-lg text-[#616161]";
    if (index == 6 && rows == "High")
      return "bg-[#ff9696] w-fit px-1.5 py-0  rounded-lg text-[#7b2c2c]";
  }

  const OptionHandler = () => {};
  const columns = [
    {
      name: "Sku",
      label: "Sku",
      id: "Sku",
      width: 10,
      disabled: true,
      colspan: 1,
    },
    {
      name: "SKUName",
      label: "SKUName",
      id: "SKUName",
      width: 10,
      disabled: true,
      colspan: 1,
    },

    // {
    //   name: "SYSTEM",
    //   label: "SYSTEM",
    //   id: "SYSTEM",
    //   width: "80px",
    //   disabled: true,
    //   icon: SparklesIcon,
    // },
    {
      name: "SELLING",
      label: "SELLING",
      id: "SELLING",
      width: "80px",
      type: "number",
      disabled: false,
      icon: SparklesIcon,
    },
    {
      name: "WH",
      label: "WH",
      id: "WH",
      width: "80px",
      type: "number",
      disabled: false,
      icon: SparklesIcon,
    },
    {
      name: "RTV",
      label: "RTV",
      id: "RTV",
      width: "80px",
      type: "number",
      disabled: false,
      icon: SparklesIcon,
    },
    {
      name: "TOTAL_INV",
      label: "TOTAL_INV",
      id: "TOTAL_INV",
      width: "80px",
      disabled: true,
      icon: SparklesIcon,
    },
    {
      name: "EXPDATE",
      label: "EXPDATE",
      id: "EXPDATE",
      width: "120px",
      disabled: false,
      type: "date",
      icon: SparklesIcon,
    },
    {
      name: "REMARKS",
      label: "REMARKS",
      id: "REMARKS",
      width: "100%",
      disabled: false,
      type: "text",
      icon: SparklesIcon,
    },
    {
      name: "Option",
      label: "Option",
      id: "Option",
      width: 20,
      disabled: true,
    },
  ];

  const storeDisabled = (isDisabled) => {
    const oldComponents = components.map((item) => {
      if (item.id == "storeName") {
        return { ...item, disabled: isDisabled };
      } else return { ...item };
    });
    setcomponents(oldComponents);
  };

  const onChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    // // console.log({ value, id, name });
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
    } else if (id == "Cdate" && name != "") {
      storeDisabled(false);
    }
    if (id == "storeName") setStoreValue(value);
  };

  const getCount = async () => {
    setloading(true);
    await EXEC_SQL_InsertOne(844, setheaders, p.documentNum.DocNum);
    await EXEC_SQL_InsertOne(817, setrows, p.documentNum.DocNum);
    setloading(false);
  };
  const Freezeit = (e) => {
    const { checked } = e.target;
    setfreeze(checked);
  };

  const SaveAsDraft = async (e) => {
    var result = confirm(
      " This action will close the document and cannot be updated anymore. Are you sure you want to submit this document?"
    );
    if (!result) return;
    setsubmitLoading(true);
    const beforeSQL = `
   
  declare @idx as int =  1
  declare  @getId as int = 0
  SELECT  @idx = docnum FROM OIVC A where A.storeCode = '${headers[0].storeCode}'  and CountDate='${headers[0].Cdate}' and void =1
    update OIVC  set void = 0 where  storeCode = '${headers[0].storeCode}'  and CountDate='${headers[0].Cdate}' and void =1
    UPDATE  IVC1 set void = 0 where DocEntry= @getId

    INSERT INTO dbo.OIVC
           (createdDate
           ,status
           ,storeCode
           ,DiserID
           ,CountDate
           ,remarks
           ,void
           ,Docnum
           )
     VALUES
          (@NOW
          ,'C'
          ,'${headers[0].storeCode}' 
          ,'${userInfo.ID}'
          ,'${headers[0].Cdate}'
          ,'${headers[0].Remarks}' 
          ,'1'
         , @idx)
          
          `;
    const Cols = [
      {
        name: "DocEntry",
      },
      {
        name: "ItemCode",
      },
      {
        name: "systemCount",
      },
      {
        name: "sellingCount",
      },
      {
        name: "whCount",
      },
      {
        name: "rtvCount",
      },
      {
        name: "expDate",
      },
      {
        name: "remarks",
      },
      {
        name: "void",
      },
    ];
    // // console.log({ rows });
    const sqlRows = rows.map((item) => {
      return {
        DocEntry: "@@IDENTITY",
        ItemCode: item.Sku,
        systemCount: item.SYSTEM,
        sellingCount: item.SELLING,
        whCount: item.WH,
        rtvCount: item.RTV,
        expDate: item.EXPDATE,
        remarks: item.REMARKS,
        void: "1",
      };
    });
    await EXEC_SQL_InsertMulti_V2(
      884,
      setreturns,
      Cols,
      sqlRows,
      "IVC1",
      beforeSQL,
      "",
      "Select @@IDENTITY as ID"
    );
    setsubmitLoading(false);
  };
  const HandleClose = (e) => {
    // console.log("closed");
    setShowModalItemSelect(false);
  };

  const SelectionHandler = (e) => {
    const { value, name } = e.target;
    // console.log({ value, name });
    if (name == "") setShowModalItemSelect(false);
    if (name == "") return;
    setrows((e) => [
      ...e,
      {
        Sku: value,
        SKUName: name,
        SYSTEM: "0",
        SELLING: "0",
        WH: "0",
        RTV: "0",
        TOTAL_INV: "0",
        ExpDate: "",
        Remarks: "",
      },
    ]);
    setShowModalItemSelect(false);
  };

  const getSQl = async (id = 0) => {
    if (id != 0) await EXEC_SQL_InsertOne(817, setrows, id);
    await EXEC_SQL_InsertOne(817, setrows, p.documentNum.DocNum);
  };

  const [ItemDropDown, setItemDropDown] = useState([]);
  const getItemSelection = async () => {
    await EXEC_SQL_InsertOne(816, setItemDropDown, headers[0].storeCode);
  };
  useEffect(() => {
    // console.log(headers[0]);
    getItemSelection();
  }, [headers[0]]);

  useEffect(() => {
    if (returns.length <= 0) return;
    setsubmitLoading(true);
    p.setSelectedMenu(1);
    alert("Document Updated");
    // getSQl(returns[0].ID);
    setsubmitLoading(false);

    setreturns([]);
  }, [returns]);

  useEffect(() => {
    try {
      if (p.documentNum.DocNum > 0) getCount();
    } catch (error) {}
  }, [p.documentNum]);
  useEffect(() => {
    if (headers.length == 0) return;
    // console.log({ headers });
    setCompValue({
      DocNum: headers[0].DocNum,
      Diser: headers[0].Diser,
      Cdate: headers[0].Cdate,
      Status: headers[0].Status,
      storeName: headers[0].storeName,
      Remarks: headers[0].Remarks,
      id: headers[0].id,
    });
  }, [headers]);

  const handleCHange = (e) => {
    const { id, name, value, type } = e.target;
    // console.log({ type });
    const newRow = rows.map((ex, index) => {
      let system = ex.SYSTEM;
      let Selling = ex.SELLING;
      let WH = ex.WH;
      let RTV = ex.RTV;
      let total = 0;
      // // console.log({ Selling, WH, RTV, value });
      if (index == id)
        if (name == "System") {
          total =
            parseFloat(Selling) +
            parseFloat(WH) +
            parseFloat(RTV) +
            parseFloat(value);
        } else if (name == "SELLING") {
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
      // console.log(name);
      // console.log(total);
      if (index == id && type == "number") {
        return {
          ...ex,
          [name]: value,
          TOTAL_INV: total,
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

  const getItemBaseOnQrCode = async () => {
    if (qrInfo.data == "" || qrInfo.data == undefined) return;
    await EXEC_SQL(874, setRowHolderScanned, qrInfo.data);
  };

  useEffect(() => {
    getItemBaseOnQrCode();
  }, [qrInfo]);

  useEffect(() => {
    if (RowHolderScanned.length == 0) return;
    // console.log(rows);
    // console.log(RowHolderScanned);
    RowHolderScanned.map((item, index) => {
      setrows((e) => [
        ...e,
        {
          Sku: item.ItemCode,
          SKUName: item.ItemName,
          SYSTEM: "0",
          SELLING: "0",
          WH: "0",
          RTV: "0",
          TOTAL_INV: "0",
          ExpDate: "",
          Remarks: "",
        },
      ]);
    });
    setRowHolderScanned([]);
  }, [RowHolderScanned]);
  return (
    <div className="mx-2">
      {components.map((item) => (
        <div className={item.css}>
          <DefInput
            type={item.type}
            id={item.id}
            label={item.id}
            name={item.id}
            disabled={item.disabled}
            // dropDownId={
            //   item.id == "storeName"
            //     ? 880
            //     : // : item.id == "Status"
            //       // ? 877
            //       undefined
            // }
            handler={onChangeHandler}
            value={CompValue[item.id]}
            clearid={item.id}
          />
        </div>
      ))}
      {/* <div className="flex w-fit items-center">
        <input
          type="checkbox"
          id="vehicle1"
          name="vehicle1"
          value="Bike"
          onChange={Freezeit}
        />
        <p className="whitespace-nowrap pt-3 pl-1">Freeze 1st Line</p>
      </div> */}
      <div className="overflow-auto">
        <DefTable
          columns={columns}
          rows={rows}
          customCss={customCss}
          onChange={handleCHange}
          disabled={loading}
          btnLabel="Remove"
          freeze={freeze}
          handleOption={handleOption}
        />
      </div>
      {CompValue.Status != "CLOSE" && (
        <div className="flex justify-between gap-x-2">
          <div className="flex gap-x2 mt-2">
            {/* <DefButton
              type="10"
              className="px-4 mr-2"
              text="Scan Item"
              onClick={scannUp}
            /> */}
            <DefButton
              type="10"
              className="px-4 "
              text="Add Item For Expiry"
              onClick={handleAddModal}
            />
            {/* <DefButton
              type="10"
              className="px-4 "
              text="Select Item"
              onClick={SelectItem}
            /> */}
          </div>

          <div className="flex">
            <DefButton
              type="11"
              className="mr-2  w-fit"
              text="Sort by Itemcode "
              onClick={getSQl}
            />

            <DefButton
              type="10"
              className=" w-fit mx-2"
              text="Submit"
              loading={submitLoading}
              onClick={SaveAsDraft}
            />
          </div>
        </div>
      )}
      {ShowModalItemSelect && (
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
      {AddItemTriggered && (
        <div className="absolute  top-0 left-0 bg- h-full bg-trans20 w-full">
          <div className="max-w-xl mx-auto mt-20 bg-white rounded-md p-4 shadow-md">
            {CompItems.map((item, index) => (
              <div className="">
                <DefInput
                  autofocus={item.autofocus}
                  dropDownId={item.dropDownId}
                  map={item.id == "Itemcode" ? ItemDropDown : undefined}
                  type={item.type}
                  id={item.id}
                  name={item.id}
                  label={item.label}
                  handler={CompItemsValuesHandler}
                  value={CompItemsValues[item.id]}
                />
              </div>
            ))}
            <div className="flex">
              <div className="w-full"></div>
              <DefButton
                type="11"
                className="px-4 mr-2 mt-10  whitespace-nowrap"
                text="Cancel"
                onClick={() => setAddItemTriggered(false)}
              />
              <DefButton
                type="10"
                className="px-4 mr-2 mt-10  whitespace-nowrap"
                text="Add to List"
                onClick={handleAddComponentsAddToList}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
