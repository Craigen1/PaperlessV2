import React, { useContext, useEffect } from "react";
import InventoryCountMainHeader from "./InventoryCountMainHeader";
import InventoryCountMainForm from "./InventoryCountMainForm";
import { DefButton, EXEC_SQL_InsertMulti_V2 } from "../../ComponentList";
import { useState } from "react";
import { ITopContext } from "../../../hooks/TopContext";

export default function InventoryCountMain() {
  const { userInfo, DateNow } = useContext(ITopContext);
  const [ViewOptions, setViewOptions] = useState(false);
  const componentSelection = [
    {
      name: "itemcode",
      text: "ItemCode",
      type: "Text",
      disabled: false,
      css: "",
    },
    {
      name: "itemcode",
      text: "ItemCode",
      type: "Text",
      disabled: false,
      css: "",
    },
    {
      name: "itemcode",
      text: "ItemCode",
      type: "Text",
      disabled: false,
      css: "",
    },
    {
      name: "itemcode",
      text: "ItemCode",
      type: "Text",
      disabled: false,
      css: "",
    },
  ];

  const [StoreValue, setStoreValue] = useState("");
  const [CdateValue, setCdateValue] = useState("");
  const [HeaderValues, setHeaderValues] = useState([]);
  const [DocNum, setDocNum] = useState(0);
  const [RowValues, setRowValues] = useState([]);
  const [returns, setreturns] = useState([]);

  const SaveAsDraft = async (e) => {
    if (HeaderValues.storeName == "" || HeaderValues.storeName == undefined)
      return;
    const beforeSQL = `
   
  declare @idx as int =  1 
SELECT  @idx = docnum FROM OIVC A where A.storeCode = '${HeaderValues.storeName}'  and CountDate='${HeaderValues.Cdate}' 
 declare  @getId as int = 0
     SELECT  @idx = docnum ,  @getId = id FROM OIVC A where A.storeCode = '${HeaderValues.storeName}'  and CountDate='${HeaderValues.Cdate}' and void =1
    update OIVC  set void = 0 where  storeCode = '${HeaderValues.storeName}'  and CountDate='${HeaderValues.Cdate}' and void =1
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
          ,'O'
          ,'${HeaderValues.storeName}' 
          ,'${userInfo.ID}'
          ,'${HeaderValues.Cdate}'
          ,'${HeaderValues.Remarks}' 
          ,'1'
         , @idx)


          SELECT @idx ID

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
    console.log({ beforeSQL });
    const sqlRows = RowValues.map((item) => {
      return {
        DocEntry: "@@IDENTITY",
        ItemCode: item.SKU,
        systemCount: item.System,
        sellingCount: item.Selling,
        whCount: item.WH,
        rtvCount: item.RTV,
        expDate: item.ExpDate,
        remarks: item.Remarks,
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
      ""
    );

    alert("Document Posted!");
  };

  useEffect(() => {
    if (returns.length > 0) setDocNum(returns[0].ID);
  }, [returns]);
  const [Status, setStatus] = useState("O - Open");
  return (
    <div className=" ">
      <InventoryCountMainHeader
        setHeaderValues={setHeaderValues}
        setStoreValue={setStoreValue}
        setCdateValue={setCdateValue}
        DocNum={DocNum}
        Status={Status}
        setStatus={setStatus}
      />
      <InventoryCountMainForm
        setRowValues={setRowValues}
        StoreValue={StoreValue}
        Store={StoreValue}
        Cdate={CdateValue}
        setStatus={setStatus}
      />
      <br></br>
      {Status != "CLOSE" && (
        <DefButton
          type="2B"
          className="frame w-fit"
          text="Add"
          onClick={SaveAsDraft}
        />
      )}
    </div>
  );
}
