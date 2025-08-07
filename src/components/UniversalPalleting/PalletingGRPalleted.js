import React, { useEffect, useState } from "react";
import { DefButton } from "../ComponentList";
import { formatDate } from "date-fns";

export default function PalletingGRPalleted(p) {
  // .toLowerCase()
  //                       .includes(filters.toLowerCase()) && (

  const [trigger, settrigger] = useState(true);
  const [total, settotal] = useState(0);
  const [isEqual, setisEqual] = useState(true);

  const palletQtyHandler = (e) => {
    const { id, value, name, alt } = e.target;

    // console.log({ value, name, id, alt });
    // console.log(formatDate(p.item.MNF, "yyyy-MM-dd"));
    // console.log(formatDate(p.returns[alt].MnfDete, "yyyy-MM-dd"));
    // console.log(p.returns[alt]);
    const xnewMap = p.returns.map((item) => {
      if (
        id == item.ROWNUM &&
        name == "PALLETQTY" &&
        formatDate(p.item.MNF, "yyyy-MM-dd") ==
          formatDate(item.MnfDete, "yyyy-MM-dd")
      )
        return { ...item, PalletQty: value };
      if (
        id == item.ROWNUM &&
        name == "DRUMNO" &&
        formatDate(p.item.MNF, "yyyy-MM-dd") ==
          formatDate(item.MnfDete, "yyyy-MM-dd")
      )
        return { ...item, DRUMNO: value };

      if (
        id == item.ROWNUM &&
        name == "NETWGT" &&
        formatDate(p.item.MNF, "yyyy-MM-dd") ==
          formatDate(item.MnfDete, "yyyy-MM-dd")
      )
        return { ...item, NETWGT: value };
      return item;
    });
    // console.log({ xnewMap });
    p.setreturns(xnewMap);
    isTotalFn();
  };

  const AddBatch = (e) => {
    console.log(p.returns[0]);
    console.log(p.item);
    // return;
    let batchx = p.returns[0].Batch.split("-");
    p.setreturns((e) => [
      ...e,
      {
        ...p.returns[0],
        Batch:
          batchx[0] +
          "-" +
          batchx[1] +
          "-" +
          (p.returns.filter((item) => item.itemCode == p.item.ITEM).length + 1),
        palletId:
          p.returns.filter((item) => item.itemCode == p.item.ITEM).length + 1,
        DRUMNO: "",
        NETWGT: "",
        PalletQty: 0,
        ROWNUM: p.returns.length + 1,
        itemCode: p.item.ITEM,
        // : p.item.MNF,
      },
    ]);
  };

  const handlePasteOnBtn = async (e) => {
    const text = await navigator.clipboard.readText();
    let rawRows = text.split("\n");
    console.log(rawRows);
    const newRow = p.returns.map((row, index) => {
      if (p.item.ITEM === row.itemCode && rawRows[index] != "") {
        let rawCols = rawRows[index].split("\t");
        // console.log(rawRows[index]);

        return {
          ...row,

          PalletQty: parseFloat(rawCols[0] || 0),
          DRUMNO: rawCols[1] || "",
          NETWGT: rawCols[2] || "",
        };
      } else {
        return { ...row };
      }
    });

    p.setreturns(newRow);
    // setrunOnce(true);
  };

  useEffect(() => {
    let total = 0;
    console.log("a");
    p.returns.forEach((item) => {
      if (
        p.item.ITEM === item.itemCode &&
        formatDate(p.item.MNF, "yyyy-MM-dd") ==
          formatDate(item.MnfDete, "yyyy-MM-dd")
      )
        total += parseFloat(item.PalletQty);
    });

    settotal(total);

    try {
      console.log(p.item.Quantity);
      console.log(total);
      console.log(item.PalletQty);
    } catch (error) {}
    setisEqual(total === parseFloat(p.item.Quantity));
  }, [p.returns]);

  const isTotalFn = () => {
    console.log("2");
    const newx = p.rows.map((item, index) => {
      if (index === p.index) {
        return {
          ...item,
          isTotal: isEqual ? "✔️" : "❌",
          isTotall: isEqual,
        };
      }
      return { ...item };
    });

    p.setrows(newx);
  };
  return (
    <>
      <tr className="sticky">
        <td className="sticky w-5">
          <button
            className={`font-mono scale-110 transition-all ${
              trigger ? "rotate-90" : ""
            }`}
            onClick={() => settrigger(!trigger)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#3B3B3B",
            }} // Hex color for button
          >
            ►
          </button>
        </td>
        <td className="">
          {p.item.ITEM}
          <div className="text-sm -mt-2" style={{ color: "#7A7A7A" }}>
            {p.item.ITEM}
          </div>{" "}
          {/* Subtext color */}
        </td>
        <td className="">{p.item.UoM}</td>
        <td className="">{p.item.MNF}</td>
        <td className="">{p.item.EXP}</td>
        <td className="">{p.item.Quantity}</td>
      </tr>

      {trigger && (
        <>
          {p.returns.map(
            (item, index) =>
              p.item.ITEM === item.itemCode &&
              formatDate(p.item.MNF, "yyyy-MM-dd") ===
                formatDate(item.MnfDete, "yyyy-MM-dd") && (
                <tr className="bg-[#F5F5F5] border-y" key={index}>
                  {/* Changed background color */}
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className=""></td>
                  <td className="">
                    <input
                      className="border border-[#CED4DA] bg-white max-w-[80px] p-1 rounded-md" // Added border and padding
                      type="number"
                      alt={index}
                      onChange={palletQtyHandler}
                      name="PALLETQTY"
                      id={item.ROWNUM}
                      value={item.PalletQty}
                    />
                  </td>
                  <td className="">
                    <input
                      className="border border-[#CED4DA] bg-white max-w-[80px] p-1 rounded-md" // Added border and padding
                      type="text"
                      alt={index}
                      onChange={palletQtyHandler}
                      name="DRUMNO"
                      id={item.ROWNUM}
                      value={item.DRUMNO}
                    />
                  </td>
                  <td className="">
                    <input
                      className="border border-[#CED4DA] bg-white max-w-[80px] p-1 rounded-md" // Added border and padding
                      type="text"
                      alt={index}
                      onChange={palletQtyHandler}
                      name="NETWGT"
                      id={item.ROWNUM}
                      value={item.NETWGT}
                    />
                  </td>
                  <td className="">{item.Batch}</td>
                  <td className="px-2">{item.palletId}</td>
                </tr>
              )
          )}
          <tr className="bg-[#F5F5F5] border-y">
            {" "}
            {/* Consistent background color */}
            <td className="Add">
              <button
                onClick={AddBatch}
                className="bg-[#6C757D] border rounded-md px-2 my-0.5 active:scale-[0.9] text-white transition duration-200" // Hex color
              >
                Add
              </button>
            </td>
            <td className="">
              {/* Optional Remove button can be added here if needed */}
            </td>
            <td className="">
              <button
                onClick={handlePasteOnBtn}
                className="bg-[#6C757D] border rounded-md px-2 my-0.5 active:scale-[0.9] text-white transition duration-200" // Hex color
              >
                Paste
              </button>
            </td>
            <td className=""></td>
            <td className="">Total</td>
            <td
              className={`p-1 ${
                !isEqual ? "bg-[#FF4D4D]" : "bg-transparent"
              } rounded-md`}
            >
              {" "}
              {/* Updated colors */}
              {total}
            </td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </>
      )}

      <button
        onClick={isTotalFn}
        className="checkIsTotal btn btn-primary btn-sm"
        style={{ backgroundColor: "#007bff", color: "#ffffff" }}
      >
        Check
      </button>
    </>
  );
}
