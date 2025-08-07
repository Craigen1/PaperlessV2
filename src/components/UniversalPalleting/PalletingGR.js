import React, { useContext, useEffect, useState } from "react";
import {
  DefButton,
  DefInput,
  DefTable,
  EXEC_SQL,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertOne,
  RemoveFromGrid,
} from "../ComponentList";
import { ITopContext } from "../../hooks/TopContext";
import PalletingGRAddItems from "./PalletingGRAddItems";
import PalletingGRPalleted from "./PalletingGRPalleted";
import PalletingGRconfirmPost from "./PalletingGRconfirmPost";

export default function PalletingGR(p) {
  const { userInfo, DateNow } = useContext(ITopContext);

  const comps = [
    {
      id: "DocNum",
      name: "DocNum",
      Type: "number",
      disabled: true,
    },

    {
      id: "CreatedDate",
      name: "Created Date",
      Type: "Date",
      disabled: true,
    },

    {
      id: "Branch",
      name: "Branch",
      Type: "text",
      disabled: true,
    },

    {
      id: "TransactionType",
      name: "TransactionType",
      Type: "text",
      disabled: true,
    },

    {
      id: "Warehouse",
      name: "Warehouse",
      Type: "text",
      disabled: true,
      css: "col-span-3",
    },

    {
      id: "CheckedBy",
      name: "Checked By",
      Type: "text",
      disabled: false,
      css: "col-span-2",
    },

    {
      id: "QAAcceptedBy",
      name: "QA Accepted By",
      Type: "text",
      disabled: false,
      css: "col-span-2",
    },

    {
      id: "COANo",
      name: "COA No.",
      Type: "number",
      disabled: false,
      css: "col-span-1",
    },
    {
      id: "POno",
      name: "Po No.",
      Type: "number",
      disabled: false,
      css: "col-span-1",
    },
    {
      id: "STONo",
      name: "STO No.",
      Type: "number",
      disabled: false,
      css: "col-span-1",
    },
    {
      id: "FullDr",
      name: "Full DR Num",
      Type: "number",
      disabled: false,
      css: "col-span-1",
    },
    {
      id: "SupplierName",
      name: "Supplier Name",
      Type: "text",
      disabled: false,
      css: "col-span-4",
    },
    {
      id: "Remarks",
      name: "Remarks",
      Type: "text",
      disabled: false,
      css: "col-span-4",
    },
  ];
  const [closeModal, setcloseModal] = useState(false);
  const [rows, setrows] = useState([]);
  const [sureToPost, setsureToPost] = useState(false);
  const [rowsPalletize, setrowsPalletize] = useState([
    {
      ITEM: "PM00000340",
      ItemName: "its my birthday!!",
      Quantity: 1000,
      UoM: "PC",
      MNF: "11-16-2023",
      EXP: "11-16-2024",
      PalletSize: 100,
      Suffix: "1YBX",
    },
  ]);

  const colsForPallet = [
    {
      name: "Option",
      colspan: 1,
      disabled: true,
    },
    {
      name: "ITEM",
      colspan: 1,
      disabled: true,
    },
    {
      name: "Quantity",
      colspan: 1,
      disabled: true,
    },
    {
      name: "UoM",
      colspan: 1,
      disabled: true,
    },
    {
      name: "MNF",
      colspan: 1,
      disabled: true,
    },
    {
      name: "EXP",
      colspan: 1,
      disabled: true,
    },
    {
      name: "Suffix",
      colspan: 1,
      disabled: true,
    },
    // {
    //   name: "PalletSize",
    //   colspan: 1,
    //   disabled: true,
    // },
    {
      name: "isTotal",
      colspan: 1,
      disabled: true,
    },
  ];

  const colsPalleted = [
    {
      name: "itemCode",
      colspan: 2,
      disabled: true,
    },
    {
      name: "ItemName",
      colspan: 0,
      disabled: true,
    },
    {
      name: "PalletQty",
      colspan: 1,
      disabled: false,
    },
    {
      name: "Batch",
      colspan: 1,
      disabled: true,
    },
    {
      name: "palletId",
      colspan: 1,
      disabled: true,
    },
  ];

  const [ItemSelectioContainer, setItemSelectioContainer] = useState({});
  const [ComponentValue, setComponentValue] = useState({
    DocNum: 10000,
    CreatedDate: DateNow,
    Branch: "IPIC-VAL",
    TransactionType: "FREE-GOODS",
    Warehouse: "22120001 - INBOUND LOGISTICS",
    WarehouseCode: "22120001",
    AccountCode: "113110600",
    CostingCode: "10",
    CostingCode2: "DMP",
    CostingCode3: "DMP11",
  });
  const [colsSQL, setcolsSQL] = useState([
    {
      name: "DocEntry",
    },
    {
      name: "ItemCode",
    },
    {
      name: "Quantity",
    },
    {
      name: "UoM",
    },
    {
      name: "MNF",
    },
    {
      name: "EXP",
    },
    {
      name: "Suffix",
    },
    {
      name: "Palletize",
    },
  ]);
  const [rowsPLN1, setrowsPLN1] = useState([]);
  const [returns, setreturns] = useState([]);

  const onClickPalletize = async (e) => {
    console.log("0");

    if (rows.length <= 0) {
      setreturns([]);
      return;
    }
    console.log("1");
    const x = rows.map((item) => {
      return {
        DocEntry: "@@IDENTITY",
        ItemCode: item.ITEM,
        Quantity: item.Quantity,
        UoM: item.UoM,
        MNF: item.MNF,
        EXP: item.EXP,
        Suffix: item.Suffix,
        Palletize: item.PalletSize,
      };
    });
    console.log("2");

    let beforeSQL = ` insert into OPLT
              (CreatedBy,CreatedDate,Warehouse,CheckedBy,COANo,STONo,SupplierName,Remarks,Void)
               VALUES
              ('${userInfo.ID}',@NOW ,'${ComponentValue.Warehouse}','${ComponentValue.CheckedBy}','${ComponentValue.COANo}',
                                      '${ComponentValue.STONo}','${ComponentValue.SupplierName}','${ComponentValue.Remarks}','1')
              DECLARE @HEAID as int = @@IDENTITY `;

    let afterSQL = ` exec DMF_PEPLESS @SQLID = 883 , @VAL = @HEAID `;
    await EXEC_SQL_InsertMulti_V2(
      884,
      setreturns,
      colsSQL,
      x,
      "PLT1",
      beforeSQL,
      afterSQL
    );
    console.log("4");
  };
  const [HasREmove, setHasREmove] = useState(false);
  const handleOption = (e) => {
    RemoveFromGrid(rows, setrows, e.target.id);
    setHasREmove(true);
  };

  const [invalids, setInvalids] = useState([]);
  const invalidsChecker = (obj, lbl, isAllow) => {
    if (isAllow === false) return false;
    if (obj == "" || obj == undefined) {
      setInvalids((e) => ({ ...e, [lbl]: "invalid" }));
      return false;
    } else {
      return true;
    }
  };

  const toPost = () => {
    let isAllow = true;
    setInvalids([]);
    comps.map((item) => {
      isAllow = invalidsChecker(ComponentValue[item.id], item.id, isAllow);
    });
    if (returns.length == 0) {
      alert("Please select an item");
      return;
    }
    if (isAllow === false) return;
    setsureToPost(true);
  };
  useEffect(() => {
    if (HasREmove === false) return;
    // onClickPalletize();
    setHasREmove(false);
  }, [HasREmove]);

  const onChangeHandler = (e) => {
    const { id, name, value } = e.target;
    setComponentValue((e) => ({ ...e, [id]: value }));
  };
  const [getUoM, setgetUoM] = useState([]);
  const onChangeHandlerAddItems = (e) => {
    const { id, name, value } = e.target;
    console.log({ id, name, value });
    setItemSelectioContainer((e) => ({ ...e, [id]: value }));
    console.log({ ItemSelectioContainer });
    if (id == "Item") EXEC_SQL(881, setgetUoM, value);
  };
  const [itemAddContainer, setitemAddContainer] = useState([]);
  const ComponentListItemAdd = [
    {
      name: "Item",
      id: "Item",
      disabled: true,
      sqlID: 882,
      css: "col-span-2",
    },
    {
      name: "Quantity",
      id: "Quantity",
      type: "number",
      disabled: false,
    },
    {
      name: "UoM",
      id: "UoM",
      disabled: true,
    },
    {
      name: "Mnf Date",
      id: "MnfDate",
      type: "date",
      disabled: false,
    },
    {
      name: "Exp Date",
      id: "ExpDate",
      type: "date",
      disabled: false,
    },
    {
      name: "Prefix",
      id: "Prefix",
      type: "text",
      disabled: false,
      css: "col-span-2",
    },
  ];
  const onChangeHandlerItemAdd = (e) => {
    const { id, name, value } = e.target;
    setitemAddContainer((e) => ({ ...e, [id]: value }));
    console.log({ ComponentValue });
  };

  const [palletSizes, setpalletSizes] = useState([]);
  const importFromExcel = async () => {
    console.log({ rows });

    const text = await navigator.clipboard.readText();
    let itemcodes = "";
    let rawRows = text.split("\n");
    console.log({ rawRows });
    rawRows.map((e, i) => {
      const y = e.split("\t");
      if (y[0] != "") {
        itemcodes = itemcodes + "''" + y[0] + "'',";
        setrows((ee) => [
          ...ee,
          {
            Quantity: parseFloat(y[2].replace(",", "")),
            ITEM: y[0],
            PalletSize: 0,
            UoM: y[3],
            Suffix: y[5],
            MNF: y[6],
            EXP: y[7],
            isTotal: "❌",
            isTotall: false,
            BATCHCODE: y[8],
            // CHECKED: y[9],
            // QA: y[10],
            // COA: y[11],
            // DRNum: y[13],
            // SUPPLIER: y[14],
            // REMARKS: y[15]
          },
        ]);
      }
    });

    itemcodes = itemcodes.substring(0, itemcodes.length - 1);
    await EXEC_SQL_InsertOne(761, setpalletSizes, itemcodes);
    //     item	qty	sufix	PD	ED
    // 300544	 200.000 	815C1	06/05/2024	06/05/2026
  };
  useEffect(() => {
    console.log({ palletSizes });

    if (palletSizes.length <= 0) return;
    if (Array.isArray(palletSizes) == false) return;
    let newROws = rows.map((e) => ({
      ...e,
      PalletSize: 100,
    }));
    console.log({ newROws });
    console.log("Test");
    setrows(newROws);
  }, [palletSizes]);
  // function getPalletSize() {}
  useEffect(() => {
    try {
      if (getUoM[0].UgpEntry == undefined) return;
      setItemSelectioContainer((e) => ({ ...e, UoM: getUoM[0].UgpEntry }));
      console.log(getUoM[0].UgpEntry);
      setgetUoM([]);
    } catch (error) {}
  }, [getUoM]);
  return (
    <div className="max-w-6xl mx-auto p-8 bg-[#F9FAFB] shadow-md rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {comps.map((item, index) => (
          <div key={index} className={`flex flex-col ${item.css}`}>
            <DefInput
              label={item.id}
              name={item.id}
              type={item.Type}
              id={item.id}
              handler={onChangeHandler}
              disabled={item.disabled}
              value={ComponentValue[item.id]}
              errorMsg={invalids[item.id]}
              className="border border-[#D1D5DB] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3B82F6]"
              placeholder={`Enter ${item.id}`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-semibold text-[#374151] uppercase">
          Actions
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={importFromExcel}
            type="2B"
            className="bg-[#2563EB] text-[#FFFFFF] rounded-lg px-5 py-2 hover:bg-[#1E40AF] transition"
          >
            Import from Excel
          </button>
          <button
            onClick={() => setcloseModal(true)}
            type="2B"
            className="bg-[#16A34A] text-[#FFFFFF] rounded-lg px-5 py-2 hover:bg-[#15803D] transition"
          >
            Add Item
          </button>
        </div>
      </div>

      <section>
        <p className="text-lg font-semibold text-[#374151] uppercase mb-4">
          For Palleting
        </p>
        <div className="overflow-auto">
          <DefTable
            columns={colsForPallet}
            rows={rows}
            handleOption={handleOption}
            btnLabel="Remove"
            className="mt-4"
          />
        </div>
      </section>

      <section>
        <p className="text-lg font-semibold text-[#374151] uppercase mt-8 mb-4">
          Palleted
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => {
                console.log({ rows });
                if (rows.length === 0) return;
                const getChecker =
                  document.getElementsByClassName("checkIsTotal");
                for (let i = 0; i < getChecker.length; i++) {
                  getChecker[i].click();
                }
              }}
              type="2B"
              className="bg-[#2563EB] text-[#FFFFFF] rounded-lg px-5 py-2 hover:bg-[#1E40AF] transition"
            >
              Check
            </button>
            <button
              onClick={onClickPalletize}
              type="2B"
              className="bg-[#2563EB] text-[#FFFFFF] rounded-lg px-5 py-2 hover:bg-[#1E40AF] transition"
            >
              Palletize
            </button>
          </div>
        </div>

        <div className="mt-6">
          <table className="w-full text-sm border-collapse border border-[#D1D5DB]">
            <thead className="bg-[#E5E7EB] text-[#374151]">
              <tr>
                {[
                  "Item",
                  "UOM",
                  "MNF",
                  "EXP",
                  "Pallet Qty",
                  "Drum No",
                  "Net Wgt",
                  "Batch",
                  "Pallet ID",
                ].map((header) => (
                  <th key={header} className="py-3 px-4 border text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <PalletingGRPalleted
                  key={index}
                  item={item}
                  index={index}
                  setrows={setrows}
                  rows={rows}
                  returns={returns}
                  setreturns={setreturns}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {closeModal && (
        <PalletingGRAddItems
          setrows={setrows}
          rows={rows}
          setcloseModal={setcloseModal}
        />
      )}

      {sureToPost ? (
        <PalletingGRconfirmPost
          returns={returns}
          rows={rows}
          ComponentValue={ComponentValue}
          setSelectedMenu={p.setSelectedMenu}
          setsureToPost={setsureToPost}
        />
      ) : (
        <div className="flex justify-end mt-8">
          <button
            type="11"
            className="bg-[#16A34A] text-[#FFFFFF] rounded-lg px-6 py-3 hover:bg-[#15803D] transition"
            onClick={toPost}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
