import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";

export const YourRecentRFPMJ = () => {
  const { userInfo } = useContext(ITopContext);
  const [rfpList, setRfpList] = useState([]);
  const [syncRFP, setSycnRFP] = useState(false);
  const userID = userInfo.ID;

  const recentRFP = async () => {
    setSycnRFP(true);
    try {
      const res = await fetch("rfpsMJ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID }),
      });

      if (!res.ok) throw new Error("Failed to fetch recent RFPs");

      const data = await res.json();
      setRfpList(data);
    } catch (err) {
      console.error("Error fetching recent RFPs:", err);
    } finally {
      setSycnRFP(false);
    }
  };

  return (
    <div className="p-4 bg-[#ffffff] rounded-xl shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: "#2c2c2c" }}>
          Recent RFPs
        </h2>
        <button
          onClick={recentRFP}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-[#f3f4f6] hover:bg-[#e5e7eb] transition"
          style={{ color: "#4a4a4a" }}
          title="Refresh"
        >
          🔄 {syncRFP ? "Synching..." : "Refresh"}
        </button>
      </div>

      {rfpList && rfpList.length > 0 ? (
        <ul className="max-h-[700px] overflow-y-auto pr-1">
          {rfpList.map((rfp) => (
            <li
              key={rfp.RFPCode}
              className="p-4 rounded-lg border border-[#e5e7eb] bg-[#ffffff] shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-2">
                {/* RFP Header */}
                <div className="flex justify-between items-center">
                  <div
                    className="text-lg font-semibold"
                    style={{ color: "#1e3a8a" }}
                  >
                    {rfp.RFPCode}
                  </div>
                  <div
                    className="text-sm font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        rfp.Status === "Success" ? "#def7ec" : "#fde8e8",
                      color: rfp.Status === "Success" ? "#38A169" : "#E53E3E",
                    }}
                  >
                    {rfp.Status}
                  </div>
                </div>

                {/* Payee & Date */}
                <div className="text-sm text-[#6b7280]">
                  <span className="font-medium">Payee:</span> {rfp.Payee} —{" "}
                  {new Date(rfp.DateCreated).toLocaleDateString()}
                </div>

                {/* Remarks & Approver */}
                {rfp.Remarks && (
                  <div className="space-y-1 text-sm text-[#374151]">
                    <div>
                      <span className="text-[#888888]">Approver:</span>{" "}
                      <span className="text-[#1e40af] font-medium">
                        {rfp.ApproverEmail}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[#555555]">For:</span>
                      <span
                        className="truncate"
                        style={{
                          maxWidth: "220px",
                          color: "#6b7280",
                        }}
                      >
                        {rfp.Remarks}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#4a4a4a] font-medium">
                        Total Amount:
                      </span>{" "}
                      <span className="text-[#1e3a8a] font-semibold">
                        {rfp.Total}
                      </span>
                    </div>
                  </div>
                )}

                {/* Decision Tag */}
                <div className="mt-2 text-sm font-semibold">
                  <span style={{ color: "#4a4a4a" }}>Decision: </span>
                  <span
                    style={{
                      color:
                        rfp.Decision === "Approved"
                          ? "#38A169"
                          : rfp.Decision === "Pending"
                          ? "#D69E2E"
                          : rfp.Decision === "Rejected"
                          ? "#E53E3E"
                          : "#718096",
                    }}
                  >
                    {rfp.Decision || "Unknown"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-[#9ca3af] mt-3">
          No recent RFPs available.
        </div>
      )}
    </div>
  );
};
