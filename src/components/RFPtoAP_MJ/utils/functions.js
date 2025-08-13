import { ApproverMgr, contents } from "../ArrayMJ";

export const handleFailedStatus = async (x) => {
  try {
    const resp = await fetch("updateStatusMJ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x }),
    });
    await resp.json();
    setLoading1(false);
  } catch (err) {
    console.log(err);
  }
};

export const handleChange = (
  e,
  rowIndex,
  setDscription,
  setDscriptionZustand
) => {
  const { name, value } = e.target;

  setDscription((prev) => {
    const updated = [...prev];
    const row = { ...updated[rowIndex], [name]: value };

    if (name === "glCode") {
      const code = value.split(" - ")[0].trim();
      const matchedGL = contents
        .find((c) => c.id === "glCode")
        ?.subArr.find((gl) => gl.code === code);
      row.glCode = code;
      row.glName = matchedGL?.id || "";
    }

    updated[rowIndex] = row;
    setDscriptionZustand(updated);
    console.log("Updated:", updated);
    return updated;
  });
};

export const sendEmail = async ({ x, headerData, setError, setLoading1 }) => {
  const emailTo = headerData.approverEmail;
  const approverMatch = ApproverMgr.find(
    (item) => item.code === emailTo.trim()
  );
  console.log("Email Payload:", x);
  const approverName = approverMatch ? approverMatch.name : emailTo;
  const emailPayload = {
    email: emailTo.trim(),
    rfpNum: x,
    requestor: headerData.payee,
    forBranch: headerData.branch,
    forRemarks: headerData.paymentFor,
    sINumber: headerData.sInum,
    approverName: approverName,
  };
  if (x === undefined || x === null) {
    setError("RFP Code is missing. Email not sent.");
    setLoading1(false);
    return;
  }
  try {
    const res = await fetch("send-emailMJ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });
    await res.json();
  } catch (err) {
    console.log(err);
  }
};
