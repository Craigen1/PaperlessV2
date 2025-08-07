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
  //Functions
  setAllocateQTY: (p) => set({ allocateQTY: p }),
  setError: (p) => set({ error: p }),
  setMessage: (p) => set({ message: p }),
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
}));
