import {
  DeviceTabletIcon,
  ClipboardListIcon,
  ThumbUpIcon,
  ScaleIcon,
  PrinterIcon,
  DocumentTextIcon,
  UserIcon,
  UserCircleIcon,
  ArrowNarrowRightIcon,
  NewspaperIcon,
  QrcodeIcon,
  CubeTransparentIcon,
  UserGroupIcon,
  XCircleIcon,
  ExclamationIcon,
  CheckCircleIcon,
  ChipIcon,
  ReceiptRefundIcon,
  KeyIcon,
  StarIcon,
  DocumentReportIcon,
  ChartPieIcon,
  CubeIcon,
  LightningBoltIcon,
  DotsHorizontalIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartSquareBarIcon,
  VariableIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

import { useBarcode } from "next-barcode";
import { ArrayChecker } from "../functions/handler";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { LoadingSpinner } from "../assets/SVGs";
import { formatDate } from "date-fns";
import { Pager } from "./ComponentList2";
import { useUserStore } from "./userStore/useUserStore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
const Datenw = new Date();

export const toolList = [
  {
    id: 0,
    description: "Documentation",
    icon: DocumentTextIcon,
  },
  {
    id: 1,
    description: "QR Checker",
    icon: QrcodeIcon,
  },
  {
    id: 2,
    description: "QR Checker",
    icon: QrcodeIcon,
  },
  {
    id: 3,
    description: "QR Checker",
    icon: QrcodeIcon,
  },
];

export const controlsList = [
  {
    id: 201,
    description: "Usage Slip Master",
    icon: ClipboardListIcon,
  },
  {
    id: 202,
    description: "Approval Master",
    icon: DeviceTabletIcon,
  },
];

export const adminList = [
  {
    id: 0,
    description: "User Master",
    icon: UserIcon,
  },
];

export const inventoryModules = [
  {
    name: "",
    description: "",
    folder: "production",
    href: "#",
    icon: DeviceTabletIcon,
    emoji: "",
    id: 0,
  },
  {
    name: "",
    description: "",
    folder: "production",
    href: "#",
    icon: DeviceTabletIcon,
    emoji: "",
    id: 0,
  },
  {
    name: "Inventory Transfer",
    description: "",
    folder: "production",
    href: "#",
    icon: ArrowNarrowRightIcon,
    emoji: "👍",
    id: 301,
  },
  {
    name: "R",
    description: "",
    folder: "production",
    href: "#",
    icon: ArrowNarrowRightIcon,
    emoji: "👍",
    id: 301,
  },
];
export const solutions = [
  {
    name: "",
    description: "",
    folder: "production",
    href: "#",
    icon: DeviceTabletIcon,
    emoji: "",
    id: 0,
  },
  {
    name: "",
    description: "",
    folder: "production",
    href: "#",
    icon: DeviceTabletIcon,
    emoji: "",
    id: 0,
  },
  {
    name: "Transfer  Approval ",
    description: "",
    folder: "production",
    href: "#",
    icon: ThumbUpIcon,
    emoji: "👍",
    id: 2,
  },
  {
    name: "Usage Slip",
    description: "",
    folder: "production",
    href: "#",
    icon: ClipboardListIcon,
    emoji: "🧾",
    id: 3,
  },
  {
    name: "NTSS Usage Slip",
    description: "",
    folder: "production",
    href: "#",
    icon: ClipboardListIcon,
    emoji: "🧾",
    id: 12,
  },
  // {
  //   name: "R Temp",
  //   description: "",
  //   folder: "logistics",
  //   href: "#",
  //   icon: ClipboardListIcon,
  //   emoji: "🧾",
  //   id: 13,
  // },
  {
    name: "Weighing",
    description: "",
    folder: "production",
    href: "#",
    icon: ScaleIcon,
    emoji: "⚖️",
    id: 4,
  },

  // {
  //   name: "Printer",
  //   description: "Scanning of Material",
  //   folder: "production",
  //   href: "#",
  //   icon: PrinterIcon,
  //   emoji: "🖨️",
  //   id: 5,
  // },
  // {
  //   name: "Open PO List",
  //   description: "",
  //   folder: "production",
  //   href: "#",
  //   icon: DeviceTabletIcon,
  //   emoji: "🧾",
  //   id: 6,
  // },
  {
    name: "Material Usage RM",
    description: "",
    folder: "production",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 7,
  },
  {
    name: "Material Usage PM",
    description: "",
    folder: "production",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 21,
  },
  {
    name: "Safety Measurement",
    description: "",
    folder: "safety",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 22,
  },
  {
    name: "Job Hazard Analysis(JHA) Work Sheet",
    description: "",
    folder: "safety",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 23,
  },
  {
    name: "Feedback Form",
    description: "",
    folder: "safety",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 26,
  },
  {
    name: "How's To Module",
    description: "",
    folder: "safety",
    href: "#",
    icon: ReceiptRefundIcon,
    emoji: "🧾",
    id: 30,
  },

  // {
  //   name: "Goods Receipt",
  //   description: "",
  //   folder: "logistics",
  //   href: "#",
  //   icon: ReceiptRefundIcon,
  //   emoji: "🧾",
  //   id: 24,
  // },

  {
    name: "GI - Consumables & Spare",
    description: "",
    folder: "logistics",
    href: "#",
    icon: ScaleIcon,
    emoji: "🧾",
    id: 29,
  },

  // {
  //   name: "Delivery Booking",
  //   description: "",
  //   folder: "logistics",
  //   href: "#",
  //   icon: ClipboardListIcon,
  //   emoji: "🧾",
  //   id: 25,
  // },
  {
    name: "Task Manager",
    description: "",
    folder: "admin",
    href: "#",
    icon: ClipboardListIcon,
    emoji: "🧾",
    id: 27,
  },
  {
    name: "License Request",
    description: "",
    folder: "admin",
    href: "#",
    icon: KeyIcon,
    emoji: "🧾",
    id: 28,
  },

  // {
  //   name: "Inventory Transfer",
  //   description: "",
  //   folder: "logistics",
  //   href: "#",
  //   icon: ArrowNarrowRightIcon,
  //   emoji: "🧾",
  //   id: 8,
  // },
  // {
  //   name: "R",
  //   description: "",
  //   folder: "logistics",
  //   href: "#",
  //   icon: NewspaperIcon,
  //   emoji: "🧾",
  //   id: 9,
  // },

  {
    name: "Usage Slip Master",
    description: "",
    folder: "admin",
    href: "#",
    icon: NewspaperIcon,
    emoji: "🧾",
    id: 104,
  },
  {
    name: "User Master",
    description: "",
    folder: "admin",
    href: "#",
    icon: UserGroupIcon,
    emoji: "🧾",
    id: 11,
  },
  {
    name: "Open AI Chat GPT",
    description: "",
    folder: "tools",
    href: "#",
    icon: CubeTransparentIcon,
    emoji: "🧾",
    id: 10,
  },
  {
    name: "Query",
    description: "",
    folder: "tools",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 14,
  },
  {
    name: "Messenger",
    description: "",
    folder: "tools",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 16,
  },
  {
    name: "Dashboard",
    description: "",
    folder: "tools",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 17,
  },

  {
    name: "Knowledge Base",
    description: "",
    folder: "tools",
    href: "#",
    icon: StarIcon,
    emoji: "🧾",
    id: 31,
  },

  {
    name: "Query Manager",
    description: "",
    folder: "admin",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 15,
  },

  {
    name: "Get Tickets",
    description: "",
    folder: "admin",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 18,
  },
  {
    name: "Selfbilling",
    description: "",
    folder: "sales",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 19,
  },
  {
    name: "Cost Model",
    description: "",
    folder: "accounting",
    href: "#",
    icon: ChipIcon,
    emoji: "🧾",
    id: 20,
  },
  {
    name: "Settings",
    description: "",
    folder: "settings",
    href: "#",
    icon: UserIcon,
    emoji: "🧾",
    id: 32,
  },

  {
    name: "Pallet Tag",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 33,
  },

  {
    name: "Goods Issue - TEST",
    description: "",
    folder: "test",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 34,
  },
  {
    name: "Dashboard",
    description: "",
    folder: "CRM",
    href: "#",
    icon: ChartPieIcon,
    emoji: "🧾",
    id: 35,
  },

  {
    name: "Inventory Count Master",
    description: "",
    folder: "CRM",
    href: "#",
    icon: CubeIcon,
    emoji: "🧾",
    id: 36,
  },
  {
    name: "Free Goods - Receiving",
    description: "",
    folder: "logistics",
    href: "#",
    icon: ClipboardListIcon,
    emoji: "🧾",
    id: 38,
  },
  {
    name: "Inventory Push",
    description: "",
    folder: "logistics",
    href: "#",
    icon: ClipboardListIcon,
    emoji: "🧾",
    id: 37,
  },

  {
    name: "Fifo Card",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 40,
  },

  {
    name: "Palleting - OSH",
    description: "",
    folder: "logistics",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 41,
  },

  {
    name: "Pallet Tag DR",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 42,
  },

  {
    name: "Inventory Count",
    description: "",
    folder: "CRM",
    href: "#",
    icon: CubeIcon,
    emoji: "🧾",
    id: 43,
  },

  {
    name: "Projects&Tasks",
    description: "",
    folder: "tools",
    href: "#",
    icon: LightningBoltIcon,
    emoji: "🧾",
    id: 44,
  },

  {
    name: "Item Mask",
    description: "",
    folder: "CRM",
    href: "#",
    icon: CubeIcon,
    emoji: "🧾",
    id: 45,
  },

  {
    name: "Store Manager",
    description: "",
    folder: "CRM",
    href: "#",
    icon: UserIcon,
    emoji: "🧾",
    id: 46,
  },
  // {
  //   name: "Inventory Balance Report",
  //   description: "",
  //   folder: "CRM",
  //   href: "#",
  //   icon: ChartSquareBarIcon,
  //   emoji: "🧾",
  //   id: 47,
  // },
  {
    name: "Compliance Report",
    description: "",
    folder: "CRM",
    href: "#",
    icon: ChartSquareBarIcon,
    emoji: "🧾",
    id: 48,
  },

  {
    name: "Inventory Summary Report",
    description: "",
    folder: "CRM",
    href: "#",
    icon: ChartSquareBarIcon,
    emoji: "🧾",
    id: 49,
  },
  {
    name: "Inventory Per Batch",
    description: "",
    folder: "reports",
    href: "#",
    icon: ChartSquareBarIcon,
    emoji: "🧾",
    id: 50,
  },
  {
    name: "Proration",
    description: "",
    folder: "production",
    href: "#",
    icon: VariableIcon,
    emoji: "🧾",
    id: 51,
  },

  {
    name: "DPTR",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 52,
  },
  {
    name: "Weigher Tag Duplication",
    description: "",
    folder: "production",
    href: "#",
    icon: DocumentDuplicateIcon,
    emoji: "🧾",
    id: 53,
  },

  {
    name: "DPUR",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 55,
  },
  {
    name: "TPUR",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 56,
  },

  {
    name: "Paste Supplier Master Data",
    description: "",
    folder: "admin",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 57,
  },
  {
    name: "Paste Brand Master Data",
    description: "",
    folder: "admin",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 58,
  },

  {
    name: "Return Tag",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 59,
  },

  {
    name: "Journal Entry Reversal",
    description: "",
    folder: "admin",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 60,
  },
  {
    name: "ITR Vs IT Report",
    description: "",
    folder: "reports",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 61,
  },
  {
    name: "Delivery Import",
    description: "",
    folder: "production",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 62,
  },
  {
    name: "Request for Payment",
    description: "",
    folder: "admin",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 63,
  },
  {
    name: "Auto PR TEST",
    description: "",
    folder: "production",
    href: "#",
    icon: DocumentReportIcon,
    emoji: "🧾",
    id: 64,
  },
];
export const HandleItemRemove = async (e, set, get) => {
  const holderBom = get;
  set([]);
  set(holderBom.filter((o, i) => i !== e));
};
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const PageHeader = (props) => {
  return (
    <>
      <div class="max-w-7xl mx-auto pt-4  pb-2">
        <h1 class="text-xl font-bold text-mainText">{props.text}</h1>
      </div>
    </>
  );
};

export const Label = (p) => {
  return (
    <>
      {p.module != null ? (
        <h1
          class={`text-xl font-bold text-WhiteMode-ButtonBackground000 ${p.className}`}
        >
          {solutions.map((item, index) => (
            <>
              {item.id == p.module && item.id != 0 ? (
                <div className="flex">
                  <div className="-mt-1.5  w-full text-center ">
                    {item.name}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </h1>
      ) : (
        <>
          {p.type == "header" ? (
            <label
              class={`text-xl font-bold font-sans text-WhiteMode-ButtonBackground000 ${p.className} p-0 m-0   `}
            >
              {p.text}
            </label>
          ) : (
            <label
              className={`text-WhiteMode-ButtonBackground000 font-semibold ${p.css} ${p.className}    p-0 m-0  `}
            >
              {p.text}
            </label>
          )}
        </>
      )}
    </>
  );
};

export const LabelWContent = (p) => {
  return (
    <>
      <div className="text-left gap-0 grid ">
        <span className={`text-xs w-fit p-0  -m-0 text-white  ${p.className}`}>
          {p.title}
        </span>
        <span className="text-xs  w-fit text-white  p-0  mt-0.m-5   bg-mainBG   rounded-md">
          {p.value}
        </span>
      </div>
    </>
  );
};

export const ToastNotificationMJ = ({ message, error }) => {
  const isSuccess = !!message;
  const text = isSuccess ? message : error;

  const bgColor = isSuccess ? "#10B981" : "#EF4444"; // Emerald for success, Red for error
  const iconPath = isSuccess ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12";
  const iconColor = "#ffffff";

  return (
    <div
      className="fixed top-6 right-6 z-50 animate-slide-in"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="flex items-center gap-3 px-5 py-4 rounded-lg shadow-xl transition-all duration-300"
        style={{
          backgroundColor: bgColor,
          color: "#FFFFFF",
          minWidth: "240px",
          maxWidth: "340px",
        }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={iconColor}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={iconPath}
            />
          </svg>
        </div>
        <p className="text-sm font-medium leading-snug break-words">{text}</p>
      </div>
    </div>
  );
};

export const RemoveFromGrid = (rows, setrows, id) => {
  // console.log(setrows);
  const newMap = [...rows];
  newMap.splice(Number(id), 1);
  setrows(newMap);
};

export const DefMenus = (p) => {
  const HandleClick = (e) => {
    p.setSelectedMenuId(e.target.id);
  };

  return (
    <>
      <div className={` py-2  flex      pb-2 pt-0.5 ${p.className}`}>
        {p.menus.map((item, index) => (
          <div
            key={index}
            className={
              index == p.SelectedMenuId
                ? "border-black px-2 border-b-2  whitespace-nowrap "
                : "border-trans50 px-2 border-b whitespace-nowrap "
            }
          >
            <DefButton
              text={item.text}
              id={item.id}
              type={index == p.SelectedMenuId ? "13" : "14"}
              className={index == p.SelectedMenuId ? "btn " : " btn "}
              onClick={HandleClick}
            />
          </div>
        ))}
        <div className="border-trans50 border-b w-full"></div>
      </div>
    </>
  );
};

export const DefButton = (p) => {
  return (
    <>
      {p.visible === undefined ? (
        <button
          name={p.name}
          id={p.id}
          value={p.value}
          key={p.index}
          disabled={p.loading}
          className={`btn btn-sm  ${p.css}  ${p.className}`}
          type="button"
          onClick={
            p.disabled === undefined
              ? p.onClick
              : p.disabled
              ? undefined
              : p.onClick
          }
          // onClick={() => // console.log({ p })}
        >
          {p.loading == undefined ? (
            p.text
          ) : p.loading ? (
            <LoadingSpinner />
          ) : (
            p.text
          )}
        </button>
      ) : (
        <>
          {p.visible === false ? (
            ""
          ) : (
            <button
              name={p.name}
              id={p.id}
              value={p.value}
              key={p.index}
              className={
                p.type == undefined
                  ? `bg-github_ButtonGreen w-full h-8  font-sans text-sm text-github_FontColor font-medium rounded-md ${p.css}  ${p.className}`
                  : p.type == "2"
                  ? `rounded-md  h-5  font-bold  w-full border-transparent    text-sm  text-mainTextblack  bg-main ${p.css}  ${p.className}`
                  : p.type == "3"
                  ? `rounded-md  h-5  font-bold  ml-2 border-transparent    text-sm  text-mainLink   bg-transparent ${p.css}  ${p.className}`
                  : p.type == "4"
                  ? `rounded-md   font-bold   border-transparent    text-sm  text-mainTextblack  bg-main ${p.css}  ${p.className}`
                  : p.type == "4B"
                  ? `rounded-md   font-bold   border-transparent    text-sm  text-main  bg-transparent ${p.css}  ${p.className}`
                  : p.type == "5"
                  ? `bg-github_BorderColorError w-full h-8  font-sans text-sm text-github_FontColor font-medium rounded-md ${p.css}  ${p.className}`
                  : ""
              }
              type="button"
              onClick={p.onClick}
              // onClick={() => // console.log({ p })}
            >
              {p.text}
            </button>
          )}
        </>
      )}
    </>
  );
};
export const DefButtonWalert = (p) => {
  const [openModal, setopenModal] = useState(false);
  return (
    <>
      <button
        className={`btn btn-primary btn-sm ${p.className}`}
        onClick={() => setopenModal(!openModal)}
      >
        {p.text}
      </button>
      {openModal && (
        <>
          <div className="bg-trans50 fixed top-0 left-0 w-full h-full ">
            <div className="bg-white rounded-md max-w-[512px] p-6 mx-auto mt-[20%]">
              <h6>{p.title}</h6>
              <p>{p.msg}</p>

              <div className="flex justify-between">
                <button
                  className="btn btn-warning mt-2 btn-sm"
                  onClick={() => setopenModal(!openModal)}
                >
                  Close
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    p.onClick();
                    setopenModal(!openModal);
                  }}
                >
                  {p.text}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

//MJ
export const DefTableV3_MJ = (p) => {
  const { setError, setMessage } = useUserStore();
  const handleAllocate = (index) => {
    try {
      const selectedBatch = p.batchperjulian[index];
      const selectedRow = p.rows[p.showBatchperJulian];
      const x = p.rows.map((row, index) => {
        if (
          row.ITEMCODE === selectedBatch.ItemCode &&
          row.BATCHCODE.substring(0, 4) ===
            selectedBatch.BatchNum.substring(0, 4) &&
          selectedRow.NEEDEDQTY > 0 &&
          row.NEEDEDQTY > 0 &&
          index === p.showBatchperJulian
        ) {
          const allocatedQty = Math.min(
            selectedRow.NEEDEDQTY, //48
            selectedBatch.Quantity //27, 9, 11, 2
          );
          if (selectedBatch.Quantity > 0) {
            selectedBatch.Quantity -= allocatedQty;
          } else if (selectedBatch.Quantity <= 0) {
            setError("Insufficient Batch Quantity!");
          } else {
            setError(null);
          }
          const batchAllocation = {
            ITEMCODE: row.ITEMCODE,
            ITEMNAME: row.ITEMNAME,
            BATCHCODE: selectedBatch.BatchNum,
            DPUR: selectedBatch.U_DPUR,
            ALLOCATEDQTY: allocatedQty,
            NEEDEDQTY: selectedRow.NEEDEDQTY - allocatedQty,
            SAPAVAILAVILITY: selectedBatch.Quantity,
          };

          return {
            ...row,
            DPUR: batchAllocation.DPUR,
            ALLOCATEDQTY: row.ALLOCATEDQTY + allocatedQty,
            NEEDEDQTY: batchAllocation.NEEDEDQTY,
            QUANTITYLEFT: row.QUANTITYLEFT - allocatedQty,
            OVERALLALLOCATEDQTY: row.OVERALLALLOCATEDQTY + allocatedQty,
            UPDATED_BATCHCODE: [...row.UPDATED_BATCHCODE, batchAllocation],
          };
        } else if (selectedRow.NEEDEDQTY <= 0) {
          setMessage("Batch Quantity Allocation Completed!");
          setError(null);
        }
        return row;
      });

      const t = x.map((i) => {
        const getTotalAllocated = x.reduce(
          (acc, row) => acc + row.ALLOCATEDQTY,
          0
        );
        const checkQtyLeft = x.reduce(
          (acc, row) => acc + parseInt(row.NEEDEDQTY),
          0
        );
        return {
          ...i,
          OVERALLALLOCATEDQTY: getTotalAllocated,
          QUANTITYLEFT: checkQtyLeft,
        };
      });
      p.setRows(t);
      console.log("UpdatedRowsv3:", t);

      if (t[0].QUANTITYLEFT > 0) {
        p.setPostBtnStatus(true);
      } else {
        p.setPostBtnStatus(false);
      }
      const updatedBatchPerJulian = p.batchperjulian.map((batch, idx) => {
        if (idx === index && batch.Quantity > 0 && selectedRow.NEEDEDQTY > 0) {
          return { ...batch, Quantity: batch.Quantity - allocatedQty };
        }
        return batch;
      });
      p.setBatchperjulian(updatedBatchPerJulian);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {p.cols.map((e, i) => (
                <td key={i}>{e.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.rows.map((e, i) => (
              <tr key={i}>
                {p.cols.map((ee, ii) => (
                  <td key={ii}>{e[ee.name]}</td>
                ))}
                <td>
                  <button
                    onClick={() => p.reqSameJulian(i)}
                    hidden={e.ALLOCATEDQTY === undefined || e.NEEDEDQTY === 0}
                    // hidden={true}
                  >
                    ᐯ
                  </button>
                </td>
              </tr>
            ))}
            {p.rows.map(
              (row) =>
                row.UPDATED_BATCHCODE &&
                row.UPDATED_BATCHCODE.map((item) => {
                  const isMatched = p.batchperjulian.some(
                    (julian) =>
                      julian.BatchNum === item.BATCHCODE &&
                      item.ALLOCATEDQTY > 0
                  );
                  if (isMatched) {
                    return (
                      <tr>
                        <td colSpan={p.cols.length + 1}>
                          <div className="flex justify-between text-SAP-headerLine">
                            <div>{item.ITEMCODE}</div>
                            <div>{item.ITEMNAME}</div>
                            <div>{item.BATCHCODE}</div>
                            <div>{item.DPUR}</div>
                            <div className="text-mainLink">
                              {item.ALLOCATEDQTY}
                            </div>
                            <div>{item.PD}</div>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })
            )}
            {p.showBatchperJulian !== null &&
              p.rows[p.showBatchperJulian] &&
              p.batchperjulian.map((jul, index) => (
                <tr key={index}>
                  <td colSpan={p.cols.length + 1}>
                    <div className="flex justify-between">
                      <div>{jul.ItemCode}</div>
                      <div>{jul.ItemName}</div>
                      <div>{jul.BatchNum}</div>
                      <div>{jul.U_DPUR}</div>
                      <div>{jul.Quantity}</div>
                      <div>{jul.U_MnfDate.substring(0, 10)}</div>
                    </div>
                  </td>
                  <button onClick={() => handleAllocate(index)}>Alloc</button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const DefTableV3 = (p) => {
  return (
    <>
      <div class="overflow-x-auto">
        <table class="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td></td>

              {p.cols.map((e, i) => (
                <>
                  <td>{e.name}</td>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.rows.map((e, i) => (
              <tr>
                <td>{i}</td>

                {p.cols.map((ee, ii) => (
                  <td>{e[ee.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
};
export const DefTable = (p) => {
  try {
    const getInputWidth = (inputValue, type, width) => {
      // Calculate the width based on the content length
      if (width != undefined) return width;
      if (type == "date") return "100px";
      if (inputValue == "" || inputValue == undefined) return "50px";
      return inputValue.length * 9.5 + 40 + "px";
    };

    const exportx = () => {
      let strx = "";

      p.columns.map((ee) => {
        strx = strx + "\t" + ee.name;
      });
      strx = strx + "\n";

      p.rows.map((e) => {
        p.columns.map((ee) => {
          if (e[ee.name] != undefined) strx = strx + "\t" + e[ee.name];
          else strx = strx + "\t" + "";
        });
        strx = strx + "\n";
      });
      console.log(strx);
      navigator.clipboard.writeText(strx);
    };
    return (
      <div className="ml-5 relative ">
        <table
          className={`w-full   p-0 m-0  ${p.classNameTable}  pt-1 border border-gray-800   `}
        >
          <thead>
            <tr
              className={`py-0 px-2 m-0 bg-white uppercase  ${p.classNametrHead}`}
            >
              {p.columns.map((cols, index) => (
                <>
                  {cols.colspan === 0 ? (
                    ""
                  ) : (
                    <>
                      <th
                        className={
                          p.freeze
                            ? index <= p.freezeIndex
                              ? `sticky left-2    py-0 px-2 m-0  bg-white w-fit  border  ${p.classNameth}`
                              : `py-0 px-2 m-0 bg-white  w-fit   border  ${p.classNameth}`
                            : `w-fit  border  ${p.classNameth}`
                        }
                      >
                        <span className="px-1 text-sm ">
                          {cols.name === "ROW_NUM" ? "#" : cols.name}
                        </span>
                      </th>
                    </>
                  )}
                </>
              ))}
            </tr>
          </thead>
          <tbody className="py-0 px-2 m-0 text-white border relative ftable">
            {p.rows.length > 0 ? (
              <>
                {p.rows.map((rows, rowsIndex) => (
                  <tr
                    className={
                      rowsIndex % 2
                        ? `hover:bg-SAP-headerLine   border py-0 px-2 m-0  bg-WhiteMode-FromBackground000   whitespace-nowrap    ${p.classNametr1}`
                        : `hover:bg-SAP-headerLine  border py-0 px-2 m-0 bg-gray-400     whitespace-nowrap   ${p.classNametr2}`
                    }
                  >
                    {p.columns.map((cols, colsIndex, colsE) => (
                      <>
                        {cols.colspan === 0 ? (
                          ""
                        ) : (
                          <td
                            className={
                              p.freeze
                                ? colsIndex <= p.freezeIndex
                                  ? `sticky left-0 h-4 border-r  w-fit z-50   bg-white   `
                                  : colsIndex != p.columns.length - 1
                                  ? ` h-4 border-r  pr-1 w-fit   `
                                  : ` h-4  w-fit`
                                : "w-fit   "
                            }
                          >
                            {cols.name == "Option" ? (
                              <div className="mx-auto  w-full  h-full pt-1">
                                {/* <DefButton
                                  onClick={p.handleOption}
                                  id={
                                    rows.ID === undefined ? rowsIndex : rows.ID
                                  }
                                  // text={rows.ID === undefined ? rowsIndex : rows.ID}
                                  text={p.btnLabel}
                                  className={` m-0 ${p.btnCss} btn-primary btn-xs p-0 px-1 mx-1`}
                                  type="4"
                                  index={rowsIndex}
                                  value={
                                    rows.value === undefined
                                      ? rowsIndex
                                      : rows.value
                                  }
                                /> */}

                                <button
                                  onClick={p.handleOption}
                                  id={
                                    rows.ID === undefined ? rowsIndex : rows.ID
                                  }
                                  className={` m-0 ${p.btnCss} btn-primary btn-xs p-0 px-1 mx-1`}
                                  type="4"
                                  index={rowsIndex}
                                  value={
                                    rows.value === undefined
                                      ? rowsIndex
                                      : rows.value
                                  }
                                >
                                  {p.btnLabel}
                                </button>
                              </div>
                            ) : (
                              ""
                            )}

                            {cols.name == "link" ? (
                              <>
                                <a href={rows[cols.name]} target="_blank">
                                  {"--->"}
                                </a>
                              </>
                            ) : (
                              ""
                            )}

                            {cols.name != "link" && cols.name != "Option" ? (
                              <>
                                {p.disabled || p.disabled == "true" ? (
                                  <span
                                    className={
                                      colsIndex <= 0
                                        ? rowsIndex % 2
                                          ? `bg-transparent  w-fit     -m-0  -pt-0  px-1 ${p.spanCSS} `
                                          : `bg-transparent w-fit   -m-0  -pt-0  px-1 ${p.spanCSS} `
                                        : `  -m-0  -pt-0  px-1 ${p.spanCSS} `
                                    }
                                  >
                                    {cols.colspan === 1 ? rows[cols.name] : ""}
                                    {cols.colspan === 2 ? (
                                      <>
                                        {rows[cols.name]}
                                        <br></br>
                                        {/* <span className="p-0 -m-0 text-xs px-1">
                                        {rows[colsE[colsIndex + 2].name]}
                                      </span> */}
                                      </>
                                    ) : (
                                      ""
                                    )}

                                    {/* 
                          0 = hide
                          1 = normal
                          2 = normal with next value
                           */}
                                  </span>
                                ) : !cols.disabled ||
                                  cols.disabled == "false" ? (
                                  <>
                                    {cols.name === "ROW_NUM" ? (
                                      <span className="-p-0 -m-0 px-1 text-center">
                                        {rowsIndex + 1}
                                      </span>
                                    ) : (
                                      <input
                                        className={
                                          colsIndex <= 0
                                            ? rowsIndex % 2
                                              ? `mx-2 cursor-cell text-WhiteMode-ButtonBackground000  bg-[#fff]  border-0  bg-transparent   -m-0  -pt-0   ${p.spanCSS}  ${cols.name}${rowsIndex} w-fi `
                                              : `mx-2 cursor-cell text-WhiteMode-ButtonBackground000 bg-[#fff]   border-0  bg-transparent -m-0  -pt-0  ${p.spanCSS}  ${cols.name}${rowsIndex}  `
                                            : ` cursor-cell text-WhiteMode-ButtonBackground000 bg-[#fff]   border border-trans20  -m-0   rounded-none   -pt-0  ${p.spanCSS}  ${cols.name}${rowsIndex} w-full `
                                        }
                                        // type={p.type === undefined ? "text" :""}
                                        id={rowsIndex}
                                        name={cols.name}
                                        onChange={p.onChange}
                                        type={cols.type}
                                        // defaultValue={rows[cols.name]}
                                        value={rows[cols.name]}
                                        onFocus={(e) => e.target.select()}
                                        onKeyUp={p.onKeyUp}
                                        onKeyDown={p.onKeyDown}
                                        // style={{
                                        //   width: getInputWidth(
                                        //     rows[cols.name],
                                        //     cols.type,
                                        //     cols.width
                                        //   ),
                                        //   paddingLeft: "2px",
                                        //   paddingRight: "2px",
                                        // }}

                                        style={{
                                          width: cols.width,
                                          height: "22px",
                                        }}
                                      ></input>
                                    )}
                                  </>
                                ) : (
                                  <span
                                    className={
                                      colsIndex <= 0
                                        ? rowsIndex % 2
                                          ? `bg-transparent  w-fit  -m-0  -pt-0  px-1 ${p.spanCSS} `
                                          : `bg-transparent w-fit   -m-0  -pt-0  px-1 ${p.spanCSS} `
                                        : `  -m-0  -pt-0  px-1 ${p.spanCSS} `
                                    }
                                  >
                                    {/* {cols.colspan === 1 ? rows[cols.name] : ""} */}
                                    {cols.colspan === 2 ? (
                                      <x className=" relative">
                                        {rows[cols.name]}
                                        <div className="-mt-2.5"></div>
                                        <span
                                          className="p-0 -m-0    x  h-fit ml-2 font-bold"
                                          style={{
                                            // font-size: 0.75rem
                                            // line-height: 1rem
                                            fontSize: "0.60rem",
                                          }}
                                        >
                                          <>
                                            {/* {(
                                            rows[colsE[colsIndex + 1].name] + ""
                                          )
                                            .toString()
                                            .substring(0, 50)}
                                          {(
                                            rows[colsE[colsIndex + 1].name] + ""
                                          ).length >= 50
                                            ? "..."
                                            : ""} */}
                                            {rows[colsE[colsIndex + 1].name]}
                                          </>
                                        </span>
                                      </x>
                                    ) : (
                                      <span
                                        className={`-p-0 -m-0   px-1  ${p.spanCSS} ${cols.className}`}
                                        style={{
                                          padding: `0px !important`,
                                          margin: `0px !important `,
                                        }}
                                      >
                                        {p.maximize ? (
                                          rows[cols.name]
                                        ) : (
                                          <>
                                            {/* {(rows[cols.name] + "")
                                            .toString()
                                            .substring(0, 25)}
                                          {(rows[cols.name] + "").length >= 50
                                            ? "..."
                                            : ""} */}
                                            {rows[cols.name]}
                                          </>
                                        )}
                                      </span>
                                    )}

                                    {/* 
                          0 = hide
                          1 = normal
                          2 = normal with next value
                           */}
                                  </span>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                        )}
                      </>
                    ))}
                  </tr>
                ))}
              </>
            ) : (
              ""
            )}
          </tbody>
        </table>
        {p.rows.length > 0 && (
          <>
            <DefButton
              text="Export To Clipboard"
              onClick={exportx}
              type="2B"
              className=" btn btn-ghost btn-sm border -mt-[1px]"
            />
          </>
        )}
      </div>
    );
  } catch (error) {
    console.log({ error });
  }
};

export const DefTableComPressed = (p) => {
  const getInputWidth = (inputValue) => {
    // Calculate the width based on the content length
    if (inputValue == "" || inputValue == undefined) return "50px";
    return inputValue.length * 9.5 + 40 + "px";
  };
  return (
    <>
      {p.rows.map((rows, rowsIndex, rowsElemets) => (
        <>
          <tr>
            {p.columns.map((cols, colsIndex, colsE) => (
              <>
                {cols.header ? (
                  <td className="whitespace-nowrap " colspan="5">
                    {rowsIndex == 0 ? (
                      <p className="">{rows[colsE[colsIndex].name]}</p>
                    ) : (
                      ""
                    )}

                    {colsIndex > 0 ? (
                      <>
                        {rows[colsE[colsIndex].name] ==
                        rows[colsE[colsIndex - 1].name] ? (
                          <p className="bg-red-500">
                            {rows[colsE[colsIndex - 1].name]}
                            {rows[colsE[colsIndex].name]}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                ) : (
                  ""
                )}
              </>
            ))}
          </tr>

          <tr>
            {p.columns.map((cols, colsIndex, colsE) => (
              <>
                {!cols.header ? (
                  <td className="whitespace-nowrap">
                    {rows[colsE[colsIndex].name]}
                  </td>
                ) : (
                  ""
                )}
              </>
            ))}
          </tr>
        </>
      ))}
    </>
  );
};

export const DefInput = (p) => {
  const searchRef = useRef(null);
  const refFucos = useRef(null);
  const [maps, setMaps] = useState([]);
  const [mapsShow, setMapsShow] = useState(false);
  const [filters, setfilters] = useState("");
  const [visibility, setvisibility] = useState(false);
  const [hasSelected, sethasSelected] = useState(false);
  const [getHight, setGetHight] = useState(0);
  const [SearchValue, setSearchValue] = useState("");

  const [selectedData, setselectedData] = useState({
    value: "",
    code: "",
  });

  const [ToolTip, setToolTip] = useState(
    selectedData.code + " - " + selectedData.value
  );
  const SearchHandler = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const SearchBtn = (e) => {
    setfilters(SearchValue);
  };
  const onClickEventHandler = (e) => {
    // console.log(e.target);
    sethasSelected(true);
    p.handler(e);
    setselectedData({
      value: e.target.value,
      code: e.target.name,
    });
    setfilters(e.target.value);
    setMapsShow(false);
  };
  const onClickHideMaped = (e) => {
    setMapsShow(false);
    p.closeHandler(false);
  };
  const onClickClear = (e) => {
    // console.log({ maps });
    p.handler(e);
    setfilters("");
    sethasSelected(false);
    setMapsShow(false);
  };

  const onChangeHandler = (e) => {
    setselectedData({
      value: e.target.name,
      code: e.target.value,
    });
    setfilters(e.target.value);
    setfilters(e.target.value);
  };
  const getQry = async () => {
    setvisibility(true);
    if (p.map == undefined) await EXEC_SQL(p.dropDownId, setMaps);
    setvisibility(false);
  };

  const esc = (e) => {
    // console.log(e.key);

    if (e.key == "Enter") setfilters(SearchValue);

    if (e.key != "Escape") return;
    setMapsShow(false);
    p.closeHandler(false);
  };

  const Close = (e) => {
    setMapsShow(false);

    p.closeHandler(false);
  };
  const [hoverstats, sethoverstats] = useState(false);
  const hoverEnter = (e) => {
    sethoverstats(true);
  };
  const hoverLeave = (e) => {
    sethoverstats(false);
  };
  useEffect(() => {
    if (p.dropDownId != undefined) {
      // console.log(p.dropDownId);
      getQry();
    }
  }, [p.dropDownId]);

  useEffect(() => {
    if (searchRef.current != undefined) searchRef.current.focus();
  }, [mapsShow]);

  useEffect(() => {
    if (refFucos != undefined && p.autofocus != undefined && p.autofocus)
      refFucos.current.focus();
  }, [refFucos]);
  useEffect(() => {
    setGetHight(window.innerHeight - 120);
  }, [window.innerHeight]);
  useEffect(() => {
    sethasSelected(p.sethasSelected);
    if (p.defvalue != undefined) {
      setselectedData({
        value: p.defName,
        code: p.defCode,
      });
    }
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     p.errorMsg = "";
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [p.errorMsg]);
  const [isPassword, setisPassword] = useState(false);
  const passwordSeeHandler = (e) => {
    setisPassword(!isPassword);
  };
  const PasteHandler = async (e) => {
    const text = await navigator.clipboard.readText();
    let rawRows = text.split("\n");
    rawRows = formatDate(rawRows[0], "yyyy-MM-dd");
    p.setvalue((e) => ({ ...e, [p.id]: rawRows }));
  };

  useEffect(() => {
    if (p.map != undefined) setMaps(p.map);
  }, [p.map]);

  return (
    <div className="" name={p.id}>
      <div className="flex">
        {p.label != undefined ? (
          <div className="relative">
            <div>
              <span
                className={
                  !p.disabled
                    ? "font-semibold text-sm inline-block flex-nowrap whitespace-nowrap overflow-auto absolute top-1  bg-white  rounded-md  px-1  "
                    : "font-semibold text-sm inline-block flex-nowrap whitespace-nowrap overflow-auto absolute top-1  bg-disabled rounded-md  px-1   "
                }
              >
                {p.label}
                {p.errorMsg == "" || p.errorMsg == undefined ? (
                  ""
                ) : (
                  <span className="w-2 h-2 text-red-500 tetx font-semibold  ml-1">
                    Invalid
                  </span>
                )}
              </span>
              <LoadingSpinner
                visible={p.visibility != undefined ? p.visibility : visibility}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {p.dropDownId === undefined ? (
        <label className="flex items-center gap-2">
          <input
            autofocus={p.autofocus == undefined ? false : p.autofocus}
            autocomplete="off"
            maxlength={p.maxLength}
            id={p.id}
            min={p.min}
            max={p.max}
            type={
              p.type == "password"
                ? !isPassword
                  ? "password"
                  : "text"
                : p.type
            }
            onfocusout={p.focusOut}
            name={p.id}
            onChange={p.handler}
            defaultValue={p.defvalue}
            placeholder={
              p.placeholder != "" || p.placeholder != ""
                ? p.placeholder
                : `select ${p.label}`
            }
            value={p.value}
            disabled={p.disabled}
            className={`input input-bordered   input-sm   border-none  placeholder-gray-800 text-black ${p.className}`}
            onKeyUp={p.onKeyUp}
            onMouseEnter={hoverEnter}
            onMouseLeave={hoverLeave}
            ref={refFucos}
          ></input>
          {p.type == "password" && (
            <kbd
              class="kbd kbd-xs text-black hover:cursor-pointer"
              onClick={passwordSeeHandler}
            >
              {!isPassword ? "Show" : "Hide"}
            </kbd>
          )}

          {p.setvalue != undefined && (
            <>
              {p.type == "date" && (
                <kbd
                  class="kbd kbd-xs text-black hover:cursor-pointer"
                  onClick={PasteHandler}
                >
                  Paste
                </kbd>
              )}
            </>
          )}
        </label>
      ) : (
        <div className="relative">
          <div
            className={
              hasSelected
                ? ` relative rounded-md bg-white `
                : ` relative rounded-md `
            }
          >
            <div
              className={`flex devlayout m-0 p-0 w-full border-0  ${p.className} `}
            >
              {hasSelected ? (
                <>
                  <span
                    data-tooltip-target="tooltip-default"
                    className="bg-gray-400 shadow-sm ml-2 whitespace-now first-letter:rap w-full overflow-hidden pt-0.5  "
                    tooltip={p.id}
                    onMouseEnter={hoverEnter}
                    onMouseLeave={hoverLeave}
                  >
                    {p.map == undefined
                      ? selectedData.code + " - " + selectedData.value
                      : p.map.length > 0
                      ? selectedData.code + " - " + selectedData.value
                      : ""}
                  </span>
                </>
              ) : (
                <>
                  <input
                    autofocus={p.autofocus == undefined ? false : p.autofocus}
                    autocomplete="off"
                    onfocusout={p.focusOut}
                    id={p.id}
                    type={p.type}
                    name={p.name}
                    min={p.min}
                    max={p.max}
                    onChange={onChangeHandler}
                    defaultValue={p.defvalue}
                    value={filters}
                    disabled={p.disabled}
                    onPaste={p.onPaste}
                    placeholder={
                      p.placeholder == "" || p.placeholder == undefined
                        ? `select ${p.label}`
                        : p.placeholder
                    }
                    className={`bg-gray-400 shadow-sm hover:bg-[#0000000b] ml-1 cursor-pointer px-2 pb-[3px] w-full ${p.Icss} border-0  ${p.className} border-transparent -m-0.5 placeholder-gray-800`}
                    onFocus={(e) => {
                      setMapsShow(true);
                    }}
                    ref={refFucos}
                    onBlur={(e) => {
                      // setMapsShow(false);
                    }}
                    onMouseEnter={hoverEnter}
                    onMouseLeave={hoverLeave}
                  ></input>
                </>
              )}
              <DefButton
                type="2"
                text={"X"}
                onClick={onClickClear}
                className="btn-secondary mx-1"
                id={p.clearid}
                key={"clear"}
              ></DefButton>
            </div>
          </div>
          {mapsShow && (
            <div className="  z-40 max-h-20  absolute w-full top-0.5    ">
              <input
                autofocus
                onChange={SearchHandler}
                ref={searchRef}
                onKeyUp={esc}
                className="bg-white absolute z-40 active:border-0"
              />
              <div className="border  max-h-64 overflow-auto bg-[#f7f7f7] z-30 absolute w-full top-7 shadow-sm">
                <p className="m-0 p-0 text-[#00000086] ">Select {p.label}</p>
                {Array.isArray(maps) && (
                  <>
                    {maps.map((item, index) => (
                      <>
                        {item.name != undefined && (
                          <div className="">
                            {item.name
                              .toLowerCase()
                              .includes(filters.toLowerCase()) && (
                              <div key={index} className="">
                                <button
                                  type="2B"
                                  className="DefInputDropDown font-semibold  py-1 pl-6 text-lg    w-full    text-left hover:bg-trans20"
                                  onClick={onClickEventHandler}
                                  value={item.code}
                                  name={item.name}
                                  id={p.id}
                                >
                                  {item.name}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {hoverstats && selectedData.code != "" ? (
        <>
          <div className="bg-gray-410 text-white rounded-md  px-1 whitespace-nowrap fixedCenter top-10 shadow-md">
            {selectedData.code + " - " + selectedData.value}
          </div>
        </>
      ) : (
        ""
      )}
      {/* {(p.errorMsg != "" || p.errorMsg != undefined) && (
        <>
          <p>{p.errorMsg}</p>
        </>
      )} */}
    </div>
  );
};

export const Footer = (p) => {
  return (
    <>
      <div>
        <div className=" gap-4 grid-cols-4  max-w-sm mx-auto text-center  mt-10 ">
          <p className=" text-sm font-semibold inline text-github_FontLinkColor mx-2">
            Terms
          </p>
          <p className=" text-sm font-semibold inline text-github_FontLinkColor mx-2">
            Privacy
          </p>
          <p className=" text-sm font-semibold inline text-github_FontLinkColor mx-2">
            Security
          </p>
          <p className=" text-sm font-semibold inline text-redditFontHead mx-2">
            Contact Admin
          </p>
        </div>
      </div>
    </>
  );
};

export const UserInfoForPost = (props) => {
  return (
    <>
      <div
        className={`rounded-md bg-WhiteMode-FromBackground000 py-2 px-2.5 ${props.className}`}
      >
        <p className="text-xs text-start -mb-0  ">
          {props.type === undefined
            ? " to be posted by"
            : props.type === "1"
            ? " posted by"
            : ""}
          <span className="px-1.5 font-semibold">
            u/{" "}
            <span className="text-github_BorderColorActive">
              {props.userInfo.firstname + " " + props.userInfo.lastname}
            </span>
          </span>
          {"at t/"}
          {Datenw.toISOString().substring(0, 10)}
        </p>
      </div>
    </>
  );
};
export const setixDate = (setNewDate, createdateUnit) => {
  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    // // console.log(t);
    return t;
  }
  setNewDate(toDateTime(createdateUnit));
};
// export const Input = (props) => {
//   return (
//     <>
//       <div className="">
//         <input
// autofocus={p.}
//           id={props.id}
//           name={props.name}
//           // text={props.type}
//           defaultValue={props.defaultValue}
//           className=""
//         ></input>
//       </div>
//     </>
//   );
// };

// export const Pager = async (props) => {
//   return (
//     <>
//       <div className=" w-full group round-le inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ">
//         <button type="button">
//           <span>
//             <span aria-hidden="true"> ← </span>
//           </span>
//         </button>
//         <select id="page" name="page" className="w-full bg-transparent">
//           {props.optns.map((item, index) => (
//             <option value="default">1</option>
//           ))}
//         </select>
//         <button type="button">
//           <span>
//             <span aria-hidden="true"> → </span>
//           </span>
//         </button>
//       </div>
//     </>
//   );
// };
export const InputStyleBox =
  "w-full  grow flex flex-row    appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-gray-500 sm:text-sm";
export const InputStyle = "w-full bg-transparent";
export const DefaultFontStype = "font-medium text-mainText";
export const DefaultFontStypex = DefaultFontStype + "-p-0 -m-0";
export const DefaultFontStypexMuted =
  DefaultFontStype + "-p-0 -m-0 text-gray-800";
export const DefaultFontStypexLink = DefaultFontStype + "-p-0 -m-0 text-main";
export const DefaultButtonStyle =
  "font-bold px-2   text-sm bg-main  text-mainTextblack   text-center   rounded-xl px-3 ";
export const DefaultButtonStyleNullified =
  "font-bold px-3  text-sm bg-mainButton text-mainText   text-center   rounded-xl";
export const ConfirmButton =
  "w-40 inline-flex justify-center rounded-md  font-bold   border-transparent  px-4 py-2 text-sm font-medium text-mainTextblack  bg-main";
export const smalBtn =
  " rounded-md   font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-mainTextblack  bg-main";
export const smalBtnWarning =
  "  font-bold   border-transparent  px-1.5 pi-0.5 text-sm  text-mainText  bg-red-500";

export const pageBtnLeft =
  "w-10 inline-flex justify-center rounded-l-md  font-bold   border-transparent  px-1.5 py-2 text-sm font-medium text-mainTextblack  bg-main";
export const pageBtnMid =
  "w-10 inline-flex justify-center   font-bold   border-transparent  px-1.5 py-2 text-sm font-medium text-mainTextblack  bg-main";
export const pageBtnMidSelected =
  "w-10 inline-flex justify-center   font-bold   border-transparent  px-1.5 py-2 text-sm font-medium text-mainTextblack  bg-gray-800";

export const pageBg =
  "w-30 inline-flex justify-center rounded-md  font-bold   border-transparent    text-sm font-medium text-mainTextblack  bg-main";

export const pageBtnRight =
  "w-10 inline-flex justify-center rounded-r-md  font-bold   border-transparent  px-1.5 py-2 text-sm font-medium text-mainTextblack  bg-main";
export const pageList =
  "w-10 inline-flex justify-center rounded-r-md  font-bold   border-transparent  px-1.5 py-2 text-sm font-medium text-mainTextblack  bg-main";

export const ConfirmButtonSM =
  "w-12 inline-flex justify-center rounded-md   border-transparent  px-0 py-2 text-sm font-medium text-white  bg-main";
export const DefaultHeaderStyle = "text-xl font-bold text-mainText text-center";
export const HighLightedText =
  "-p-0 -m-0 font-medium bg-gray-700 text-mainText rounded-xl px-3";

export const HighLightedTextLabel =
  "-p-0 -m-0 font-medium  bg-transparent text-mainText rounded-xl px-3";

///////////// IMGSsrc

export const Deanprof = require("../assets/icons/DpXo.png");
export const reddit_icon_up = require("../assets/icons/arrowUp.png");
export const reddit_icon_down = require("../assets/icons/arrowdown.png");
export const reddit_icon_comment = require("../assets/icons/comment.png");
export const reddit_icon_share = require("../assets/icons/share.png");
export const reddit_icon_award = require("../assets/icons/award.png");
export const Logo = require("../assets/icons/BANNER.png");
export const ICON = require("../assets/icons/ICON1.png");
export const loginWallpaper = require("../assets/wallpapers/5476956_2817291.png");
export const askRedditIcon = require("../assets/wallpapers/askRedditIcon.png");
export const loginWallpaper2 = require("../assets/wallpapers/background2.png");
export const redditDefImg =
  "https://styles.redditmedia.com/t5_4hd870/styles/profileIcon_snoo53139e62-20a6-4eb5-9048-512b44807ec4-headshot.png";
export const MainIcon = () => {
  return <img src={ICON} alt="icon" className="h-10 w-10" />;
};

export const cssTH =
  "font-semibold text-mainText border-2 border-gray-900 pl-2 py-1 text-left";
export const cssTD =
  "text-mainText border-2 border-gray-900 px-1   whitespace-nowrap w-fit";

export const BarcodeGen = (props) => {
  const { inputref } = useBarcode({
    value: props.value,
    options: {
      displayValue: false,
      background: "#ffc0cb",
    },
  });
  return <canvas ref={inputref} />;
};

export const NoteInfo = (props) => {
  return (
    <>
      {props.visible ? (
        <div id="NoteInfo" className="NoteInfo">
          {props.type == undefined ? (
            <div
              className={`bg-GitHub-Background200 rounded-md ${props.className}`}
            >
              <p className=" text-xs text-mainText -pb-0 mb-1 w-full  px-3 py-2">
                <span className="text-GitHub-Font100 font-semibold flex gap-2">
                  {/* <InformationCircleIcon className="w-5 -mt-0.5" /> */}
                  {props.title}
                </span>
                <span className="text-GitHub- text-white font-bold">
                  {" "}
                  {props.body}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
          {props.type == "e" ? (
            <div
              className={`bg-GitHub-Pallet100 rounded-md ${props.className}`}
            >
              <p className=" text-xs text-mainText -pb-0 mb-1 w-full  px-3 py-2">
                <span className="text-white font-semibold flex gap-2">
                  {/* <ExclamationIcon className="w-5 -mt-0.5" /> */}
                  {props.title}
                </span>
                <span className="text-white"> {props.body}</span>
              </p>
            </div>
          ) : (
            ""
          )}

          {props.type == "s" ? (
            <div
              className={`bg-GitHub-Button200 rounded-md ${props.className}`}
            >
              <p className=" text-xs text-mainText -pb-0 mb-1 w-full  px-3 py-2">
                <span className="text-white font-semibold flex gap-2">
                  {/* <CheckCircleIcon className="w-5 -mt-0.5" /> */}
                  {props.title}
                </span>
                <span className="text-white"> {props.body}</span>
              </p>
            </div>
          ) : (
            <>
              {props.type == "w" ? (
                <div
                  className={`bg-phoenix-warning rounded-md ${props.className}`}
                >
                  <p className=" text-xs text-gray-410 -pb-0 mb-1 w-full  px-3 py-2">
                    <span className="text-gray-410 font-semibold flex gap-2">
                      {/* <CheckCircleIcon className="w-5 -mt-0.5" /> */}
                      {props.title}
                    </span>
                    <span className="text-gray-410"> {props.body}</span>
                  </p>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export const RedditBadge = (props) => {
  return (
    <div>
      {/* {// console.log(props.props)} */}

      {props.props.com.all_awardings != null ? (
        <>
          {props.props.com.total_awards_received ? (
            <>
              <div className="grow flex flex-row w-fit bg-redditBadgeBG py-2 rounded-full ">
                <div className="flex mx-2 text-xs">
                  {props.props.com.all_awardings.map((item, index) => (
                    <div className="flex px-0.5">
                      <img
                        src={item.static_icon_url}
                        className="w-4 h-4 m-0 p-0"
                        alt="new"
                      />
                    </div>
                  ))}
                  <p className="-m-0 -p-0 font-normal">
                    {props.props.com.total_awards_received >= 2
                      ? props.props.com.total_awards_received
                      : ""}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export const Kbd = (props) => {
  return (
    <>
      <kbd class="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border  rounded-lg bg-gray-600 text-gray-100 border-gray-500">
        {props.text}
      </kbd>
      ;
    </>
  );
};

export const EXEC_SQL_InsertMulti = async (
  sqlid,
  sets,
  cols,
  rows,
  table,
  optionalSQL = "",
  VAL2
) => {
  // console.log({ rows });
  // console.log({ cols });

  let Q =
    `DECLARE @NOW as DateTIme = convert(datetime,GETDATE(),2) ` +
    `DECLARE @NOWTIME as time = convert(time , CURRENT_TIMESTAMP) ` +
    ` ${optionalSQL} INSERT INTO  ${table} (`;
  cols.map((cols) => (Q = Q + `${cols.name} ,`));
  Q = Q.slice(0, -1);
  Q += ") VALUES ";
  rows.map((r, ri, re) => {
    Q = Q + "(";
    cols.map((c, ci, ce) => {
      if (r[ce[ci].name] == "@NOW" || r[ce[ci].name] == "@NOWTIME") {
        Q = Q + `${r[ce[ci].name]},`;
      } else {
        Q = Q + `'${r[ce[ci].name]}',`;
      }
    });
    Q = Q.slice(0, -1);
    Q = Q + "),";
  });
  Q = Q.slice(0, -1);
  // console.log({ Q });
  EXEC_INSERT(sqlid, sets, Q, optionalSQL);
};

export const EXEC_SQL_InsertMultix = async (
  sqlid,
  sets,
  cols,
  rows,
  table,
  optionalSQL = "",
  VAL2
) => {
  // console.log({ rows });
  // console.log({ cols });

  let Q =
    `DECLARE @NOW as DateTIme = convert(datetime,GETDATE(),2) ` +
    `DECLARE @NOWTIME as time = convert(time , CURRENT_TIMESTAMP) ` +
    ` ${optionalSQL} 
    INSERT INTO  ${table} (`;
  cols.map((cols) => (Q = Q + `${cols.name} ,`));
  Q = Q.slice(0, -1);
  Q += ") VALUES ";
  rows.map((r, ri, re) => {
    Q = Q + "(";
    cols.map((c, ci, ce) => {
      if (r[ce[ci].name] == "@NOW" || r[ce[ci].name] == "@NOWTIME") {
        Q = Q + `${r[ce[ci].name]},`;
      } else {
        Q = Q + `'${r[ce[ci].name]}',`;
      }
    });
    Q = Q.slice(0, -1);
    Q = Q + "),";
  });
  Q = Q.slice(0, -1);
  // console.log({ Q });
  EXEC_INSERT(sqlid, sets, Q, optionalSQL);
};

export const EXEC_SQL = async (sqlid, sets, VAL, optionalVal) => {
  try {
    const iDepList = await fetch("EXEC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        SQLID: sqlid,
        VAL: VAL,
        VAL2: optionalVal,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch(() => {
        return "error";
      });
    sets(iDepList);
  } catch (error) {
    sets([]);
    // console.log(error);
  }
};

export const EXEC_INSERT = async (sqlid, sets, VAL, optionalVal) => {
  try {
    const iDepList = await fetch("EXEC_INSERT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        SQLID: sqlid,
        VAL: VAL,
        VAL2: optionalVal,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch(() => {
        return "error";
      });
    // console.log({ iDepList });
    sets(iDepList);
  } catch (error) {
    sets([]);
    // console.log(error);
  }
};

export const EXEC_SQL_V2 = async (sqlid, sets, OptionalFront, OptionalBack) => {
  try {
    // console.log({ OptionalFront });
    // console.log({ OptionalBack });
    const iDepList = await fetch("EXEC_V2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        SQLID: sqlid,
        VAL: OptionalFront,
        VAL2: OptionalBack,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return "error";
      });
    if (iDepList.length > 0) sets(iDepList);
    // console.log({ iDepList });
  } catch (error) {
    sets([]);
    // console.log(error);
  }
};

export const EXEC_SQL_W_LABEL = async (sqlid, sets) => {
  try {
    const iDepList = await fetch("uploadSBOipic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        sql: sqlid,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return "error";
      });

    // // console.log({ iDepList });
    sets(iDepList);
  } catch (error) {
    sets([]);

    // console.log(error);
  }
};

export const EXEC_SQLI = async (sqlid, sets, optionalVal, VAL2) => {
  try {
    const iDepList = await fetch("EXECI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        SQLID: sqlid,
        VAL: optionalVal,
        VAL2: VAL2,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return "error";
      });

    // // console.log({ iDepList });
    sets(iDepList);
  } catch (error) {
    sets([]);

    // console.log(error);
  }
};

export function abbrNum(number, decPlaces) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
}
export const EXEC_SQL_InsertOne = async (
  sqlid,
  sets,
  optionalVal,
  optionalVal2,
  optionalVal3,
  optionalVal4,
  optionalVal5,
  optionalVal6,
  optionalVal7,
  optionalVal8,
  optionalVal9,
  optionalVal10,
  IMG,
  optionalVal11
) => {
  try {
    const iDepList = await fetch("EXEC", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
      body: JSON.stringify({
        SQLID: sqlid,
        VAL: optionalVal,
        VAL2: optionalVal2,
        VAL3: optionalVal3,
        VAL4: optionalVal4,
        VAL5: optionalVal5,
        VAL6: optionalVal6,
        VAL7: optionalVal7,
        VAL8: optionalVal8,
        VAL9: optionalVal9,
        VAL10: optionalVal10,
        IMG: IMG,
        VAL11: optionalVal11,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return "error";
      });

    // // console.log({ iDepList });
    sets(iDepList);
  } catch (error) {
    // console.log(error);
  }
};

export const EXEC_SQL_InsertMulti_V2 = async (
  sqlid,
  sets,
  cols,
  rows,
  table,
  optionalSQLFront = "",
  optionalSQLBack = "",
  optionalSQLCenter = ""
) => {
  let Q =
    `DECLARE @NOW as DateTIme = convert(datetime,GETDATE(),2) ` +
    `DECLARE @NOWTIME as time = convert(time , CURRENT_TIMESTAMP) ` +
    `${optionalSQLFront}  `;
  if (cols.length != 0) {
    Q += `${optionalSQLCenter} INSERT INTO  ${table} (`;
    cols.map((cols) => (Q = Q + `${cols.name} ,`));
    Q = Q.slice(0, -1);
    Q += ") VALUES ";
    rows.map((r, ri, re) => {
      Q = Q + "(";
      cols.map((c, ci, ce) => {
        if (
          r[ce[ci].name] == "@NOW" ||
          r[ce[ci].name] == "@ID" ||
          r[ce[ci].name] == "@ID838" ||
          r[ce[ci].name] == "@NOWTIME" ||
          r[ce[ci].name] == "@@IDENTITY"
        ) {
          Q = Q + `${r[ce[ci].name]},`;
        } else {
          Q = Q + `'${r[ce[ci].name]}',`;
        }
      });
      Q = Q.slice(0, -1);
      Q = Q + "),";
    });
  }

  Q = Q.slice(0, -1);
  Q += ` ${optionalSQLBack} `;

  console.log({ Q });
  EXEC_SQL_V2(sqlid, sets, Q);
};

export const EXEC_SQL_InsertMulti_V3 = async (
  sqlid,
  sets,
  cols,
  rows,
  table,
  optionalSQLFront = "",
  optionalSQLBack = "",
  optionalSQLCenter = ""
) => {
  let Q =
    `DECLARE @NOW as DateTIme = convert(datetime,GETDATE(),2) ` +
    `DECLARE @NOWTIME as time = convert(time , CURRENT_TIMESTAMP) ` +
    `${optionalSQLFront}  `;
  if (cols.length != 0) {
    Q += `${optionalSQLCenter} INSERT INTO  ${table} (`;
    cols.map((cols) => (Q = Q + `${cols.name} ,`));
    Q = Q.slice(0, -1);
    Q += ") VALUES ";
    rows.map((r, ri, re) => {
      Q = Q + "(";
      cols.map((c, ci, ce) => {
        if (
          r[ce[ci].name] == "@NOW" ||
          r[ce[ci].name] == "@ID838" ||
          r[ce[ci].name] == "@NOWTIME" ||
          r[ce[ci].name] == "@@IDENTITY"
        ) {
          Q = Q + `${r[ce[ci].name]},`;
        } else {
          Q = Q + `'${r[ce[ci].name]}',`;
        }
      });
      Q = Q.slice(0, -1);
      Q = Q + "),";
    });
  }

  Q = Q.slice(0, -1);
  Q += ` ${optionalSQLBack} `;

  // console.log({ Q });
  EXEC_SQL_V2(sqlid, sets, Q);
};

export const EXEC_SQL_InsertMulti_TEST = async (
  sqlid,
  sets,
  cols,
  rows,
  table,
  optionalSQL = ""
) => {
  // console.log({ rows });
  // console.log({ cols });

  let Q =
    `DECLARE @NOW as DateTIme = convert(datetime,GETDATE(),2) ` +
    `DECLARE @NOWTIME as time = convert(time , CURRENT_TIMESTAMP) ` +
    ` ${optionalSQL} INSERT INTO  ${table} (`;
  cols.map((cols) => (Q = Q + `${cols.name} ,`));
  Q = Q.slice(0, -1);
  Q += ") VALUES ";
  rows.map((r, ri, re) => {
    Q = Q + "(";
    cols.map((c, ci, ce) => {
      if (r[ce[ci].name] == "@NOW" || r[ce[ci].name] == "@NOWTIME") {
        Q = Q + `${r[ce[ci].name]},`;
      } else {
        Q = Q + `'${r[ce[ci].name]}',`;
      }
    });
    Q = Q.slice(0, -1);
    Q = Q + "),";
  });
  Q = Q.slice(0, -1);
  // console.log({ Q });
  // EXEC_SQLI(sqlid, sets, Q);
};

export const exportASImg = async (element, imageFileName) => {
  const canvas = await html2canvas(element);
  // console.log("1");
  const image = canvas.toDataURL("image/png", 1.0);
  // console.log("2");

  downloadImage(image, imageFileName);
  // console.log("3");
};
const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};
export const FilterBadWords = (p) => {
  let filtered = "";
  const badWords = [
    "puta",
    "putang ina",
    "putangina",
    "bullshit",
    "shit.",
    "shit,",
    "fucking",
    "fucking",
    "fucking",
    "shit",
    "fuck",
    "fuck.",
    "fuck,",
    "\nfucking.",
    "\nfucking",
    "fucking,",
    "pussy",
    "pussy.",
    "pussy,",
    "faces",
    "kill",
    "killer",
    "killing",
  ];
  try {
    const filterContainer = p.split(" ");
    filterContainer.map((item, index) => {
      if (ArrayChecker(badWords, item.replace(/(\r\n|\n|\r)/gm, ""))) {
        filtered = filtered + " " + sensorLit(item, "*");
        // console.log(filtered);
      } else {
        filtered = filtered + " " + item;
      }
    });
  } catch (error) {}
  // // console.log(filtered);
  //
  return filtered;
};

export const sensorLit = (p, s) => {
  let returnval = "";
  for (let i = 0; i < p.length - 2; i++) {
    returnval = returnval + s;
  }
  return p.substring(0, 1) + returnval + p.slice(-1);
};

export const IStep = (p) => {
  return (
    <>
      <div className={`flex ${p.className} border-0 `}>
        {p.components.map((item, index) => (
          <div className="flex h-fit mt-2" key={index}>
            <item.icon
              className={
                index >= p.current
                  ? "text-WhiteMode-ButtonBackground000 w-5 h-fit mt-1 mr-1 p-0.5 bg-transparent rounded-sm"
                  : "text-GitHub-Font100 w-5 h-fit mt-1 mr-1 p-0.5 bg-transparent rounded-sm"
              }
            />
            <p
              className={
                index >= p.current
                  ? "mt-0.5 border-b-2 border-transparent"
                  : "mt-0.5 border-b-2 border-github_BorderColorActive text-GitHub-Font100"
              }
            >
              {item.title}\
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export const handlResize = () => {
  return window.innerWidth <= 768;
};

// const sharp = require("sharp");

// // original base64 image
// const base64Image = "data:image/jpeg;base64,/9j/4QDsRXhpZg ...  ...  ... ";

// // express route function
// export default function (req, res, next) {
//   let parts = base64Image.split(";");
//   let mimType = parts[0].split(":")[1];
//   let imageData = parts[1].split(",")[1];

//   var img = new Buffer(imageData, "base64");
//   sharp(img)
//     .resize(64, 64)
//     .toBuffer()
//     .then((resizedImageBuffer) => {
//       let resizedImageData = resizedImageBuffer.toString("base64");
//       let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
//       res.send(resizedBase64);
//     })
//     .catch((error) => {
//       // error handeling
//       res.send(error);
//     });
// }

// const sharp = require("sharp");

// export const ImgResizer = (pastedImg) => {
//   let parts = pastedImg.split(";");
//   let mimType = parts[0].split(":")[1];
//   let imageData = parts[1].split(",")[1];

//   sharp(imageData)
//     .rotate()
//     .resize(200)
//     .jpeg({ mozjpeg: true })
//     .toBuffer()
//     .then((data) => {
//       let resizedImageData = data.toString("base64");
//       let resizedBase64 = `data:${mimType};base64,${resizedImageData}`;
//       return resizedBase64;
//     })
//     .catch((err) => {
//       return err;
//     });
// };

export const TimeLine = (p) => {
  return (
    <>
      <div className="w-full flex">
        <p
          className={
            p.checked
              ? "`text-white p-0 -m-0 h-5 w-6  text-center text-sm    rounded-full  bg-github_BorderColorActive  text-white    `"
              : "`text-white p-0 -m-0 h-5 w-6  text-center text-sm    rounded-full  bg-WhiteMode-Background000  text-white    `"
          }
        >
          ✓
        </p>
        <div
          className={
            p.checked
              ? "line border-t-4 border-github_BorderColorActive mt-2  w-full  "
              : "line border-t-4 border-WhiteMode-Background000 mt-2  w-full  "
          }
        >
          {p.label}
        </div>
      </div>
    </>
  );
};

export const TimeLineMaped = (p) => {
  return (
    <>
      <div className="frame">
        <div className="flex">
          {p.map.map((item, index) => (
            <>
              <TimeLine
                checked={p.currentPosition > index ? true : false}
                label={item.label}
                key={index}
                isFinal={index === p.map.length - 1 ? true : false}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export const DefTableV2 = (p) => {
  const [headerOptionPosition, setHeaderOptionPosition] = useState({
    Y: 0,
    X: 0,
  });

  const [showHeaderOption, setshowHeaderOption] = useState(false);
  const [selectedRow, setselectedRow] = useState(1);
  const [showHeaderOptionPlaceHolder, setshowHeaderOptionPlaceHolder] =
    useState("");
  const [showHeaderOptionSearch, setshowHeaderOptionSearch] = useState("");
  const [showHeaderOptionSelected, setshowHeaderOptionSelected] = useState("");
  const HeaderOption = (e) => {
    const { id, index, value, name, type } = e.target;
    const key = e.key;
    // console.log({ id, index, value, name, type, key });
    setshowHeaderOptionPlaceHolder(value);
    if (key == "Enter") filterOut(); //setshowHeaderOptionSearch(showHeaderOptionPlaceHolder);
    if (name == undefined) {
      setHeaderOptionPosition({
        Y: e.target.getBoundingClientRect().y,
        X: e.target.getBoundingClientRect().x,
      });
      setshowHeaderOption(true);
      setshowHeaderOptionSelected(id);
    }
    if (id == "cancel" || id == "SortHeaderAsc" || id == "SortHeaderDesc")
      setshowHeaderOption(false);
  };
  const [OptionBtnLabel, setOptionBtnLabel] = useState({
    label: "",
    icon: DotsHorizontalIcon,
  });
  const [RowsPlaceHolder, setRowsPlaceHolder] = useState([]);
  const filterOut = (e) => {
    setRowsPlaceHolder([]);

    p.rows.map((item, index) => {
      console.log(item[showHeaderOptionSelected]);
      if (
        item[showHeaderOptionSelected]
          .toString()
          .toLowerCase()
          .includes(showHeaderOptionPlaceHolder.toLowerCase())
      )
        setRowsPlaceHolder((e) => [
          ...e,
          {
            ...item,
          },
        ]);
    });
    setshowHeaderOption(false);
  };
  const exportx = () => {
    let strx = "";

    p.columns.map((ee) => {
      strx = strx + "\t" + ee.name;
    });
    strx = strx + "\n";

    p.rows.map((e) => {
      p.columns.map((ee) => {
        if (e[ee.name] != undefined) strx = strx + "\t" + e[ee.name];
        else strx = strx + "\t" + "";
      });
      strx = strx + "\n";
    });
    console.log(strx);
    navigator.clipboard.writeText(strx);
  };
  useEffect(() => {
    console.log(showHeaderOptionSearch);
  }, [showHeaderOptionSearch]);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.name != "HeaderOptionBox") setshowHeaderOption(false);
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // dropdown
  const [dorpDownShow, setDorpDownShow] = useState(false);

  const [dropDownMap, setDropDownMap] = useState([]);
  const [DropDownLoading, setDropDownLoading] = useState(false);
  const [dropDownPositio, setdropDownPositio] = useState({ left: 0, top: 0 });

  const [rowID, setrowID] = useState("");
  const [ColID, setColID] = useState("");
  const HandleClickDropDown = async (e, c, x) => {
    const { id, lang, title, accessKey } = e.target;
    let lanxg = lang;
    const newLang = lanxg.split(",");
    setrowID(c);
    setColID(x);
    let position = getObjectAbsolutPosition(id);
    console.log({ position, lang });
    console.log(e.target);
    setdropDownPositio(position);
    setDorpDownShow(true);
    try {
      setDropDownLoading(true);
      await EXEC_SQL_InsertOne(
        newLang[0],
        setDropDownMap,
        newLang[1],
        newLang[2]
      );
      setDropDownLoading(false);
    } catch (error) {
      setDropDownLoading(false);
    }
  };

  const dropDownHandler = (e) => {
    console.log(rowID, ColID);

    p.dropDownHandler(e, rowID, ColID);

    setDorpDownShow(false);
  };

  return (
    <>
      {p.loading ? (
        <>
          loading...
          <table>
            <tr>
              <th className="animate-pulse w-40 bg-trans20 text-transparent">
                x
              </th>
              <th className="border-x mx-2 animate-pulse w-56 bg-trans20 text-transparent">
                x
              </th>
              <th className="animate-pulse w-40 bg-trans20 text-transparent">
                x
              </th>
            </tr>
            <tr>
              <td className="border animate-pulse w-40 bg-trans20 text-transparent">
                .
              </td>
              <td className="border animate-pulse w-40 bg-trans20 text-transparent">
                .
              </td>
              <td className="border animate-pulse w-40 bg-trans20 text-transparent">
                .
              </td>
            </tr>
          </table>
        </>
      ) : (
        <div className="relative">
          {/* Header Option Start */}
          {showHeaderOption && (
            <div
              ref={ref}
              name="HeaderOptionBox"
              className="fixed bg-white p-2 border shadow w-52"
              style={{
                top: headerOptionPosition.Y + 25,
                left: headerOptionPosition.X,
              }}
            >
              <DefInput
                id="HeaderOptionBox"
                type="2"
                placeholder="input filter.."
                handler={HeaderOption}
                onKeyUp={HeaderOption}
                value={showHeaderOptionPlaceHolder}
              />
              <div className="border-t border-trans20"></div>
            </div>
          )}

          {/* Header Option End*/}

          <div>
            {p.allowClearFilter && (
              <button
                className="bg-white rounded-sm px-2"
                onClick={() => {
                  setshowHeaderOptionPlaceHolder("");
                  filterOut();
                }}
              >
                Clear Filter
              </button>
            )}
          </div>
          <table className={"text-xs"}>
            <thead>
              <tr className={"text-trans50"}>
                {p.columns.map((cols, index) =>
                  cols.colspan === 0 ? (
                    ""
                  ) : (
                    <th
                      className={` `}
                      style={{
                        width: `${cols.width}`,
                        minWidth: `${cols.width}`,
                      }}
                    >
                      <button
                        onClick={HeaderOption}
                        className="w-full bg-[#00000015] text-black rounded-md py-1 px-2"
                        id={`${cols.name}`}
                        name={`${cols.type}`}
                      >
                        <div className="flex items-center" id={`${cols.name}`}>
                          <>
                            {cols.icon != undefined && (
                              <cols.icon
                                className="w-4 h-4 mt-0.5 mx-2"
                                id={`${cols.name}`}
                              />
                            )}

                            <span className="" id={`${cols.name}`}>
                              {cols.name}
                            </span>
                          </>
                        </div>
                      </button>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="">
              {p.rows.length > 0 && (
                <>
                  {RowsPlaceHolder.length > 0 ? (
                    <>
                      {RowsPlaceHolder.map((rows, rowsIndex) => (
                        <tr className={"hover:bg-trans20  "}>
                          {p.columns.map((cols, colsIndex, colsE) => (
                            <>
                              <td
                                className={
                                  colsIndex == 0 ||
                                  colsIndex == p.columns.length - 1
                                    ? "px-1  border-y  border-[#0808083a] "
                                    : "px-1  border-y border-x border-[#0808083a] "
                                }
                              >
                                {cols.id == "Option" && (
                                  <button
                                    onClick={p.OptionHandler}
                                    className="bg-trans20 rounded-md flex px-2 items-center h-fit p-0 m-0"
                                    id={rows.id}
                                    name={rows.id}
                                    lang={rowsIndex}
                                  >
                                    {cols.label}
                                  </button>
                                )}

                                {p.customCss == undefined ? (
                                  <div className="ml-0.5">
                                    {rows[cols.name]}
                                    <br></br>
                                    {cols.colspan == 2 && (
                                      <> {rows[colsE[colsIndex + 1].name]}</>
                                    )}
                                  </div>
                                ) : (
                                  <div
                                    className={p.customCss(
                                      rows[cols.name],
                                      colsIndex
                                    )}
                                  >
                                    {rows[cols.name]}
                                    <br></br>
                                    {cols.colspan == 2 && (
                                      <div className="ml-0.5">
                                        {rows[colsE[colsIndex + 1].name]}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>
                            </>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {p.rows.length > 0 && (
                        <>
                          {p.rows.map((rows, rowsIndex) => (
                            <>
                              {rowsIndex >= (selectedRow - 1) * p.rowsPerPage &&
                                rowsIndex <= selectedRow * p.rowsPerPage && (
                                  <tr className={"hover:bg-trans20"}>
                                    {p.columns.map((cols, colsIndex, colsE) => (
                                      <>
                                        {cols.colspan != 0 && (
                                          <>
                                            {/* {rows.type == "sub" && colsIndex <= 0 ? "xx" : ""} */}
                                            <td
                                              className={
                                                colsIndex == 0 ||
                                                colsIndex ==
                                                  p.columns.length - 1
                                                  ? "px-1  border-y  border-[#0808083a] "
                                                  : "px-1  border-y border-x border-[#0808083a] "
                                              }
                                            >
                                              {cols.id == "Option" && (
                                                <button
                                                  onClick={p.OptionHandler}
                                                  className="bg-trans20 rounded-md flex px-2 items-center h-fit p-0 m-0"
                                                  id={rows.id}
                                                  name={rows.id}
                                                  lang={rowsIndex}
                                                >
                                                  {cols.label}
                                                </button>
                                              )}

                                              {cols.dropDownId == undefined ? (
                                                <>
                                                  {p.customCss == undefined ? (
                                                    <div
                                                      contentEditable={
                                                        cols.editable
                                                      }
                                                    >
                                                      {rows[cols.name]}
                                                    </div>
                                                  ) : (
                                                    <>
                                                      {cols.editable ==
                                                      "true" ? (
                                                        <>
                                                          <div
                                                            className={
                                                              cols.editable ==
                                                              "true"
                                                                ? `${p.customCss(
                                                                    rows[
                                                                      cols.name
                                                                    ],
                                                                    colsIndex
                                                                  )}  hover:bg-CakeFactory-Accent100`
                                                                : `${p.customCss(
                                                                    rows[
                                                                      cols.name
                                                                    ],
                                                                    colsIndex
                                                                  )}  `
                                                            }
                                                            contentEditable={
                                                              cols.editable
                                                            }
                                                            onInput={p.onChange}
                                                            onKeyDown={
                                                              p.onKeyDown
                                                            }
                                                            lang={cols.name}
                                                            id={rowsIndex}
                                                          >
                                                            {colsIndex == 1 &&
                                                            rows.type ==
                                                              "sub" ? (
                                                              <div className=" ml-8">
                                                                <div
                                                                  className={p.customCss(
                                                                    rows[
                                                                      cols.name
                                                                    ],
                                                                    colsIndex
                                                                  )}
                                                                >
                                                                  {
                                                                    rows[
                                                                      cols.name
                                                                    ]
                                                                  }
                                                                  {cols.colspan ==
                                                                    2 && (
                                                                    <>
                                                                      {
                                                                        rows[
                                                                          colsE[
                                                                            colsIndex +
                                                                              1
                                                                          ].name
                                                                        ]
                                                                      }
                                                                    </>
                                                                  )}
                                                                </div>
                                                              </div>
                                                            ) : (
                                                              <>
                                                                {
                                                                  rows[
                                                                    cols.name
                                                                  ]
                                                                }
                                                              </>
                                                            )}
                                                            {cols.type}
                                                          </div>
                                                        </>
                                                      ) : (
                                                        <div
                                                          className={p.customCss(
                                                            rows[cols.name],
                                                            colsIndex
                                                          )}
                                                          contentEditable={
                                                            cols.editable
                                                          }
                                                        >
                                                          <div
                                                            className={p.customCss(
                                                              rows[cols.name],
                                                              colsIndex
                                                            )}
                                                          >
                                                            {/* cells */}
                                                            {cols.type ==
                                                            "date" ? (
                                                              <>
                                                                {formatDate(
                                                                  rows[
                                                                    cols.name
                                                                  ],
                                                                  "yyyy-MM-dd"
                                                                )}
                                                              </>
                                                            ) : (
                                                              <>
                                                                {
                                                                  rows[
                                                                    cols.name
                                                                  ]
                                                                }
                                                              </>
                                                            )}
                                                            {cols.colspan ==
                                                              2 && (
                                                              <div className="text-xs  font-semibold">
                                                                {
                                                                  rows[
                                                                    colsE[
                                                                      colsIndex +
                                                                        1
                                                                    ].name
                                                                  ]
                                                                }
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      )}
                                                    </>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  {/* DropDown */}

                                                  <div
                                                    className="bg-trans20 cursor-pointer"
                                                    onClick={(e) =>
                                                      HandleClickDropDown(
                                                        e,
                                                        colsE[colsIndex].name,
                                                        rowsIndex
                                                      )
                                                    }
                                                    label="test"
                                                    id={`DefTableV2DrpDwnR${rowsIndex}C${colsIndex}`}
                                                    lang={cols.dropDownId}
                                                    title={rowsIndex}
                                                    accessKey={colsIndex}

                                                    // name={}
                                                  >
                                                    {
                                                      rows[
                                                        colsE[colsIndex].name
                                                      ]
                                                    }
                                                  </div>
                                                </>
                                              )}
                                            </td>
                                          </>
                                        )}
                                      </>
                                    ))}
                                  </tr>
                                )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>

          {p.rows.length > 0 && (
            <>
              <DefButton
                text="Export To Clipboard"
                onClick={exportx}
                type="2B"
                className=" btn btn-ghost btn-sm border -mt-[1px]"
              />
            </>
          )}
          {p.rowsPerPage && (
            <Pager
              rows={RowsPlaceHolder.length > 0 ? RowsPlaceHolder : p.rows}
              selectedRow={selectedRow}
              rowsPerPage={p.rowsPerPage}
              setselectedRow={setselectedRow}
            />
          )}

          {/* {showHeaderOptionPlaceHolder} */}

          {/* <button onClick={filterOut}>check</button> */}
          <>
            {dorpDownShow && (
              <>
                {/* <div
                  className="top-0 left-0 w-full h-full fixed  "
                  onClick={() => setDorpDownShow(false)}
                > */}
                <div
                  className={`w-[300px] bg-white border shadow-sm rounded-md   fixed
             `}
                  style={{
                    top: dropDownPositio.top + dropDownPositio.height + "px",
                    left: dropDownPositio.left + "px",
                  }}
                >
                  <DefInput
                    type=""
                    dropDownId="99999"
                    map={dropDownMap}
                    loading={DropDownLoading}
                    placeholder="Search..."
                    handler={dropDownHandler}
                    autofocus={true}
                    name={rowID}
                    id={ColID}
                    clearid={"clear"}
                    className="bg-trans20 rounded-none"
                  />
                </div>
                {/* </div> */}
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export const DefTimeline = (props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var daysWeekEnd = ["Sun", "Sat"];

  const newDate = (d, t) => {
    // y = new Date(y.getFullYear(), y.getMonth(), y.getDate() - 1);
    let get = new Date(d).toLocaleDateString("en-US", { weekday: "long" });
    let x = new Date(d);
    let xml = 0;
    if (t == "m") xml = x.getMonth();
    if (t == "d") xml = x.getDate();
    if (t == "w") xml = get.substring(0, 3);
    // if (t == "w") console.log(get);
    return xml;
  };
  const ifDateInRange = (s, e, d) => {
    // y = new Date(y.getFullYear(), y.getMonth(), y.getDate() - 1);
    if (s == null || s == "") return false;
    if (e == null || e == "") return false;
    s = new Date(s);
    e = new Date(e);
    d = new Date(d);

    return d >= s && d <= e;
  };
  return (
    <>
      <div className="relative">
        <div className="flex overflow-auto mt-2">
          <div className="sticky left-0 z-10 border-r shadow-s border-trans20">
            <div
              className={`px-1  border border-white   bg-white min-h-[40px] max-h-[40px] -mt-[8px] min-w-[${props.colsize}]  max-w-[${props.colsize}]`}
            ></div>
            {props.data.map((dataitem, dataindex) => (
              <div className=" flex  p-0 m-0 z-20 bg-white ">
                {props.dates.map((item, index) => (
                  <>
                    {index <= 1 && (
                      <>
                        <div
                          className={` font-semibold justify-items-center items-center overflow-hidden whitespace-nowrap px-1  border-l border-t border-trans20  bg-white min-h-[32px]   min-w-[${props.labelColSizes[index]}] max-w-[${props.labelColSizes[index]}]   `}
                        >
                          <a
                            href={`#${dataindex}`}
                            className={`overflow-hidden whitespace-nowrap text-sm  no-underline ${props.customCss(
                              dataitem[props.labelCol[index]],
                              index
                            )}  `}
                          >
                            {dataitem[props.labelCol[index]]}
                          </a>

                          {dataindex == 0 && index <= 1 && (
                            <div
                              className={`  font-semibold  absolute  -mt-14   min-w-[${props.labelColSizes[index]}]     max-w-[${props.labelColSizes[index]}]  
                               
                               `}
                            >
                              <span className="rounded-md bg-trans20 px-2">
                                {props.labelCol[index]}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
            ))}
          </div>
          <div className="relative z-0">
            <div className=" px-1 text-white border-y border-white min-h-[32px] max-h-[32px] min-w-[278px] max-w-[278px] ">
              x
            </div>
            {props.data.map((data, Aindex) => (
              <div className=" flex  p-0 m-0  ">
                {props.dates.map((dates, Bindex) => (
                  <div
                    id={
                      ifDateInRange(data.StartDate, data.EndDate, dates.date) &&
                      Aindex
                    }
                    className={
                      ifDateInRange(data.StartDate, data.EndDate, dates.date)
                        ? " bg-[#0000008f] px-1 min-w-[32px] max-w-[32px]  min-h-[32px] max-h-[32px] border-y border-white"
                        : daysWeekEnd.includes(newDate(dates.date, "w"))
                        ? " bg-[#00000020] px-1 min-w-[32px] max-w-[32px]  min-h-[32px] max-h-[32px] border-y border-white"
                        : "  bg-[#00000010]  px-1 min-w-[32px] max-w-[32px]  min-h-[32px] max-h-[32px] border-y border-white"
                    }
                  >
                    {/* month title */}
                    {newDate(dates.date, "d") == 1 && Aindex == 0 && (
                      <div className="absolute -mt-[39px]  bg-trans20 px-2 rounded-md  ">
                        {months[newDate(dates.date, "m")]}
                      </div>
                    )}
                    {/* days */}
                    {Aindex == 0 && (
                      <div className="absolute -mt-[20px] text-center   ml-1.5 ">
                        {newDate(dates.date, "d")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

export const getObjectAbsolutPosition = (id) => {
  let elem = document.getElementById(id);
  let rect = elem.getBoundingClientRect();
  return rect;
};

export const DynamicTable = (p) => {
  if (p.rows.length === 0) return null;

  const renderHeader = () => {
    const titles = Object.keys(p.rows[0]);
    return (
      <tr>
        {titles.map((item, key) => (
          <th className="border px-2" key={key}>
            {item}
          </th>
        ))}
      </tr>
    );
  };

  const renderRows = () => {
    return p.rows.map((row, index) => (
      <tr
        className={
          index % 2 ? "whitespace-nowrap " : "whitespace-nowrap bg-[#00000018]"
        }
      >
        {Object.keys(row).map((item, key) => (
          <td
            className="border px-2 cursor-pointer"
            key={index}
            onClick={p.onClick}
            id={index}
          >
            {row[item]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-auto">
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export function toFixed_Custom(num, fixed) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
}
