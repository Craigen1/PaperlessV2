import React, { useEffect, useState } from "react";
import {
  DefButton,
  DefTable,
  EXEC_SQL_InsertOne,
  toFixed_Custom,
} from "../ComponentList";
import { LoadingSpinner } from "../../assets/SVGs";
import parse from "paste-from-excel";
import ProrationAddMaterialUsageAdOptn from "./ProrationAddMaterialUsageAdOptn";
import { SaveAsDraft, postProration } from "./ProrationPost";
import ProrationMaterialsAdd from "./ProrationMaterialsAdd";

export default function ProrationAddMaterialUsage(p) {
  const [runOnce, setrunOnce] = useState(false);
  const [docnums, setDocnums] = useState("");
  const [RowId, setRowId] = useState(0);
  // const [rows, p.setMaterialUsage] = useState([]);
  const [columnsx, setColumnsx] = useState([]);
  const [batchInfo, setBatchInfo] = useState([]);
  const [showBatch, setShowBatch] = useState(false);
  const [showAddMaterials, setshowAddMaterials] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [BatchDitsLoading, setBatchDitsLoading] = useState(false);
  const [ASDAX, setASDAX] = useState(0);
  const [ShowOption, setShowOption] = useState(false);
  const [ShowOptionID, setShowOptionID] = useState(0);
  const [OptionLocation, setOptionLocation] = useState({ x: 0, y: 0 });

  const listOfButtons = [
    {
      name: "Actual",
      label: "Actual",
    },

    {
      name: "NTSS",
      label: "NTSS",
    },

    {
      name: "Rejects",
      label: "Rejects",
    },

    {
      name: "FormulaAdj",
      label: "FormulaAdj",
    },
  ];
  const handleOptionRemove = (e) => {
    const { id, index } = e.target;
    setShowOptionID(id);
    setOptionLocation({
      x: e.clientX,
      y: e.clientY,
    });
    setShowOption(true);
  };
  const getCols = async (e) => {
    if (docnums == "") return;
    await EXEC_SQL_InsertOne(796, setColumnsx, docnums);
    await EXEC_SQL_InsertOne(
      795,
      p.setMaterialUsage,
      docnums,
      p.ChosnProdOrders.length
    );
    await EXEC_SQL_InsertOne(
      795,
      p.setMaterialUsageStorage,
      docnums,
      p.ChosnProdOrders.length
    );
    await EXEC_SQL_InsertOne(785, p.setItemLines, docnums);
  };

  const [onGet, setonGet] = useState(false);
  useEffect(() => {
    if (onGet) p.setChosnRows(rows);
    setonGet(false);
  }, [onGet]);
  const onChange = async (e) => {
    setrunOnce(true);
    const { value, name, id } = e.target;
    console.log(value, name, id);
    // if (Array.isArray(p.MaterialUsage.map) == false) return;
    // if (p.MaterialUsage.length <= 0) return;
    const newRow = p.MaterialUsage.map((row, i) => ({
      ...row,
      [name]:
        name == "Remarks"
          ? parseInt(id) === i
            ? value
            : row[name]
          : parseInt(id) === i
          ? parseFloat(value)
          : row[name], // [actual] value change
    }));
    p.setMaterialUsage(newRow);
  };
  const onKeyUp = async (e) => {
    const { value, name, id } = e.target;
    // console.log(e.key, { value, name, id });
    if (e.key == "Escape") setShowBatch(false);
  };
  const onKeyDown = async (e) => {
    const { value, name, id } = e.target;
    setRowId(id);
    if (e.key == "Tab") getMaterialOfBatch(id);
  };

  useEffect(() => {
    if (p.ChosnProdOrders.length === 0) return;
    const rawDocnum = p.ChosnProdOrders.map((e) => e.PO).join(",");
    setDocnums(rawDocnum);
  }, [p.ChosnProdOrders]);

  useEffect(() => {
    if (docnums != "" || docnums != undefined) getCols();
  }, [docnums]);
  const getMaterialOfBatch = async (rowIndex) => {
    console.log(p.compValues);
    setBatchDitsLoading(true);
    setBatchInfo([]);
    setShowBatch(true);
    // console.log(p.MaterialUsage[rowIndex]);
    // console.log(rowIndex);
    // console.log(p.MaterialUsage);

    if (p.MaterialUsage[rowIndex] === undefined) return;
    setSelectedRow(p.MaterialUsage[rowIndex]);
    await EXEC_SQL_InsertOne(
      793,
      setBatchInfo,
      p.MaterialUsage[rowIndex].ItemCode,
      p.ChosnProdOrders[0].DocNum,
      p.compValues.ProductionDate,
      p.compValues.ProrationType,
      p.compValues.Station
    );
    // console.log({ rowIndex });
    setBatchDitsLoading(false);
  };
  useEffect(() => {
    let totalSelected = 0;
    batchInfo.forEach((item) => {
      totalSelected += parseFloat(item.Selected || 0);
    });
    setASDAX(totalSelected);
  }, [batchInfo]);

  /*
  const is0Calculator = (e) => {
    const { value, id } = e.target;
    // console.log({ batchInfo, id });

    // Parse the input value once and reuse it to avoid repeated parsing
    const inputValue = parseFloat(value);

    // Assuming 'batchInfo' and 'selectedRow' are state variables defined elsewhere in your component
    const maxQuantity = parseFloat(batchInfo[id].Quantity);
    const maxActual = parseFloat(parseFloat(selectedRow.Actual) - ASDAX);
    // console.log(maxActual, parseFloat(selectedRow.Actual), ASDAX);
    // Determine the correct value to set, prioritizing the maxQuantity limit
    const newValue =
      inputValue > maxQuantity
        ? maxQuantity
        : inputValue > maxActual
        ? maxActual
        : inputValue;

    // console.log(inputValue);
    // console.log({ inputValue });
    // Update batchInfo with the new value or the max value if limits are exceeded
    const newBatchInfo = batchInfo.map((item, index) => {
      if (index === parseInt(id, 10)) {
        return { ...item, Selected: newValue.toString() }; // Ensure the value is set back as a string if that's what your state expects
      }
      return item;
    });

    setbatchInfo(newBatchInfo);
  };
*/
  const is0Calculator = (e) => {
    const { value, id } = e.target;
    const inputValue = parseFloat(value);
    const maxQuantity = parseFloat(batchInfo[id].Quantity);
    const maxActual = parseFloat(selectedRow.Actual) - ASDAX;
    const newValue = Math.min(inputValue, maxQuantity, maxActual);
    // console.log({ inputValue, maxQuantity, maxActual, ASDAX });
    const newBatchInfo = batchInfo.map((item, index) =>
      index === parseFloat(id) ? { ...item, Selected: newValue } : item
    );
    setBatchInfo(newBatchInfo);
  };
  const iCheckBoxHandler = (e) => {
    const { value, id } = e.target;
    // console.log(e.target.max);

    const inputValue = parseFloat(e.target.max);
    const maxQuantity = parseFloat(batchInfo[id].Quantity);
    const maxActual = parseFloat(selectedRow.Actual) - ASDAX;
    const newValue =
      inputValue > maxQuantity
        ? maxQuantity
        : inputValue > maxActual
        ? maxActual
        : inputValue;

    const newBatchInfo = batchInfo.map((item, index) =>
      index === parseFloat(id)
        ? { ...item, Selected: newValue.toFixed(3) }
        : item
    );
    setBatchInfo(newBatchInfo);
  };

  useEffect(() => {
    let totalSelected = 0;
    batchInfo.forEach((item) => {
      totalSelected += parseFloat(item.Selected || 0); // Ensure you have a fallback value
    });
    setASDAX(totalSelected);
  }, [batchInfo]);

  /* NEVER CHANGE THIS HSIT */
  function Prorate(fgCode, qty) {
    let GetSumW = 0;
    let GetCurW = 0;
    p.ChosnProdOrders.forEach((e) => {
      GetSumW +=
        (parseFloat(e.Output) + parseFloat(e.DMPISample)) *
        parseFloat(e.PCsCase) *
        parseFloat(e.Grams);
      if (e.ItemCode === fgCode) {
        GetCurW +=
          (parseFloat(e.Output) + parseFloat(e.DMPISample)) *
          parseFloat(e.PCsCase) *
          parseFloat(e.Grams);
      }
    });
    return (GetCurW / GetSumW) * qty;
  }
  const iProrate = (e) => {
    // alert("Prorate");
    setrunOnce(true);
    // if (Array.isArray(p.MaterialUsage.map) == false) return;
    // if (p.MaterialUsage.length <= 0) return;
    let updatedRows = p.MaterialUsage.map((ee, ii) => {
      let newRow = { ...ee };
      p.ChosnProdOrders.forEach((e) => {
        newRow[e.ItemCode] = Prorate(e.ItemCode, ee.Actual).toFixed(3);
        // newRow[e.ItemCode] = toFixed_Custom(Prorate(e.ItemCode, ee.Actual), 4);
      });
      return newRow;
    });
    p.setMaterialUsage(updatedRows);
  };

  const iAddBatchToMaterialUsage = (e) => {
    // console.log(batchInfo);
    // return;
    let topValue = 0;
    let topBatch = "";
    let indexToSkip = 0;
    // get top  selected value  to be added to actual on , where the user press tab
    batchInfo.map((e, i) => {
      if (topValue == 0 && e.Actual != 0) {
        topValue = parseFloat(e.Selected);
        topBatch = e.BatchNum;
        indexToSkip = i;
      }
    });
    // add to actual on , where the user press tab
    let newBatchInfo = p.MaterialUsage.map((item, index) => {
      return RowId == index
        ? { ...item, Actual: topValue, BatchDetails: topBatch }
        : item;
    });
    console.log(selectedRow);
    let newBatchInfo2 = batchInfo
      .filter((ee, ii) => ii > indexToSkip && ee.Selected > 0)
      .map((e, i) => {
        return {
          iCount: 3,
          ItemCode: selectedRow.ItemCode,
          ItemName: selectedRow.ItemName,
          uom: selectedRow.uom,
          Actual: parseFloat(e.Selected),
          BatchDetails: e.BatchNum,
          NTSS: selectedRow.NTSS,
          Rejects: selectedRow.Rejects,
          FormulaAdj: selectedRow.FormulaAdj,
          Remarks: selectedRow.Remarks,
        };
      });

    let x = [...newBatchInfo, ...newBatchInfo2];
    // console.log(topValue);
    // console.log(x);
    p.setMaterialUsage(x);
    setShowBatch(false);
    //   // console.log(rows);
    setrunOnce(true);
    // let d = document.getElementsByClassName("Actual6");

    // d.KeyboardEvent(
    //   ("keydown",
    //   {
    //     key: "Tab",
    //   })
    // );
    // SaveASDrafts();
  };

  const iAddBatchToMaterialUsageNext = (e) => {
    // console.log(batchInfo);
    // return;
    // if (Array.isArray(p.MaterialUsage.map) == false) return;
    // if (p.MaterialUsage.length <= 0) return;
    let topValue = 0;
    let topBatch = "";
    let indexToSkip = 0;
    // get top  selected value  to be added to actual on , where the user press tab
    batchInfo.map((e, i) => {
      if (topValue == 0 && e.Actual != 0) {
        topValue = parseFloat(e.Selected);
        topBatch = e.BatchNum;
        indexToSkip = i;
      }
    });
    // add to actual on , where the user press tab
    let newBatchInfo = p.MaterialUsage.map((item, index) => {
      return RowId == index
        ? { ...item, Actual: topValue, BatchDetails: topBatch }
        : item;
    });

    let newBatchInfo2 = batchInfo
      .filter((ee, ii) => ii > indexToSkip && ee.Selected > 0)
      .map((e, i) => {
        return {
          iCount: 3,
          ItemCode: selectedRow.ItemCode,
          ItemName: selectedRow.ItemName,
          uom: selectedRow.uom,
          Actual: parseFloat(e.Selected),
          BatchDetails: e.BatchNum,
          NTSS: selectedRow.NTSS,
          Rejects: selectedRow.Rejects,
          FormulaAdj: selectedRow.FormulaAdj,
          Remarks: selectedRow.Remarks,
        };
      });

    let x = [...newBatchInfo, ...newBatchInfo2];
    // console.log(topValue);
    // console.log(x);
    p.setMaterialUsage(x);
    //  setShowBatch(false);
    //   // console.log(rows);
    setrunOnce(true);
    getMaterialOfBatch(parseInt(RowId) + 1);
    setRowId(parseInt(RowId) + 1);

    // SaveASDrafts();
  };

  // useEffect(() => {
  //   try {
  //     if (runOnce) iProrate();
  //     setrunOnce(false);
  //   } catch (error) {}
  // }, [runOnce]);

  const handlePaste = (e) => {
    // const options = {
    //   rowSelector: ".rt-tr-group",
    //   cellSelector: ".rt-td",
    // };

    return parse(e);
  };

  let constructJSONFromPastedInput = (pastedInput) => {
    let rawRows = pastedInput.split("\n");

    p.setMaterialUsage(output);
    return output;
  };
  // const [clipboardValue, setclipboardValue] = useState([]);
  // useEffect(() => {
  //   if (clipboardValue.length > 0) return;
  //   constructJSONFromPastedInput(clipboardValue);
  // }, [clipboardValue]);
  const handlePasteOnBtn = async (e) => {
    // Assuming 'rows' and 'p.setMaterialUsage' are defined elsewhere in your component
    // and 'setrunOnce' is a function that updates some state based on pasting action
    // if (Array.isArray(p.MaterialUsage.map) == false) return;
    // if (p.MaterialUsage.length <= 0) return;

    const text = await navigator.clipboard.readText();
    let rawRows = text.split("\n");

    const newRow = p.MaterialUsage.map((row, index) => {
      if (rawRows.length - 1 > index) {
        let rawCols = rawRows[index].split("\t");
        // console.log({ rawCols });
        return {
          ...row,
          [listOfButtons[0]?.name]: parseFloat(rawCols[0] || 0),
          [listOfButtons[1]?.name]: parseFloat(rawCols[1] || 0),
          [listOfButtons[2]?.name]: parseFloat(rawCols[2] || 0),
          [listOfButtons[3]?.name]: parseFloat(rawCols[3] || 0),
        };
      } else {
        return { ...row };
      }
    });

    p.setMaterialUsage(newRow);
    setrunOnce(true);
  };

  return (
    <div className="mt-2">
      <div className="">
        {/* <div className="border mx-2 bg-SAP-form  mt-20"> */}
        {/* <div className="border-b-4 border-SAP-headerLine bg-SAP-header flex "> */}
        <div className="w-full mx-2 font-semibold">Material Usage</div>
        {/* </div> */}
        <div className="overflow-auto px-4">
          <DefTable
            columns={columnsx}
            rows={p.MaterialUsage}
            className="text-sm ml-2"
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            handleOption={handleOptionRemove}
            btnLabel="Options"
            spanCSS={`Actu`}
          />
        </div>
      </div>
      <br />
      {/* <DefButton
        type="4"
        onClick={iProrate}
        text="Check"
        className="px-2 mx-1 mb-1"
      /> */}
      {showBatch && (
        <div className="overflow-auto fixed top-0 left-0 h-full w-full bg-trans50 z-50">
          <div className="w-[512px] h-full border bg-SAP-form mx-auto  absolute top-0 right-0">
            <div className="fixed h-fit bg-white w-[512px] z-10 ">
              <div className="border-b-4 border-SAP-headerLine bg-SAP-header flex ">
                <div className="w-full mx-2 font-semibold">zz Choose Batch</div>
                <div>
                  <DefButton
                    type="4"
                    onClick={() => setShowBatch(false)}
                    text="Close"
                    className="px-2 mx-1 mb-1"
                  />
                </div>
              </div>

              <div>
                <DefButton
                  type="4"
                  onClick={() => setShowBatch(false)}
                  text="Close"
                  className="px-2 mx-1 mb-1"
                />
              </div>

              <div className="bg-[#0000002c] w-fit  px-1 rounded-md m-2">
                {selectedRow.ItemCode != undefined && selectedRow.ItemCode}
                {selectedRow.ItemName != undefined && selectedRow.ItemName}
              </div>
              <div className="bg-[#0000002c] w-fit  px-1 rounded-md m-2">
                {(parseFloat(selectedRow.Actual) - parseFloat(ASDAX)).toFixed(
                  3
                )}
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="overflow-auto bg-white">
              {!BatchDitsLoading ? (
                <div onPaste={handlePaste}>
                  <table className=" p-2 relative">
                    <tr>
                      <td></td>
                      <td className="sticky">BatchNum</td>
                      <td className="sticky">Quantity</td>
                      <td>Selected</td>
                      <td>MnF Date</td>
                      <td>Exp Date</td>
                      <td>Draft Qty</td>
                      <td>Draft Batch</td>
                    </tr>
                    {batchInfo.map((e, i) => (
                      <tr className="border">
                        <td className=" sticky px-2 whitespace-nowrap">
                          <input
                            type="checkbox"
                            onChange={iCheckBoxHandler}
                            max={e.Quantity}
                            id={i}
                          />
                        </td>{" "}
                        <td className=" sticky px-2 whitespace-nowrap">
                          {e.BatchNum}
                        </td>
                        <td className=" sticky px-2 whitespace-nowrap">
                          {e.Quantity}
                        </td>
                        <td className="px-2 whitespace-nowrap">
                          <input
                            className="w-[60px]"
                            // max={e.Quantity}
                            min={0}
                            type="number"
                            id={i}
                            value={batchInfo[i].Selected}
                            onChange={is0Calculator}
                            onPaste={(e) => {
                              handlePaste(i);
                            }}
                          />
                        </td>
                        <td className="px-2 whitespace-nowrap">{e.PrdDate}</td>
                        <td className="px-2 whitespace-nowrap w-full">
                          {e.ExpDate}
                        </td>
                        <td className="px-2 whitespace-nowrap w-full">
                          {e.actual}
                        </td>
                        <td className="px-2 whitespace-nowrap w-full">
                          {e.batch}
                        </td>
                      </tr>
                    ))}
                    {batchInfo.length == 0 && "No record found!"}
                  </table>
                  {(parseFloat(selectedRow.Actual) - parseFloat(ASDAX)).toFixed(
                    3
                  ) <= 0 && (
                    <>
                      <div className="w-full flex mb-2 mt-4">
                        <div className="w-full"></div>
                        <DefButton
                          type="4"
                          onClick={iAddBatchToMaterialUsage}
                          text="Add Batch & Close"
                          className="btn-primary btn-sm fixed right-5 bottom-2 "
                        />

                        <DefButton
                          type="4"
                          onClick={iAddBatchToMaterialUsageNext}
                          text="Add Batch & Next"
                          className="btn-warning btn-sm fixed right-40 bottom-2 "
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <br />
        <div className="">
          <DefButton
            text={"Paste From Excel"}
            type="10"
            className="w-fit mr-2"
            onClick={handlePasteOnBtn}
          />
        </div>
      </div>

      {ShowOption && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-transparent"
            onClick={() => setShowOption(false)}
          >
            <div
              className={`fixed`}
              style={{
                left: `${OptionLocation.x}px`,
                top: `${OptionLocation.y}px`,
              }}
            >
              <ProrationAddMaterialUsageAdOptn
                setShowOption={setShowOption}
                rows={p.MaterialUsage}
                setRows={p.setMaterialUsage}
                ShowOptionID={ShowOptionID}
              />
            </div>
          </div>
        </>
      )}
      {/* <DefButton
        text="Add Materials"
        type="10"
        className="w-fit mr-2 mt-2"
        onClick={() => p.setAddMats(true)}
      /> */}
      <br></br>
      <DefButton
        text="Prorate"
        type="10"
        className="btn-warning iProrate"
        id={"iProrateBtn"}
        onClick={iProrate}
      />
    </div>
  );
}
