import React, { useEffect } from "react";
import { LoadingSpinner } from "../../../assets/SVGs";

export default function PalletingOshRefresh(p) {
  useEffect(() => {
    p.setSelectedMenuId(0);
    p.setheaderRows([]);
    p.setPalleted([]);
    p.setLoosePalletDetails([]);
  }, []);

  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}
