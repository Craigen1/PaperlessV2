import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  //States
  allocateQTY: 0,
  error: null,
  message: null,
  headerINFO_MJ: [],
  machineSummation_MJ: [],
  equivalentTotal_MJ: 0,
  sampleEQ_MJ: 0,
  lastMnfD_MJ: "0",
  totalUsage_MJ: 0,
  totalQtyTPUR_MJ: 0,
  totalRejectsTPUR_MJ: 0,
  totalUsageTPUR_MJ: 0,
  totalSolidsTPUR_MJ: 0,
  sbPeriod: "",
  apDraftKey: [],
  outgoingPayment: [],
  approvedRFPList: [],
  pendingRFPList: [],
  errorRFP: null,
  messageRFP: null,
  sDraftKey: null,
  headerDataZustand: {
    branch: "",
    sInum: "",
    paymentFor: "",
    payee: "",
    approverEmail: "",
  },
  dscriptionZustand: Array(5)
    .fill()
    .map(() => ({
      description: "",
      glCode: "",
      glName: "",
      costCenter: "",
      section: "",
      amount: "",
    })),
  //Functions
  setAllocateQTY: (p) => set({ allocateQTY: p }),
  setHeaderDataZustand: (p) => set({ headerDataZustand: p }),
  setDscriptionZustand: (p) => set({ dscriptionZustand: p }),
  setErrorRFP: (value) => set({ errorRFP: value }),
  setError: (p) => set({ error: p }),
  setDraftKey: (p) => set({ sDraftKey: p }),
  setMessage: (p) => set({ message: p }),
  setMessageRFP: (value) => set({ messageRFP: value }),
  setHeaderINFO_MJ: (p) => set({ headerINFO_MJ: p }),
  setMachineSummation_MJ: (p) => set({ machineSummation_MJ: p }),
  setEquivalentTotal_MJ: (p) => set({ equivalentTotal_MJ: p }),
  setSampleEQ_MJ: (p) => set({ sampleEQ_MJ: p }),
  setLastMnfD_MJ: (p) => set({ lastMnfD_MJ: p }),
  setTotalUsage_MJ: (p) => set({ totalUsage_MJ: p }),
  setTotalQtyTPUR_MJ: (p) => set({ totalQtyTPUR_MJ: p }),
  setTotalRejectsTPUR_MJ: (p) => set({ totalRejectsTPUR_MJ: p }),
  setTotalUsageTPUR_MJ: (p) => set({ totalUsageTPUR_MJ: p }),
  setTotalSolidsTPUR_MJ: (p) => set({ totalSolidsTPUR_MJ: p }),
  setSBPeriod: (p) => set({ sbPeriod: p }),
  fetchAPDraft: async (RFPCode) => {
    try {
      const resp = await fetch("getAPDraftMJ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RFPCode }),
      });

      const data = await resp.json();
      set({
        apDraftKey: data.drafts,
        outgoingPayment: data.ovpmRecords,
      });
      console.log("fetchAPDraft:", data);
    } catch (err) {
      console.error("Failed to fetch AP Drafts:", err);
      set({ isLoading: false });
    }
  },
  approveDraft: async (wddCode, payLoad, username, password) => {
    try {
      const res = await fetch(`approveRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wddCode: wddCode,
          payLoad: payLoad,
          username: username,
          password: password,
        }),
      });

      const data = await res.json();
      console.log("Approve Data:", data);
      if (data.error) {
        set({ errorRFP: data.error.message });
      } else {
        set({ messageRFP: data.message });
      }
    } catch (err) {
      console.error("Approval failed:", err);
    }
  },

  pendingRFP: async (rfpNum) => {
    console.log("USERSTORE", rfpNum);
    try {
      const res = await fetch(`pendingRFP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rfpNum }),
      });
      const data = await res.json();
      set({ pendingRFPList: data });
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch pending RFP:", err);
      set({ isLoading: false });
    }
  },

  approvedRFP: async () => {
    try {
      const res = await fetch(`approvedRFP`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      set({ approvedRFPList: data });
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch approved RFP:", err);
      set({ isLoading: false });
    }
  },

  createAPasDraft: async (
    rfp,
    siNo,
    approverEmail,
    branch,
    paymentFor,
    handleFailedStatus,
    Branches,
    payee,
    itemDetails
  ) => {
    const today = new Date().toISOString().split("T")[0];
    const parsedItems = JSON.parse(itemDetails);

    const apPayload = {
      DocType: "dDocument_Service",
      CardCode: "VPTC000001",
      NumAtCard: rfp,
      U_APP_NatureOfAPV: "2",
      U_ReceivedDate: today,
      U_CashflowType: "9",
      U_SINo: siNo,
      U_Remarks: approverEmail,
      BPL_IDAssignedToInvoice: parseInt(
        Branches.find((item) => item.code === branch)?.id ?? 0
      ),
      Comments: paymentFor,
      U_APP_FOR: paymentFor,
      U_SupplierName: `(P) - ${payee}`,
      DocumentLines: parsedItems.map((item) => ({
        ItemDescription: item.Dscription?.trim() || "",
        CostingCode2: item.OcrCode2?.trim() || "",
        CostingCode3: item.OcrCode3?.trim() || "",
        AccountCode: item.AcctCode?.trim() || "",
        UnitPrice: parseFloat(item.Price) || 0,
      })),
    };

    console.log("AP PAYLOAD:", apPayload);

    try {
      const response = await fetch("B1POST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: apPayload,
          objectType: "PurchaseInvoices",
        }),
      });
      const data = await response.json();
      if (data.error.code === -2028) {
        set({ message: "Success! Your AP Draft is ready." });
      } else if (data.error.message) {
        set({ error: `Oops!: ${data.error.message}` });
        // await handleFailedStatus(x);
      }
      return data;
    } catch (err) {
      console.error("createAPasDraft failed:", err);
    }
  },
}));
