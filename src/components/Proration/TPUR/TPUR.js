import React, { useContext, useState } from "react";
import { DefButton, DefInput, EXEC_SQL_InsertOne } from "../../ComponentList";
import TPURreport from "./TPURreport";
import { formatDate } from "date-fns";
import ExcelJS from "exceljs";
import { useUserStore } from "../../userStore/useUserStore";
import { ITopContext } from "../../../hooks/TopContext";
import { LoadingSpinner } from "../../../assets/SVGs";

export default function TPUR(p) {
  const [SearchValues, setSearchValues] = useState([]);
  const [Usage, setUsage] = useState([]);
  const [Output, setOutput] = useState([]);
  const [Machine, setMachine] = useState([]);
  const [LoadingSms, setLoadingSms] = useState("");
  const [Loading, setLoading] = useState(false);
  const {
    totalQtyTPUR_MJ,
    totalRejectsTPUR_MJ,
    totalUsageTPUR_MJ,
    totalSolidsTPUR_MJ,
  } = useUserStore();
  const { userInfo } = useContext(ITopContext);

  const handleExportTPUR = async () => {
    const headerComponent = [
      [""],
      [""],
      [
        "Company Name:",
        "IPIC",
        "",
        "",
        "",
        "",
        "TPUR:",
        Usage.length > 0 && Usage[0].U_TPUR,
      ],
      [
        "Item Code:",
        SearchValues.ItemCode,
        "",
        "",
        "",
        "",
        "DPUR:",
        Usage.length > 0 && Usage[0].U_DPUR,
      ],
      [
        "Production Date:",
        SearchValues.Date && formatDate(SearchValues.Date, "yyMMdd"),
      ],
    ];

    const columnName = [
      [
        "ITEMCODE",
        "",
        "ACTUAL USAGE",
        "ADJUSTMENTS",
        "REJECTS",
        "TOTAL USAGE",
        "NTSS",
        "TOMATO SOLIDS",
      ],
    ];

    const UsageDataRow1 = [["PO#", Usage[0].Po]];

    const UsageDataRow2 = Usage.map((item) => [
      item.ItemCode,
      item.BatchNum,
      item.Quantity,
      item.Formaj || "-",
      item.Reject,
      item.TOTAL,
      item.U_NTSSQty,
      parseFloat(item.SOLIDS.toFixed(3)),
    ]);
    const totalOutput = [
      [
        "",
        "",
        totalQtyTPUR_MJ,
        "",
        totalRejectsTPUR_MJ,
        totalUsageTPUR_MJ,
        "",
        totalSolidsTPUR_MJ,
      ],
    ];
    const prepBy = [["Prepared By:", userInfo.firstname + userInfo.lastname]];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `${Usage.length > 0 && Usage[0].U_TPUR.substring(8, 15)}`
    );

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    headerComponent.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(rowIndex + 1, colIndex + 1);
        cellAddress.value = cell;
        cellAddress.font = {
          name: "Arial",
          size: 9,
        };
      });
    });
    columnName.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex + headerComponent.length + 2,
          colIndex + 1
        );
        cellAddress.value = cell;
      });
    });
    UsageDataRow1.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex + headerComponent.length + columnName.length + 2,
          colIndex + 1
        );
        cellAddress.value = cell;
      });
    });
    UsageDataRow2.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            columnName.length +
            UsageDataRow1.length +
            2,
          colIndex + 1
        );
        cellAddress.value = cell;
      });
    });
    totalOutput.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            columnName.length +
            UsageDataRow1.length +
            UsageDataRow2.length +
            2,
          colIndex + 1
        );
        cellAddress.value = cell;
      });
    });
    prepBy.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = worksheet.getCell(
          rowIndex +
            headerComponent.length +
            columnName.length +
            UsageDataRow1.length +
            UsageDataRow2.length +
            totalOutput.length +
            3,
          colIndex + 1
        );
        cellAddress.value = cell;
      });
    });
    const sheetData = [
      ...headerComponent,
      ...columnName,
      ...UsageDataRow1,
      ...UsageDataRow2,
      ...totalOutput,
    ];
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
    maxLengthForColumns.forEach((maxLength, index) => {
      worksheet.getColumn(index + 1).width = Math.max(maxLength + 2, 12);
    });

    // Apply border
    const rows = worksheet.rowCount;
    const columns = worksheet.columnCount;
    for (let rowIndex = 7; rowIndex <= rows; rowIndex++) {
      for (let colIndex = 1; colIndex <= columns; colIndex++) {
        const cell = worksheet.getCell(rowIndex, colIndex);
        cell.border = borderStyle;
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
        cell.font = {
          name: "Arial",
          size: 9,
        };
      }
    }
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `TPUR.xlsx`;
    link.click();
  };

  const SearchValuesonChange = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setSearchValues((e) => ({ ...e, [id]: value }));
  };

  const SearchDPUR = async () => {
    if (SearchValues.ItemCode != undefined && SearchValues.Date != undefined) {
      setLoadingSms(true);
      await EXEC_SQL_InsertOne(
        779,
        setUsage,
        SearchValues.ItemCode,
        SearchValues.Date
      );
      setLoadingSms(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <DefInput
              label="ItemCode"
              className="w-fit"
              id="ItemCode"
              handler={SearchValuesonChange}
              // dropDownId={778}
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
              loading={LoadingSms}
            />
          </div>
          <div>
            <button
              onClick={handleExportTPUR}
              className="p-2 rounded-md bg-github_ButtonGreen text-white hover:bg-[#4eb933] duration-150"
            >
              Export as Excel
            </button>
          </div>
        </div>

        <TPURreport
          Usage={Usage}
          ItemCode={SearchValues.ItemCode}
          date={SearchValues.Date}
        />
      </div>
    </div>
  );
}
