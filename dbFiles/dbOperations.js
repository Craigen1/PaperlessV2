const config = require("./dbConfig"),
  sqlConnectionToDB = require("mssql");
const DB = "TEST_0405";

const GetITRStatus = async (DocNum) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let getStatus = await pool
      .request()
      .query(
        `SELECT  iif(decision = 'SAP login E' ,'SAP Login Error',decision )	 as decision  FROM OITR_APPROVAL where DocNum = '${DocNum}'`
      );
    return getStatus.recordset;
  } catch (error) {
    console.log(error);
  }
};

//MJ
const prevDelivery_MJ = async (p) => {
  console.log("STO REF:", p);
  let pool = await sqlConnectionToDB.connect(config);
  let pcx = await pool.request().query(`SELECT T0.CardCode,
T0.CardName,
T0.DocNum,
T0.U_APP_Reason,
T1.ItemCode,
T2.lastName,
T2.firstName,
T1.UomCode,
T1.Dscription,
T1.U_MnfDate,
T1.Quantity,
T1.U_DPUR,
T0.DocStatus,
T1.WhsCode,
T1.CogsOcrCo2,
T1.CogsOcrCod,
T1.CogsOcrCo3,
T0.DocDate AS 'Posting Date',
T0.NumAtCard,
T0.U_STONo,
T0.U_RightSealNo,
T0.U_LeftSealNo,
T0.U_BackSealNo,
T0.U_Remarks,
T0.U_ShippingAddress,
T0.U_Trucker,
T0.U_APP_PlateNo,
T0.U_APP_Driver,
T0.U_ProductionRun,
T0.BPLId,
T0.BPLName
FROM SAPMain.dbo.ODLN T0
LEFT JOIN SAPMain.dbo.DLN1 T1 ON T1.DocEntry = T0.DocEntry
LEFT JOIN SAPMain.dbo.OHEM T2 ON T2.empID = T1.OwnerCode
WHERE T1.U_STONo = '${p}'

ORDER BY
T1.ItemCode
`);
  const x = pcx.recordset;
  console.log("Prev. Delivery:", x);
  return x;
};

const getDPUR_MJ = async (BODY) => {
  let pool = await sqlConnectionToDB.connect(config);
  let getDPUR = await pool.request()
    .query(`SELECT A.U_DPUR, A.U_MNFDate FROM SAPMain.dbo.OIGN A
LEFT JOIN SAPMain.dbo.IGN1 B ON B.DocEntry = A.DocEntry
LEFT JOIN SAPMain.dbo.OITM C ON C.ItemCode = B.ItemCode
WHERE C.U_APP_ItemSGroup = 'DMPI'
AND A.U_DPUR IS NOT NULL
AND C.ItemCode IN (${BODY.map((code) => `'${code.itemCode}'`).join(", ")})
AND A.U_MnfDate IN (${BODY.map((code) => `'${code.mnfDate}'`).join(", ")})`);
  const recset1 = getDPUR.recordset;
  console.log("Get DPUR#:", recset1);
  return recset1;
};

const batchSelection_MJ = async (BODY) => {
  console.log("BatchSelection_MJ:", BODY);
  if (!BODY || BODY.length === 0) {
    return [];
  }
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let query = await pool.request().query(
      `SELECT 
      D.ItemCode,
      A.BatchNum,
      D.UomCode,
      D.UomEntry,
      A.Quantity,
      A.ItemName,
      E.U_DPUR,
      A.WhsCode,
      D.BaseCard,
      E.U_MnfDate
  FROM 
      SAPMain.dbo.OIBT A
  LEFT JOIN 
      SAPMain.dbo.OITM C ON C.ItemCode = A.ItemCode
  LEFT JOIN 
      SAPMain.dbo.DLN1 D ON D.ItemCode = A.ItemCode
  LEFT JOIN 
      SAPMain.dbo.IGN1 B ON B.ItemCode = A.ItemCode
  LEFT JOIN 
      SAPMain.dbo.OIGN E ON E.DocEntry = B.DocEntry
  WHERE 
      C.U_APP_ItemSGroup = 'DMPI'
      AND A.Quantity >= 1
      AND E.U_DPUR IS NOT NULL
      AND A.WhsCode = 22220001
      AND C.ItemCode IN (${BODY.map((code) => `'${code.itemCode}'`).join(", ")})
      AND E.U_MnfDate IN (${BODY.map((code) => `'${code.mnfDate}'`).join(", ")})
      AND (
          ${BODY.map((code) => `A.BatchNum LIKE '${code.batchCode}%'`).join(
            " OR "
          )}
      )
      GROUP BY
      D.ItemCode,
      A.BatchNum,
      D.UomCode,
      D.UomEntry,
      A.Quantity,
      A.ItemName,
      E.U_DPUR,
      A.WhsCode,
      D.BaseCard,
      E.U_MnfDate
    ORDER BY 
      D.ItemCode,
      A.BatchNum ASC;
  `
    );
    const recset2 = query.recordset;
    const filteredBatches = recset2.filter((batch) =>
      BODY.some((row) => {
        const sapMnfDate = new Date(batch.U_MnfDate);
        const sapBatchNum = batch.BatchNum.substring(0, 9);
        const [month, day, year] = row.mnfDate
          .split("/")
          .map((part) => part.padStart(2, "0"));
        const rowDate = `20${year}-${month}-${day}`;
        return (
          row.batchCode === sapBatchNum &&
          rowDate === sapMnfDate.toISOString().substring(0, 10) &&
          row.itemCode === batch.ItemCode
        );
      })
    );
    console.log("Filtered Batches:", filteredBatches);
    return filteredBatches;
  } catch (err) {
    console.log(err);
  }
};

