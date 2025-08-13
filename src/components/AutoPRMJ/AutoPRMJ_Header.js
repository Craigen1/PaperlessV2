import React, { useEffect, useState } from "react";

export const AutoPRMJ_Header = () => {
  const [dataMOQ, setDataMOQ] = useState([]);

  useEffect(() => {
    const x = async () => {
      const res = await fetch("checkMOQ", {
        method: "GET",
      });
      const moq = await res.json();
      console.log("MoQ:", moq);
      setDataMOQ(moq);
    };
    x();
  }, []);

  useEffect(() => {
    if (dataMOQ.length > 0) {
      // handlePostPR();
    }
  }, []);

  const handlePostPR = async () => {
    const prPayload = {
      DocType: "dDocument_Items",
      Comments: `TEST AUTO PR Consumables`,
      Requester: "IPICPADM03",
      RequriedDate: "2025-06-30",
      RequesterDepartment: 7,
      ReqType: 12,
      BPL_IDAssignedToInvoice: 1,
      U_APP_FOR: "Consumables",
      U_APP_ReqCode: "IPICPADM03",
      DocumentsOwner: 406,
      SendNotification: "tNO",
      DocumentLines: dataMOQ.map((i) => ({
        ItemCode: i.ItemCode,
        ItemDescription: i.ItemName,
        CostingCode2: "102",
        CostingCode3: "10204",
        Quantity: i.MinOrdrQty,
        RequiredDate: "2025-06-30",
      })),
    };
    try {
      const response = await fetch("B1POST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: prPayload,
          objectType: "PurchaseRequests",
        }),
      });
      const data = await response.json();
      console.log("Invoice Posted Data", data);
      console.log("Invoice Data", prPayload);
    } catch (err) {
      console.log("Post Service Invoice Error", err);
    }
  };

  return (
    <div className="flex flex-col">
      <div>Auto Pr</div>
      <button onClick={handlePostPR}>Create PR</button>
    </div>
  );
};
