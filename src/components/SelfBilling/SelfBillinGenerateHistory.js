import React, { useContext, useEffect, useRef, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import { NumericFormat } from "react-number-format";
import ReactToPrint from "react-to-print";
import { SelfBillingPrintRefPrintSrc } from "./Print/SelfBillingPrintRefPrintSrc";
import { useUserStore } from "../userStore/useUserStore";
import { LoadingSpinner } from "../../assets/SVGs";
export default function SelfBillinGenerateHistory() {
  const { DateNow, RowsForPrintContx, setRowsForPrintContx, userInfo } =
    useContext(ITopContext);
  const [rows, setRows] = useState([]);
  const [RowsForPrint, setRowsForPrint] = useState([]);
  const [DateFrom, setDateFrom] = useState(DateNow);
  const [DateTo, setDateTo] = useState(DateNow);
  const [forPrintId, SetforPrintId] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [addVat, setaddVat] = useState(1.0);
  const [AmountWVat, setAmountWVat] = useState(1.0);
  const [showInvoice, setShowInvoice] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [areYouSureoCancel, setareYouSureoCancel] = useState(false);
  const [cancelReturn, setcancelReturn] = useState([]);
  const componentRef = useRef();

  const columns = [
    {
      name: "Option",
      disabled: true,
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
      name: "SO",
      disabled: true,
    },
    {
      name: "DPUR",
      disabled: true,
    },
    {
      name: "PO",
      disabled: true,
    },
    {
      name: "MNFDATE",
      disabled: true,
    },
    {
      name: "ITEMCODE",
      disabled: true,
    },
    {
      name: "ITEMNAME",
      disabled: true,
    },
    {
      name: "quantity",
      disabled: true,
    },
    {
      name: "price",
      disabled: true,
    },
    {
      name: "linetotal",
      disabled: true,
    },
    {
      name: "uom",
      disabled: true,
    },
    {
      name: "DocDate",
      disabled: true,
    },
  ];

  const Components = [
    {
      id: "MNFDateFrom",
      label: "📅 MNF Date From",
      type: "Date",
    },
    {
      id: "MNFDateTo",
      label: "📅 To",
      type: "Date",
    },
  ];
  const handleOption = (e) => {
    const { id, value, name } = e.target;
    setShowInvoice(true);
    console.log(rows[id].aID);
    SetforPrintId(rows[id].aID);
    console.log({ showInvoice });
  };

  const DateChangeHandler = (e) => {
    const { value, id } = e.target;
    console.log(e.target);
    if (id == "MNFDateFrom") setDateFrom(value);
    if (id == "MNFDateTo") setDateTo(value);
  };
  const searchHandler = async (e) => {
    console.log(e.target);
    setLoading(true);
    await EXEC_SQL_InsertOne(944, setRows, DateFrom, DateTo);
    setLoading(!true);
  };
  const searchPrintHandler = async () => {
    await EXEC_SQL_InsertOne(943, setRowsForPrint, forPrintId);
  };
  console.log(RowsForPrint);
  const HeaderLabels2 = [
    {
      header: "Date:",
      label: DateNow,
      span: "3",
    },
  ];
  const HeaderLabels = [
    {
      header: "SOLD TO: ",
      label: "DEL MONTE PHILIPPINES INC.",
      span: "5",
    },
    {
      header: "Registered Name:",
      label: "DEL MONTE PHILIPPINES INC.",
      span: "5",
    },
    {
      header: "TIN: ",
      label: "000-291-799-000",
      span: "5",
    },
    // {
    //   header: "Terms: ",
    //   label: "",
    //   span: "3",
    // },
    {
      header: "Business Address: ",
      label: "Bugo Cagayan De Oro City",
      span: "5",
    },
    // {
    //   header: "OSCA/PDW ID No.: ",
    //   label: "",
    //   span: "3",
    // },
    // {
    //   header: "",
    //   label: "",
    //   span: "5",
    // },
    // {
    //   header: "Card Holder's",
    //   label: "",
    //   span: "3",
    // },
    // {
    //   header: "Signature :",
    //   label: "",
    //   span: "3",
    // },
  ];
  const HeaderComps = (e) => {
    return (
      <div className={`col-span-${e.span} flex w-full p-0 -m-0`}>
        <p className=" py-0 my-0 whitespace-nowrap w-fit pr-1">{e.header}</p>
        <p className=" py-0 my-0 whitespace-nowrap uppercase border-b-2 border-black w-full">
          {e.label}
        </p>
      </div>
    );
  };
  const CancelInvoice = async () => {
    await EXEC_SQL(937, setcancelReturn, forPrintId);
    setShowInvoice(false);
  };
  const handle = (e) => {
    const { id } = e.target;

    setareYouSureoCancel(false);
    if (id == 2) CancelInvoice();
  };
  useEffect(() => {
    setRowsForPrintContx(RowsForPrint);
  }, [RowsForPrint]);

  const SelfBillinGenerateHistoryToAR = () => {
    const { sbPeriod, setSBPeriod } = useUserStore();
    console.log("SB Period", sbPeriod);
    return (
      <>
        <div className="absolute z-50 w-full h-full bg-trans50 left-0 right-0">
          <div className="mx-auto bg-white z-50 w-[900px] rounded-md  mt-10 py-2">
            <div className=" -m-0 p-0">
              {/* invoice template */}
              {/* fore */}
              <div className="" style={{ maxWidth: "900px" }}>
                <div className="flex">
                  <img
                    src="https://innovativepkg.com.ph/img/app/ipic-logo.png"
                    className="w-20 h-16"
                  ></img>
                  <div className="text-center font-semibold  w-full ">
                    <div className="flex mx-auto w-fit ">
                      <h2 className="text-black font-bold  flex whitespace-nowrap">
                        Innovative Packaging Ind. Corp.
                      </h2>
                      <div className="flex mt-2 gap-2">
                        <ReactToPrint
                          trigger={() => (
                            <button className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent  text-sm  text-mainLink bg-transparent ">
                              🖨️Print
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                        <button
                          onClick={() => {
                            setareYouSureoCancel(true);
                          }}
                          className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent "
                        >
                          🛑Cancel
                        </button>
                        <button
                          onClick={() => {
                            const textToCopy = { ...RowsForPrint[0] };
                            console.log(textToCopy);
                            navigator.clipboard
                              .writeText(textToCopy)
                              .then(() => {
                                console.log("Array copied to clipboard!");
                              })
                              .catch((error) => {
                                console.error(
                                  "Failed to copy array to clipboard:",
                                  error
                                );
                              });
                            console.log({ RowsForPrint });
                          }}
                          className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent "
                        >
                          📋Copy
                        </button>
                        <DefButton
                          text="Close"
                          type="2B"
                          className="mr-2  w-fit px-1 float-right"
                          onClick={() => setShowInvoice(false)}
                        />
                      </div>
                    </div>
                    <p className="-p-0 m-0">VAT REG. TIN: 205-180-644-00000</p>
                    <p className="-p-0 m-0">
                      271 T.Santiago St., Veinte Reales ,Dist. 1 1440,
                    </p>
                    <p className="-p-0 m-0">
                      City of Valnzuela NCR, Third District, Philippines
                    </p>
                    <br></br>
                    <p className="font-black">SALES INVOICE</p>
                  </div>
                </div>
                <div className="w-fit my-2">
                  <label>Selfbilling Period</label>
                  <input
                    type="text"
                    onChange={(e) => setSBPeriod(e.target.value)}
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <div>
                      ▢ <span>CASH SALES</span>
                    </div>
                    <div>
                      ▢ <span>CHARGE SALES</span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="border-t-2 border-x-2 px-1 border-black font-semibold">
                      Date:
                    </span>
                    <span className="border-t-2 border-r-2 px-1 border-black font-semibold">
                      {HeaderLabels2[0].label}
                    </span>
                  </div>
                </div>
                {/* Border */}
                <div className="border-2">
                  {/* Header */}
                  <div>
                    {HeaderLabels.map((item, i) => (
                      <>
                        <HeaderComps
                          header={item.header}
                          label={item.label}
                          span={item.span}
                        />
                      </>
                    ))}
                  </div>
                  {/* body lines */}
                  <div className="grid grid-cols-12 mt-2">
                    <div className="border-t-2 border-r-2 border-black font-semibold col-span-6 text-center">
                      Item Description / Nature of Service
                    </div>
                    <div className="border-t-2 border-r-2 border-black font-semibold col-span-2 text-center">
                      Quantity
                    </div>
                    <div className="border-t-2  border-black font-semibold col-span-2 text-center">
                      Unit Cost/Price
                    </div>
                    <div className="border-t-2 border-l-2 border-black font-semibold col-span-2 text-center">
                      Amount
                    </div>
                    {RowsForPrint.map((item, i) => (
                      <React.Fragment key={i}>
                        <div className="border-t-2 border-r-2 border-black col-span-6">
                          <span className="ml-5">
                            {item.ITEMNAME} - {item.ITEMCODE}
                          </span>
                          <div className="flex ml-5">
                            <div className="w-[15%]">
                              <span className="font-semibold text-xs ">
                                Mnf date:
                              </span>{" "}
                              <span className="text-xs">
                                {item.MNFDATE.substring(0, 10)}
                              </span>
                            </div>
                            <div className="w-[20%]">
                              <span className="font-semibold text-xs ">
                                SAP Doc#
                              </span>{" "}
                              <span className="text-xs">{item.SO}</span>
                            </div>
                            <div className="w-[12%]">
                              <span className="font-semibold text-xs ">
                                {parseFloat(item.linetotal) < 0
                                  ? "CRR"
                                  : "DPUR"}
                                :
                              </span>{" "}
                              <span className="text-xs">
                                {parseFloat(item.linetotal) < 0
                                  ? item.DPUR.substring(4, 18)
                                  : item.DPUR.substring(5, 18)}
                              </span>
                            </div>
                            <div className="w-[15%]">
                              <span className="font-semibold text-xs ">
                                PO#
                              </span>{" "}
                              <span className="text-xs">{item.PO}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t-2 border-r-2 border-black col-span-2 text-center">
                          {item.quantity}
                        </div>
                        <div className="border-t-2  border-black col-span-2 text-center">
                          {item.price}
                        </div>
                        <div className="border-t-2 border-l-2 border-black col-span-2 text-center">
                          {item.linetotal}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full flex -z-10">
                <div className="w-9/12"></div>
                <div className="w-fit  whitespace-nowrap mt-2 grid grid-cols-2">
                  <p className="p-0 m-0"> Total Amount :</p>
                  <NumericFormat
                    thousandSeparator=","
                    value={TotalAmount}
                    className="border-0 w-32 "
                  />
                  <p className="p-0 m-0"> Add: 12% :</p>
                  <NumericFormat
                    thousandSeparator=","
                    value={addVat}
                    className="border-0 w-32 "
                  />
                  <p className="p-0 m-0">Amount w/ VAT:</p>
                  <NumericFormat
                    thousandSeparator=","
                    value={parseFloat(TotalAmount) + parseFloat(addVat)}
                    className="border-0 w-32 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (forPrintId > 0) {
      searchPrintHandler();
    }
  }, [forPrintId]);

  useEffect(() => {
    if (RowsForPrint != undefined) {
      setTotalAmount(0);
      let TotalAmount = 0;
      RowsForPrint.map((item, i) => {
        TotalAmount += item.linetotal;
      });
      setTotalAmount(TotalAmount.toFixed(2));

      // setaddVat(0.12 * TotalAmount);
      // setAmountWVat(TotalAmount - addVat);
    }
  }, [RowsForPrint]);
  useEffect(() => {
    // if (TotalAmount === 0) return;
    setaddVat((0.12 * TotalAmount).toFixed(2));
    let totalAmoundPlusVat = parseFloat(TotalAmount) + parseFloat(addVat);
    setAmountWVat(totalAmoundPlusVat);
  }, [TotalAmount]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [arContentsArray, setArContentsArray] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [DRQTYARR, setDRQTYARR] = useState([]);
  const [loadingMJ, setLoadingMJ] = useState(false);
  const [loadingMJS, setLoadingMJS] = useState(false);
  const [messageMJ, setMessageMJ] = useState(null);
  const [receivedDate, setReceivedDate] = useState(null);
  const [receivedDateS, setReceivedDateS] = useState(null);
  const [counterDate, setCounterDate] = useState(null);
  const [counterDateS, setCounterDateS] = useState(null);
  const [DRPRICEARR, setDRPRICEARR] = useState([]);
  const [sbAmount, setSbAmount] = useState(0);
  const [errorMJ, setErrorMJ] = useState(null);
  const [rowsMJ, setRowsMJ] = useState([]);
  const [loading1, setLoading1] = useState(false);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleCreateAR = async (e) => {
    setLoading1(true);
    setModalVisible(!modalVisible);
    const { id } = e.target;
    const uID = rows[id].aID;
    const filterRows = rows.filter((row) => uID === row.aID);
    let TotalAmount1 = 0;
    filterRows.map((item) => (TotalAmount1 += item.linetotal));
    const x = TotalAmount1 * 0.12;
    let sbAddedAmnt = x + TotalAmount1;
    let sbRoundedAmnt = sbAddedAmnt.toFixed(2);
    const sbFormattedAmount = new Intl.NumberFormat("en-PH").format(
      sbRoundedAmnt
    );
    setSbAmount(sbFormattedAmount);
    console.log("x + total", x + TotalAmount1);
    setFilteredRows(filterRows);
    try {
      const res = await fetch("DRContentsMJ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterRows),
      });
      const data = await res.json();
      data.length > 0 && setLoading1(false);
      setArContentsArray(data);
      const groupedData = data.reduce((acc, row) => {
        const key = `${row.ItemCode}-${row.U_DPUR} - ${row.U_MnfDate}`;
        if (!acc[key]) {
          acc[key] = {
            itemcode: row.ItemCode,
            dpur: row.U_DPUR,
            mnfdate: row.U_MnfDate.substring(0, 10),
            totalQuantity: 0,
          };
        }
        acc[key].totalQuantity += row.OpenQty;
        return acc;
      }, {});
      const groupedArray = Object.values(groupedData);
      setDRQTYARR(groupedArray);
      let DRTOTALAMOUNT = 0;
      data.map((item) => (DRTOTALAMOUNT += item.LineTotal));
      let totalMultipVAT = DRTOTALAMOUNT * 0.12;
      let totalPlusVAT = totalMultipVAT + DRTOTALAMOUNT;
      let roundedAmnt = totalPlusVAT.toFixed(2);
      const formattedAmount = new Intl.NumberFormat("en-PH").format(
        roundedAmnt
      );
      setDRPRICEARR(formattedAmount);
      console.log("DR Qty Arr", groupedArray);
      console.log("DR Price Arr", totalPlusVAT);

      const SINum = filterRows[0].AR;
      console.log("SI", SINum);
      // const resp = await fetch("PostedAR_MJ", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(filterRows[0].AR),
      // });
      // const data2 = await resp.json();
      // console.log("Data 2", data2);
    } catch (err) {
      console.log("Create AR Error", err);
    }
  };
  console.log("Filtered Rows", filteredRows);

  const viewRemovedItems = () => {
    setModalVisible2(!modalVisible2);
    setModalVisible3(false);
    setRowsMJ([]);
    setCounterDateS("");
    setReceivedDateS("");
  };

  const handleStandAlone = () => {
    // alert("Development Stage!");
    setModalVisible3(!modalVisible3);
    setModalVisible2(false);
  };

  const handleRemoveService = (index) => {
    setRowsMJ((prev) => prev.filter((_, i) => i !== index));
    showNotification("Service removed successfully!");
  };

  const handleRemove = (index) => {
    const itemToRemove = arContentsArray[index];
    console.log("itemToRemove", itemToRemove);
    setRemovedItems((prev) => [...prev, itemToRemove]);
    setDRQTYARR((prevQtyArray) =>
      prevQtyArray.map((qty) =>
        qty.itemcode === itemToRemove.ItemCode &&
        qty.dpur === itemToRemove.U_DPUR &&
        qty.mnfdate == itemToRemove.U_MnfDate.substring(0, 10)
          ? { ...qty, totalQuantity: qty.totalQuantity - itemToRemove.OpenQty }
          : qty
      )
    );
    setArContentsArray((prev) => prev.filter((_, i) => i !== index));
    showNotification("Item removed successfully!");
  };

  const handleRestore = (index) => {
    const itemToRestore = removedItems[index];
    setArContentsArray((prev) => [...prev, itemToRestore]);
    setDRQTYARR((prevQtyArray) =>
      prevQtyArray.map((qty) =>
        qty.itemcode === itemToRestore.ItemCode &&
        qty.dpur === itemToRestore.U_DPUR &&
        qty.mnfdate == itemToRestore.U_MnfDate.substring(0, 10)
          ? {
              ...qty,
              totalQuantity: qty.totalQuantity + itemToRestore.OpenQty,
            }
          : qty
      )
    );
    setRemovedItems((prev) => prev.filter((_, i) => i !== index));
    showNotification("Item restored successfully!");
  };

  const handleChangeServices = (e, index) => {
    const { value, name } = e.target;
    if (value === "412110200") {
      setRowsMJ((prevRows) => {
        return prevRows.map((row, i) =>
          i === index ? { ...row, PROFITCENTER: 30 } : row
        );
      });
    } else if (value === "412110100") {
      setRowsMJ((prevRows) => {
        return prevRows.map((row, i) =>
          i === index ? { ...row, PROFITCENTER: 10 } : row
        );
      });
    }
    setRowsMJ((prevRows) => {
      return prevRows.map((row, i) =>
        i === index ? { ...row, [name]: value } : row
      );
    });
  };

  const handleChangeRemarksServices = (e) => {
    const { value, name } = e.target;
    setRowsMJ((prevRows) =>
      prevRows.map((row, index) =>
        index === 0 ? { ...row, [name]: value } : row
      )
    );
  };

  const handlePostInvoiceS = async () => {
    setLoadingMJS(true);
    const invoiceSPayload = {
      DocType: "dDocument_Service",
      CardCode: "CDMP000001",
      CardName: "DEL MONTE PHILIPPINES INC.",
      DocDate: filteredRows[0]?.DocDate.substring(0, 10),
      NumAtCard: filteredRows[0]?.AR,
      DocCurrency: "PHP",
      U_ReceivedDate: receivedDateS,
      U_CounterDate: counterDateS,
      Comments: `(P) - ${rowsMJ[0]?.COMMENT}`,
      BPL_IDAssignedToInvoice: 1,
      DocumentLines: rowsMJ.map((item) => ({
        ItemCode: null,
        ItemDescription: item.DESCRIPTION,
        BaseType: -1,
        Currency: "PHP",
        UnitPrice: parseFloat(item.PRICE.replace(/(PHP|₱|,)/g, "")),
        AccountCode: item.GLACCOUNT,
        CostingCode: parseInt(item.PROFITCENTER),
        U_Quantity: parseFloat(item.QUANTITY.replace(/(,)/g, "")),
      })),
    };
    try {
      const response = await fetch("B1POST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: invoiceSPayload,
          objectType: "Invoices",
        }),
      });
      const data = await response.json();
      console.log("Invoice Posted Data", data);
      console.log("Invoice Data", invoiceSPayload);
      if (data.message) {
        setMessageMJ(data.message);
        setErrorMJ(null);
        setRowsMJ([]);
      }
      if (data.error?.message) {
        setErrorMJ(`Error: ${data.error.message}`);
        setMessageMJ(null);
      }
    } catch (err) {
      console.log("Post Service Invoice Error", err);
    } finally {
      setLoadingMJS(false);
    }
  };

  const handlePostInvoice = async () => {
    setLoadingMJ(true);
    const invoicePayload = {
      DocType: "dDocument_Items",
      CardCode: "CDMP000001",
      CardName: "DEL MONTE PHILIPPINES INC.",
      DocDate: filteredRows[0]?.DocDate.substring(0, 10),
      NumAtCard: filteredRows[0]?.AR,
      DocCurrency: "PHP",
      U_ReceivedDate: receivedDate,
      U_CounterDate: counterDate,
      Comments: `(P) - Based on Deliveries ${[
        ...new Set(arContentsArray.map((item) => item.DocNum)),
      ].join(", ")}`,
      BPL_IDAssignedToInvoice: 1,
      DocumentLines: arContentsArray.map((item) => ({
        ItemCode: item.ItemCode,
        ItemDescription: item.Dscription,
        Quantity: parseInt(item.OpenQty),
        UoMEntry: parseInt(item.UoMEntry),
        UoMCode: item.UoMCode,
        U_MnfDate: item.U_MnfDate.substring(0, 10),
        U_STOno: item.U_STONo,
        U_Delnote: item.U_Delnote,
        BaseType: 15,
        BaseEntry: item.DocEntry,
        BaseLine: item.LineNum,
        Currency: "PHP",
        UnitPrice: item.Price,
        WarehouseCode: "22220001",
        U_DPUR: item.U_DPUR,
        CostingCode: item.CogsOcrCod,
        COGSCostingCode: item.CogsOcrCod,
        COGSCostingCode2: item.CogsOcrCo2,
        COGSCostingCode3: item.CogsOcrCo3,
      })),
    };
    try {
      const response = await fetch("B1POST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: invoicePayload,
          objectType: "Invoices",
        }),
      });
      const data = await response.json();
      console.log("Invoice Posted Data", data);
      console.log("Invoice Data", invoicePayload);

      if (data.message) {
        setMessageMJ(data.message);
        setErrorMJ(null);
      }

      if (data.error?.message) {
        setErrorMJ(`Error: ${data.error.message}`);
        setMessageMJ(null);
      }
    } catch (err) {
      console.log("Post Invoice Error", err);
    } finally {
      setLoadingMJ(false);
    }
  };

  const handleUProfitCenterChange = (e, index) => {
    const updatedValue = e.target.value;
    const updatedArray = [...arContentsArray];
    updatedArray[index].CogsOcrCod = updatedValue;

    setArContentsArray(updatedArray);
  };

  const handleUPriceChange = (e, index) => {
    const updatedValue = Number(e.target.value);
    const updatedArray = [...arContentsArray];
    updatedArray[index].Price = updatedValue;

    setArContentsArray(updatedArray);
  };

  const handleQuantityChange = (e, index) => {
    const updatedValue = Number(e.target.value);
    const updatedArray = [...arContentsArray];
    const oldQuantity = updatedArray[index].OpenQty;
    updatedArray[index].OpenQty = updatedValue;

    setArContentsArray(updatedArray);

    const itemToEdit = updatedArray[index];

    const quantityDifference = oldQuantity - updatedValue;

    setDRQTYARR((prevQtyArray) =>
      prevQtyArray.map((qty) =>
        qty.itemcode === itemToEdit.ItemCode &&
        qty.dpur === itemToEdit.U_DPUR &&
        qty.mnfdate == itemToEdit.U_MnfDate.substring(0, 10)
          ? {
              ...qty,
              totalQuantity: qty.totalQuantity - quantityDifference,
            }
          : qty
      )
    );
  };

  const messageTimeoutDuration = 5000;
  useEffect(() => {
    if (messageMJ !== null) {
      const timer = setTimeout(() => {
        setMessageMJ(null);
      }, messageTimeoutDuration);

      return () => clearTimeout(timer);
    }
  }, [messageMJ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModalVisible(false);
        setModalVisible2(false);
        setModalVisible3(false);
        setRemovedItems([]);
        setLoadingMJ(false);
        setReceivedDate("");
        setCounterDate("");
        setReceivedDateS("");
        setCounterDateS("");
        setErrorMJ(null);
        setArContentsArray([]);
        setRowsMJ([]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const checkerMJ = [
    {
      id: 0,
      name: "SB QTY",
      type: "text",
    },
    {
      id: 1,
      name: "DR QTY",
      type: "text",
    },
    {
      id: 2,
      name: "Item Code",
      type: "text",
    },
    {
      id: 3,
      name: "DPUR#",
      type: "text",
    },
    {
      id: 4,
      name: "MnfDate",
      type: "text",
    },
    {
      id: 5,
      name: "Doc Date",
      type: "text",
    },
  ];

  const colHeadMJ = [
    {
      id: 0,
      name: "No.",
      type: "text",
    },
    {
      id: 1,
      name: "Action",
      type: "text",
    },
    {
      id: 2,
      name: "DR No.",
      type: "text",
    },
    {
      id: 3,
      name: "Item Code",
      type: "text",
    },
    {
      id: 4,
      name: "Item Name",
      type: "text",
    },
    {
      id: 5,
      name: "Profit Center",
      type: "text",
    },
    {
      id: 6,
      name: "Unit Price",
      type: "text",
    },
    {
      id: 7,
      name: "Quantity",
      type: "text",
    },
    {
      id: 8,
      name: "Total",
      type: "text",
    },
    {
      id: 9,
      name: "UoM",
      type: "text",
    },
    {
      id: 10,
      name: "MnfDate",
      type: "text",
    },
    {
      id: 11,
      name: "DPUR#",
      type: "text",
    },
  ];

  const copyPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      let rawRows = text.split("\n");
      rawRows
        .filter((f) => f.trim() !== "")
        .map((e) => {
          const y = e.split("\t");
          console.log(y);
          setRowsMJ((i) => [
            ...i,
            {
              DESCRIPTION: y[0],
              PRICE: y[1],
              QUANTITY: y[2],
              PROFITCENTER: "10",
              GLACCOUNT: "412110100",
              COMMENT: "",
            },
          ]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={showInvoice ? "invisible" : ""}>
        <div className="frame ">
          <div className="flex gap-2 pb-2 pt-1">
            {Components.map((item, i) => (
              <div className="w-full">
                <DefInput
                  label={item.label}
                  id={item.id}
                  type={item.type}
                  defvalue={DateNow}
                  handler={DateChangeHandler}
                />
              </div>
            ))}

            <DefButton
              type="2B"
              className="w-fit px-2 mt-4 pt-1"
              text="🔎Search"
              loading={Loading}
              onClick={searchHandler}
            />
          </div>
        </div>
        {/* Modal DR & A/R */}
        {modalVisible && (
          <div className="fixed inset-0 flex bg-black/40 bg-opacity-60 z-50">
            <div>
              {notification && (
                <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-[#4e73df] text-white text-lg px-6 py-4 rounded-lg shadow-xl z-10">
                  {notification}
                </div>
              )}
              {messageMJ !== null && (
                <div className="fixed top-5 left-[60rem] bg-[#50da2d] text-white text-lg px-6 py-4 rounded-lg shadow-xl z-10 w-[25%] text-center">
                  {messageMJ}
                </div>
              )}
              {errorMJ !== null && (
                <div className="fixed top-5 left-[60rem] bg-[#c42828] text-white text-lg px-6 py-4 rounded-lg shadow-xl z-10 w-[25%] text-center">
                  <p className="text-white">
                    Oops! Something went wrong while posting your document.
                  </p>
                  {errorMJ}
                </div>
              )}
            </div>
            {/* AR Invoice Modal */}
            <div className="m-4 modal-box max-w-[90rem] p-6 bg-[#f7f7f7] rounded-lg shadow-lg w-full border-2 border-[#c7bd2f] scale-100">
              <h2 className="text-3xl font-semibold mb-6 text-[#333333]">
                A/R Invoice
              </h2>
              <button
                className="btn btn-sm btn-ghost absolute top-2 right-2"
                onClick={() => {
                  setModalVisible(false);
                  setModalVisible2(false);
                  setModalVisible3(false);
                  setRemovedItems([]);
                  setLoadingMJ(false);
                  setReceivedDate("");
                  setCounterDate("");
                  setReceivedDateS("");
                  setCounterDateS("");
                  setErrorMJ(null);
                  setArContentsArray([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="text-[#333333] py-2 px-4">Card Code:</td>
                      <td className="text-[#333333] py-2 px-4">CDMP000001</td>
                      <td className="text-[#333333] py-2 px-4">Branch:</td>
                      <td className="text-[#333333] py-2 px-4">IPIC - VAL</td>
                    </tr>
                    <tr>
                      <td className="text-[#333333] py-2 px-4">Card Name:</td>
                      <td className="text-[#333333] py-2 px-4">
                        DEL MONTE PHILIPPINES INC.
                      </td>
                      <td>Received Date:</td>
                      <td>
                        <input
                          onChange={(e) => setReceivedDate(e.target.value)}
                          type="date"
                          value={receivedDate}
                          className="border rounded-md px-2 py-1 text-gray-800"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-[#333333] py-2 px-4">
                        Customer Ref. No.:
                      </td>
                      <td className="text-[#333333] py-2 px-4">
                        {filteredRows[0].AR}
                      </td>
                      <td>Counter Date:</td>
                      <td>
                        <input
                          onChange={(e) => setCounterDate(e.target.value)}
                          type="date"
                          value={counterDate}
                          className="border rounded-md px-2 py-1 text-gray-800"
                        />
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>

                <div>
                  <p>
                    SB Amount : PHP{" "}
                    <span className="text-[#2cb82c]">{sbAmount}</span>
                  </p>
                  <p>
                    DR Amount : PHP{" "}
                    <span className="text-[#3864f5]">{DRPRICEARR}</span>
                  </p>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {checkerMJ.map((item) => (
                        <th key={item.id}>{item.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((item, index) => {
                      const drQty = DRQTYARR.find(
                        (drItem) =>
                          drItem.itemcode === item.ITEMCODE &&
                          drItem.dpur === item.DPUR
                      )?.totalQuantity;

                      return (
                        <tr key={index}>
                          <td className="text-[#333333] p-2">
                            {item.quantity}
                          </td>
                          <td className="text-[#333333] p-2">{drQty || 0}</td>
                          <td className="text-[#333333] p-2">
                            {item.ITEMCODE}
                          </td>
                          <td className="text-[#333333] p-2">{item.DPUR}</td>
                          <td className="text-[#333333] p-2">{item.MNFDATE}</td>
                          <td className="text-[#333333] p-2">
                            {item.DocDate.substring(0, 10)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex justify-between items-center my-2 p-2">
                  <button
                    onClick={handleStandAlone}
                    className="px-4 py-2 rounded-md bg-[#2dcb40] text-white hover:bg-[#229c30] transition duration-200"
                  >
                    Service
                  </button>
                  <button
                    onClick={viewRemovedItems}
                    className="px-4 py-2 rounded-md bg-[#1e66df] text-white hover:bg-[#1647b2] transition duration-200"
                  >
                    View Removed Items
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="text-center">
                        {colHeadMJ.map((item) => (
                          <th key={item.id}>{item.name}</th>
                        ))}
                      </tr>
                    </thead>
                    {loading1 ? (
                      <div className="flex justify-center items-center m-6 w-full">
                        <div>
                          <LoadingSpinner
                            text="Loading..."
                            className="text-xl"
                          />
                        </div>
                      </div>
                    ) : (
                      <tbody className="text-center">
                        {arContentsArray.map((item, index) => (
                          <tr className="text-center" key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <button
                                onClick={() => handleRemove(index)}
                                className="py-2 px-3 text-sm rounded-md text-white bg-[#ff4d4d] hover:bg-[#d43f3f] transition duration-200"
                              >
                                Remove
                              </button>
                            </td>
                            <td>{item.DocNum}</td>
                            <td>{item.ItemCode}</td>
                            <td>{item.Dscription}</td>
                            <td>
                              <input
                                onChange={(e) =>
                                  handleUProfitCenterChange(e, index)
                                }
                                type="number"
                                className="border rounded-md px-2 py-1 text-[#333]"
                                value={item.CogsOcrCod}
                              />
                            </td>
                            <td>
                              <input
                                onChange={(e) => handleUPriceChange(e, index)}
                                type="number"
                                className="border rounded-md px-2 py-1 text-[#333]"
                                value={item.Price}
                              />
                            </td>
                            <td>
                              <input
                                onChange={(e) => handleQuantityChange(e, index)}
                                type="number"
                                className="border rounded-md px-2 py-1 text-[#333]"
                                value={item.OpenQty}
                              />
                            </td>
                            <td>{item.LineTotal}</td>
                            <td>{item.UomCode}</td>
                            <td>{item.U_MnfDate.substring(0, 10)}</td>
                            <td>{item.U_DPUR}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  <div className="flex justify-end mt-10 mx-4 space-x-3 gap-2">
                    <button
                      className="py-2 px-4 rounded-md text-sm bg-[#e74c3c] text-white hover:bg-[#d43f3f] transition duration-200"
                      onClick={() => {
                        setModalVisible(false);
                        setModalVisible2(false);
                        setModalVisible3(false);
                        setRemovedItems([]);
                        setLoadingMJ(false);
                        setLoadingMJS(false);
                        setReceivedDate("");
                        setCounterDate("");
                        setReceivedDateS("");
                        setCounterDateS("");
                        setErrorMJ(null);
                        setArContentsArray([]);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="py-2 px-4 rounded-md text-sm bg-[#27cc27] text-white hover:bg-[#2980b9] transition duration-200"
                      onClick={handlePostInvoice}
                    >
                      {loadingMJ ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Removed Items */}
            {modalVisible2 && (
              <div className="modal-box max-w-7xl w-full p-6 bg-[#f7f7f7] rounded-lg shadow-lg border-2">
                <h2 className="text-3xl font-semibold mb-6 text-[#333333]">
                  List of Removed Items
                </h2>
                <button
                  className="btn btn-sm btn-ghost absolute top-2 right-2 z-10"
                  onClick={() => setModalVisible2(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </button>
                <div className="overflow-x-auto">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="text-[#333333]">Card Code:</td>
                        <td className="text-[#333333]">CDMP000001</td>
                        <td className="text-[#333333]">Branch:</td>
                        <td className="text-[#333333]">IPIC - VAL</td>
                      </tr>
                      <tr>
                        <td className="text-[#333333]">Card Name:</td>
                        <td className="text-[#333333]">
                          DEL MONTE PHILIPPINES INC.
                        </td>
                      </tr>
                      <tr>
                        <td className="text-[#333333]">Customer Ref. No.:</td>
                        <td className="text-[#333333]">{filteredRows[0].AR}</td>
                        <td className="text-[#333333]">PO Ref.:</td>
                        <td className="text-[#333333]">{filteredRows[0].PO}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="text-center">
                        <th className="text-[#333333]">Action</th>
                        <th className="text-[#333333]">DR Number</th>
                        <th className="text-[#333333]">Item Code</th>
                        <th className="text-[#333333]">Item Description</th>
                        <th className="text-[#333333]">Quantity</th>
                        <th className="text-[#333333]">UoM</th>
                        <th className="text-[#333333]">MnfDate</th>
                        <th className="text-[#333333]">DPUR#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {removedItems.length > 0 ? (
                        removedItems.map((item, index) => (
                          <tr className="text-center" key={index}>
                            <td>
                              <button
                                onClick={() => handleRestore(index)}
                                className="p-2 border rounded-md text-white bg-[#29e232] hover:bg-[#27c726] transition duration-200"
                              >
                                Restore
                              </button>
                            </td>
                            <td>{item.DocNum}</td>
                            <td>{item.ItemCode}</td>
                            <td>{item.Dscription}</td>
                            <td>{item.OpenQty}</td>
                            <td>{item.UomCode}</td>
                            <td>{item.U_MnfDate.substring(0, 10)}</td>
                            <td>{item.U_DPUR}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="my-10 text-center text-2xl text-[#575656]">
                          No removed items.
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Service A/R */}
            {modalVisible3 && (
              <div className="m-4 modal-box max-w-[90rem] p-6 bg-[#f7f7f7] rounded-lg shadow-lg w-full border-2 border-[#c7bd2f] scale-100">
                <h2 className="text-3xl font-semibold mb-6 text-[#333333]">
                  Services A/R
                </h2>
                <button
                  className="btn btn-sm btn-ghost absolute top-2 right-2 z-10"
                  onClick={() => {
                    setModalVisible3(false);
                    setRowsMJ([]);
                    setReceivedDateS("");
                    setCounterDateS("");
                    setErrorMJ(null);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </button>
                <div className="overflow-x-auto">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="text-[#333333]">Card Code:</td>
                        <td className="text-[#333333]">CDMP000001</td>
                        <td className="text-[#333333]">Branch:</td>
                        <td className="text-[#333333]">IPIC - VAL</td>
                      </tr>
                      <tr>
                        <td className="text-[#333333]">Card Name:</td>
                        <td className="text-[#333333]">
                          DEL MONTE PHILIPPINES INC.
                        </td>
                        <td>Received Date:</td>
                        <td>
                          <input
                            onChange={(e) => setReceivedDateS(e.target.value)}
                            type="date"
                            value={receivedDateS}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-[#333333]">Customer Ref. No.:</td>
                        <td className="text-[#333333]">{filteredRows[0].AR}</td>
                        <td>Counter Date:</td>
                        <td>
                          <input
                            onChange={(e) => setCounterDateS(e.target.value)}
                            type="date"
                            value={counterDateS}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <button
                    className="text-white py-2 px-4 text-sm my-2 rounded-md bg-[#2461e4] hover:bg-[#1c7bc9]"
                    onClick={copyPaste}
                  >
                    Paste
                  </button>
                  <table className="table w-full">
                    <thead>
                      <tr className="text-center">
                        <th className="text-[#333333]">No.</th>
                        <th className="text-[#333333]">Action</th>
                        <th className="text-[#333333]">Item Description</th>
                        <th className="text-[#333333]">Unit Price</th>
                        <th className="text-[#333333]">G/L Account</th>
                        <th className="text-[#333333]">Quantity (UDF)</th>
                        <th className="text-[#333333]">Profit Center</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowsMJ.map((item, index) => (
                        <tr
                          key={index}
                          className="text-center border-b hover:bg-[#aaa]"
                        >
                          <td className="py-2">{index + 1}</td>
                          <td className="py-2">
                            <button
                              onClick={() => handleRemoveService(index)}
                              className="rounded-md py-2 px-4 text-sm bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                              aria-label={`Remove ${item.DESCRIPTION}`}
                            >
                              Remove
                            </button>
                          </td>
                          <td className="py-2">{item.DESCRIPTION}</td>
                          <td className="py-2">{item.PRICE}</td>
                          <td className="py-2">
                            <select
                              onChange={(e) => handleChangeServices(e, index)}
                              name="GLACCOUNT"
                              className="py-1 px-3 border rounded-md"
                              aria-label={`Select GL Account for ${item.DESCRIPTION}`}
                            >
                              <option value="412110100">DMPI</option>
                              <option value="412110200">DMPI Bundling</option>
                            </select>
                          </td>
                          <td className="py-2">{item.QUANTITY}</td>
                          <td className="py-2">
                            <input
                              type="number"
                              onChange={(e) => handleChangeServices(e, index)}
                              name="PROFITCENTER"
                              value={item.PROFITCENTER}
                              className="py-1 px-3 border rounded-md"
                              aria-label={`Enter profit center for ${item.DESCRIPTION}`}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td
                          colSpan="6"
                          className="py-2 font-semibold text-left"
                        >
                          Remarks:
                        </td>
                        <td>
                          <textarea
                            onChange={handleChangeRemarksServices}
                            name="COMMENT"
                            className="w-full min-h-[120px] max-h-[300px] p-3 border border-[#273ae4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3567f1] resize-y"
                            placeholder="Enter remarks"
                            aria-label="Enter remarks for the services"
                            value={rowsMJ[0]?.COMMENT}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-end m-4 gap-3">
                    <button
                      className="py-2 px-4 text-sm rounded-md bg-[#e74c3c] text-white hover:bg-[#d43f3f] transition duration-200"
                      onClick={() => {
                        setModalVisible3(false);
                        setRowsMJ([]);
                        setReceivedDateS("");
                        setCounterDateS("");
                        setErrorMJ(null);
                        setLoadingMJS(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="py-2 px-4 text-sm rounded-md bg-[#3498db] text-white hover:bg-[#2980b9] transition duration-200"
                      onClick={handlePostInvoiceS}
                    >
                      {loadingMJS ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <table className="p-0 m-0 pt-1 border border-gray-800">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  className="text-center px-4 py-2 border-b border-gray-800"
                  key={index}
                >
                  <span>{col.name === "ROW_NUM" ? "#" : col.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((item, index) => {
                return (
                  <tr key={index}>
                    {columns.map((cols, colsIndex) => (
                      <td
                        className="px-4 py-2 border-b border-gray-800"
                        key={colsIndex}
                      >
                        {cols.name === "Option" ? (
                          <div className="mx-auto pt-1 flex justify-center gap-2">
                            <button
                              className="border px-3 py-2 rounded-md text-white bg-[#1b4fe0]"
                              onClick={handleOption}
                              id={item.ID === undefined ? index : item.ID}
                              index={index}
                              value={
                                item.value === undefined ? index : item.value
                              }
                            >
                              View
                            </button>
                            <button
                              className="border px-3 py-2 rounded-md bg-[#07c407] text-white"
                              onClick={handleCreateAR}
                              id={item.ID === undefined ? index : item.ID}
                              index={index}
                              value={
                                item.value === undefined ? index : item.value
                              }
                            >
                              Create A/R
                            </button>
                          </div>
                        ) : (
                          item[cols.name]
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-600 py-2"
                >
                  No available SI.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <DefTable
            columns={columns}
            rows={rows}
            btnLabel="Select"
            spanCSS="w-full"
            className=""
            handleOption={handleOption}
          /> */}

        {/* <div className=" invisible "> */}
        <div className="  ">
          <SelfBillingPrintRefPrintSrc ref={componentRef} />
        </div>
      </div>

      {showInvoice ? (
        <div className="w-full h-full absolute left-0 top-0  ">
          <div className="max-w-4xl mx-auto mt-2">
            <SelfBillinGenerateHistoryToAR />
          </div>
        </div>
      ) : (
        ""
      )}
      {areYouSureoCancel ? (
        <>
          <div className="w-screen h-screen z-50 bg-trans50 fixed top-0 left-0 ">
            <div className="frame  bg-white  mx-auto w-96 mt-72 h-44">
              {/* <DefButton
            className="float-right w-fit px-2 mt-2"
            type="2"
            text="X"
          /> */}
              <div className="mt-4 pt-2">
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-4 text-WhiteMode-ButtonBackground000 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="mx-auto w-fit">
                  Are you sure you want to delete this data?
                </p>
              </div>
              <div className="gap-2 mx-auto w-fit">
                <DefButton
                  className="w-fit px-2 mx-1  "
                  type="9"
                  text=" Cancel "
                  onClick={handle}
                  id={1}
                />
                <DefButton
                  className="w-fit px-2 mx-1  "
                  type="2"
                  text=" Confirm "
                  onClick={handle}
                  id={2}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
