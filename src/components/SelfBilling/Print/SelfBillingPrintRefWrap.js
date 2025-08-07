import React, { useContext, useEffect, useRef, useState } from "react";
import { ITopContext } from "../../../hooks/TopContext";
import { DefButton, EXEC_SQL } from "../../ComponentList";
import ReactToPrint from "react-to-print";
import { NumericFormat } from "react-number-format";
import { useUserStore } from "../../userStore/useUserStore";

export default function SelfBillingPrintRefWrap() {
  const { DateNow, SelfBillingIDForPint, RowsForPrintContx } =
    useContext(ITopContext);
  const [lineInfo, setLineInfo] = useState([]);
  const componentRef = useRef();
  const [RowsForPrint, setRowsForPrint] = useState([]);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [addVat, setaddVat] = useState(1.0);
  const [AmountWVat, setAmountWVat] = useState(1.0);
  const [Totalv, setTotalv] = useState(1.0);
  const getLineinfo = async () => {
    await EXEC_SQL(949, setLineInfo, SelfBillingIDForPint);
  };
  const today = new Date();
  const [CreatedDate, setCreatedDate] = useState("");

  const HeaderLabels2 = [
    {
      header: "DATExxxxx: ",
      label: DateNow,
      span: "3",
    },
  ];
  const HeaderLabels = [
    {
      header: "BILLED TO: xxxxx",
      label: "DEL MONTE PHILIPPINES INC.",
      span: "5",
      marginTop: "0",
      marginBottom: "2",
      paddingBottom: "0",
    },
    // {
    //   header: "DATExxxxx: ",
    //   label: DateNow,
    //   span: "3",
    // },
    {
      header: "Busniess Typexxxxx",
      label: "DEL MONTE PHILIPPINES INC.",
      span: "5",
      marginTop: "0",
      marginBottom: "0",
      paddingBottom: "0",
    },
    {
      header: "TIN: xxxxxxxxxxx:",
      label: "000-291-799-000",
      span: "5",
      marginTop: "0",
      marginBottom: "0",
      paddingBottom: "0",
    },
    {
      header: "Address:sssxs'''::'",
      label: "Bugo Cagayan De Oro City",
      span: "5",
      marginTop: "2",
      marginBottom: "0",
      paddingBottom: "0",
    },
  ];
  const HeaderComps = (e) => {
    return (
      <div className={`col-span-${e.span} flex w-full p-0 -m-0`}>
        <p className="py-0 my-0 whitespace-nowrap w-fit pr-1 invisible">
          {e.header}
        </p>
        <p
          className={`ml-4 pb-${e.paddingBottom} mt-${e.marginTop} mb-${e.marginBottom} px-2 my-0 whitespace-nowrap uppercase border-b-2 border-transparent w-full`}
        >
          {e.label}
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (RowsForPrintContx != undefined) {
      setTotalAmount(0);
      let TotalAmount = 0;
      RowsForPrintContx.map((item, i) => {
        TotalAmount += item.linetotal;
      });
      setTotalAmount(TotalAmount.toFixed(2));
    }
  }, [RowsForPrintContx]);
  useEffect(() => {
    try {
      if (TotalAmount === 0) return;
      if (addVat === 0) return;
      setaddVat((0.12 * TotalAmount).toFixed(2));
      let totalAmoundPlusVat = parseFloat(TotalAmount) + parseFloat(addVat);
      setAmountWVat(totalAmoundPlusVat);
    } catch (error) {
      console.log(error);
    }
  }, [TotalAmount]);

  useEffect(() => {
    // if (TotalAmount === 0) return;
    try {
      if (TotalAmount === 0) return;
      if (addVat === 0) return;

      let price = parseFloat(TotalAmount) + parseFloat(addVat);
      console.log(price);
      price = parseFloat(price).toFixed(2);
      setTotalv(price);
      console.log(price);
    } catch (error) {}
  }, [TotalAmount, addVat]);
  const SelfBillinGenerateHistoryToAR = () => {
    const { sbPeriod } = useUserStore();
    const isThreeDigits =
      TotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") >= 100 &&
      TotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") <= 999;
    return (
      <>
        <div className="font-normal text-sm mt-20 pt-1 mx-4 ">
          <div className="-m-0 p-0">
            {/* invoice template */}
            {/* fore */}
            <div style={{ maxWidth: "900px" }}>
              <div className="flex">
                <img
                  src="https://innovativepkg.com.ph/img/app/ipic-logo.png"
                  className="w-20 h-16 invisible"
                ></img>
                <div className="text-center font-semibold invisible">
                  <div className="flex invisible">
                    <h2 className="text-black font-bold flex whitespace-nowrap">
                      Innovative Packaging Industry Corporation
                    </h2>
                    <div className="flex mt-2">
                      {/* <ReactToPrint
                        trigger={() => (
                          <button className="rounded-md  whitespace-nowrap h-5  font-bold  w-fill inline-block transform active:scale-90 transition-transform  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent ">
                            🖨️ Print
                          </button>
                        )}
                        content={() => componentRef.current}
                      />
                      <div className="w-4"></div>

                      <DefButton
                        text="Close"
                        type="2B"
                        className="mr-2  w-fit px-1 float-right"
                        onClick={() => setShowInvoice(false)}
                      /> */}
                    </div>
                  </div>
                  <p className="-p-0 m-0">
                    271 T. Santiago, St, Valenzuela,Dist 1 1440
                  </p>
                  <p className="-p-0 m-0">
                    City of Valnzuela NCR, Third District, Philippines
                  </p>
                  <p className="-p-0 m-0">VAT Reg. TIN: 205-180-644-00000</p>
                  <br></br>
                  <p className="font-black">BILLING STATEMENT</p>
                </div>
                <div className="flex items-end mb-[2.7rem]">
                  <span className="font-semibold">
                    {HeaderLabels2[0].label}
                  </span>
                </div>
              </div>
              <div className="relative">
                <p className="absolute -top-24">{sbPeriod}</p>
              </div>
              {/* Header */}
              <div className="grid-cols-8 grid gap-x-4 mr-4 -mt-6">
                {HeaderLabels.map((item, i) => (
                  <>
                    <HeaderComps
                      header={item.header}
                      label={item.label}
                      span={item.span}
                      marginTop={item.marginTop}
                      marginBottom={item.marginBottom}
                      paddingBottom={item.paddingBottom}
                    />
                  </>
                ))}
              </div>
              {/* body lines */}
              <div className="flex flex-wrap mt-[3.5rem]">
                {RowsForPrintContx.map((item, i) => (
                  <React.Fragment key={i}>
                    {/* Top Row */}
                    <div className="w-full flex">
                      <div className="flex-1">
                        <span className="ml-5 text-xs">
                          {item.ITEMNAME} - {item.ITEMCODE}
                        </span>
                      </div>
                      <div className="w-1/6 text-center">{item.quantity}</div>
                      <div className="w-1/6 text-center">{item.price}</div>
                      <div className="w-1/6 text-center">{item.linetotal}</div>
                    </div>

                    {/* Bottom Row */}
                    <div className="w-full flex flex-wrap mt-1 ml-5 text-sm">
                      <div className="w-[10%] mx-2">
                        <span className="font-semibold">Mnf date:</span>{" "}
                        <span>{item.MNFDATE.substring(0, 10)}</span>
                      </div>
                      <div className="w-[10%] mx-2">
                        <span className="font-semibold">SAP Doc#:</span>{" "}
                        <span>{item.SO}</span>
                      </div>
                      <div className="w-[10%] mx-2">
                        <span className="font-semibold">
                          {parseFloat(item.linetotal) < 0 ? "CRR" : "DPUR"}:
                        </span>{" "}
                        <span>
                          {parseFloat(item.linetotal) < 0
                            ? item.DPUR.substring(4, 18)
                            : item.DPUR.substring(5, 18)}
                        </span>
                      </div>
                      <div className="w-[10%] mx-2">
                        <span className="font-semibold">PO#:</span>{" "}
                        <span>{item.PO}</span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="-z-10 w-full flex -ml-4 font-sans font-bold absolute bottom-[170px] right-[80px]">
              <div className="w-9/12"></div>
              <div
                className={`w-fit whitespace-nowrap mt-2 grid grid-cols-2 gap-y-[0.8rem] gap-x-8 mr-5 text-base ${
                  isThreeDigits ? "ml-10" : ""
                }`}
              >
                {/* <p className="p-0 m-0 mr-2"> Total Amount :</p> */}
                <p className="pb-4 p-0 mb-[0.7rem] mr-4"></p>
                {/* <NumericFormat
                  thousandSeparator=","
                  value={TotalAmount}
                  className="  border-0 w-32 font-extrabold "
                /> */}
                {TotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {/* <p className="pb-4 p-0 m-0 mr-2"> Add: 12% :</p> */}
                <p className="pb-4 p-0 mb-2 mr-2"></p>
                {/* <NumericFormat
                  thousandSeparator=","
                  value={addVat}
                  className=" font-semibold border-0 w-32 "
                /> */}
                {addVat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

                <p className="pb-4 p-0 m-0 mr-2"></p>
                {/* <p className="p-0 m-0 mr-2">Amount w/ VAT:</p> */}
                {/* <NumericFormat
                  thousandSeparator=","
                  value={Totalv}
                  className=" font-semibold border-0 w-32 "
                /> */}
                {Totalv.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    console.log({ RowsForPrintContx });
    if (RowsForPrintContx.length > 0) {
      const newdDate = new Date(RowsForPrintContx[0].DocDate);
      let month = newdDate.getMonth() + 1;
      let day = newdDate.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      setCreatedDate(newdDate.getFullYear() + "-" + month + "-" + day);
      console.log(RowsForPrintContx[0].CreatedDate);
    }
  }, []);
  useEffect(() => {
    console.log("");
  }, [CreatedDate]);
  return (
    <div>
      <SelfBillinGenerateHistoryToAR />
    </div>
  );
}
