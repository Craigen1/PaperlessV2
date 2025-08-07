import { QrcodeIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { BurgerBtn } from "../assets/SVGs";
import { ITopContext } from "../hooks/TopContext";

export default function POlist(props) {
  const [client, setclient] = useState("");

  const { setPopPOListModal, setSelectedPOnumInfo, setPopLoad } =
    useContext(ITopContext);
  const [poList, setPoList] = useState([
    {
      ROW: 0,
      DocNum: "",
      ItemCode: "",
      ItemName: "",
      Comments: "",
    },
  ]);

  const getProdLst = async () => {
    try {
      setPopLoad(true);
      const getProd = await fetch("PO_LIST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accpet: "application/json",
        },
        body: JSON.stringify({
          SQLID: "4",
          CLIENT: client,
        }),
      }).then((res) => res.json());

      setPopLoad(false);
      console.log(getProd);
      //   setPoList(getProd.recordset);
      setPoList(getProd);
    } catch (error) {
      setPopLoad(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!(client === "")) {
      getProdLst();
    }
    return;
  }, [client]);
  return (
    <div>
      <div className=" mb-2">
        <h1 class="text-3xl font-bold text-gray-900">Parameters</h1>
        {/* <label
          for="DocNum"
          className="  block text-sm font-medium text-gray-700"
        >
          Item
        </label>

        <div className=" w-full  grow flex flex-row    appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-gray-500 sm:text-sm">
          <input
            id="DocNum"
            //   value={DocNum}
            name="DocNum"
            autocomplete="DocNum"
            disabled="disabled"
            // onChange={[]}
            text="number"
            className="w-full bg-transparent"
          ></input>

          <button
            type="button"
            onClick={() => {
              alert(client);
            }}
          >
            <span>
              <QrcodeIcon className="flex-shrink-0 h-6 w-6 text-gray-600" />
            </span>
          </button>
        </div> */}
      </div>
      <div className="grow flex flex-row  ">
        <div className="w-1/2 pr-1">
          <label
            for="DocNum"
            className="  block text-sm font-medium text-gray-700"
          >
            Client
          </label>

          <div className=" w-full  grow flex flex-row    appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-gray-500 sm:text-sm">
            <select
              id="Status"
              name="Status"
              className="w-full bg-transparent"
              onChange={() => {
                setclient(document.getElementById("Status").value);
              }}
            >
              <option selected></option>
              <option value="OSH">OSH</option>
              <option value="DMPI">DMPI</option>
              <option value="KKM">KKM</option>
              <option value="NAI">NAI</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 pl-1">
          <label
            for="Status"
            className="  block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <div>
            <div className=" w-full  grow flex flex-row    appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-gray-500 sm:text-sm">
              <input
                id="DocNum"
                value={"Open"}
                name="DocNum"
                autocomplete="DocNum"
                disabled="disabled"
                // onChange={[]}
                text="number"
                className="w-full bg-transparent"
              ></input>
            </div>
          </div>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-gray-900  mt-10">
        Released Production List
      </h1>

      <div className="overflow-x-auto mb-14  ">
        <table className="mb-3 whitespace-nowrap ">
          <tr>
            <th className="font-semibold  px-2 py-1 text-left border-2"></th>
            <th className="font-semibold px-2 py-1 text-left border-2">
              PO No.
            </th>
            <th className="font-semibold px-2 py-1 text-left border-2">Item</th>
            <th className="font-semibold px-2 py-1 text-left border-2">
              Remarks
            </th>
          </tr>
          {poList.map((po, index) => (
            <tr className="">
              <td className="px-2 py-1 border-2 ">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPOnumInfo({
                      DocNum: po.DocNum,
                      ItemCode: po.ItemCode,
                      ItemName: po.ItemName,
                    });
                    setPopPOListModal(false);
                  }}
                  className="w-full"
                >
                  <div className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
                    Select
                  </div>
                </button>
              </td>

              <td className="px-1 py-1 border-2 ">{po.DocNum}</td>
              <td className=" border-2 ">
                <p className="border-b-2 px-1">{po.ItemCode}</p>
                <p className="text-xs text-gray-400 px-1 mb-1 -mt-3">
                  {po.ItemName}
                </p>
              </td>

              <td className="px-1 py-1 border-2 text-xs ">{po.Comments}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
