import { useState, useEffect, useContext, useMemo } from "react";
import { useUserStore } from "../userStore/useUserStore";
import { ToastNotificationMJ } from "../ComponentList";
import RFPApprovalMobileMJ from "./RFPApprovalMobileMJ";
import { useLocation } from "react-router-dom";
import { ITopContext } from "../../hooks/TopContext";
import { Branches } from "./ArrayMJ";
import { handleFailedStatus } from "./utils/functions";
import RFPViewModalMJ from "./RFPViewModalMJ";

const ITEMS_PER_PAGE = 20;

const RFPApprovalPanelMJ = (p) => {
  const {
    userInfo,
    setCanNavigate,
    setuserid,
    setAllowedModuleids,
    setSelectedModule,
  } = useContext(ITopContext);
  const location = useLocation();
  const {
    errorRFP,
    approvedRFP,
    approvedRFPList,
    pendingRFP,
    pendingRFPList,
    approveDraft,
    setErrorRFP,
    setMessageRFP,
    messageRFP,
    createAPasDraft,
  } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalData, setViewModalData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState("");
  const [rfpDecision, setRFPDecision] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRFPCode, setSelectedRFPCode] = useState(null);
  const [remarks, setRemarks] = useState("");
  const isAdmin = 10481;

  const Logout = () => {
    setCanNavigate(true);
    setuserid(0);
    setAllowedModuleids([]);
    setMessageRFP(null);
    setSelectedModule(44);
    setErrorRFP(null);
    window.location.reload();
    console.log("Logout clicked, navigating to home page");
  };

  useEffect(() => {
    if (errorRFP !== null) {
      const timer = setTimeout(() => setErrorRFP(null), 8000);
      return () => clearTimeout(timer);
    } else if (messageRFP !== null) {
      const timer = setTimeout(() => setMessageRFP(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorRFP, messageRFP]);

  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get("rfpNum");
  }, [location.search]);

  useEffect(() => {
    approvedRFP();
  }, [messageRFP, rfpDecision]);

  useEffect(() => {
    if (params) {
      pendingRFP(params);
    }
  }, [messageRFP, rfpDecision, params]);

  const handleAction = async (WddCode, action) => {
    setLoading((prev) => ({ ...prev, [WddCode]: true }));
    const payLoad = {
      DraftType: "112",
      ObjectType: "18",
      ApprovalRequestDecisions: [{ Status: action }],
    };
    try {
      await approveDraft(WddCode, payLoad, p.username, p.password);
    } catch (err) {
      console.error("Failed to patch AP Draft:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [WddCode]: false }));
    }
  };

  const decisionRFP = async (
    decision,
    rfp,
    remarks,
    siNo,
    approverEmail,
    branch,
    paymentFor,
    payee,
    itemDetails
  ) => {
    const approverAccount = userInfo.firstname + " " + userInfo.lastname;
    setLoading((prev) => ({ ...prev, [rfp]: true }));
    try {
      const response = await fetch("decisionRFP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ decision, rfp, approverAccount, remarks }),
      });

      const data = await response.json();
      console.log("Decision", decision);

      if (decision === "Approved") {
        const draftCreated = await createAPasDraft(
          rfp,
          siNo,
          approverEmail,
          branch,
          paymentFor,
          handleFailedStatus,
          Branches,
          payee,
          itemDetails
        );

        console.log("Draft Created:", draftCreated.error.code);

        if (draftCreated.error.code === -2028) {
          const notifRes = await fetch("rfpApprovedNotif", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              decision,
              rfp,
              approverAccount,
              approverEmail,
              remarks,
            }),
          });

          const notifData = await notifRes.json();
          console.log("Reply Email:", notifData);
        } else {
          setErrorRFP(draftCreated.error.message);
          return;
        }
      }

      setRFPDecision(data);
      console.log("DECISION RFP:", data);
    } catch (err) {
      console.error("Error in decisionRFP:", err);
      setMessageRFP("Something went wrong. Please try again.");
    } finally {
      setMessageRFP("The decision has been successfully sent.");
      setLoading((prev) => ({ ...prev, [rfp]: false }));
    }
  };

  const filteredApprovedRfpList = approvedRFPList.filter((rfp) => {
    const matchesSearch =
      !searchTerm ||
      String(rfp.RFPCode).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      !filterDate || rfp.DocDate?.substring(0, 10) === filterDate;

    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredApprovedRfpList.length / ITEMS_PER_PAGE);
  const paginatedList = filteredApprovedRfpList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowViewModal(false);
        setViewModalData(null);
      }
    };

    if (showViewModal) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showViewModal]);

  return (
    <div className="p-6 max-w-[1440px] mx-auto font-sans text-[#1F2937] space-y-8">
      {errorRFP && <ToastNotificationMJ error={errorRFP} />}
      {messageRFP && <ToastNotificationMJ message={messageRFP} />}

      {/* — Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">RFP Management</h1>
          <p className="text-base text-[#6B7280] mt-1">
            Manage RFP entries efficiently.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-2 text-[#1F2937] font-medium">
            <svg width="24" height="24" fill="#60B32A" viewBox="0 0 24 24">
              <path d="M12 2C6.579 2 2 6.579..." />
            </svg>
            {userInfo.firstname} {userInfo.lastname}
          </p>
          <button
            onClick={Logout}
            className="text-[#FFFFFF] bg-[#F13C3C] hover:bg-[#C03231] px-4 py-2 rounded-md text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* — Pending RFPs */}
      {pendingRFPList.length > 0 && userInfo.ID !== isAdmin ? (
        <section className="bg-[#FFFFFF] border border-[#E5E7EB] shadow rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">Pending RFPs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-[#374151]">
              <thead className="bg-[#F9FAFB] text-[#6B7280] font-medium">
                <tr className="divide-x divide-[#E5E7EB]">
                  {[
                    "",
                    "Date",
                    "RFP #",
                    "Payee",
                    "Total",
                    "Remarks",
                    "Branch",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {pendingRFPList.map((rfp) => (
                  <tr
                    key={rfp.RFPCode}
                    className="hover:bg-[#F3F4F8] transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      <button
                        onClick={() => {
                          setViewModalData(rfp);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      {rfp.DocDate?.slice(0, 10) || "-"}
                    </td>
                    <td className="px-4 py-3 font-medium">{rfp.RFPCode}</td>
                    <td className="px-4 py-3">{rfp.U_SupplierName}</td>
                    <td className="px-4 py-3">
                      ₱ {Number(rfp.Price || 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{rfp.Remarks}</td>
                    <td className="px-4 py-3">{rfp.BPLName}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#FEF3C7] text-[#92400E]">
                        {rfp.Decision}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {
                        <>
                          <button
                            onClick={() =>
                              decisionRFP(
                                "Approved",
                                rfp.RFPCode,
                                "Approved",
                                rfp.SINo,
                                rfp.ApproverEmail,
                                rfp.BPLName,
                                rfp.Remarks,
                                rfp.U_SupplierName,
                                rfp.ItemDetails
                              )
                            }
                            className="px-3 py-1 text-xs text-white bg-[#16A34A] hover:bg-[#15803D] rounded transition"
                          >
                            {loading[rfp.RFPCode]
                              ? "Please wait..."
                              : "Approve"}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRFPCode(rfp.RFPCode);
                              setShowRejectModal(true);
                            }}
                            className="px-3 py-1 text-xs text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded transition"
                          >
                            Reject
                          </button>
                        </>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        params && <div>All RFP Processed!</div>
      )}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
          <div className="bg-[#FFFFFF] rounded-lg shadow p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-[#111827]">Reject RFP</h2>
            <p className="text-sm text-[#4B5563]">
              Please provide a reason for rejecting{" "}
              <strong>{selectedRFPCode}</strong>.
            </p>
            <textarea
              className="w-full border border-[#D1D5DB] rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#DC2626]"
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Type your remarks here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRemarks("");
                }}
                className="px-4 py-2 text-sm rounded bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#374151]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  decisionRFP("Rejected", selectedRFPCode, remarks);
                  setShowRejectModal(false);
                  setRemarks("");
                }}
                disabled={!remarks.trim()}
                className={`px-4 py-2 text-sm rounded text-white transition ${
                  remarks.trim()
                    ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                    : "bg-[#FCA5A5] cursor-not-allowed"
                }`}
              >
                {loading[selectedRFPCode] ? "Please wait..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* — Approved RFPs Filter & Table */}
      {userInfo.ID === isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#374151]">
              RFP#
            </label>
            <input
              type="text"
              placeholder="e.g. DRAFT-001"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151]">
              Posting Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>
          {totalPages > 1 && (
            <div className="flex items-end gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span className="text-sm text-[#4B5563]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          )}
        </div>
      )}

      {filteredApprovedRfpList.length > 0 && userInfo.ID === isAdmin && (
        <section className="bg-[#FFFFFF] border border-[#E5E7EB] shadow rounded-lg p-6 space-y-6 hidden md:block">
          <h2 className="text-xl font-semibold text-[#111827]">
            Approved / All RFPs
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-[#374151]">
              <thead className="bg-[#F9FAFB] text-[#6B7280] font-medium">
                <tr className="divide-x divide-[#E5E7EB]">
                  {[
                    "",
                    "Draft Key",
                    "Vendor",
                    "RFP #",
                    "Total",
                    "Payee",
                    "Date",
                    "Approved By",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {paginatedList.length > 0 ? (
                  paginatedList.map((rfp) => (
                    <tr
                      key={rfp.WddCode}
                      className="hover:bg-[#F3F4F8] transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        <button
                          onClick={() => {
                            setViewModalData(rfp);
                            setShowViewModal(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {rfp.DraftEntry}
                      </td>
                      <td className="px-4 py-3">{rfp.CardName}</td>
                      <td className="px-4 py-3">{rfp.RFPCode}</td>
                      <td className="px-4 py-3">
                        ₱ {Number(rfp.Price || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{rfp.U_SupplierName}</td>
                      <td className="px-4 py-3">
                        {rfp.DocDate?.slice(0, 10) || "-"}
                      </td>
                      <td className="px-4 py-3">{rfp.ApproverName || "-"}</td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-1 text-xs font-semibold rounded-full"
                          style={{
                            backgroundColor:
                              rfp.Status === "Y"
                                ? "#D1FAE5"
                                : rfp.Status === "N"
                                ? "#FECACA"
                                : "#FEF9C3",
                            color:
                              rfp.Status === "Y"
                                ? "#047857"
                                : rfp.Status === "N"
                                ? "#B91C1C"
                                : "#92400E",
                          }}
                        >
                          {rfp.Status === "W" && "Pending"}
                          {rfp.Status === "Y" && "Approved"}
                          {rfp.Status === "N" && "Rejected"}
                        </span>
                      </td>
                      <td className="px-4 py-3 space-x-2 text-center">
                        {rfp.Status === "W" ? (
                          <>
                            <button
                              onClick={() =>
                                handleAction(rfp.WddCode, "ardApproved")
                              }
                              disabled={loading[rfp.WddCode]}
                              className="px-3 py-1 text-xs text-white bg-[#16A34A] hover:bg-[#15803D] rounded"
                            >
                              {loading[rfp.WddCode]
                                ? "Please wait..."
                                : "Approve"}
                            </button>
                            <button
                              onClick={() =>
                                handleAction(rfp.WddCode, "ardNotApproved")
                              }
                              disabled={loading[rfp.WddCode]}
                              className="px-3 py-1 text-xs text-white bg-[#DC2626] hover:bg-[#B91C1C] rounded"
                            >
                              {loading[rfp.WddCode]
                                ? "Please wait..."
                                : "Reject"}
                            </button>
                          </>
                        ) : (
                          <span className="italic text-[#9CA3AF] text-xs">
                            No Actions
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-[#6B7280] italic"
                    >
                      All items have been processed.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <RFPViewModalMJ
        viewModalData={viewModalData}
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        setViewModalData={setViewModalData}
        pendingRFPList={pendingRFPList}
      />

      <div className="sm:hidden">
        <RFPApprovalMobileMJ
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          approvedRFP={approvedRFP}
          errorRFP={errorRFP}
          setErrorRFP={setErrorRFP}
          messageRFP={messageRFP}
          setMessageRFP={setMessageRFP}
          handleAction={handleAction}
          paginatedList={paginatedList}
          loading={loading}
          params={params}
        />
      </div>
    </div>
  );
};

export default RFPApprovalPanelMJ;
