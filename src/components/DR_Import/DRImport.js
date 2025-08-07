import React, { useEffect, useState } from "react";
import DRimportsHeader from "./DRimportsHeader";
import { DefMenus, DefTableV3_MJ } from "../ComponentList";
import { LoadingSpinner } from "../../assets/SVGs";
import DeliveryPayload from "./DeliveryPayload";
import { useUserStore } from "../userStore/useUserStore";

export default function DRImport() {
  const vendorCode = [
    { TRUCKER: "RYTMATCH / ALSON / BULANADI", VENDORCODE: "18276" },
    { TRUCKER: "AMOS CARGO / RNE / TOTAL WAY", VENDORCODE: "8364" },
    { TRUCKER: "JLA LOGISTICS INC/J MOVERS", VENDORCODE: "30915" },
    { TRUCKER: "CLP", VENDORCODE: "9125" },
    { TRUCKER: "LEAVIL", VENDORCODE: "8735" },
    { TRUCKER: "JFOURS", VENDORCODE: "32827" },
    { TRUCKER: "ADSIA/BLUE DRAGON/SANCTUM/AAXS", VENDORCODE: "2014" },
    { TRUCKER: "D3E", VENDORCODE: "24543" },
    { TRUCKER: "JDAN", VENDORCODE: "24824" },
    { TRUCKER: "O FASHION TRANSPORT SERVICES", VENDORCODE: "21502" },
    { TRUCKER: "4MEN / R4M", VENDORCODE: "4773" },
    { TRUCKER: "AKYLAS", VENDORCODE: "28921" },
    { TRUCKER: "PAILO/AXXIS/PANGGA", VENDORCODE: "5096" },
    { TRUCKER: "PLACER 8", VENDORCODE: "38286" },
    {
      TRUCKER: "RAEDA LOGISTICS SOLUTION SPECIALIST INC.",
      VENDORCODE: "28750",
    },
    { TRUCKER: "Ezyhaul Philippines Inc./PCL (subcon)", VENDORCODE: "31148" },
    { TRUCKER: "MJDC", VENDORCODE: "29841" },
    { TRUCKER: "DMJ", VENDORCODE: "32108" },
    { TRUCKER: "LORENZO/TRANSPARTNER/ROADLINK TRUCKING", VENDORCODE: "631" },
    { TRUCKER: "2GO TRUCKING", VENDORCODE: "3811" },
    { TRUCKER: "(CV) MORETA (EVERBEST)", VENDORCODE: "3891" },
    { TRUCKER: "FOUR MERRY'S TRUCKING SERVICES", VENDORCODE: "27309" },
    {
      TRUCKER: "Translogxtics",
      VENDORCODE: "38363",
    },
    { TRUCKER: "MRCG FREIGHT SERVICES", VENDORCODE: "27311" },
    { TRUCKER: "Inteluck Corporation Logistics", VENDORCODE: "35838" },
    { TRUCKER: "KHYMELEV", VENDORCODE: "34449" },
    { TRUCKER: "LTKB", VENDORCODE: "33991" },
    { TRUCKER: "FAST SERVICES CORPORATION", VENDORCODE: "5107" },
    { TRUCKER: "MAGTALAS", VENDORCODE: "32476" },
    {
      TRUCKER: "FAST LOGISTICS CORPORATION. ( FAST CARGO)",
      VENDORCODE: "31299",
    },
  ];

  const [rows, setRows] = useState([]);
  const [totalAllocatedqty, setTotalAllocatedqty] = useState(0);
  const [noMatchingBatches, setNoMatchingBatches] = useState([]);
  const [progress, setProgress] = useState(0);
  const [searchBtnStatus, setSearchBtnStatus] = useState(true);
  const [allocateBtnStatus, setAllocateBtnStatus] = useState(true);
  const [postBtnStatus, setPostBtnStatus] = useState(true);
  const [SelectedMenu, setSelectedMenu] = useState("0");
  const [employees, setEmployees] = useState([]);
  const [profitCenter, setProfitCenter] = useState("");
  const [profitCenterArr, setProfitCenterArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [empOwnerCode, setEmpOwnerCode] = useState(null);
  const [prcCode, setPrcCode] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredProfitCenter, setFilteredProfitCenter] = useState([]);
  const [filteredBatchNum, setFilteredBatchNum] = useState([]);
  const [batchperjulian, setBatchperjulian] = useState([]);
  const [deliveryPayloadViewer, setDeliveryPayloadViewer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { error, setError, message, setMessage } = useUserStore();
  const [showBatchperJulian, setShowBatchperJulian] = useState(null);
  const [hidden, setHidden] = useState(true);

  const menus = [
    { id: 0, text: "Delivery" },
    { id: 1, text: "Search Delivery" },
  ];
  const cols = [
    { name: "ITEMCODE" },
    { name: "ITEMNAME" },
    { name: "BATCHCODE" },
    { name: "DPUR" },
    { name: "NEEDEDQTY" },
    { name: "ALLOCATEDQTY" },
    { name: "PD" },
  ];
  const cols1 = [
    { name: "ITEMCODE" },
    { name: "ITEMNAME" },
    { name: "BATCHNUM" },
    { name: "DPUR#" },
    { name: "MNFDATE" },
    { name: "AVAILABLEQTY" },
    { name: "WAREHOUSE" },
  ];

  const importFromExcel = async () => {
    setHidden(true);
    setBatchperjulian([]);
    setError(null);
    setProgress(25);
    setRows([]);
    setFilteredBatchNum([]);
    setTotalAllocatedqty(0);
    setNoMatchingBatches([]);
    setFilteredEmployees([]);

    try {
      const text = await navigator.clipboard.readText();
      let rawRows = text.split("\n");
      const expectedColumns = 22;
      rawRows
        .filter((f) => f.trim() !== "")
        .map((e) => {
          const y = e.split("\t");
          if (y.length !== expectedColumns) {
            throw new Error(
              "Incorrect format: Each row must have exactly " +
                expectedColumns +
                " columns."
            );
          }
          setRows((rows) => [
            ...rows,
            {
              CUSTOMERREFN: y[0],
              ITEMCODE: y[1].trim(),
              ITEMNAME: y[2].trim(),
              STOREF: y[3],
              OUTBOUNDDELIVERY: y[4],
              BATCHCODE: y[5].trim(),
              NEEDEDQTY: parseInt(y[6]),
              TOTALQTYSTO: parseInt(y[7]),
              UOM: y[8],
              PD: y[9],
              MATDOC: y[10],
              TIME: y[11],
              TRUCKER: y[12],
              TRUCKTYPE: y[13],
              DRIVER: y[14],
              PLATENO: y[15],
              DESTINATION: y[16],
              PULLEDOUTDATE: y[17],
              WAYBILL: y[18],
              RIGHTSEAL: y[19],
              LEFTSEAL: y[20],
              BACKSEAL: y[21],
              ALLOCATEDQTY: y[22],
              DPUR: y[23],
            },
          ]);
        });
      setSearchBtnStatus(false);
      setAllocateBtnStatus(true);
      setPostBtnStatus(true);
    } catch (error) {
      setError(error.message);
      console.error("Import Error: ", error);
    }
  };

  const searchBatch = async () => {
    setError(null);
    try {
      setLoading1(true);
      const deliveryDetails = () => {
        return rows.map((bt) => ({
          cardCode: bt.CARDCODE,
          batchCode: bt.BATCHCODE,
          julianCode: bt.BATCHCODE.substring(0, 4),
          itemCode: bt.ITEMCODE,
          neededQty: bt.NEEDEDQTY,
          mnfDate: bt.PD,
        }));
      };
      const getDPURNo = async (details) => {
        const response = await fetch("getDPUR_MJ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        const data = await response.json();
        return data;
      };
      // Fetch batch details from API
      const fetchBatchDetails = async (details) => {
        const response = await fetch("batchDetails_MJ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        const data = await response.json();
        console.log("Retrieved Batch(es):", data);
        setFilteredBatchNum(data);
        const updatedRowsWithDPUR = rows.map((row) => {
          const [month, day, year] = row.PD.split("/").map((part) =>
            part.padStart(2, "0")
          );
          const rowDate = `20${year}-${month}-${day}`;
          const x = data.find(
            (e) =>
              e.U_MnfDate.substring(0, 10) === rowDate &&
              row.ITEMCODE === e.ItemCode &&
              row.BATCHCODE === e.BatchNum.substring(0, 9)
          );
          return x
            ? {
                ...row,
                DPUR: x.U_DPUR,
              }
            : row;
        });
        const uRowsVendorDPUR = updatedRowsWithDPUR.map((uRows) => {
          const matchingVendor = vendorCode.find(
            (vendor) => vendor.VENDORCODE === uRows.TRUCKER
          );
          return matchingVendor
            ? {
                ...uRows,
                TRUCKER: matchingVendor.TRUCKER,
              }
            : uRows;
        });
        setRows(uRowsVendorDPUR);
        console.log("Upated Rows with Trucker/DPUR:", uRowsVendorDPUR);
        return data;
      };

      // display unmatched batch numbers
      const updateStateWithFetchedData = (data) => {
        const unmatchedBatches = rows.filter((row) => {
          const batchNum = row.BATCHCODE;
          return !data.some(
            (sapBatch) => sapBatch.BatchNum.substring(0, 9) === batchNum
          );
        });
        setNoMatchingBatches(unmatchedBatches);
        setAllocateBtnStatus(false);
        setProgress(50);
      };

      // Execute
      const delDetails = deliveryDetails();
      // await getDPURNo(delDetails);
      const batchData = await fetchBatchDetails(delDetails);
      updateStateWithFetchedData(batchData);
    } catch (err) {
      err ? setError(`${err}. Please Contact Admin!`) : "";
      console.error("Search Error:", err);
    } finally {
      setLoading1(false);
    }
  };

  const allocateQTY = () => {
    setError(null);
    setProgress(75);
    let newAllocationsResult = [];
    const updatedRows2 = rows.map((p) => {
      if (p.NEEDEDQTY <= 0) return setMessage("Allocation already done!");
      let totalAllocatedQty = 0;
      let remainingNeededQty = p.NEEDEDQTY;
      const batchAllocations = [];

      filteredBatchNum.forEach((i) => {
        if (
          p.BATCHCODE === i.BatchNum.substring(0, 9) &&
          p.ITEMCODE === i.ItemCode &&
          p.DPUR === i.U_DPUR &&
          remainingNeededQty > 0
        ) {
          const allocatedQty = Math.floor(
            Math.min(remainingNeededQty, i.Quantity)
          );
          remainingNeededQty -= allocatedQty;
          i.Quantity -= allocatedQty;
          totalAllocatedQty += allocatedQty;

          batchAllocations.push({
            ITEMCODE: p.ITEMCODE,
            DPUR: p.DPUR,
            BATCHCODE: i.BatchNum,
            ALLOCATEDQTY: allocatedQty,
            PD: p.PD,
          });
          newAllocationsResult.push({
            ITEMCODE: p.ITEMCODE,
            DPUR: p.DPUR,
            BATCHCODE: i.BatchNum,
            NEEDEDQTY: remainingNeededQty,
            ALLOCATEDQTY: allocatedQty,
          });
        }
      });
      return {
        ...p,
        ALLOCATEDQTY: (p.ALLOCATEDQTY || 0) + totalAllocatedQty,
        NEEDEDQTY: remainingNeededQty,
        UPDATED_BATCHCODE: batchAllocations,
      };
    });
    console.log(
      "Allocations Result for Total allocated and Qty Left",
      newAllocationsResult
    );
    const t = updatedRows2.map((i) => {
      const getTotalAllocated = newAllocationsResult.reduce(
        (acc, row) => acc + row.ALLOCATEDQTY,
        0
      );
      const checkQtyLeft = updatedRows2.reduce(
        (acc, row) => acc + row.NEEDEDQTY,
        0
      );
      return {
        ...i,
        OVERALLALLOCATEDQTY: getTotalAllocated,
        QUANTITYLEFT: checkQtyLeft,
      };
    });
    setRows(t);
    console.log("Updated Rows with Allocated QTY & Updated BatchNumber:", t);
    const hasNeededQtyGreaterThanZero = t.some((f) => f.NEEDEDQTY > 0);
    setHidden(!hasNeededQtyGreaterThanZero);
    if (t[0].QUANTITYLEFT > 0) {
      setPostBtnStatus(true);
    } else {
      setPostBtnStatus(false);
    }
  };

  const reqSameJulian = async (index) => {
    const selectedRow = rows[index];
    const deliveryDetails = {
      batchCode: selectedRow.BATCHCODE,
      julianCode: selectedRow.BATCHCODE.substring(0, 4),
      itemCode: selectedRow.ITEMCODE,
      neededQty: selectedRow.NEEDEDQTY,
      mnfDate: selectedRow.PD,
    };
    try {
      const response = await fetch("julianDetails_MJ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliveryDetails),
      });
      const data = await response.json();
      const x = await data.filter(
        (d) => d.BatchNum.substring(0, 9) !== selectedRow.BATCHCODE
      );
      setBatchperjulian(x);
      setShowBatchperJulian((prev) => (prev === index ? null : index));
    } catch (err) {
      console.log(err);
    }
  };
  const postDelivery = async () => {
    setLoading(true);
    setProgress(100);
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const deliveryPayload = {
      DocType: "dDocument_Items",
      CardCode: "CDMP000001",
      CardName: "DEL MONTE PHILIPPINES INC.",
      NumAtCard: rows[0]?.CUSTOMERREFN,
      U_STONo: rows[0]?.STOREF,
      Comments: `(P) - SAP DMPI MATDOC#${[
        ...new Set(rows.map((row) => row.MATDOC)),
      ].join(", ")}`,
      U_APP_Driver: rows[0]?.DRIVER,
      U_APP_PlateNo: rows[0]?.PLATENO,
      U_ShippingAddress: rows[0]?.DESTINATION,
      U_RightSealNo: rows[0]?.RIGHTSEAL,
      U_LeftSealNo: rows[0]?.LEFTSEAL,
      U_BackSealNo: rows[0]?.BACKSEAL,
      U_Trucker: rows[0]?.TRUCKER,
      U_Remarks: `(P) - SAP DMPI MATDOC#${[
        ...new Set(rows.map((row) => row.MATDOC)),
      ].join(", ")}`,
      U_ProductionRun: "com",
      BPL_IDAssignedToInvoice: 1,
      DocumentsOwner: empOwnerCode,
      DocumentLines: Object.values(
        rows.reduce((acc, item) => {
          const key = `${item.ITEMCODE}|${item.DPUR}|${formatDate(item.PD)}`;

          if (!acc[key]) {
            acc[key] = {
              ItemCode: item.ITEMCODE,
              ItemDescription: item.ITEMNAME,
              Quantity: 0,
              UoMEntry: 10,
              UoMCode: "CS",
              U_MnfDate: formatDate(item.PD),
              Currency: "PHP",
              U_STOno: item.STOREF,
              U_Delnote: item.OUTBOUNDDELIVERY,
              WarehouseCode: "22220001",
              ActualDeliveryDate: formatDate(item.PULLEDOUTDATE),
              U_DPUR: item.DPUR,
              COGSCostingCode: prcCode,
              COGSCostingCode2: "DMP",
              COGSCostingCode3: "DMP11",
              BatchNumbers: [],
            };
          }

          // Add quantity
          acc[key].Quantity += parseInt(item.ALLOCATEDQTY);

          // Aggregate batch numbers (avoid duplicate batches)
          item.UPDATED_BATCHCODE.forEach((batch) => {
            // Check if the batch already exists in the BatchNumbers array
            const existingBatch = acc[key].BatchNumbers.find(
              (b) => b.BatchNumber === batch.BATCHCODE
            );

            if (existingBatch) {
              // If the batch exists, just add the quantity
              existingBatch.Quantity += parseInt(batch.ALLOCATEDQTY);
            } else {
              // If the batch doesn't exist, create a new entry
              acc[key].BatchNumbers.push({
                BatchNumber: batch.BATCHCODE,
                Quantity: parseInt(batch.ALLOCATEDQTY),
              });
            }
          });

          return acc;
        }, {})
      ),
    };
    setModalVisible(true);
    try {
      if (!prcCode || prcCode.trim() === "") {
        setError(`Error: Profit Center is Required!`);
      } else {
        const response = await fetch("deliveryNote_MJ", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deliveryPayload),
        });
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        }
        console.log("Data:", data);
        if (data.error.message) {
          setError(
            `Error Code: ${data.error.code}\nMessage: ${data.error.message}`
          );
        }
        console.log(deliveryPayload);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
    setDeliveryPayloadViewer(deliveryPayload);
    console.log("Delivery Payload:", deliveryPayload);
    setSearchBtnStatus(true);
    setAllocateBtnStatus(true);
    setPostBtnStatus(true);
  };

  //get employees and cogs profit center for the owner and profit center input field
  useEffect(() => {
    const getGet = async () => {
      try {
        const response1 = await fetch("getProfitCenter", {
          method: "GET",
        });
        const data1 = await response1.json();
        setProfitCenterArr(data1);
        const response = await fetch("getEmployees", {
          method: "GET",
        });
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.log("Error Get:", err);
      }
    };

    getGet();
  }, []);

  const handleSelectEmployee = (employee) => {
    setSearchTerm(employee.Name);
    setEmpOwnerCode(employee.empid);
    setFilteredEmployees([]);
  };
  const handleSelectProfitCenter = (pCenter) => {
    setProfitCenter(pCenter.PrcName);
    setPrcCode(pCenter.PrcCode);
    setFilteredProfitCenter([]);
  };

  //progress bar UI
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEmployees([]);
    } else {
      const filteredEmp = employees.filter((employee) =>
        employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filteredEmp);
    }
  }, [searchTerm, employees]);

  useEffect(() => {
    if (profitCenter === "") {
      setFilteredProfitCenter([]);
    } else {
      const filteredProf = profitCenterArr.filter((prof) =>
        prof.PrcCode.toLowerCase().includes(profitCenter.toLowerCase())
      );
      setFilteredProfitCenter(filteredProf);
    }
  }, [profitCenter, profitCenterArr]);

  const timeoutDuration = 3000;
  useEffect(() => {
    if (message !== null) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, timeoutDuration);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      <div>
        {message !== null && (
          <div
            className="absolute top-10 right-0 rounded-md shadow-lg bg-phoenix-success p-3 mx-4 flex items-center space-x-3 transition-all duration-300 transform animate-fadeIn"
            role="alert"
            aria-live="assertive"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="text-md text-white font-semibold">{message}</p>
          </div>
        )}
        {error !== null && (
          <div
            className="absolute top-10 right-0 rounded-md shadow-lg bg-red-500 p-3 mx-4 flex items-center space-x-3 transition-all duration-300 transform animate-fadeIn"
            role="alert"
            aria-live="assertive"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <p className="text-md font-semibold text-white">{error}</p>
          </div>
        )}
      </div>

      <DefMenus
        menus={menus}
        SelectedMenuId={SelectedMenu}
        setSelectedMenuId={setSelectedMenu}
      />
      {SelectedMenu === "0" && (
        <>
          <DRimportsHeader
            error={error}
            setError={setError}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            loading={loading}
            profitCenter={profitCenter}
            setProfitCenter={setProfitCenter}
            filteredEmployees={filteredEmployees}
            filteredProfitCenter={filteredProfitCenter}
            handleSelectEmployee={handleSelectEmployee}
            handleSelectProfitCenter={handleSelectProfitCenter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rows={rows}
            progress={progress}
            importFromExcel={importFromExcel}
            searchBatch={searchBatch}
            allocateQTY={allocateQTY}
            postDelivery={postDelivery}
            searchBtnStatus={searchBtnStatus}
            allocateBtnStatus={allocateBtnStatus}
            postBtnStatus={postBtnStatus}
            empOwnerCode={empOwnerCode}
            prcCode={prcCode}
          />
          <div className="overflow-auto h-[80vh]">
            <DefTableV3_MJ
              hidden={hidden}
              setPostBtnStatus={setPostBtnStatus}
              setRows={setRows}
              setBatchperjulian={setBatchperjulian}
              showBatchperJulian={showBatchperJulian}
              filteredBatchNum={filteredBatchNum}
              batchperjulian={batchperjulian}
              reqSameJulian={reqSameJulian}
              rows={rows}
              cols={cols}
              error={error}
              setError={setError}
            />
            <div className="flex gap-10">
              {rows.slice(0, 1).map((row, index) => (
                <div key={index}>
                  <p>Allocated Quantity: {row.OVERALLALLOCATEDQTY}</p>
                  <p>Quantity Left: {row.QUANTITYLEFT}</p>
                  <p>Overall: {row.OVERALLALLOCATEDQTY}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              {noMatchingBatches.length > 0 && (
                <>
                  <p>No Matching Batch: </p>
                  {noMatchingBatches.map(
                    (p, index) =>
                      p.BATCHCODE && (
                        <div className="flex gap-4" key={index}>
                          <p className="font-bold text-GitHub-Pallet100">
                            {p.ITEMNAME}
                          </p>
                          <p className="font-bold text-GitHub-Pallet100">
                            {p.BATCHCODE}
                          </p>
                        </div>
                      )
                  )}
                </>
              )}
            </div>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {cols1.map((col, index) => (
                    <th key={index}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading1 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-lg text-gray-600"
                    >
                      <LoadingSpinner />
                      <p>Loading data...</p>
                    </td>
                  </tr>
                ) : filteredBatchNum.length > 0 ? (
                  filteredBatchNum.map((item, index) => {
                    const dateOnly = item.U_MnfDate.substring(0, 10);
                    return (
                      <tr key={index}>
                        <td>{item.ItemCode}</td>
                        <td>{item.ItemName}</td>
                        <td>{item.BatchNum}</td>
                        <td>{item.U_DPUR}</td>
                        <td>{dateOnly}</td>
                        <td>{item.Quantity}.00</td>
                        <td>{item.WhsCode}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-600">
                      No available batches.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {SelectedMenu === "1" && <DeliveryPayload />}
    </div>
  );
}
