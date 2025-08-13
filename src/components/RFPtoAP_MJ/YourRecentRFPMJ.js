import React, { useContext, useEffect, useState } from "react";
import { ITopContext } from "../../hooks/TopContext";
import { useUserStore } from "../userStore/useUserStore";

export const YourRecentRFPMJ = () => {
  const { userInfo } = useContext(ITopContext);
  const [rfpNumList, setRfpNumList] = useState([]);
  const [syncRFP, setSyncRFP] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [receivedMap, setReceivedMap] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRFP, setSelectedRFP] = useState(null);
  const userID = userInfo.ID;
  const { fetchAPDraft, apDraftKey, outgoingPayment } = useUserStore();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const recentRFP = async () => {
    setErrorMsg("");
    if (!fromDate || !toDate) {
      setErrorMsg("Both dates are required.");
      return;
    }

    setSyncRFP(true);
    try {
      const res = await fetch("rfpsMJ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, fromDate, toDate }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      console.log("RFP Response:", data);
      const rfpCodes =
        Array.isArray(data) && data.length > 0
          ? data.map((r) => r.RFPCode)
          : [];
      fetchAPDraft({ RFPCode: rfpCodes });
      setRfpNumList(data);
    } catch {
      setErrorMsg("Failed to fetch RFPs");
    } finally {
      setSyncRFP(false);
      setReceivedMap(false);
    }
  };

  const handleReceived = async (code) => {
    try {
      const res = await fetch("receivedMoney", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ RFPCode: code }),
      });
      const { IsReceived } = await res.json();
      setReceivedMap(IsReceived);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmReceive = (code) => {
    setSelectedRFP(code);
    setModalOpen(true);
  };

  const confirmModalAction = async () => {
    if (selectedRFP) {
      await handleReceived(selectedRFP);
      setModalOpen(false);
      setSelectedRFP(null);
    }
  };

  useEffect(() => {
    recentRFP();
  }, [receivedMap]);

  const getBadge = (text, color) => (
    <span
      className="inline-block text-xs font-semibold px-2 py-1 rounded-full border"
      style={{
        backgroundColor: `${color}1A`,
        color,
        borderColor: color,
      }}
    >
      {text}
    </span>
  );

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] p-6">
      {/* Header */}
      <div className="max-w-8xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-[#111827] mb-6">
          📑 Your Recent RFPs
        </h2>

        {/* Filters */}
        <div className="bg-[#FFFFFF] p-6 rounded-lg shadow flex flex-wrap gap-6 items-end border border-[#E5E7EB]">
          {["fromDate", "toDate"].map((key, i) => {
            const value = key === "fromDate" ? fromDate : toDate;
            const isError = errorMsg && !value;

            return (
              <div key={key} className="flex flex-col w-full sm:w-56">
                <label className="text-sm font-medium text-[#374151] mb-1">
                  {i === 0 ? "From Date" : "To Date"}
                </label>
                <input
                  type="date"
                  value={value}
                  onChange={(e) =>
                    key === "fromDate"
                      ? setFromDate(e.target.value)
                      : setToDate(e.target.value)
                  }
                  className={`px-3 py-2 rounded-md border text-sm text-[#374151] focus:ring-2 focus:outline-none ${
                    isError
                      ? "border-[#DC2626] focus:ring-[#DC2626]"
                      : "border-[#D1D5DB] focus:ring-[#2563EB]"
                  }`}
                />
              </div>
            );
          })}

          <button
            onClick={recentRFP}
            disabled={syncRFP}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2 rounded-md text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {syncRFP ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
                Searching...
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="mt-3 text-sm font-medium text-[#B91C1C]">
            ⚠ {errorMsg}
          </div>
        )}
      </div>

      {/* RFP Results */}
      {rfpNumList.length ? (
        <div className="max-w-8xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {rfpNumList.map((r) => {
            const draft = apDraftKey.find((d) => d.NumAtCard === r.RFPCode);
            const op = outgoingPayment.find((op) => op.NumAtCard === r.RFPCode);

            return (
              <div
                key={r.RFPCode}
                className="bg-[#FFFFFF] rounded-xl shadow-md p-5 border border-[#E5E7EB] hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1E40AF]">
                      {r.RFPCode}
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      {new Date(r.DateCreated).toLocaleDateString()}
                    </p>
                  </div>

                  {r.IsReceived
                    ? getBadge("✔ Received", "#15803D")
                    : draft?.Status === "Approved" && (
                        <button
                          onClick={() => confirmReceive(r.RFPCode)}
                          className="bg-[#15803D] hover:bg-[#166534] text-white text-xs px-3 py-1 rounded-md font-semibold transition-colors"
                        >
                          Mark as Received
                        </button>
                      )}

                  {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/10">
                      <div className="bg-white rounded-lg p-6 w-full max-w-sm border border-[#E5E7EB]">
                        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
                          Confirm Action
                        </h2>
                        <p className="text-sm text-[#4B5563] mb-6">
                          Are you sure you want to mark{" "}
                          <strong>{selectedRFP}</strong> as received?
                        </p>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setModalOpen(false);
                              setSelectedRFP(null);
                            }}
                            className="px-4 py-2 text-sm text-[#374151] border border-[#D1D5DB] rounded-md hover:bg-[#F3F4F6] transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmModalAction}
                            className="px-4 py-2 text-sm text-white bg-[#15803D] hover:bg-[#166534] rounded-md font-semibold transition"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="space-y-1 text-sm text-[#374151]">
                  <p>
                    <strong>Payee:</strong> {r.Payee}
                  </p>
                  <p>
                    <strong>Approved By:</strong> {r.ApproverName ?? "---"}
                  </p>
                  <p>
                    <strong>Cash Released:</strong>{" "}
                    {op?.U_APP_CDateRel?.slice(0, 10) ?? "Not Released"}
                  </p>
                  <p>
                    <strong>Total:</strong>{" "}
                    <span className="font-semibold text-[#1E40AF]">
                      {r.Total} PHP
                    </span>
                  </p>
                </div>

                {/* Status Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {getBadge(
                    r.Decision,
                    r.Decision === "Approved"
                      ? "#15803D"
                      : r.Decision === "Rejected"
                      ? "#B91C1C"
                      : "#B45309"
                  )}
                  {r.Decision !== "Rejected" &&
                    getBadge(
                      draft?.Status ?? "Invoice Pending",
                      draft?.Status === "Approved"
                        ? "#15803D"
                        : draft?.Status === "Rejected"
                        ? "#B91C1C"
                        : "#B45309"
                    )}
                </div>

                {r.RejectionRemarks && r.RejectionRemarks !== "NULL" && (
                  <div className="mt-4 p-3 rounded-md border border-[#FECACA] bg-[#FEF2F2]">
                    <p className="text-sm font-semibold text-[#B91C1C] mb-1">
                      🚫 Rejection Remarks
                    </p>
                    <p className="text-sm text-[#7F1D1D] italic whitespace-pre-line">
                      {r.RejectionRemarks}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-8xl mx-auto mt-12 text-center text-[#9CA3AF] text-sm">
          No recent RFPs available.
        </div>
      )}
    </div>
  );
};