const julianSelection_MJ = async (BODY) => {
  let pool = await sqlConnectionToDB.connect(config);
  console.log("JulianSelection_MJ:", BODY);
  let query = await pool.request().query(
    `SELECT 
    D.ItemCode,
    A.BatchNum,
    D.UomCode,
    D.UomEntry,
    A.Quantity,
    A.ItemName,
    E.U_DPUR,
    A.WhsCode,
    D.BaseCard,
    E.U_MnfDate
FROM 
    SAPMain.dbo.OIBT A
LEFT JOIN 
    SAPMain.dbo.OITM C ON C.ItemCode = A.ItemCode
LEFT JOIN 
    SAPMain.dbo.DLN1 D ON D.ItemCode = A.ItemCode
LEFT JOIN 
    SAPMain.dbo.IGN1 B ON B.ItemCode = A.ItemCode
LEFT JOIN 
    SAPMain.dbo.OIGN E ON E.DocEntry = B.DocEntry
WHERE 
    C.U_APP_ItemSGroup = 'DMPI'
    AND A.Quantity >= 1
    AND E.U_DPUR IS NOT NULL
    AND A.WhsCode = 22220001
    AND C.ItemCode IN ('${BODY.itemCode}')
    AND E.U_MnfDate IN ('${BODY.mnfDate}')
    AND A.Batchnum LIKE ('${BODY.julianCode}%')
    GROUP BY
    D.ItemCode,
    A.BatchNum,
    D.UomCode,
    D.UomEntry,
    A.Quantity,
    A.ItemName,
    E.U_DPUR,
    A.WhsCode,
    D.BaseCard,
    E.U_MnfDate
  ORDER BY 
    D.ItemCode,
    A.BatchNum ASC;
`
  );
  const recset2 = query.recordset;
  console.log("Julian:", recset2);
  return recset2;
};

const getEmployees_MJ = async () => {
  let pool = await sqlConnectionToDB.connect(config);
  let getEmployeeMD = await pool.request()
    .query(`SELECT CONCAT(lastname, ', ', firstname) as Name, empid
FROM SAPMain.dbo.OHEM 
WHERE active = 'Y'
ORDER BY lastname asc`);

  const recset3 = getEmployeeMD.recordset;
  // console.log("Get Employees:", recset3);
  return recset3;
};

const getProfitCenterName_MJ = async () => {
  let pool = await sqlConnectionToDB.connect(config);
  let getProfitCenter = await pool
    .request()
    .query(`SELECT * FROM SAPMain.dbo.OPRC`);
  const recset4 = getProfitCenter.recordset;
  // console.log("Get Employees:", recset4);
  return recset4;
};

const RFPREPORT_MJ = async (BODY) => {
  console.log("RfpReport Parameters", BODY);
  let pool = await sqlConnectionToDB.connect(config);
  if (BODY && BODY.dateFrom1) {
    let rfpreport = await pool.request().query(`
DECLARE @mnfDate1 DATE = ''
DECLARE @mnfDate2 DATE = ''
DECLARE @client AS NVARCHAR(20) = ''

SELECT @mnfDate1 = MIN(A.U_MNFDate) FROM SAPMain.dbo.OIGN A WHERE A.U_MNFDate >= '${BODY.dateFrom1}'
SELECT @mnfDate2 = MAX(A.U_MNFDate) FROM SAPMain.dbo.OIGN A WHERE A.U_MNFDate <= '${BODY.dateTo1}'
SELECT @client = B.U_APP_ItemSGroup FROM SAPMain.dbo.OITM B WHERE B.U_APP_ItemSGroup = '${BODY.itemSubGrp}'

EXEC SAPMain.dbo.spDMF_RFPReport @mnfDate1 , @mnfDate2, @client`);
    const x = rfpreport.recordset;
    return x;
  }
};

const RFP_MJ = async (BODY) => {
  console.log("Rfp Parameters", BODY);
  let pool = await sqlConnectionToDB.connect(config);
  let rfpContent = await pool.request().query(`
  SELECT
  T0.DocNum,
  T0.U_MNFDate,
  T0.U_DPUR,
  T0.U_TPUR,
  T0.U_PreparedBy,
  T0.DocDate,
  T1.BaseRef,
  T2.Series,
  T1.TranType,
  T1.ItemCode,
  T1.Dscription,
  T1.Quantity,
  T1.WhsCode,
  T1.AcctCode,
  T1.OcrCode2,
  T1.OcrCode3,
  T1.UomCode,
  T0.U_SelfBilling,
  T0.U_ProductionRun,
  T0.BPLName
  FROM SAPMain.dbo.OIGN T0
  LEFT JOIN SAPMain.dbo.IGN1 T1 ON T0.DocEntry = T1.DocEntry
  LEFT JOIN SAPMain.dbo.OWOR T2 ON T1.BaseRef = T2.DocNum
  WHERE T0.DocNum = ${BODY.docNum}`);
  const x1 = rfpContent.recordset;
  console.log("x1:", x1);
  return x1;
};

const GETGRBATCH_MJ = async (BODY) => {
  console.log("dbOpe", BODY);
  let batches = BODY.batchcode.map((item) => `'${item}'`).join(", ");
  let itemcode = BODY.itemcode.map((item) => `'${item}'`).join(", ");
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let grbatch = await pool.request().query(
      `SELECT ItemCode, itemName, SysNumber, DistNumber, U_FullDRNum
         FROM SAPMain.dbo.OBTN WHERE DistNumber IN (${batches}) AND ItemCode IN (${itemcode})`
    );
    const batch = grbatch.recordset;
    console.log({ batch });
    return { batch };
  } catch (err) {
    console.log("GRBATCH/DR", err);
  }
};

