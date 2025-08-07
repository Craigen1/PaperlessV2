import React, { useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../../ComponentList";
import { LoadingSpinner } from "../../../assets/SVGs";
import DPURrfp from "./DPURrfp";
import DPURreport from "./DPURreport";
import FormSample1 from "./FormSample1.Js";
import FormMain from "./FormMain";
import ExcelJS from "exceljs";
import { useUserStore } from "../../userStore/useUserStore";

export default function DPUR() {
  const [SearchValues, setSearchValues] = useState([]);
  const [Usage, setUsage] = useState([]);
  const [Output, setOutput] = useState([]);
  const [Machine, setMachine] = useState([]);
  const [LoadingSms, setLoadingSms] = useState("");
  const [Loading, setLoading] = useState(false);
  const {
    headerINFO_MJ,
    equivalentTotal_MJ,
    sampleEQ_MJ,
    machineSummation_MJ,
    lastMnfD_MJ,
    totalUsage_MJ,
  } = useUserStore();

  console.log("Output Total_MJ:", {
    equivalentTotal_MJ,
    sampleEQ_MJ,
    machineSummation_MJ,
    lastMnfD_MJ,
    totalUsage_MJ,
  });
  console.log("Table:", { Usage, Output, Machine });

  const handleExport = async () => {
    const footerInfo = [
      [
        "",
        "Yield",
        "PC",
        String(headerINFO_MJ[0].U_APP_PCPercase * equivalentTotal_MJ),
      ],
      ["", "Equivalent", "CS"],
      [""],
      ["", "No. of Batches", "KG", lastMnfD_MJ],
      [
        "",
        "Total Weight",
        "KG",
        String(totalUsage_MJ),
        "",
        "",
        "Prepared By",
        "Date",
      ],
      [""],
      ["", "SAP Doc. No.", "101"],
      ["", "", "", "", "", "", "Checked By", "Date"],
      ["", "Production Samples", "CS"],
      ["", "QA Analysis Samples", "CS", "", "", "", "Processed By", "Date"],
      ["", "Audit Routing Samples", "CS"],
      ["", "Library Samples", "CS"],
      ["", "", "", "", "", "", "Reviewed By", "Date"],
      [
        "",
        "Total Samples",
        "PC",
        String(headerINFO_MJ[0].U_APP_PCPercase * sampleEQ_MJ),
      ],
    ];
    const headerComponent = [
      ["Del Monte Philippines, Inc"],
      ["Daily Production Usage Report"],
      [],
      [
        "Toll Packer:",
        "Innovative Packaging Industry Corporation",
        "",
        "",
        "",
        "DPUR No:",
        headerINFO_MJ[0].U_DPUR || "",
      ],
      [
        "Sub Con PO:",
        headerINFO_MJ[0].CustomerRef || "",
        "",
        "",
        "",
        "Mnf Date:",
        headerINFO_MJ[0].U_MNFDate.substring(0, 10) || "",
      ],
      ["Item Name:", headerINFO_MJ[0].ItemName || ""],
    ];

    let machine = Machine.map((m) => m.Machine);
    const bodyComponentCategories = [
      [
        "Item Code",
        "Item Name",
        "UoM",
        "Production Usage",
        "",
        "Production Rejects",
        "TOTAL USAGE",
        "Qty Processed in SAP R3",
        "BATCH CODE",
        "REMARKS",
      ],
      ["", "", "", headerINFO_MJ[0].ItemCode],
      ["", "", "", "Actual", "Formula Adj."],
    ];

    const groupedUsage = Usage.reduce((acc, item) => {
      const group = item.ItemGroup || "Other";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    }, {});

    const usageData = Object.entries(groupedUsage)
      .map(([group, items]) => {
        const groupHeader = [`${group}`];
        const itemRows = items.map((item) => {
          const formattedQtySum =
            item.Quantity + item.U_FormulaAdj + item.U_Reject >= 1000
              ? (
                  item.Quantity +
                  item.U_FormulaAdj +
                  item.U_Reject
                ).toLocaleString()
              : String(
                  item.Quantity + item.U_FormulaAdj + item.U_Reject || "-"
                );
          return [
            item.ItemCode,
            item.Dscription,
            item.UomCode,
            String(item.Quantity || "-"),
            String(item.U_FormulaAdj || "-"),
            item.U_Reject || "-",
            formattedQtySum,
            String(item.QtyInSAPR3 || "-"),
            item.BatchNum,
            item.U_Remarks || " ",
          ];
        });
        return [groupHeader, ...itemRows];
      })
      .flat();

    const bodyComponentCategories1 = [
      ["B", ...machine, "Samples", "Equivalent", "Batch Code"],
    ];
    const machineHeaders = Object.keys(Output[0]).filter(
      (key) =>
        key !== "MnfSerial" &&
        key !== "sum" &&
        key !== "Batch" &&
        key !== "U_TransType" &&
        key !== "ItemCode"
    );
    const outputData = Output.map((item) => {
      const row = machineHeaders.map((machine) =>
        item.U_TransType == "S" ? "-" : item[machine] || null
      );
      return [
        item.MnfSerial,
        ...row, // Append machine values dynamically based on headers
        item.U_TransType == "S" ? item.sum : "-",
        item.sum,
        item.Batch,
      ];
    });
    const row = machineHeaders.map((machine) => machineSummation_MJ[machine]);
    const totalRowData = [
      lastMnfD_MJ,
      ...row,
      String(sampleEQ_MJ),
      String(equivalentTotal_MJ),
    ];
    const sheetData = [
      ...headerComponent,
      ...bodyComponentCategories,
      ...usageData,
      ...bodyComponentCategories1,
      ...outputData,
    ];

    const sanitizeWorksheetName = (name) => {
      const invalidChars = /[*?:"\\\/\[\]]/g;
      return name.replace(invalidChars, "_");
    };
    const worksheetName = `${headerINFO_MJ[0].U_DPUR.substring(8, 16)} ${
      headerINFO_MJ[0].ItemName
    }`;
    const sanitizedWorksheetName = sanitizeWorksheetName(worksheetName);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sanitizedWorksheetName);

    headerComponent.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(rowIndex + 1, colIndex + 1);
        cellAddress.value = cell;
        cellAddress.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cellAddress.font = { name: "Arial", size: 9 };
        if (rowIndex === 0 && colIndex === 0) {
          cellAddress.font = { bold: true };
        }
      });
    });
    bodyComponentCategories.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex + headerComponent.length + 1,
          colIndex + 1
        );
        cellAddress.value = cell;
        cellAddress.alignment = { horizontal: "center", vertical: "middle" };
        if (rowIndex === 0) {
          cellAddress.font = { name: "Arial", size: 9, bold: true };
        }
      });
    });
    usageData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            bodyComponentCategories.length +
            1,
          colIndex + 1
        );
        cellAddress.value = cell;
        cellAddress.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cellAddress.font = {
          name: "Arial",
          size: 9,
        };
      });
    });
    bodyComponentCategories1.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex + headerComponent.length + 1,
          colIndex + bodyComponentCategories.length + headerComponent.length + 2
        );
        cellAddress.value = cell;
        cellAddress.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        if (rowIndex === 0) {
          cellAddress.font = { name: "Arial", size: 9, bold: true };
        }
      });
    });
    outputData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            bodyComponentCategories.length +
            1,
          colIndex + bodyComponentCategories.length + headerComponent.length + 2
        );
        cellAddress.value = cell;
        cellAddress.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cellAddress.font = {
          name: "Arial",
          size: 9,
        };
      });
    });

    const totalsRowIndex =
      bodyComponentCategories1.length +
      headerComponent.length +
      outputData.length +
      2;
    totalRowData.forEach((value, colIndex) => {
      const cellAddress = worksheet.getCell(
        totalsRowIndex + 2,
        colIndex + bodyComponentCategories.length + headerComponent.length + 2
      );
      cellAddress.value = value;
      cellAddress.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      cellAddress.font = {
        name: "Arial",
        size: 9,
        bold: true,
      };
    });

    footerInfo.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            bodyComponentCategories.length +
            usageData.length +
            2,
          colIndex + 1
        );
        cellAddress.value = cell;
        cellAddress.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        if (colIndex === 1) {
          cellAddress.font = { name: "Arial", size: 9, bold: true };
        }
      });
    });

    // Calculate the maximum length for each column
    const maxLengthForColumns = [];
    sheetData.forEach((row) => {
      row.forEach((cell, colIndex) => {
        const length = String(cell).length;
        if (!maxLengthForColumns[colIndex]) {
          maxLengthForColumns[colIndex] = length;
        } else {
          maxLengthForColumns[colIndex] = Math.max(
            maxLengthForColumns[colIndex],
            length
          );
        }
      });
    });

    // No borders and white bg to the entire used range of the worksheet
    const rows = worksheet.rowCount;
    const columns = worksheet.columnCount;
    for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
      for (let colIndex = 1; colIndex <= columns; colIndex++) {
        const cell = worksheet.getCell(rowIndex, colIndex);
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFFFF" },
        };
      }
    }

    maxLengthForColumns.forEach((maxLength, index) => {
      worksheet.getColumn(index + 1).width = Math.max(maxLength + 2, 12);
    });
    worksheet.mergeCells("A1:P1");
    worksheet.mergeCells("A2:P2");
    worksheet.mergeCells("D7:E7");
    worksheet.mergeCells("D8:E8");
    worksheet.mergeCells("A7:A9");
    worksheet.mergeCells("B7:B9");
    worksheet.mergeCells("C7:C9");
    worksheet.mergeCells("F7:F9");
    worksheet.mergeCells("G7:G9");
    worksheet.mergeCells("H7:H9");
    worksheet.mergeCells("I7:I9");
    worksheet.mergeCells("J7:J9");
    worksheet.mergeCells("K7:K9");
    worksheet.mergeCells("L7:L9");
    worksheet.mergeCells("M7:M9");
    worksheet.mergeCells("N7:N9");
    worksheet.mergeCells("O7:O9");
    worksheet.mergeCells("P7:P9");
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${headerINFO_MJ[0].U_DPUR.substring(5, 16)} DPUR ${
      headerINFO_MJ[0].ItemName
    }.xlsx`;
    link.click();
  };

  const SearchValuesonChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setSearchValues((e) => ({ ...e, [id]: value }));
  };

  const SearchDPUR = async () => {
    if (SearchValues.ItemCode != undefined && SearchValues.Date != undefined) {
      setOutput([]);
      setMachine([]);
      setUsage([]);
      setLoadingSms("Loading IFP");
      await EXEC_SQL_InsertOne(
        782,
        setUsage,
        SearchValues.ItemCode,
        SearchValues.Date
      );
      setLoadingSms("Loading Machine");
      await EXEC_SQL_InsertOne(
        780,
        setMachine,
        SearchValues.ItemCode,
        SearchValues.Date
      );
      setLoadingSms("Loading RFP");
      console.log(SearchValues.Date);
      await EXEC_SQL_InsertOne(
        781,
        setOutput,
        SearchValues.ItemCode,
        SearchValues.Date
      );

      setLoadingSms("");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <DefInput
            label="ItemCode"
            className="w-fit"
            id="ItemCode"
            handler={SearchValuesonChange}
          />
          <DefInput
            label="Date"
            className="w-fit"
            id="Date"
            type="date"
            handler={SearchValuesonChange}
          />
          <DefButton
            className="btn btn-primary btn-sm mt-4"
            text="Search"
            onClick={SearchDPUR}
          />
        </div>
        <div>
          <button
            onClick={handleExport}
            className="p-2 rounded-md bg-github_ButtonGreen text-white hover:bg-[#4eb933] duration-150"
          >
            Export as Excel
          </button>
        </div>
      </div>
      <div className="flex">
        <span className="mr-2"> {LoadingSms}</span>{" "}
        {LoadingSms && <LoadingSpinner />}
      </div>
      {Array.isArray(Output) && (
        <>
          {Array.isArray(Usage) && (
            <>
              <DPURreport
                SearchValues={SearchValues}
                Output={Output}
                Usage={Usage}
                Machine={Machine}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
