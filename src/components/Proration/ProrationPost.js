import {
  EXEC_SQL_InsertMulti,
  EXEC_SQL_InsertMulti_V2,
  EXEC_SQL_InsertMulti_V3,
  EXEC_SQL_InsertOne,
  EXEC_SQL_V2,
} from "../ComponentList";
import { formatDate } from "date-fns";

export const ProrationPostLogin = async (
  BOM,
  MaterialUsage,
  HeaderValues,
  Variant,
  userInfo,
  DateNow,
  setPostingLoading,
  msg,
  setWater,
  draftNumber
) => {
  setPostingLoading(true);
  msg("loging in to sap");
  // await SaveAsDraft();
  // console.log(HeaderValues);

  // setPostingLoading(false);

  try {
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
    console.log(d.SessionId);

    if (d.SessionId != undefined) {
      msg("Login successful");
      await Postp(
        d.SessionId,
        BOM,
        MaterialUsage,
        HeaderValues,
        Variant,
        userInfo,
        DateNow,
        setPostingLoading,
        msg,
        setWater,
        draftNumber
      );
    }
  } catch (error) {
    console.log({ error });
    msg(JSON.stringify(error));
    setPostingLoading(false);
  }
};

// export const Submit = async (
//   SessionId,
//   BOM,
//   MaterialUsage,
//   HeaderValues,
//   Variant,
//   userInfo,
//   DateNow,
//   setPostingLoading,
//   msg
// ) => {
//   let xx = [];

//   let lineNum = 0;
//   Variant.map((v, iv) => {
//     MaterialUsage.map((u, iu) => {
//       let filteredBom = BOM.filter(
//         (f) => f.ItemCodePO == v.ItemCode && f.ItemCode == u.ItemCode
//       ).map((ex, i) => {
//         return ex;
//       });
//       console.log({ u });
//       if (filteredBom.length > 0) {
//         xx = [
//           ...xx,
//           {
//             LineNum: lineNum,
//             Quantity: parseFloat(u[v.ItemCode]),
//             BaseEntry: filteredBom[0].docEntry,
//             BaseLine: filteredBom[0].LineNum,
//             BaseType: 202,
//             U_TransType: u.Remarks == undefined || u.Remarks == "" ? "R" : "C",
//             U_Remarks: u.Remarks == undefined && "",
//             BatchNumbers: [
//               {
//                 BatchNumber: u.BatchDetails,
//                 Quantity: parseFloat(u[v.ItemCode]),
//                 BaseLineNumber: lineNum,
//               },
//             ],
//           },
//         ];
//         lineNum++;
//       }
//     });
//   });

//   // xx = [
//   //   {45
//   //     Series: 20,
//   //     BPL_IDAssignedToInvoice: 1,
//   //     U_MNFDate: "2024-05-07",
//   //   },
//   //   ...xx,
//   // ];

//   // console.log({ xx });
//   let LineJson = JSON.stringify({
//     xx,
//   });
//   console.log(HeaderValues.ProductionDate);
//   let jsonHeader = JSON.stringify({
//     DocType: "dDocument_Items",
//     //HeaderValues.ProductionDate,
//     U_MNFDate: formatDate(HeaderValues.ProductionDate, "yyyy-MM-dd"),
//     BPL_IDAssignedToInvoice: 1,
//     U_PreparedBy:
//       userInfo.firstname.substring(0, 1).toUpperCase() +
//       "." +
//       userInfo.lastname.toUpperCase(),
//   });
//   LineJson = LineJson.substring(7, LineJson.length);
//   jsonHeader = jsonHeader.substring(0, jsonHeader.length - 1);
//   jsonHeader += ' ,"DocumentLines": [ ';

//   jsonHeader = jsonHeader + " " + LineJson + " ";
//   console.log({ jsonHeader });
// };

