export const queryCreator = async (ReversedJE, setrowsRFP, setrowsIFP) => {
  const x = await fetch("API_LOGIN", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      USER: "B1_Push_ITR_IT",
      PASS: "B1P@ssw0rd",
    }),
  });
  const d = await x.json();
  if (d.SessionId == undefined) return;
  let qry = JSON.stringify({
    ReferenceDate: ReversedJE[0].MNFDate,
    Memo: `Reversal of Issue for Production  ${ReversedJE[0].DocNumRFP} Via Paperless`,
    Reference: ReversedJE[0].Account,
    TaxDate: ReversedJE[0].MNFDate,
    CardCode: ReversedJE[0].CardCode,
    Series: 17,
    DueDate: ReversedJE[0].MNFDate,
    AutoVAT: "tNO",
    BPLID: 1,
    BaseReference: ReversedJE[0].Account,
  });
  qry = qry.substring(0, qry.length - 1);
  qry += `,"JournalEntryLines": [`;
  ReversedJE.map((e, i) => {
    qry += JSON.stringify({
      Line_ID: i,
      AccountCode: ReversedJE[i].Account,
      Debit: ReversedJE[i].Debit,
      Credit: ReversedJE[i].Credit,
      DueDate: ReversedJE[i].MNFDate,
      TaxDate: ReversedJE[i].MNFDate,
      LineMemo: "Issue for Production",
      ReferenceDate1: ReversedJE[i].MNFDate,
      // Reference1: ReversedJE[i].Account,
      CostingCode: ReversedJE[i].ProfitCode,
      CostingCode2: ReversedJE[i].OcrCode2,
      CostingCode3: ReversedJE[i].OcrCode3,

      U_Branch: "IPIC - VAL",
    });
    if (i != ReversedJE.length) qry += ",";
  });
  qry = qry.substring(0, qry.length - 1);
  qry += "]}";
  console.log({ qry });
  const req = await fetch("SERVERLAYER_POST_APIV4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      body: qry,
      session: d.SessionId,
      objectType: "DeliveryNotes",
    }),
  });
  const response = await req.json();
  if (JSON.stringify(response).length > 0)
    if (JSON.stringify(response)) {
      setrowsRFP([]);
      setrowsIFP([]);
    }
  alert(JSON.stringify(response));
};