const DRContents_MJ = async (BODY) => {
  console.log("DRContents BODY", BODY);
  let conditions = BODY.map(
    (item) =>
      `(t1.U_DPUR = '${item.DPUR}' AND t1.ItemCode = '${item.ITEMCODE}' AND t1.U_MnfDate = '${item.MNFDATE}')`
  ).join(" OR ");

  try {
    let pool = await sqlConnectionToDB.connect(config);
    let drContents = await pool.request().query(
      `SELECT 
      t0.DocEntry,
      t0.DocNum,
      t1.LineNum,
      t0.U_STONo,
      t1.U_Delnote,
      t1.U_DPUR,
      t1.ItemCode,
      t1.Price,
      t1.OpenQty,
      t1.Dscription,
      t1.U_MnfDate,
      t1.UomCode,
      t1.UoMEntry,
      t0.DocDate,
      t0.NumAtCard,
      t1.CogsOcrCod,
      t1.CogsOcrCo2,
      t1.CogsOcrCo3,
      t1.LineTotal
      FROM SAPMain.dbo.ODLN t0
      LEFT JOIN SAPMain.dbo.DLN1 t1 ON t1.DocEntry = t0.DocEntry
      WHERE (${conditions})
      AND t1.LineStatus = 'O'
      AND t0.CardCode = 'CDMP000001'
      AND t1.OpenQty <> 0
      ORDER BY t1.U_DPUR`
    );

    const drContentsRecSet = drContents.recordset;
    console.log(drContentsRecSet);
    return drContentsRecSet;
  } catch (err) {
    console.log("GET DR", err);
  }
};

const PostedAR_MJ = async (BODY) => {
  console.log("NumAtCard", BODY);
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let SI = await pool.request().query(
      `select * from SAPMain.dbo.OINV t0
left join SAPMain.dbo.INV1 t1 on t1.DocEntry =t0.DocEntry
where t0.NumAtCard = '${BODY}'`
    );
    const NumAtCard = SI.recordset;
    console.log(NumAtCard);
    return NumAtCard;
  } catch (err) {
    console.log("GET POSTED AR(SI)", err);
  }
};

const InsertORFP_MJ = async (e) => {
  let transaction;
  try {
    let pool = await sqlConnectionToDB.connect(config);
    transaction = new sqlConnectionToDB.Transaction(pool);
    await transaction.begin();

    const requestORFP = new sqlConnectionToDB.Request(transaction);
    const insertORFPResult = await requestORFP
      .input("Branch", sqlConnectionToDB.VarChar, e.modelORFP.oBranch)
      .input("Remarks", sqlConnectionToDB.VarChar, e.modelORFP.oRemarks)
      .input("Payee", sqlConnectionToDB.VarChar, e.modelORFP.oPayee)
      .input(
        "ApproverEmail",
        sqlConnectionToDB.VarChar,
        e.modelORFP.oApproverEmail
      )
      .input("UserAccountID", sqlConnectionToDB.Int, e.modelORFP.oUserAccountID)
      .input(
        "UserAccountName",
        sqlConnectionToDB.VarChar,
        e.modelORFP.oUserAccountName
      )
      .input("SINo", sqlConnectionToDB.VarChar, e.modelORFP.oSINum)
      .input("Token", sqlConnectionToDB.VarChar, e.token).query(`
        INSERT INTO ORFP (Branch, Remarks, Payee, ApproverEmail, UserAccountID, UserAccountName, SINo, Token)
        OUTPUT INSERTED.RFPNo, INSERTED.RFPCode
        VALUES (@Branch, @Remarks, @Payee, @ApproverEmail, @UserAccountID, @UserAccountName, @SINo, @Token)
      `);

    const { RFPNo, RFPCode } = insertORFPResult.recordset[0];

    for (const row of e.modelRFP1) {
      const isRowFilled =
        row.oDescription ||
        row.oAcctCode ||
        row.oCostCenter ||
        row.oSection ||
        row.oAmount;

      if (isRowFilled) {
        await new sqlConnectionToDB.Request(transaction)
          .input("RFPNo", sqlConnectionToDB.Int, RFPNo)
          .input("ItemName", sqlConnectionToDB.VarChar, row.oDescription)
          .input("AccountCode", sqlConnectionToDB.VarChar, row.oAcctCode)
          .input("CostCenter", sqlConnectionToDB.VarChar, row.oCostCenter)
          .input("Section", sqlConnectionToDB.VarChar, row.oSection)
          .input(
            "Amount",
            sqlConnectionToDB.Decimal(18, 2),
            parseFloat(row.oAmount) || 0
          ).query(`
            INSERT INTO RFP1 (RFPNo, ItemName, AccountCode, CostCenter, Section, Amount)
            VALUES (@RFPNo, @ItemName, @AccountCode, @CostCenter, @Section, @Amount)
          `);
      }
    }

    await transaction.commit();
    return { RFPCode };
  } catch (error) {
    console.error("Insert Error:", error);
    if (transaction) await transaction.rollback();
    return { success: false, error };
  }
};

const pendingRFP = async (p) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let pendingRFP = await pool.request().query(
      `select
A.DateCreated as DocDate,
A.Payee as U_SupplierName,
A.Decision,
A.RFPCode,
A.Remarks,
A.Branch as BPLName,
A.SINo,
sum(B.Amount) as 'Price',
A.ApproverEmail,
A.ApproverName,
 (
    SELECT 
      B.ItemName as Dscription,
      B.CostCenter as OcrCode2,
      B.Section as OcrCode3,
      B.AccountCode as AcctCode,
      B.Amount as Price
    FROM RFP1 B
    WHERE B.RFPNo = A.RFPNo
    FOR JSON PATH
  ) AS ItemDetails
      from ORFP A
left join RFP1 B on A.RFPNo = B.RFPNo
where A.Decision = 'Pending'
AND A.RFPCode = '${p}'
GROUP BY
A.DateCreated,
A.Payee,
A.Decision,
A.RFPCode,
A.Remarks,
A.Branch,
A.SINo,
A.RFPNo,
A.ApproverEmail,
A.ApproverName
order by A.DateCreated DESC`
    );

    const pendingRFPRecSet = pendingRFP.recordset;
    return pendingRFPRecSet;
  } catch (err) {
    console.log("GET Pending RFP", err);
  }
};