export const Postp = async (
  SessionID,
  BOM,
  MaterialUsage,
  HeaderValues,
  Variant,
  userInfo,
  DateNow,
  setPostingLoading,
  msg,
  setWater,
  draftNumber
) => {
  console.log(HeaderValues);
  let xx = [];
  msg("Posting to SAP");
  let lineNum = 0;
  Variant.map((v, iv) => {
    MaterialUsage.map((u, iu) => {
      // console.log({ u });
      let filteredBom = BOM.filter(
        (f) => f.ItemCodePO == v.ItemCode && f.ItemCode == u.ItemCode
      ).map((ex, i) => {
        return ex;
      });
      console.log({ u });
      if (filteredBom.length > 0) {
        xx = [
          ...xx,
          {
            LineNum: lineNum,
            Quantity: parseFloat(u[v.ItemCode]),
            BaseEntry: filteredBom[0].docEntry,
            BaseLine: filteredBom[0].LineNum,
            U_NTSSQty: parseFloat(u.NTSS || 0),
            U_Reject: parseFloat(u.Rejects || 0),
            U_FormulaAdj: parseFloat(u.FormulaAdj || 0),
            BaseType: 202,
            U_TransType:
              parseFloat(u.Rejects || 0) != 0
                ? "R"
                : parseFloat(u.FormulaAdj || 0) != 0
                ? "F"
                : "C",
            U_Remarks: u.Remarks,
            BatchNumbers: [
              {
                BatchNumber: u.BatchDetails,
                Quantity: parseFloat(u[v.ItemCode]),
                BaseLineNumber: lineNum,
              },
            ],
          },
        ];
        lineNum++;
      }
    });
  });
  // console.log({ xx });
  // setPostingLoading(false);

  // return;
  let LineJson = JSON.stringify({
    xx,
  });
  let jsonHeader = JSON.stringify({
    DocType: "dDocument_Items",
    U_MNFDate: formatDate(HeaderValues.ProductionDate, "yyyy-MM-dd"),
    U_ProrationNo: draftNumber,
    BPL_IDAssignedToInvoice: 1,
    U_PreparedBy:
      userInfo.firstname.substring(0, 1).toUpperCase() +
      "." +
      userInfo.lastname.toUpperCase(),
  });
  LineJson = LineJson.substring(7, LineJson.length);
  jsonHeader = jsonHeader.substring(0, jsonHeader.length - 1);
  jsonHeader += ` ,"DocumentLines": [ `;

  jsonHeader = jsonHeader + " " + LineJson + " ";
  //setPostingLoading(false);

  console.log({ jsonHeader });
  //return;
  const req = await fetch("SERVERLAYER_POST_APIV4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      body: jsonHeader,
      session: SessionID,
      objectType: "InventoryGenExits",
    }),
  });
  const response = await req.json();
  //console.log("body is " + response.body.needToBeVoted);
  console.log("body is " + JSON.stringify(response.body));
  console.log("status is " + response.status);
  console.log("all response is " + JSON.stringify(response));
  console.log("bodyUsed " + JSON.stringify(response.bodyUsed));
  msg(JSON.stringify(response).length > 0 ? JSON.stringify(response) : "200");
  alert(JSON.stringify(response));
  Variant.map((ee, ii) => {
    MaterialUsage.filter((f) => f.ItemCode == "RM00000022").map((ex, i) => {
      insertWater(
        setWater,
        ex[ee.ItemCode],
        ee.ItemCode,
        HeaderValues.ProductionDate
      );
    });
  });
  // .then((data) => {
  //   try {
  //     let xx = data.json().then((e) => {
  //       Variant.map((ee, ii) => {
  //         MaterialUsage.filter((f) => f.ItemCode == "RM00000022").map(
  //           (ex, i) => {
  //             insertWater(
  //               setWater,
  //               ex[ee.ItemCode],
  //               ee.ItemCode,
  //               HeaderValues.ProductionDate
  //             );
  //           }
  //         );
  //       });

  //       // msg(e);
  //       console.log(e);
  //     });
  //     console.log(xx);
  //     // msg(xx);
  //     setPostingLoading(false);
  //   } catch (error) {}
  // })
  // .then()
  // .catch((error) => {
  //   console.log({ error });
  //   msg(error);
  //   setPostingLoading(false);
  // });
  setPostingLoading(false);

  VoidProration(HeaderValues, setSaveAsDrafRes);
};

const insertWater = async (state, qty, fg, mnf) => {
  await EXEC_SQL_InsertOne(783, state, qty, fg, mnf);
};

export const PostWater = (
  BOM,
  MaterialUsage,
  HeaderValues,
  Variant,
  userInfo,
  DateNow,
  setPostingLoading,
  msg,
  setWater
) => {
  MaterialUsage.filter((f) => f.ItemCode == "RM00000022").map((ex, i) => {
    insertWater(
      setWater,
      ex[ee.ItemCode],
      ee.ItemCode,
      HeaderValues.ProductionDate
    );
  });
};

export const PostWater2 = (MaterialUsage, HeaderValues, setWater, Variant) => {
  Variant.map((ee, ii) => {
    MaterialUsage.filter((f) => f.ItemCode == "RM00000022").map((ex, i) => {
      insertWater(
        setWater,
        ex[ee.ItemCode],
        ee.ItemCode,
        HeaderValues.ProductionDate
      );
    });
  });
};

