const RFPViewModalMJ = (p) => {
  return (
    <div>
      {p.showViewModal && p.viewModalData && (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
          <div className="bg-[#FFFFFF] p-6 border border-[#E5E7EB] rounded-xl w-full max-w-[960px] shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3 mb-6">
              <h2 className="text-2xl font-semibold text-[#1F2937]">
                {p.pendingRFPList[0]?.Decision === "Pending"
                  ? "Request for Payment"
                  : "AP Invoice"}
              </h2>
              <button
                onClick={() => {
                  p.setShowViewModal(false);
                  p.setViewModalData(null);
                }}
                className="text-sm px-4 py-1.5 bg-[#F3F4F6] text-[#111827] border border-[#D1D5DB] rounded-md hover:bg-[#E5E7EB] transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Document Header Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-[#6B7280] mb-3">
                DOCUMENT HEADER
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-[#111827]">
                {[
                  ["Draft Key", p.viewModalData.DraftEntry || "---"],
                  ["Vendor Reference No.", p.viewModalData.RFPCode],
                  ["Vendor", p.viewModalData.CardName || "---"],
                  ["Posting Date", p.viewModalData.DocDate?.slice(0, 10)],
                  ["Supplier Name", p.viewModalData.U_SupplierName],
                  ["Branch", p.viewModalData.BPLName],
                  ["Approved By", p.viewModalData.ApproverName || "---"],
                  ["Approval Status", p.viewModalData.Decision],
                ].map(([label, value], i) => (
                  <div key={i}>
                    <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                      {label}
                    </label>
                    <div className="bg-[#F9FAFB] px-3 py-2 border border-[#D1D5DB] rounded-md">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Line Items Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-[#6B7280] mb-3">
                LINE ITEMS
              </h3>
              <div className="overflow-x-auto border border-[#D1D5DB] rounded-md bg-white">
                <table className="min-w-full text-sm text-[#111827]">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr>
                      {[
                        "Description",
                        "Account Code",
                        "Cost Center",
                        "Section",
                        "Amount",
                      ].map((h, i) => (
                        <th
                          key={i}
                          className="px-4 py-2 text-left font-medium border-r border-[#E5E7EB]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(JSON.parse(p.viewModalData.ItemDetails)) &&
                      JSON.parse(p.viewModalData.ItemDetails).map((item, i) => (
                        <tr key={i} className="border-b border-[#F3F4F6]">
                          <td className="px-4 py-2">{item.Dscription}</td>
                          <td className="px-4 py-2">{item.AcctCode}</td>
                          <td className="px-4 py-2">{item.OcrCode2}</td>
                          <td className="px-4 py-2">{item.OcrCode3}</td>
                          <td className="px-4 py-2 text-right">
                            ₱ {Number(item.Price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Section */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Comments
                </label>
                <div className="bg-[#F9FAFB] px-3 py-2 border border-[#D1D5DB] rounded-md h-20 overflow-y-auto">
                  {p.viewModalData.Comments || p.viewModalData.Remarks || "—"}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B7280] mb-1">
                  Grand Total
                </label>
                <div className="bg-[#F9FAFB] px-3 py-2 border border-[#D1D5DB] rounded-md font-semibold">
                  ₱ {Number(p.viewModalData.Price || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFPViewModalMJ;