const approvedRFP = async (p) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let draftContent = await pool.request().query(
      `select
A.WddCode,
A.DraftEntry,
B.BPLName,
B.Comments,
A.ObjType,
A.IsDraft,
sum(D.Price) as Price,
A.DocDate,
A.Status,
C.RFPCode,
C.Decision,
C.ApproverName,
B.CardName,
B.U_SupplierName,
B.U_Remarks,
(
    SELECT 
      D.Dscription,
      D.OcrCode2,
      D.OcrCode3,
      D.AcctCode,
      D.Price
    FROM SAPMain.dbo.DRF1 D
    left join SAPMain.dbo.ODRF E on D.DocEntry = E.DocEntry
    WHERE E.NumAtCard = C.RFPCode COLLATE SQL_Latin1_General_CP850_CI_AS
    FOR JSON PATH
  ) AS ItemDetails
from SAPMain.dbo.OWDD A
left join SAPMain.dbo.ODRF B on A.DraftEntry = B.DocEntry
left join SAPMain.dbo.DRF1 D on B.DocEntry = D.DocEntry
left join ORFP C on B.NumAtCard = C.RFPCode COLLATE SQL_Latin1_General_CP850_CI_AS
where A.ObjType = 18
and A.OwnerID = 20
and A.Status = 'W'
and C.Decision = 'Approved'
group by
A.WddCode,
A.DraftEntry,
B.BPLName,
B.Comments,
A.ObjType,
A.IsDraft,
A.DocDate,
A.Status,
C.RFPCode,
C.Decision,
C.ApproverName,
B.CardName,
B.U_SupplierName,
B.U_Remarks
order by DraftEntry DESC`
    );

    const draftContentsRecSet = draftContent.recordset;
    return draftContentsRecSet;
  } catch (err) {
    console.log("GET draftCode", err);
  }
};

const GetRFPSMJ = async (p) => {
  try {
    let getData = await sqlConnectionToDB.connect(config);
    let getRFPS = await getData.request().query(`
select
A.RFPCode,
A.DateCreated,
A.Payee,
A.ApproverEmail,
A.ApproverName,
A.Remarks,
A.Status,
A.Decision,
A.Token,
A.RejectionRemarks,
A.IsReceived,
sum(B.Amount) as [Total]
from ORFP A 
left join RFP1 B on A.RFPNo = B.RFPNo
where A.UserAccountID = ${p.userID}
AND CAST(A.DateCreated AS DATE) >= '${p.fromDate}'
AND CAST(A.DateCreated AS DATE) <= '${p.toDate}'
group by
A.RFPCode,
A.DateCreated,
A.Payee,
A.ApproverEmail,
A.ApproverName,
A.Remarks,
A.Status,
A.Decision,
A.RejectionRemarks,
A.IsReceived,
A.Token
order by A.RFPCode DESC
    `);
    console.log(getRFPS.recordset);
    return getRFPS.recordset;
  } catch (error) {
    console.log(error);
  }
};

const getAPDraftMJ = async (p) => {
  const DB = "SAPMain.dbo.";
  console.log("AP Draft MJ:", p);
  const rfpCodes = Array.isArray(p.RFPCode?.RFPCode) ? p.RFPCode.RFPCode : [];
  if (rfpCodes.length === 0) {
    return { drafts: [], ovpmRecords: [] };
  }

  try {
    let getData = await sqlConnectionToDB.connect(config);
    const rfpCodesArray = rfpCodes
      .map((code) => `'${code.replace(/'/g, "''")}'`)
      .join(", ");

    let getDraft = await getData.request().query(`
    select top 5 C.DraftEntry,
CASE 
    WHEN C.Status = 'Y' THEN 'Approved'
    WHEN C.Status = 'W' THEN 'Pending'
    ELSE 'Rejected'
END AS Status,
A.DocDate,
A.NumAtCard,
A.U_SINo,
A.U_Remarks
from ${DB}ODRF A
left join ${DB}DRF1 B on A.DocEntry = B.DocEntry
left join ${DB}OWDD C on A.DocEntry = C.DraftEntry
where C.OwnerID = 20
and A.ObjType = '18'
and A.NumAtCard IS NOT NULL
 and A.NumAtCard IN (${rfpCodesArray})
ORDER BY A.DocDate DESC
        `);

    let ovpmRecords = [];
    if (p.RFPCode.length > 0) {
      const rfpCodesOP = p.RFPCode.map(
        (code) => `'${code.replace(/'/g, "''")}'`
      ).join(", ");
      let ovpmQuery = await getData.request().query(`
    select
C.DocEntry,
F.DocNum,
C.DocDate,
C.NumAtCard,
A.U_SINo,
F.U_APP_CDateRel
 from ${DB}ODRF A
left join ${DB}DRF1 B on A.DocEntry = B.DocEntry
left join ${DB}OPCH C on A.NumAtCard = C.NumAtCard and A.U_SINo = C.U_SINo
left join ${DB}PCH1 D on C.DocEntry = D.DocEntry
left join ${DB}VPM2 E on C.DocEntry = E.DocEntry
left join ${DB}OVPM F on E.DocNum = F.DocEntry
where A.NumAtCard IN (${rfpCodesOP})
and A.ObjType = '18'
and E.DocEntry IS NOT NULL
GROUP BY
C.DocEntry,
F.DocNum,
C.DocDate,
C.NumAtCard,
A.U_SINo,
F.U_APP_CDateRel
ORDER BY C.DocDate DESC
        `);
      ovpmRecords = ovpmQuery.recordset;
    }
    const drafts = getDraft.recordset;
    console.log("OVPM", { ovpmRecords });
    console.log("AP RECORDSET", { drafts });
    return { drafts, ovpmRecords };
  } catch (error) {
    console.log(error);
  }
};

