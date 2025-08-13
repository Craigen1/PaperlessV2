const RFPApprovalMobileMJ = (p) => {
  return (
    <div className="p-4 max-w-full mx-auto font-sans text-[#1F2937]">
      <div className="flex flex-col gap-4">
        {p.paginatedList.length > 0 && !p.params ? (
          p.paginatedList.map((rfp) => (
            <div
              key={rfp.WddCode}
              className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm hover:shadow transition duration-200"
            >
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Draft Key:</span>{" "}
                  {rfp.DraftEntry}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Vendor:</span> {rfp.CardName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Posting Date:</span>{" "}
                  {rfp.DocDate?.substring(0, 10)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">RFP Number:</span> {rfp.RFPCode}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Payee:</span>{" "}
                  {rfp.U_SupplierName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Approved by:</span>{" "}
                  {rfp.ApproverName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>
                  <span
                    className="ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full"
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
                </p>
              </div>

              {rfp.Status === "W" && (
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => p.handleAction(rfp.WddCode, "ardApproved")}
                    disabled={p.loading[rfp.WddCode]}
                    className="w-full px-3 py-2 text-sm text-white rounded-md bg-[#16A34A] hover:bg-[#15803D] transition disabled:opacity-50"
                  >
                    {p.loading[rfp.WddCode] ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() =>
                      p.handleAction(rfp.WddCode, "ardNotApproved")
                    }
                    disabled={p.loading[rfp.WddCode]}
                    className="w-full px-3 py-2 text-sm text-white rounded-md bg-[#DC2626] hover:bg-[#B91C1C] transition disabled:opacity-50"
                  >
                    {p.loading[rfp.WddCode] ? "Processing..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-[#6B7280] pt-6">
            All items have been processed.
          </div>
        )}
      </div>
    </div>
  );
};

export default RFPApprovalMobileMJ;
