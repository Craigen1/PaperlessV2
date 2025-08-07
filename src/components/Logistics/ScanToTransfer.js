import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";
import {
  cssTH,
  DefaultFontStypex,
  delay,
  EXEC_SQL,
  EXEC_SQL_InsertOne,
  Label,
  smalBtn,
  smalBtnWarning,
} from "../ComponentList";

export default function ScanToTransfer() {
  const { userInfo, setPopScannerModal, qrInfo, setQrInfo } =
    useContext(ITopContext);
  const Datenw = new Date();
  const [DocnumContainer, setDocnumContainer] = useState({});
  const [Loading, setLoading] = useState(false);
  const [Docnum, setDocnum] = useState(0);
  const [ScannedItemHolder, setScannedItemHolder] = useState([]);
  const [ScannedItem, setScannedItem] = useState([]);
  const [ScannedItemInfo, setScannedItemInfo] = useState([]);
  const [SelectedPltID, setSelectedPltID] = useState(0);
  const [TotalQT, setTotalQT] = useState(0);

  const [ModuleProp, setModuleProp] = useState([
    {
      id_Name: "Docnum",
      Label: "Document #",
      type: "Text",
      Value: Docnum,
      disabled: "disabled",
    },
    {
      id_Name: "DatePosting",
      Label: "Posting Date",
      type: "Text",
      Value: Datenw.toLocaleDateString().substring(0, 10),
      disabled: "disabled",
    },
    {
      id_Name: "PreparedBy",
      Label: "Prepared By",
      type: "Text",
      Value: userInfo.lastname + ", " + userInfo.firstname,
      disabled: "disabled",
    },
  ]);
  const [changeableText, setChangeableText] = useState({
    remarks: "",
  });
  const handleChange = (e) => {
    try {
      const { value, name } = e.target;
      setChangeableText((a) => ({ ...a, [name]: value }));
    } catch (error) {}
  };
  const handleScannedQR = async () => {
    if (qrInfo.data == "") return;
    let qrInfoSplit = qrInfo.data.split("_");
    // alert(qrInfoSplit[0]);
    // alert(qrInfoSplit[1]);
    setScannedItemHolder([{}]);
    await EXEC_SQL_InsertOne(
      37,
      setScannedItemHolder,
      qrInfoSplit[0],
      qrInfoSplit[1]
    );
    qrInfo.data = "";
    qrInfo.type = "";

    setQrInfo({ type: "", data: "" });
  };

  const getDocum = async () => {
    await EXEC_SQL(36, setDocnumContainer);
    // console.log({ DocnumContainer });
  };
  useEffect(() => {
    getDocum();
    // console.log(Docnum);
  }, []);

  useEffect(() => {
    if (DocnumContainer[0] != null) setDocnum(DocnumContainer[0].Docnum);
  }, [DocnumContainer]);
  useEffect(() => {
    if (qrInfo.data == "") return;
    if (qrInfo.type == "") return;
    if (Loading) return;
    handleScannedQR();
  }, [qrInfo.data]);

  useEffect(() => {
    try {
      if (ScannedItemHolder == null) return;
      if (ScannedItemHolder[0].ItemCode == null) return;
      console.log([ScannedItemHolder]);
      ScannedItemHolder.map((item, index) => {
        setScannedItem((p) => [
          ...p,
          {
            ...item,
          },
        ]);
      });

      console.log({ ScannedItem });
      setScannedItemHolder([{}]);
    } catch (error) {
      console.log({ error });
    }
    // setScannedItemHolder([]);
  }, [ScannedItemHolder]);

  return (
    <>
      <div className="">
        {/* <Label text="Inventory Transfer" type="header" /> */}
        <div className="grid grid-cols-2  gap-x-4 gap-y-2 select-none my-2">
          {ModuleProp != null
            ? ModuleProp.map((item, index) => (
                <div key={index}>
                  <p className={DefaultFontStypex}>{item.Label}</p>
                  <div className=" w-full  grow flex flex-row    appearance-none rounded-md      bg-mainButton  ">
                    <input
                      id={item.id_Name}
                      name={item.id_Name}
                      disabled="disabled"
                      text={item.type}
                      value={item.id_Name == "Docnum" ? Docnum : item.Value}
                      className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
                    ></input>
                  </div>
                </div>
              ))
            : ""}

          <div>
            <p className={DefaultFontStypex}>Remarks</p>
            <div className=" w-full  grow flex flex-row    appearance-none rounded-md      bg-mainButton  ">
              <input
                id="remarks"
                name="remarks"
                text="text"
                value={changeableText.remarks}
                onChange={handleChange()}
                className="block w-full appearance-none rounded-md     px-3.5 py-1 text-mainText focus:border-0"
              ></input>
            </div>
          </div>
          <span></span>
          {/* <button
          className={smalBtn}
          onClick={async () => {
            qrInfo.data = "";
            qrInfo.type = "";
            console.log("done await");
            await delay(500);
            console.log("done await");
            qrInfo.data = "134954_14";
            qrInfo.type = "";
            handleScannedQR();
          }}
        >
          <div className="">
            📷 <br></br> Scan Pallet Web{" "}
          </div>
        </button> */}
          <button
            className={smalBtn}
            onClick={() => {
              qrInfo.data = "";
              qrInfo.type = "";
              setPopScannerModal(true);
              console.log({ ScannedItem });
            }}
          >
            <div className="">
              📷 <br></br> Scan Pallet{" "}
            </div>
          </button>
        </div>

        <table className="w-full">
          <tr className="w-full">
            <th className={cssTH}>Scanned Item Info</th>
            <th className={cssTH}>Palleted Info</th>
            <th className={cssTH}></th>
          </tr>
          {ScannedItem != null
            ? ScannedItem.map((item, index) => (
                <>
                  <tr className="" key={index}>
                    <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-fit  ">
                      <div>
                        <div className="w-full grow flex flex-row  ">
                          <span className="block float-right ">
                            {item.ItemCode}
                          </span>
                        </div>
                        <input
                          className=" w-full px-1 bg-transparent "
                          value={item.ItemName}
                          disabled="disabled"
                        ></input>
                      </div>
                      <div>
                        {/* <span className="block  ">BTCH: {item.BatchNum}</span> */}
                        <span className="block  ">
                          PD: {item.MnfDate.substring(0, 10)} - ED:{" "}
                          {item.ExpDate.substring(0, 10)}
                        </span>
                      </div>
                    </td>
                    <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap  ">
                      <p className="w-full text-sm -my-1 -p-0 text-center">
                        QTY
                      </p>
                      <p className="w-full text-3xl  -my-1 -p-0 text-center">
                        {item.Quantity}
                      </p>

                      <div className="flex">
                        <button
                          className=" rounded-md  w-full  font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-mainTextblack  bg-main"
                          onClick={async () => {
                            console.log({ SelectedPltID });
                            await EXEC_SQL_InsertOne(
                              38,
                              setScannedItemInfo,
                              item.DocEntry,
                              item.palletid
                            );
                            setSelectedPltID(item.palletid);
                          }}
                        >
                          <div className="mx-2 my-2 items-center justify-center flex">
                            <p className="w-full text-3xl  -my-1 -p-0 text-center ">
                              {item.palletid}
                            </p>
                          </div>
                        </button>
                      </div>
                    </td>

                    <td className={smalBtnWarning}>
                      <button
                        onClick={() => {
                          console.log({ index });
                          const HoldBatchContainer = [...ScannedItem];
                          HoldBatchContainer.splice(index, 1);
                          console.log(HoldBatchContainer);
                          setScannedItem(HoldBatchContainer);
                        }}
                      >
                        <span className="ml-4">Delete</span>
                      </button>
                    </td>
                  </tr>
                </>
              ))
            : ""}
        </table>
        <div className="fixed left-0 bottom-3  items-center justify-center flex w-full">
          <button className={smalBtn} onClick={async () => {}}>
            <div className="mx-2 my-2">🚀 Transfer </div>
          </button>
        </div>

        {SelectedPltID != 0 ? (
          <div className="w-screen h-screen absolute top-0 left-0 ">
            <div className="h-56"></div>
            <div className="mx-10 my-auto bg-mainButton p-4 ">
              <div className=" float-right mb-4">
                <button
                  className={smalBtn}
                  onClick={async () => {
                    setSelectedPltID(0);
                  }}
                >
                  <div className="mx-2 my-2">❌</div>
                </button>
              </div>
              <table className="w-full">
                <tr className="w-full">
                  <th className={cssTH}>Item</th>
                  <th className={cssTH}>Palleted Qty</th>
                </tr>
                {ScannedItemInfo != null
                  ? ScannedItemInfo.map((item, index) => (
                      <>
                        <tr className="" key={index}>
                          <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-fit  ">
                            <div>
                              <div className="w-full grow flex flex-row  ">
                                <span className="block float-right ">
                                  {item.ItemCode}
                                </span>
                              </div>
                              <input
                                className=" w-full px-1 bg-transparent "
                                value={item.ItemName}
                                disabled="disabled"
                              ></input>
                            </div>
                            <div>
                              {/* <span className="block  ">BTCH: {item.BatchNum}</span> */}
                              <span className="block  ">
                                PD: {item.MnfDate.substring(0, 10)} - ED:{" "}
                                {item.ExpDate.substring(0, 10)}
                              </span>
                            </div>
                          </td>
                          <td className=" text-mainText border-2 border-gray-900 px-1   whitespace-nowrap  ">
                            <p className="w-full text-sm -my-1 -p-0 text-center">
                              QTY
                            </p>
                            <p className="w-full text-3xl  -my-1 -p-0 text-center">
                              {item.Quantity}
                            </p>
                            <p className="w-full text-sm -my-1 -p-0 text-center">
                              Pallet
                            </p>
                            <p className="w-full text-3xl  -my-1 -p-0 text-center ">
                              {item.palletid}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))
                  : ""}
              </table>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