const UpdateORFPStatusMJ = async (p) => {
  console.log("DB P:", p);
  try {
    let getData = await sqlConnectionToDB.connect(config);
    await getData.request().query(`
    UPDATE ORFP
    SET Status = 'Failed'
    WHERE RFPCode = '${p.x.RFPCode}';
        `);
  } catch (error) {
    console.log(error);
  }
};

const UpdateORFPisReceivedMJ = async (p) => {
  console.log(p);
  try {
    let getData = await sqlConnectionToDB.connect(config);
    let data = await getData.request().query(`
    UPDATE ORFP
    SET IsReceived = 1
    OUTPUT 
    INSERTED.RFPCode, INSERTED.IsReceived
    WHERE RFPCode = '${p.RFPCode}';
        `);
    console.log(data.recordset[0]);
    return data.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

const SaveMessageIdMJ = async (rfp, messageId) => {
  try {
    let getData = await sqlConnectionToDB.connect(config);
    await getData.request().query(`
    UPDATE ORFP
    SET MessageId = '${messageId}'
    WHERE RFPCode = '${rfp}';
        `);
  } catch (error) {
    console.log(error);
  }
};

const GetApproverMessageIdMJ = async (rfpNum) => {
  try {
    let getData = await sqlConnectionToDB.connect(config);
    let getMessageId = await getData.request().query(`
    Select MessageId, ApproverEmail, Decision, Used, RFPCode, Token from ORFP
    WHERE RFPCode = '${rfpNum}'`);
    return getMessageId.recordset;
  } catch (error) {
    console.log(error);
  }
};

const costCenterListMJ = async () => {
  const DB = "SAPMain.dbo.";
  try {
    let getData = await sqlConnectionToDB.connect(config);
    let dimCode2Query = await getData.request().query(`
      SELECT PrcCode as code, PrcName as id, CCTypeCode
      FROM ${DB}OPRC
      WHERE Active = 'Y'
        AND DimCode = 2
        AND prccode NOT LIKE '%[^0-9]%'
    `);

    let dimCode3Query = await getData.request().query(`
      SELECT PrcCode as code, PrcName as id, CCTypeCode
      FROM ${DB}OPRC
      WHERE Active = 'Y'
        AND DimCode = 3
        AND prccode NOT LIKE '%[^0-9]%'
    `);
    const costCenterDim2 = dimCode2Query.recordset;
    const costCenterDim3 = dimCode3Query.recordset;
    return { costCenterDim2, costCenterDim3 };
  } catch (error) {
    console.log(error);
    return { costCenterDim2: [], costCenterDim3: [] };
  }
};

const UpdateORFPDecisionMJ = async (p) => {
  const rejectionRemarks = p.decision === "Rejected" ? `${p.remarks}` : `NULL`;
  try {
    let getData = await sqlConnectionToDB.connect(config);
    const result = await getData.request().query(`
      UPDATE ORFP
      SET 
        Decision = '${p.decision}',
        ApproverName = '${p.approverAccount}',
        RejectionRemarks = '${rejectionRemarks}',
        Used = 1
      OUTPUT 
        INSERTED.RFPCode, INSERTED.Decision, INSERTED.ApproverName, INSERTED.RejectionRemarks, INSERTED.Used
      WHERE RFPCode = '${p.rfp}';
    `);
    console.log(result.recordset[0]);
    return result.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

const checkMOQConsumablesMJ = async () => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let checkMOQ = await pool.request().query(
      `select 
A.ItemCode,
A.ItemName,
iif(A.ItmsGrpCod = 102, 'Consumables', 'Not Consumables') as 'Item Group',
A.U_APP_ItemSGroup,
B.OnHand,
A.MinOrdrQty,
B.WhsCode
from TEST_1017.dbo.OITM A
left join TEST_1017.dbo.OITW B on a.ItemCode = b.ItemCode
where A.ItmsGrpCod = 102
and A.validFor = 'Y'
and (A.U_APP_Client IS NULL OR A.U_APP_Client <> 220) -- IPIC - VAL only
and B.WhsCode = '90000001' -- Stockroom Warehouse
and B.OnHand < A.MinOrdrQty
and NOT EXISTS (
select 1 from TEST_1017.dbo.OPRQ T0
left join TEST_1017.dbo.PRQ1 T1 on T0.DocEntry = T1.DocEntry
where T0.DocStatus = 'O'
and T0.DocType = 'I'
and T1.ItemCode = B.ItemCode
)
and NOT EXISTS (
    select 1 from TEST_1017.dbo.OPOR P0
    left join TEST_1017.dbo.POR1 P1 on P0.DocEntry = P1.DocEntry
    where P0.DocStatus = 'O'
    and P1.ItemCode = B.ItemCode
    and P1.OpenQty > 0
)
order by A.ItemCode asc
`
    );
    return checkMOQ.recordset;
  } catch (err) {
    console.log(err);
  }
};

const checkInstockMJ = async () => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let checkInStock = await pool.request().query(
      `select 
ItemCode,
WhsCode,
OnHand
from TEST_1017.dbo.OITW
where ItemCode = 'COE0000001'
and WhsCode = '90000001'
`
    );
    return checkInStock.recordset;
  } catch (err) {
    console.log(err);
  }
};

