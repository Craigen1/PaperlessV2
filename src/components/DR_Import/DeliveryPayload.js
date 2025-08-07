import React, { useState } from "react";
import { LoadingSpinner } from "../../assets/SVGs";
import { useUserStore } from "../userStore/useUserStore";
import * as XLSX from "xlsx";

const DeliveryPayload = () => {
  const [delivery, setDelivery] = useState([]);
  const [stoRef, setStoRef] = useState("");
  const { error, setError } = useUserStore();
  const [loading, setLoading] = useState(false);

  const getDelivery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDelivery([]);
    setError(null);
    try {
      const response = await fetch(`prevdelivery/${stoRef}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setDelivery(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto rounded-lg shadow-md">
      <form onSubmit={getDelivery} className="flex items-center gap-2 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold">STO REF</label>
          <input
            type="text"
            className="input input-bordered w-full rounded-md"
            value={stoRef}
            onChange={(e) => setStoRef(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary h-10 w-28 ml-4 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Search"}
        </button>
      </form>

      {error && (
        <div className="alert alert-error mb-4 p-4 bg-red-100 border border-red-400 text-red-600 rounded-md">
          <span>{`Error: ${error}`}</span>
        </div>
      )}

      {loading && (
        <div className="text-center text-lg text-gray-600">
          <LoadingSpinner />
          <p>Loading data...</p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delivery Information</h3>
        {!loading && delivery.length === 0 && !error ? (
          <div>No matching delivery data found.</div>
        ) : (
          !loading && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      No.
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Mat Doc
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Card Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Card Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Item Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Item Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Manufacturing Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Trucker
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Owner
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Shipment Document
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      STO No
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      UOM Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Profit Center
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Cost Center
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Section
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Driver
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Plate No
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Shipping Address
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Right Seal No
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Left Seal No
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Back Seal No
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Remarks
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Business Partner
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Reason for Cancellation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {delivery.map((item, index) => {
                    const mnfDate = item.U_MnfDate.substring(0, 10);
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.DocNum}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.CardCode}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.CardName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.ItemCode}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.Dscription}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.Quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {mnfDate}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_Trucker}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.DocStatus}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.firstName} {item.lastName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.NumAtCard}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_STONo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.UomCode}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.CogsOcrCod}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.CogsOcrCo2}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.CogsOcrCo3}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_APP_Driver}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_APP_PlateNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_ShippingAddress}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_RightSealNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_LeftSealNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_BackSealNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_Remarks}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.BPLName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.U_APP_Reason}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DeliveryPayload;