export const SaveAsDraft = async (
  BOM,
  MaterialUsage,
  HeaderValues,
  Variant,
  userInfo,
  DateNow,
  setPostingLoading,
  msg,
  setWater,
  setSaveAsDrafRes
) => {
  console.log({
    BOM,
    MaterialUsage,
    HeaderValues,
    Variant,
    userInfo,
    DateNow,
    setPostingLoading,
    msg,
    setWater,
  });

  let qryHeader = `	
  DECLARE @ID as int = 0 
  INSERT INTO OPRT (MnfDate,Station,ProrationType,void) VALUES ('${formatDate(
    HeaderValues.ProductionDate,
    "MM.dd.yyyy"
  )}', '${HeaderValues.Station}','${HeaderValues.ProrationType}',1 )
  set @ID = @@IDENTITY
  `;
  console.log({ qryHeader });
  let qryVariants = "INSERT INTO PRT1(docEntry,Po,void,FgCode) VALUES";
  let qryUsage =
    "INSERT INTO PRT2 (docEntry	,FgCode,itemcode,batch,actual,ntss,rejects,adj,remarks,void) VALUES";
  Variant.map((e, i) => {
    qryVariants += ` (@ID,'${e.PO}',1,'${e.ItemCode}'),`;
  });

  qryVariants = qryVariants.substring(0, qryVariants.length - 1);
  qryUsage = qryUsage.substring(0, qryUsage.length - 1);
  console.log(qryHeader + " " + qryVariants + " " + qryUsage);
  let rows = [];
  Variant.map((ee) => {
    MaterialUsage.map((e, i) => {
      if (e.Actual > 0)
        rows.push({
          docEntry: "@ID",
          FgCode: ee.ItemCode,
          itemcode: e.ItemCode,
          batch: e.BatchDetails,
          actual: e[ee.ItemCode],
          ntss: e.NTSS || 0,
          rejects: e.Rejects || 0,
          adj: e.FormulaAdj || 0,
          remarks: e.Remarks || 0,
          void: 1,
        });
    });
  });
  let finalQryA = qryHeader + " " + qryVariants; //+ " " + qryUsage;
  let fqrySplit = finalQryA.split("\n");
  let finalB = "";
  fqrySplit.map((e) => {
    finalB += e;
  });

  finalB = finalB.split("\t");
  let finalC = "";
  finalB.map((e) => {
    finalC += e;
  });

  // await EXEC_SQL_InsertOne(782, setSaveAsDrafRes, finalC);

  console.log({ rows });
  // const x = rows.map((item) => {
  //   return {
  //     DocEntry: "@@IDENTITY",
  //     ItemCode: item.ITEM,
  //     Quantity: item.Quantity,
  //     UoM: item.UoM,
  //     MNF: item.MNF,
  //     EXP: item.EXP,
  //     Suffix: item.Suffix,
  //     Palletize: item.PalletSize,
  //   };
  // });
  // console.log("2");
  /*
 ('${formatDate(
    HeaderValues.ProductionDate,
    "MM.dd.yyyy"
  )}', '${ HeaderValues.Station } ','${HeaderValues.ProrationType } ',1 )`;
  */
  // console.log({ rows });
  // return;
  let beforeSQL = `
  
		BEGIN TRANSACTION;  
  
		BEGIN TRY
    
    update OPRT set void = 0 where MnfDate	='${formatDate(
      HeaderValues.ProductionDate,
      "MM.dd.yyyy"
    )}' and Station	='${HeaderValues.Station}' and ProrationType='${
    HeaderValues.ProrationType
  }' 

  ${finalQryA}`;

  let afterSQL = ` 
   SELECT 0 ErrorNumber , @ID DraftID 
  
  	END TRY  
		BEGIN CATCH  
		SELECT   
			ERROR_NUMBER() AS ErrorNumber  
			,ERROR_SEVERITY() AS ErrorSeverity  
			,ERROR_STATE() AS ErrorState  
			,ERROR_PROCEDURE() AS ErrorProcedure  
			,ERROR_LINE() AS ErrorLine  
			,ERROR_MESSAGE() AS ErrorMessage;  
  
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION;  
		END CATCH;  
  
		IF @@TRANCOUNT > 0  
		COMMIT TRANSACTION;
    
    
  `;
  const colsSQL = [
    { name: "docEntry" },
    { name: "FgCode" },
    { name: "itemcode" },
    { name: "actual" },
    { name: "batch" },
    { name: "ntss" },
    { name: "rejects" },
    { name: "adj" },
    { name: "remarks" },
    { name: "void" },
  ];

  await EXEC_SQL_InsertMulti_V2(
    776,
    setSaveAsDrafRes,
    colsSQL,
    rows,
    "PRT2",
    beforeSQL,
    afterSQL
  );
  console.log("4");
};
export const VoidProration = async (HeaderValues, setSaveAsDrafRes) => {
  let beforeSQL = `update OPRT set void = 0 where MnfDate ='${formatDate(
    HeaderValues.ProductionDate,
    "MM.dd.yyyy"
  )}' and Station	='${HeaderValues.Station}' and ProrationType='${
    HeaderValues.ProrationType
  }'`;
  beforeSQL = beforeSQL.replace("\t", "");
  await EXEC_SQL_V2(768, setSaveAsDrafRes, beforeSQL);
  console.log("asd");
};