const GetITRDraft = async (DocNum) => {
  try {
    console.log(DocNum);
    let getData = await sqlConnectionToDB.connect(config);
    let getITR = await getData.request().query(`
  select 
B.LineNum [ROW]
,B.itemcode [ITEMCODE]
,C.ItemName ITEMNAME
,B.UomCode UoM
,B.Quantity QTY
,E.BatchNum BATCH
,CONCAT(A.Filler,' - ', F.WhsName)	FROMWHSCODE
,CONCAT(A.ToWhsCode,' - ', G.WhsName)	TOWHSCODE

from "${DB}".DBO.ODRF  A 
LEFT JOIN "${DB}".DBO.DRF1 B on A.DocEntry = B.DocEntry
LEFT JOIN "${DB}".DBO.OITM C on B.ItemCode = C.ItemCode
LEFT JOIN "${DB}".DBO.vwApp_IBT1 E on E.ItemCode = B.ItemCode
								and E.BaseEntry = B.DocEntry
								and E.BaseLinNum = B.LineNum
								and E.Direction = 1
LEFT JOIN "${DB}".DBO.OWHS F on F.WhsCode = A.Filler
LEFT JOIN "${DB}".DBO.OWHS G on G.WhsCode = A.ToWhsCode        

where A.DocEntry = '${DocNum}' 
    `);
    return getITR.recordset;
  } catch (error) {
    console.log(error);
  }
};

const GetUsers = async (firstname) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let getEmployees = await pool.request().query(`SELECT  
            firstname,
            midname,
            lastname,
            username,
            password,
            0 age
        FROM OUSM where firstname ='Deanmark'`);
    console.log(getEmployees);
    return getEmployees.recordset;
  } catch (error) {
    console.log(error);
  }
};

