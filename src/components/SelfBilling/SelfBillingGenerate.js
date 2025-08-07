import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_W_LABEL,
  Label,
  NoteInfo,
} from "../ComponentList";
import SelfBillingCopyFromRFP from "./SelfBillingCopyFromRFP";
import { ITopContext } from "../../hooks/TopContext";
import ReactToPrint from "react-to-print";
import { SelfBillingPrintRefPrintSrc } from "./Print/SelfBillingPrintRefPrintSrc";
import { NumericFormat } from "react-number-format";

export default function SelfBillingGenerate() {
  const componentRef = useRef();
  const { DateNow, setSelfBillingIDForPint, userInfo } =
    useContext(ITopContext);
  const [ItemPrice, setItemPrice] = useState("");
  const [generateLoadingH, setGenerateLoadingH] = useState(false);
  const [ErrorNote, setErrorNote] = useState({
    title: "",
    body: "",
    type: "",
    visible: "",
  });
  const Components = [
    {
      id: "DocEntry",
      label: "ATB Entry",
      type: "text",
      colspan: "1",
    },
    {
      id: "PostingDate",
      label: "Posting Date",
      type: "text",
      colspan: "1",
    },
    {
      id: "InvoiceNum",
      label: "Invoice Number",
      type: "text",
      colspan: "1",
    },

    {
      id: "Document Date",
      label: "",
      type: "Date",
      colspan: "1",
    },

    {
      id: "Customer",
      label: "Customer",
      type: "text",
      colspan: "1",
    },
    {
      id: "CustomerName",
      label: "Customer Name",
      type: "text",
      colspan: "3",
    },

    {
      id: "ContactID",
      label: "Contact Person",
      type: "text",
      colspan: "1",
    },
    {
      id: "CustomerName",
      label: "",
      type: "text",
      colspan: "3",
    },

    {
      id: "Branch",
      label: "Branch",
      type: "Text",
      colspan: "1",
    },
    {
      id: "BranchName",
      label: "",
      type: "Text",
      colspan: "3",
    },
  ];
  const columns = [
    {
      name: "Option",
      disabled: false,
      type: "text",
    },

    {
      name: "ATB",
      disabled: true,
    },

    {
      name: "AR",
      disabled: true,
    },

    {
      name: "So",
      disabled: false,
      type: "number",
    },
    {
      name: "DPUR",
      disabled: false,
      type: "text",
    },
    {
      name: "PO",
      disabled: false,
      type: "number",
    },
    {
      name: "MNFDate",
      disabled: true,
    },
    {
      name: "ItemCode",
      disabled: false,
      type: "text",
    },
    {
      name: "ItemName",
      disabled: true,
      className: "text-xs",
    },
    {
      name: "QtyDMP",
      disabled: true,
      type: "number",
    },
    {
      name: "PostedQty",
      disabled: true,
      type: "number",
    },
    {
      name: "PriceDMP",
      disabled: true,
      type: "number",
    },
    {
      name: "Quantity",
      disabled: false,
      type: "number",
    },
    {
      name: "Price",
      disabled: false,
      type: "number",
    },
    // {
    //   name: "Tax",
    //   disabled: false,
    // type:"text"
    // },
    // {
    //   name: "TotalLC",
    //   disabled: false,
    // type:"text"
    // },
    {
      name: "LineTotal",
      disabled: true,
    },
    {
      name: "UoM",
      disabled: true,
    },
  ];

  const [HideCopryFromRFP, setHideCopryFromRFP] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsX, setRowsX] = useState([]);
  const [CopyFromRFPReturn, setCopyFromRFPReturn] = useState([]);
  const [ATBID, setATBID] = useState([{ ID: 0 }]);
  const [invoiceNUmber, setinvoiceNUmber] = useState([{ ID: 0 }]);
  const [iPrint, setIPrint] = useState(false);
  const [InvoiceNum, setInvoiceNum] = useState(0);
  const [DocumentDate, setDocumentDate] = useState("");
  const [LineTotal, setLineTotal] = useState(0);
  const [addVat12, setaddVat12] = useState(0);
  const [AmountTotal, setAmountTotal] = useState(0);
  const [Itemcode, setItemcode] = useState([
    {
      ID: 0,
      itemname: 0,
      itemcode: 0,
      TF: 0,
    },
  ]);
  const [SqlResult, setSqlResult] = useState([
    {
      ID: 0,
    },
  ]);

  const getATB_ID = async () => {
    await EXEC_SQL(946, setATBID, "");
    getinvoiceNUmber();
  };
  const getinvoiceNUmber = async () => {
    await EXEC_SQL(945, setinvoiceNUmber, "");
  };
  const headerOnChangeHandler = async (e) => {
    const { value, id, name } = e.target;
    console.log({ value, id, name });
    if (id == "InvoiceNum") setInvoiceNum(value);
    if (id == "Document Date") setDocumentDate(value);
    setErrorNote({
      title: "",
      body: "",
      type: "s",
      visible: false,
    });
  };
  const printSelfBilling = async () => {
    console.log("Printing");
    setIPrint(!iPrint);
  };

  const SearchPrice = async (e) => {
    console.log("Searching");
    await EXEC_SQL(941, setItemcode, ItemPrice);
  };

  const PostSelfBilling = async (e) => {
    console.log({ rows });
    try {
      setErrorNote({
        title: "Posting...",
        body: "Please wait for the transaction to be posted...",
        type: "w",
        visible: true,
      });

      if (DocumentDate === undefined || DocumentDate === "") {
        setErrorNote({
          title: "Field is required",
          body: "Please Select Document Date",
          type: "e",
          visible: true,
        });
        return;
      }
      if (rows.length === 0) {
        setErrorNote({
          title: "Table is empty",
          body: "Please Copy item from RFP",
          type: "e",
          visible: true,
        });
        return;
      }
      // return;
      let curid = ATBID[0].ID;
      console.log(rows);
      let sql =
        "WAITFOR DELAY '00:00:1';    INSERT INTO SBL (CreatedDate,DocDate,CreatedBy,Invoicenum,void) VALUES ('" +
        DateNow +
        "'," +
        "'" +
        DocumentDate +
        "'" +
        "," +
        "'" +
        userInfo.ID +
        "'" +
        "," +
        "'" +
        InvoiceNum +
        "'" +
        ",'1') ;declare @idx as int  =0 ; set @idx = @@IDENTITY  ;  " +
        " INSERT INTO dbo.SBL1( DocEntry  , quantity,price,linetotal,uom,SO,DPUR,PO,MNFDATE,ATB,ITEMCODE,ITEMNAME,void)" +
        "VALUES";
      let po = "";
      rows.map((row, index) => {
        console.log({ po });
        if (row.PO != null && po == "") po = row.PO;
      });
      console.log({ po });
      rows.map((row, index) => {
        sql =
          sql +
          `(@idx,${row.Quantity},${row.Price},${row.LineTotal},'${row.UoM}','${row.So}','${row.DPUR}','${po}','${row.MNFDate}',${curid},'${row.ItemCode}' ,'${row.ItemName}' ,'1') ,`;
      });
      console.log(sql);
      sql = sql.slice(0, -1);
      sql = sql + " SELECT @@IDENTITY ID";
      await EXEC_SQL_W_LABEL(sql, setSqlResult);
      await getATB_ID();
      setErrorNote({
        title: "Posted",
        body: "Document successfully posted",
        type: "s",
        visible: true,
      });
      setRows([]);
    } catch (error) {
      alert(error.message);
    }
  };
  const handleOption = (e) => {
    const HoldBatchContainer = [...rows];
    HoldBatchContainer.splice(e.target.id, 1);
    console.log(HoldBatchContainer);
    setRows(HoldBatchContainer);
  };
  const DefTableonChange = (e) => {
    const { id, name, value } = e.target;
    console.log(e.target);
    if (name === "Price")
      handleCellChange(
        setRows,
        id,
        "LineTotal",
        (parseFloat(value) * parseFloat(rows[id].Quantity)).toFixed(2)
      );
    if (name === "Quantity")
      handleCellChange(
        setRows,
        id,
        "LineTotal",
        (parseFloat(value) * parseFloat(rows[id].Price)).toFixed(2)
      );
    handleCellChange(setRows, id, name, value);
  };

  const handleCellChange = (set, id, field, value) => {
    set((prevData) =>
      prevData.map((item, index) =>
        index == id ? { ...item, [field]: value } : item
      )
    );
  };
  const priceCheckerHandler = (e) => {
    setItemPrice(e.target.value);
  };
  const enableGenerate = () => {
    let hasSomething = false;
    rows.map((row) => {
      if (row.So == "" || row.So == undefined) hasSomething = true;
      if (row.ItemCode == "" || row.ItemCode == undefined) hasSomething = true;
      if (row.DPUR == "" || row.DPUR == undefined) hasSomething = true;
      if (row.MatDoc == "" || row.MatDoc == undefined) hasSomething = true;
      if (row.PO == "" || row.PO == undefined) hasSomething = true;

      if (
        row.Quantity == "" ||
        row.Quantity == undefined ||
        row.Quantity == 0 ||
        row.Quantity == "0.00"
      )
        hasSomething = true;
      if (
        row.Price == "" ||
        row.Price == undefined ||
        row.Price == 0 ||
        row.Price == "0.00"
      ) {
        hasSomething = true;
      }
      if (
        row.LineTotal == "" ||
        row.LineTotal == undefined ||
        row.LineTotal == 0 ||
        row.LineTotal == "0.00"
      ) {
        hasSomething = true;
      }
    });

    setGenerateLoadingH(hasSomething);
  };
  const crrInvoice = () => {
    let msg = "Are you sure you want to switch to CRR invoice?";
    if (!confirm(msg)) return;
    setGenerateLoadingH(false);
  };
  useEffect(() => {
    if (rows != undefined) {
      console.log(rows);
      let total = 0;
      rows.map((row) => {
        console.log(row.LineTotal);
        total += parseFloat(row.LineTotal);
      });
      console.log(total);
      setLineTotal(total);
      setaddVat12(total * 0.12);
      setAmountTotal(total * 0.12 + total);
      enableGenerate();
    }
  }, [rows]);

  useEffect(() => {
    // console.log(SqlResult);
    if (SqlResult[0].ID != undefined) {
    }
  }, [SqlResult]);

  useEffect(() => {
    getATB_ID();
  }, []);

  useEffect(() => {
    try {
      if (CopyFromRFPReturn[0] == undefined) return;
      console.log(CopyFromRFPReturn);

      CopyFromRFPReturn.map((rows) => {
        setRows((p) => [
          ...p,
          {
            ATB: rows.ATB_ID,
            So: rows.MatDoc,
            DPUR: rows.DPUR,
            PO: rows.PO,
            MNFDate: rows.MNFDate,
            ItemCode: rows.Itemcode,
            ItemName: rows.Dscription,
            Quantity: rows.Quantity,
            Price: rows.TF,
            // Tax: rows.So,
            // TotalLC: rows.So,
            LineTotal: rows.linetotal,
            UoM: rows.UOM,
            MatDoc: rows.MatDoc,
            QtyDMP: rows.QtyDMP,
            PriceDMP: rows.PriceDMP,
            PostedQty: rows.PostedQty,
          },
        ]);
      });
      return;
      CopyFromRFPReturn.map((rows) => {
        setRows((p) => [
          ...p,
          {
            So: rows.MatDoc,
            // ATB: rows.ATB_ID,
            // DPUR: rows.DPUR,
            // PO: rows.PO,
            // MNFDate: rows.MNFDate,
            // ItemCode: rows.Itemcode,
            // ItemName: rows.Dscription,
            // Quantity: rows.Quantity,
            // Price: rows.TF,
            // // Tax: rows.So,
            // // TotalLC: rows.So,
            // LineTotal: rows.linetotal,
            // UoM: rows.UOM,
          },
        ]);
      });
    } catch (error) {}
  }, [CopyFromRFPReturn]);
  // useEffect(() => {
  //   getATB_ID();
  // }, []);
  useEffect(() => {
    setSelfBillingIDForPint(ATBID[0].ID);
  }, [ATBID[0].ID]);
  useEffect(() => {
    setInvoiceNum(invoiceNUmber[0].Invoicenum);
    console.log(DateNow);
    // setDocumentDate(DateNow);
  }, [invoiceNUmber[0].Invoicenum]);
  return (
    <div>
      <div className="float-right flex -mt-10 mr-5">
        {/* <DefButton
          text="Print"
          type="3"
          className=""
          onClick={printSelfBilling}
        /> */}
        {/* <ReactToPrint
          trigger={() => (
            <button className="rounded-md  h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent ">
              🖨️ Print
            </button>
          )}
          content={() => componentRef.current}
        /> 
        <p className="font-bold -mt-1.5 pl-1  -mr-1 px-1">.</p>*/}
        <DefButton
          text="🧾Copy From RFP"
          type="3"
          className=""
          onClick={() => setHideCopryFromRFP(!HideCopryFromRFP)}
        />
      </div>
      {/* header */}
      <div className="grid grid-cols-4 gap-x-2 py-2 frame">
        <div className="col-span-4">
          <NoteInfo
            title={ErrorNote.title}
            body={ErrorNote.body}
            className="mt-2"
            type={ErrorNote.type}
            visible={ErrorNote.visible}
          />
        </div>
        {Components.map((item, index) => (
          <div className={`col-span-${item.colspan} `}>
            <DefInput
              label={item.id}
              id={item.id}
              clearid={item.id}
              type={item.type}
              disabled={
                item.id == "Document Date" || item.id == "InvoiceNum"
                  ? false
                  : true
              }
              handler={headerOnChangeHandler}
              value={
                item.id == "DocEntry"
                  ? ATBID[0].ID
                  : item.id == "PostingDate"
                  ? DateNow
                  : item.id == "Customer"
                  ? "CDMP000001"
                  : item.id == "CustomerName"
                  ? "DEL MONTE PHILIPPINES INC."
                  : item.id == "ContactID"
                  ? "396"
                  : item.id == "CustomerName"
                  ? "Liberty Ong"
                  : item.id == "Branch"
                  ? "1"
                  : item.id == "InvoiceNum"
                  ? InvoiceNum
                  : item.id == "BranchName"
                  ? "IPIC - VAL"
                  : item.id == "Document Date"
                  ? DocumentDate
                  : item.id == "BranchName"
                  ? ""
                  : ""
              }
              //   handler={headerOnChangeHandler}
            />
          </div>
        ))}
      </div>
      {/* line */}
      <div className="relative   ">
        <div className="mt-2   pb-2 overflow-auto  ">
          <DefTable
            columns={columns}
            rows={rows}
            btnLabel="Remove"
            spanCSS="w-full"
            className=""
            classNameTable="frame"
            onChange={DefTableonChange}
            handleOption={handleOption}
          />
          <div className="mx-auto max-w-4xl   mt-2.5">
            <div className="flex">
              <div className="frame w-full">
                <Label text="Price Checker  " className="whitespace-nowrap" />
                <div className="flex ">
                  <div className="w-full">
                    <DefInput
                      label="ItemCode"
                      className="w-full"
                      placeholder="Search Price..."
                      handler={priceCheckerHandler}
                    />
                  </div>
                  <DefButton
                    onClick={SearchPrice}
                    text="🔎 Search Price"
                    className="w-fit px-2 mx-0.5 float-right mt-4 pt-0.5"
                    type="2B"
                  />
                </div>

                <div>
                  <table className="">
                    <tr>
                      <td>TF</td>
                      <td>{Itemcode[0].TF}</td>
                    </tr>
                    <tr>
                      <td>Item Code</td>
                      <td>{Itemcode[0].itemcode}</td>
                    </tr>
                    <tr>
                      <td>Item Name </td>
                      <td className="text-xs">{Itemcode[0].itemname}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-2   float right-0 frame w-full">
                <Label text="Total Amount : " className="whitespace-nowrap" />
                <NumericFormat
                  thousandSeparator=","
                  value={LineTotal.toFixed(2)}
                  className="border-0 w-32 "
                />
                <Label text="Add Vat: 12% : " className="whitespace-nowrap" />
                <NumericFormat
                  thousandSeparator=","
                  value={addVat12.toFixed(2)}
                  className="border-0 w-32 "
                />
                <Label text="Amount w/ VAT: " className="whitespace-nowrap" />
                <NumericFormat
                  thousandSeparator=","
                  value={AmountTotal.toFixed(2)}
                  className="border-0 w-32 "
                />
                <div className="flex gap-4">
                  <DefButton
                    onClick={PostSelfBilling}
                    text="🚀 Generate"
                    loading={generateLoadingH}
                    className="btn btn-primary btn-sm"
                    type="2B"
                  />
                  <DefButton
                    className="btn btn-primary btn-sm -mt-4"
                    text="CRR Invoice"
                    onClick={crrInvoice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {HideCopryFromRFP ? (
        <SelfBillingCopyFromRFP
          state={setCopyFromRFPReturn}
          hide={setHideCopryFromRFP}
        />
      ) : (
        ""
      )}
      {/* {iPrint ? <SelfBillingPrintRef /> : ""} */}
      {/* <div className="invisible"> */}
      {/* <SelfBillingPrintRefPrintSrc ref={componentRef} /> */}
      {/* </div> */}
    </div>
  );
}