const UpdateITRStatus = async (PARAM) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request()
      .query(` exec DMF_PEPLESS @SQLID = '${PARAM.SQLID}'
                              ,  @DOCNUM = '${PARAM.DOCNUM}'
                              ,  @DECISION = '${PARAM.APPROVAL}'
                              ,  @USERID = '${PARAM.UESRID}'
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const SQL_EXEC = async (BODY) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request()
      .query(`exec DMF_PEPLESS @SQLID = '${BODY.SQLID}'
                              ,  @DOCNUM = '${BODY.DOCNUM}'
                              ,  @DECISION = '${BODY.APPROVAL}'
                              ,  @USERID = '${BODY.UESRID}'
                              ,  @CLIENT = '${BODY.CLIENT}'
                              ,  @CODENUM = '${BODY.CODENUM}'
                              ,  @PRORATIONTYPE = '${BODY.PRORATIONTYPE}'
                              ,  @DATEFROM  = '${BODY.DATEFROM}'
                              ,  @DATETO    = '${BODY.DATETO}'
                              ,  @ITEMCODE  = '${BODY.ITEMCODE}'
                              ,  @BATCH     = '${BODY.BATCH}'
                              ,  @TYPEENTRY = '${BODY.TYPEENTRY}'
                              ,  @REVENTRY  = '${BODY.REVENTRY}'
                              ,  @VAL       = '${BODY.VAL}'
                              ,  @VAL2       = '${BODY.VAL2}'
                              ,  @VAL3       = '${BODY.VAL3}'
                              ,  @VAL4       = '${BODY.VAL4}'
                              ,  @VAL5       = '${BODY.VAL5}'
                              ,  @VAL6       = '${BODY.VAL6}'
                              ,  @VAL7       = '${BODY.VAL7}'
                              ,  @VAL8       = '${BODY.VAL8}'
                              ,  @VAL9       = '${BODY.VAL9}'
                              ,  @VAL10      = '${BODY.VAL10}'
                              ,  @VAL11      = '${BODY.VAL11}'
                              ,  @IMG     = '${BODY.IMG}'
                              ,  @SIZE      = '${BODY.SIZE}'
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const SQL_EXEC_DMAPI = async (BODY) => {
  try {
    if (BODY.SQLID < 2000 || BODY.SQLID == undefined) return;
    // return;
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request()
      .query(`exec DMF_PEPLESS @SQLID = '${BODY.SQLID}'
                              ,@P_itemCode  = '${BODY.P_ITEMCODE}' 
                            ,  @VAL        = '${BODY.VAL}'
                            ,  @VAL2        = '${BODY.VAL2}'
                            ,  @VAL3        = '${BODY.VAL3}'
                            ,  @VAL4        = '${BODY.VAL4}'
                            ,  @VAL5        = '${BODY.VAL5}'
                            ,  @VAL6        = '${BODY.VAL6}'
                            ,  @VAL7        = '${BODY.VAL7}'
                            ,  @VAL8        = '${BODY.VAL8}'
                            ,  @VAL9        = '${BODY.VAL9}'
                            ,  @VAL10       = '${BODY.VAL10}'
                            ,  @USER        = '${BODY.user}'
                            ,  @PASS        = '${BODY.pass}'
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const SQL_EXECABC = async (BODY) => {
  try {
    // console.log(BODY);
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request()
      .query(`exec DMF_PEPLESS @SQLID = '${BODY.SQLID}'
                              ,  @VAL1       = '${BODY.VAL}'
                              ,  @VAL2       = '${BODY.VAL2}'
                              ,  @VAL3       = '${BODY.VAL3}'
                              ,  @VAL4       = '${BODY.VAL4}'
                              ,  @VAL5       = '${BODY.VAL5}'
                              ,  @VAL6       = '${BODY.VAL6}'
                              ,  @VAL7       = '${BODY.VAL7}'
                              ,  @VAL8       = '${BODY.VAL8}'
                              ,  @VAL9       = '${BODY.VAL9}'
                              ,  @VAL10      = '${BODY.VAL10}'
                              ,  @USER      = '${BODY.USER}'
                              ,  @PASS      = '${BODY.PASS}'
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const EXEC_INSERT = async (BODY) => {
  try {
    // console.log(BODY);
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request()
      .query(`exec DMF_PEPLESS @SQLID = '${BODY.SQLID}'
                              ,  @VAL1       = '${BODY.VAL}'
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

// const SQL_EXECABC = async (BODY) => {
//   try {
//     // console.log(BODY);
//     let pool = await sqlConnectionToDB.connect(config);
//     let EXEC = await pool.request()
//       .query(` exec DMF_PEPLESSABC @SQLID = '${BODY.SQLID}'
//                               ,  @DOCNUM = '${BODY.DOCNUM}'
//                               ,  @DECISION = '${BODY.APPROVAL}'
//                               ,  @USERID = '${BODY.UESRID}'
//                               ,  @CLIENT = '${BODY.CLIENT}'
//                               ,  @CODENUM = '${BODY.CODENUM}'
//                               ,  @PRORATIONTYPE = '${BODY.PRORATIONTYPE}'
//                               ,  @DATEFROM  = '${BODY.DATEFROM}'
//                               ,  @DATETO    = '${BODY.DATETO}'
//                               ,  @ITEMCODE  = '${BODY.ITEMCODE}'
//                               ,  @BATCH     = '${BODY.BATCH}'
//                               ,  @TYPEENTRY = '${BODY.TYPEENTRY}'
//                               ,  @REVENTRY  = '${BODY.REVENTRY}'
//                               ,  @VAL       = '${BODY.VAL}'
//                               ,  @VAL2       = '${BODY.VAL2}'
//                               ,  @VAL3       = '${BODY.VAL3}'
//                               ,  @VAL4       = '${BODY.VAL4}'
//                               ,  @VAL5       = '${BODY.VAL5}'
//                               ,  @VAL6       = '${BODY.VAL6}'
//                               ,  @VAL7       = '${BODY.VAL7}'
//                               ,  @VAL8       = '${BODY.VAL8}'
//                               ,  @VAL9       = '${BODY.VAL9}'
//                               ,  @VAL10      = '${BODY.VAL10}'
//                               ,  @IMG     = '${BODY.IMG}'
//                               ,  @SIZE      = '${BODY.SIZE}'
//       `);
//     return EXEC.recordset;
//   } catch (error) {
//     console.log(error);
//   }
// };

const SQL_EXECI = async (BODY) => {
  try {
    // console.log(BODY);
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request().query(`
      ${BODY.VAL}
        SELECT 'DONE' msg ,   @@IDENTITY as ID

      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const SQL_EXEC_V2 = async (BODY) => {
  try {
    // console.log(BODY);
    let pool = await sqlConnectionToDB.connect(config);
    let EXEC = await pool.request().query(`
      ${BODY.VAL}
        
      `);
    return EXEC.recordset;
  } catch (error) {
    console.log(error);
  }
};

const Login = async (userInfo) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let getEmployees = await pool.request().query(
      `
        
	 SELECT
      ID  ,firstname , lastname ,
      midname,
      username,
      password,
      Departmnt   [Department],
      position,
      Mobilenumber , 
      ValTraceQrCode ValTraceQrCode
     
        
       ,B.*
        ,SAPMain.dbo.fnDMF_GetAccountingCodes(B.U_profit ) profitName
	   ,SAPMain.dbo.fnDMF_GetAccountingCodes(B.U_cost) costName
	   ,SAPMain.dbo.fnDMF_GetAccountingCodes(B.U_section) sectionname

	   into #TEMP
        FROM OUSM  A 
								LEFT JOIN SAPMain.DBO.[@oDEM] B on B.code = A.pplsDeparment collate SQL_Latin1_General_CP1_CI_AS
where



                                      password ='${userInfo.password}'
                                  and username ='${userInfo.username}'
                                  and void = 1


								  	    SELECT * FROM  #TEMP uNION ALL
										select '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , ''  , ''  , ''  , ''   
										drop table #TEMP
      `
    );
    console.log(getEmployees);
    return getEmployees.recordset;
  } catch (error) {
    console.log(error);
  }
};

const sqlEXECHeader = async (userInfo) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let execSQL = await pool.request().query(`${userInfo.sql}`);
    console.log(execSQL);
    return execSQL.recordset;
  } catch (error) {
    console.log(error);
  }
};

const insertUsagemaster = async (e) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let sql = `
      insert into OUGS	(TypeEntry,RevEntry,Usage,Size,UoM,Date,ItemCode)
    `;
    e.MaterialList.map((item) => {
      sql += ` 
      values('${e.HeaderInfo.ProrationType}', '${e.HeaderInfo.Revision}', '${item.qty}', '${e.HeaderInfo.Size}', '${item.uom}', "2022-09-02", "itemcode"),`;
    });
    sql = sql.slice(0, -1);
    console.log(sql);
    return sql;
  } catch (error) {}
};

const createUser = async (props) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let sql = `INSERT INTO OUSM
			(  firstname,   midname,lastname,createdBy,createdDate,updatedBy,updatedDate,username,[password],void,Departmnt,Mobilenumber,ValTraceQrCode)
		VALUES
			( '${props.firstname}'	,'' ,'${props.lastname}',3103,'2020-08-08',3103,'2020-08-08','${props.username}','${props.password}',1,1,1,'${props.ValTraceQrCode}')
          declare @id as int  =  @@IDENTITY
        INSERT INTO OPGU
                (moduleID
                ,moduleSecton
                ,void,userid)
          VALUES`;

    props.modList.map((item, index) => {
      if (item !== 0)
        sql += `
      ('${item}','Modules',1,@id),`;
    });

    sql = sql.slice(0, -1);

    console.log(sql);
    let get = await pool.request().query(sql);
    return get.recordset;
  } catch (error) {}
};

const InsertUsers = async (Employee) => {
  try {
    let pool = await sqlConnectionToDB.connect(config);
    let getEmployees = await pool.request().query(`INSERT INTO OUSM
			(  firstname,   midname,lastname,createdBy,createdDate,updatedBy,updatedDate,username,[password],void,Departmnt,Mobilenumber)
		VALUES
			( '${Employee.firstname}'	,'${Employee.middlename}' ,'${Employee.lastname}',3103,'2020-08-08',3103,'2020-08-08','${Employee.username}','${Employee.password}',1,1,111)`);
    console.log(getEmployees);
    return getEmployees.recordset;
  } catch (error) {
    console.log(error);
  }
};

const InsertUsage = async (Usage) => {
  try {
    // make this a rollback transaction
    console.log(Usage);
    let pool = await sqlConnectionToDB.connect(config);
    let iLineVal = "";
    Usage.BOM.map((item, index) => {
      if (item.Qty > 0) {
        iLineVal =
          iLineVal +
          `(@ID,'${item.ItemCode}'
        ,${item.Qty}
        ,${item.adj}
        ,'${item.UomCode}'
        ,'1'),`;
      }
    });
    iLineVal = iLineVal.slice(0, -1);
    console.log(iLineVal);
    iLineVal =
      `  DECLARE @NOW	as DateTIme = convert(datetime,GETDATE(),2)

    INSERT INTO OUSG
               (ProrType
               ,PostingDate
               ,Reference
               ,Batch
               ,CreatedBy
               ,Remarks
               ,Station
               ,ReceivedBy
               ,[Status]
               ,NTSSVer	
               ,NTSS	
               ,NTSSSolid	
               ,NTSSWaer
               ,Machine
               ,Size
               ,Revision
               ,MnfDate
               ,void 
                )

         VALUES

    ('${Usage.PRORTYPE}', @NOW,'${Usage.REFERENCE}','${Usage.BATCH}',${Usage.USERID},'${Usage.REMARKS}','${Usage.STATION}',0,'O'
    ,'${Usage.NTSSVer}'
    ,'${Usage.NTSS}'
    ,'${Usage.NTSSSolid}'
    ,'${Usage.NTSSWaer}'
    ,'${Usage.Machine}'
    ,'${Usage.Size}'
    ,'${Usage.Revision}'
    ,'${Usage.MnfDate}'
    ,'1'
    
    )
    declare @ID  as int  = @@IDENTITY
    INSERT USG1
    (DocEntry,Item,qty,adj,UoM,void)
    values
    ` +
      iLineVal +
      `
                SELECT @@IDENTITY as ID
                insert	into USG3 (DocEntry , code , void)  values
    `;

    let machinesSQL = "";
    Usage.machines.map((e) => {
      machinesSQL += `	(@ID,'${e.code}','1') ,`;
    });
    machinesSQL = machinesSQL.slice(0, -1);

    iLineVal += machinesSQL;
    let iHeader = await pool.request().query(iLineVal);

    return iHeader.recordset;
  } catch (error) {
    console.log("errorxx");
    console.log(error);
    return error;
  }
};

const InsertWeighingBatch = async (props) => {
  let pool = await sqlConnectionToDB.connect(config);
  let syntax = ` 
  DECLARE @NOW	as DateTIme = convert(datetime,GETDATE(),2)

  INSERT INTO USG2
           (docEntry
            ,lineNum
           ,Batch
           ,Qty
           ,CreatedTime 
           ,CreatedBy
           ,void)
     VALUES  `;

  props.BATCH.map((item, index) => {
    if (item.id > 0) {
      syntax =
        syntax +
        `(${item.DocEntry},${item.index},'${item.batch}',${item.quantity},@NOW,${item.User},'1'),`;
    }
  });
  syntax = syntax.slice(0, -1);
  syntax =
    syntax +
    ` SELECT ${props.BATCH[1].DocEntry} as ID
      if ${props.OVERNEED}  = 0 BEGIN
        update OUSG
        set Status  = 'C'
        where id = ${props.DOCENTRY}
      END 
  `;
  console.log(syntax);
  let query = await pool.request().query(syntax);
  return query.recordset;
};

module.exports = {
  GetUsers,
  InsertUsers,
  InsertUsage,
  InsertWeighingBatch,
  Login,
  GetITRDraft,
  UpdateITRStatus,
  GetITRStatus,
  SQL_EXEC,
  createUser,
  insertUsagemaster,
  SQL_EXECI,
  SQL_EXEC_V2,
  sqlEXECHeader,
  SQL_EXECABC,
  SQL_EXEC_DMAPI,
  EXEC_INSERT,
  prevDelivery_MJ,
  getDPUR_MJ,
  batchSelection_MJ,
  julianSelection_MJ,
  getEmployees_MJ,
  getProfitCenterName_MJ,
  RFPREPORT_MJ,
  RFP_MJ,
  GETGRBATCH_MJ,
  DRContents_MJ,
  PostedAR_MJ,
  InsertORFP_MJ,
  GetRFPSMJ,
  UpdateORFPStatusMJ,
  UpdateORFPDecisionMJ,
  SaveMessageIdMJ,
  GetApproverMessageIdMJ,
  getAPDraftMJ,
  pendingRFP,
  approvedRFP,
  checkMOQConsumablesMJ,
  checkInstockMJ,
  UpdateORFPisReceivedMJ,
  costCenterListMJ,
};
