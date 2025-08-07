const express = require("express"),
  dbOperations = require("./dbFiles/dbOperations"),
  API = require("./src/components/DMF_SAP_API/ServiceLayer_API"),
  cors = require("cors");
const Employee = require("./dbFiles/employee");
const nodemailer = require("nodemailer");

const API_PORT = process.env.PORT || 5000;
const app = express();
let client;
let session;
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://10.50.79.52:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, access-control-allow-origin"
  );

  res.setTimeout(120000, function () {
    console.log("Request has timed out.");
    res.send(408);
  });

  next();
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://10.10.10.211:3000"); // Replace * with your allowed origin(s)
//   res.header("Access-Control-Allow-Methods", "GET, POST");
//   res.header("Access-Control-Allow-Headers");
//   next();
// });

app.get("/", function (req, res) {
  res.send("Express is working on IISNode!");
});
app.get("/DMF_API", async function (req, res) {
  console.log(req.query);
  const users = await dbOperations.SQL_EXEC_DMAPI(req.query);
  res.json(users);
});

//MJ
app.get("/getEmployees", async (req, res) => {
  const getEmp = await dbOperations.getEmployees_MJ();
  res.send(getEmp);
});

app.get("/getProfitCenter", async (req, res) => {
  const getProfitCenter = await dbOperations.getProfitCenterName_MJ();
  res.send(getProfitCenter);
});

app.post("/prevdelivery/:search", async (req, res) => {
  const prevDel = await dbOperations.prevDelivery_MJ(req.params.search);
  res.send(prevDel);
});

app.post("/getDPUR_MJ", async (req, res) => {
  const dpurNo = await dbOperations.getDPUR_MJ(req.body);
  res.send(dpurNo);
});

app.post("/batchDetails_MJ", async (req, res) => {
  // console.log("Body:", req.body);
  const batchSelectionDetails = await dbOperations.batchSelection_MJ(req.body);
  res.send(batchSelectionDetails);
});

app.post("/julianDetails_MJ", async (req, res) => {
  // console.log("Body:", req.body);
  const julianSelectionDetails = await dbOperations.julianSelection_MJ(
    req.body
  );
  res.send(julianSelectionDetails);
});

app.post("/deliveryNote_MJ", async (req, res) => {
  try {
    let loginRaw = JSON.stringify({
      UserName: "IPICPADM03",
      Password: "!Pic030122",
      CompanyDB: "SAPMain",
    });
    let loginResponse = await fetch("https://10.50.79.53:50000/b1s/v1/Login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: loginRaw,
    }).then((res) => {
      return res.json();
    });
    const loginData = await loginResponse;
    console.log(loginData.SessionId);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + loginData.SessionId + "; ROUTEID=.node5"
    );
    const response = await fetch(
      "https://10.50.79.53:50000/b1s/v1/DeliveryNotes",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(req.body),
        redirect: "follow",
      }
    );
    console.log("Req.Body:", JSON.stringify(req.body));
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from SAP B1, Please contact your admin!", errorData);
      return res.status(400).json({
        error: {
          code: errorData.error.code,
          message: errorData.error.message.value,
        },
      });
    }
    const data = await response.json();
    //console.log("Delivery Note Status:", data);
    res.send({
      data,
      message: "Delivery posted, you can check to Search Delivery Tab",
    });
  } catch (err) {
    console.log("Error DNote API:", err);
  }
});

app.post("/getDRNo_MJ", async (req, res) => {
  console.log("Full DR:", req.body.drnum);
  console.log("DR SESSIONID:", req.body.sessionid);
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.sessionid + "; ROUTEID=.node5"
    );
    const response = await fetch(
      `https://10.50.79.53:50000/b1s/v1/InventoryGenEntries?$select=Reference2&$filter=Reference2 eq '${req.body.drnum}'`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from SAP B1, Please contact your admin!", errorData);
      return res.status(400).json({
        error: {
          code: errorData.error.code,
          message: errorData.error.message.value,
        },
      });
    }
    const data = await response.json();
    console.log("DR Number:", data.value);
    res.send({
      data: data.value,
    });
  } catch (err) {
    console.log("Error Get DR Number:", err);
  }
});

app.post("/GRBATCH_MJ", async (req, res) => {
  const grbatch = await dbOperations.GETGRBATCH_MJ(req.body);
  res.send(grbatch);
});

app.post("/RFPREPORT_MJ", async (req, res) => {
  const rfpreport = await dbOperations.RFPREPORT_MJ(req.body);
  res.send(rfpreport);
});

app.post("/RFP_MJ", async (req, res) => {
  const rfp = await dbOperations.RFP_MJ(req.body);
  res.send(rfp);
});

app.post("/DRContentsMJ", async (req, res) => {
  const dr = await dbOperations.DRContents_MJ(req.body);
  res.send(dr);
});

app.post("/B1POST", async (req, res) => {
  try {
    let loginRaw = JSON.stringify({
      UserName: "IPICPADM03",
      Password: "!Pic030122",
      CompanyDB: "SAPMain",
    });
    let loginResponse = await fetch("https://10.50.79.53:50000/b1s/v1/Login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: loginRaw,
    }).then((res) => {
      return res.json();
    });
    const loginData = await loginResponse;
    console.log(loginData.SessionId);
    console.log(req.body.objectType);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + loginData.SessionId + "; ROUTEID=.node5"
    );
    const response = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(req.body.data),
        redirect: "follow",
      }
    );
    console.log("Req.Body:", JSON.stringify(req.body.data));
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from SAP B1, Please contact your admin!", errorData);
      return res.status(400).json({
        error: {
          code: errorData.error.code,
          message: errorData.error.message.value,
        },
      });
    }
    const data = await response.json();
    // console.log("Invoices Status:", data);
    res.send({
      data,
      message: "Successfully posted. You can view it in SAP B1.",
    });
  } catch (err) {
    console.log("Error Server API:", err);
  }
});

app.post("/PostedAR_MJ", async (req, res) => {
  console.log(req.body);
  const SI = await dbOperations.PostedAR_MJ(req.body);
  res.send(SI);
});

app.get("/api/rfpstatus", async (req, res) => {
  const { rfpNum, action } = req.query;
  console.log({ rfpNum, action });
  const newStatus = action === "Approved" ? "Approved" : "Rejected";
  await dbOperations.UpdateORFPDecisionMJ(rfpNum, newStatus);

  const result = await dbOperations.GetApproverMessageIdMJ(rfpNum);
  const { ApproverEmail, MessageId, Decision } = result[0];

  console.log("Mess:", { ApproverEmail, MessageId, Decision });

  const transporter = nodemailer.createTransport({
    host: "mail.innovativepkg.com.ph",
    port: 587,
    secure: false,
    auth: {
      user: "mjpena@innovativepkg.com.ph ",
      pass: "MyPassword123456",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: ApproverEmail,
    to: "cnoriega@innovativepkg.com.ph",
    cc: `${ApproverEmail}, jpaculba@innovativepkg.com.ph, cnoriega@innovativepkg.com.ph, mljose@innovativepkg.com.ph, mjpena@innovativepkg.com.ph`,
    subject: `Re: Request for Payment: ${rfpNum}`,
    html: `
  <p>Good day!</p>
  <p>Your Request for Payment (RFP) has been <strong>${Decision}</strong>.</p>
  <p>If you have any questions, please feel free to reach out.</p>
  <p>Thank you.</p>
  <p><em>-- Paperless RFP Module</em></p>
`,
    headers: {
      "In-Reply-To": MessageId,
      References: MessageId,
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send(`
  <html>
    <head>
      <title>RFP Decision Received</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f3f4f6;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        .card h2 {
          color: ${Decision === "Rejected" ? "#DC2626" : "#16A34A"};
          font-size: 24px;
          margin-bottom: 16px;
        }
        .card p {
          color: #4B5563;
          font-size: 14px;
          margin-top: 10px;
        }
        .icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">
          ${Decision === "Rejected" ? "❌" : "✅"}
        </div>
        <h2>${rfpNum} has been ${Decision}!</h2>
        <p>This response has been recorded successfully.</p>
      </div>
    </body>
  </html>
`);
  } catch (err) {
    console.error("Error sending threaded reply email", err);
    res.status(500).send("Failed to send threaded reply.");
  }
});

app.post("/send-emailMJ", async (req, res) => {
  const { email, rfpNum, requestor, forBranch, forRemarks, sINumber } =
    req.body;
  console.log("SERVER EMAIL:", email);

  const encodedRfpNum = encodeURIComponent(rfpNum.RFPCode);
  const approveLink = `http://10.50.79.52:5000/api/rfpstatus?rfpNum=${encodedRfpNum}&action=Approved`;
  const rejectLink = `http://10.50.79.52:5000/api/rfpstatus?rfpNum=${encodedRfpNum}&action=Rejected`;
  const transporter = nodemailer.createTransport({
    host: "mail.innovativepkg.com.ph",
    port: 587,
    secure: false,
    auth: {
      user: "mjpena@innovativepkg.com.ph ",
      pass: "MyPassword123456",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: '"Paperless RFP" <mjpena@innovativepkg.com.ph>',
    to: email + "@innovativepkg.com.ph",
    cc: "jpaculba@innovativepkg.com.ph, cnoriega@innovativepkg.com.ph, mljose@innovativepkg.com.ph, mjpena@innovativepkg.com.ph",
    subject: "Request for Payment",
    html: `
  <p>Good day!</p>
  <p>You have a pending <strong>Request for Payment</strong> (${rfpNum.RFPCode}) with ${sINumber} awaiting your approval.</p>
  <p>Requestor: ${requestor}</p>
  <p>Branch: ${forBranch}</p>
  <p>Remarks: ${forRemarks}</p>
   <p style="text-align: center; margin-top: 20px;">
  <a href="${approveLink}" 
     style="
       display: inline-block;
       padding: 10px 24px;
       margin-right: 12px;
       background-color: #38A169;
       color: #fff;
       font-weight: 600;
       text-decoration: none;
       border-radius: 6px;
       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       box-shadow: 0 4px 8px rgba(56, 161, 105, 0.3);
       transition: background-color 0.3s ease;
     "
     onmouseover="this.style.backgroundColor='#2F855A';"
     onmouseout="this.style.backgroundColor='#38A169';"
  >
    ✅ Approve
  </a>
  <a href="${rejectLink}" 
     style="
       display: inline-block;
       padding: 10px 24px;
       background-color: #E53E3E;
       color: #fff;
       font-weight: 600;
       text-decoration: none;
       border-radius: 6px;
       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       box-shadow: 0 4px 8px rgba(229, 62, 62, 0.3);
       transition: background-color 0.3s ease;
     "
     onmouseover="this.style.backgroundColor='#C53030';"
     onmouseout="this.style.backgroundColor='#E53E3E';"
  >
    ❌ Reject
  </a>
</p>
  <p>Thank you.</p>
`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    const messageId = info.messageId;
    await dbOperations.SaveMessageIdMJ(rfpNum.RFPCode, messageId);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully!", messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.post("/rfpsMJ", async (req, res) => {
  console.log(req.body);
  const getRFPS = await dbOperations.GetRFPSMJ(req.body);
  res.send(getRFPS);
});

app.post("/ORFPMJ", async (req, res) => {
  console.log("SERVER:", req.body);
  const exec = await dbOperations.InsertORFP_MJ(req.body);
  console.log("RFP#", exec.RFPCode);
  res.send(exec).end();
});

app.post("/updateStatusMJ", async (req, res) => {
  console.log("Update", req.body);
  const exec = await dbOperations.UpdateORFPStatusMJ(req.body);
  res.send(exec).end();
});

app.get("/api", function (req, res) {
  console.log("GET request");
  res.send({ result: "GET request" });
});

app.post("/userLogin", async (req, res) => {
  console.log(req.body);
  const users = await dbOperations.Login(req.body);
  //console.log(users);
  res.send(users);
});

app.post("/uploadSBOipic", async (req, res) => {
  console.log(req.body);
  const users = await dbOperations.sqlEXECHeader(req.body);
  //console.log(users);
  res.send(users);
});

app.post("/itr_draft", async (req, res) => {
  //console.log(req.body);
  const draft = await dbOperations.GetITRDraft(req.body.DocNum);
  res.send(draft);
});

app.post("/api/ITRStatus", async (req, res) => {
  //console.log(req.body);
  const status = await dbOperations.GetITRStatus(req.body.DOCNUM);
  //console.log(status);
  res.send(status);
});

app.post("/PO_LIST", async (req, res) => {
  //console.log(req.body);
  const poList = await dbOperations.SQL_EXEC(req.body);
  res.send(poList);
});
// name
app.post("/EXEC", async (req, res) => {
  try {
    console.log(req.body);
    const exec = await dbOperations.SQL_EXEC(req.body);
    console.log(exec);
    res.send(exec).end();
  } catch (error) {
    res.send("400").end();
  }
});
app.post("/EXEC_INSERT", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.EXEC_INSERT(req.body);
  console.log(exec);
  res.send(exec).end();
});
app.post("/EXEC_V2", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.SQL_EXEC_V2(req.body);
  console.log(exec);
  res.send(exec).end();
});

app.post("/EXECI", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.SQL_EXECI(req.body);
  console.log(exec);
  res.send(exec).end();
});
app.post("/InsertUsage", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.InsertUsage(req.body);
  console.log({ exec });
  res.send(exec).end();
});

app.post("/createUser", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.createUser(req.body);
  console.log(exec);
  res.send(exec).end();
});
app.post("/insertUsageMaster", async (req, res) => {
  // console.log(req.body);
  const exec = await dbOperations.insertUsagemaster(req.body).then(() => {
    console.log(exec.response);
  });
  // res.send(exec).end();;
});
app.post("/InsertWeighingBatch", async (req, res) => {
  try {
    console.log(req.body);
    const exec = await dbOperations.InsertWeighingBatch(req.body);
    res.send(exec).end();
  } catch (error) {
    res.send(error);
    console.log({ error });
  }
});

app.post("/EXECABC", async (req, res) => {
  console.log(req.body);
  const exec = await dbOperations.SQL_EXECABC(req.body);
  console.log(exec);
  res.send(exec).end();
});

app.post("/LOGIN_API", async (req, res) => {
  try {
    var loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/json");
    console.log("1");
    var loginRaw = JSON.stringify({
      UserName: "B1i",
      Password: "P@ssw0rd12",
      CompanyDB: "SAPMain",
    });
    console.log("2");

    var requestOptions = {
      method: "POST",
      headers: loginHeader,
      body: loginRaw,
      redirect: "follow",
    };
    console.log("3");
    const a = await fetch(
      "https://10.50.79.53:50000/b1s/v1/Login",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log("error", error));
    console.log("x");
    res.set("Access-Control-Allow-Origin", "*");
    console.log(a.SessionId);
    res.send(a);
  } catch (error) {
    console.log(error);
  }
});

app.post("/API_LOGIN", async (req, res) => {
  try {
    var loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/json");
    console.log("1");
    var loginRaw = JSON.stringify({
      UserName: req.body.USER,
      Password: req.body.PASS,
      CompanyDB: "SAPMain",
    });
    console.log("2");
    console.log(req.body.USER);
    console.log(req.body.PASS);

    var requestOptions = {
      method: "POST",
      headers: loginHeader,
      body: loginRaw,
      redirect: "follow",
    };
    console.log("3");
    const a = await fetch(
      "https://10.50.79.53:50000/b1s/v1/Login",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log("error", error));
    console.log("x");
    res.set("Access-Control-Allow-Origin", "*");
    console.log(a.SessionId);
    res.send(a);
  } catch (error) {
    console.log(error);
  }
});

app.post("/SERVICELAYER_LOGIN", async (req, res) => {
  try {
    var loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/json");
    console.log("1");
    var loginRaw = JSON.stringify({
      UserName: req.body.user,
      Password: req.body.pass,
      CompanyDB: "SAPMain",
    });
    console.log("2");

    var requestOptions = {
      method: "POST",
      headers: loginHeader,
      body: loginRaw,
      redirect: "follow",
    };
    console.log("3");
    const a = await fetch(
      "https://10.50.79.53:50000/b1s/v1/Login",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log("error", error));
    console.log("x");
    res.set("Access-Control-Allow-Origin", "*");
    console.log(a.SessionId);
    res.send(a);
  } catch (error) {
    console.log(error);
  }
});

app.get("/IT_API", async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "B1SESSION=8a96e288-2469-11ee-8002-00505684e458; ROUTEID=.node10"
  );
  const exec = await fetch(
    "https://10.50.79.53:50000/b1s/v1/InventoryTransferRequests(168041)"
  ).then((response) => {
    return response.json();
  });
  res.send(exec);
});

app.post("/ZIMBRAAPI", async (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    "Basic c2FwZGV2QGlubm92YXRpdmVwa2cuY29tLnBoOiEjQWRtaW4jIQ=="
  );
  myHeaders.append(
    "Cookie",
    "__cfruid=eb044225e5b953171d420b68540cc686a2bcebba-1689660521; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const exec = await fetch(
    `https://ipichelpdesk.zendesk.com/api/v2/incremental/tickets/cursor.json?start_time=${req.body.EPOCH}`,
    requestOptions
  ).then((response) => response.json());
  res.send(exec);
});

app.get("/ZIMBRAAPIUSERS", async (req, res) => {
  var header = new Headers();
  header.append("Accept", "application/json");
  header.append(
    "Authorization",
    "Basic c2FwZGV2QGlubm92YXRpdmVwa2cuY29tLnBoOiEjQWRtaW4jIQ=="
  );
  header.append(
    "Cookie",
    "__cfruid=9df5e1f3d0ab5f4ceb7397ca4ea2ef8712d4fd47-1689730957; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca"
  );

  var requestOptions = {
    method: "GET",
    headers: header,
    redirect: "follow",
  };

  const exec = await fetch(
    "https://ipichelpdesk.zendesk.com/api/v2/users",
    requestOptions
  ).then((response) => response.json());
  res.send(exec);
});

//TEST GI_MJ
app.post("/GI_API_LOGIN_MJ", async (req, res) => {
  try {
    var loginHeader = new Headers();
    loginHeader.append("Content-Type", "application/json");
    var loginRaw = JSON.stringify({
      UserName: "B1i",
      Password: "P@ssw0rd12",
      CompanyDB: "SAPMain",
    });
    const a = await fetch("https://10.50.79.53:50000/b1s/v1/Login", {
      method: "POST",
      headers: loginHeader,
      body: loginRaw,
      redirect: "follow",
    });
    const data = await a.json();
    res.set("Access-Control-Allow-Origin", "*");
    console.log(data.SessionId);
    res.send(data);
  } catch (error) {
    console.log("GI_API_LOGIN_MJ", error);
  }
});
app.post("/GI_MJ", async (req, res) => {
  console.log("BODY_GI_MJ:", req.body);
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node5"
    );
    const response = await fetch(
      "https://10.50.79.53:50000/b1s/v1/InventoryGenExits",
      {
        method: "POST",
        headers: myHeaders,
        body: req.body.json,
        redirect: "follow",
      }
    );
    const data = await response.json();
    console.log("DATA_GI_MJ:", data);
    res.send(data);
  } catch (err) {
    console.log("Error GI_MJ API:", err);
  }
});

// app.post("/GI_API", async (req, res) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Prefer", "return-no-content");
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append(
//     "Cookie",
//     // "B1SESSION=3839c5d8-46e1-11ee-8000-00505684e458; ROUTEID=.node7"
//     "B1SESSION=" + req.body.session + "; ROUTEID=.node5" //old ROUTEID=.node6
//   );
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: req.body.json,
//     redirect: "follow",
//   };

//   const x = await fetch(
//     "https://10.50.79.53:50000/b1s/v1/InventoryGenExits",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .catch((error) => console.log("error", error));
//   res.send(x);
// });

// app.post("/GI_API", async (req, res) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Prefer", "return-no-content");
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append(
//     "Cookie",
//     // "B1SESSION=3839c5d8-46e1-11ee-8000-00505684e458; ROUTEID=.node7"
//     "B1SESSION=" + req.body.session + "; ROUTEID=.node5" //old ROUTEID=.node6
//   );
//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: req.body.json,
//     redirect: "follow",
//   };

//   const x = await fetch(
//     "https://10.50.79.53:50000/b1s/v1/InventoryGenExits",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .catch((error) => console.log("error", error));
//   res.send(x);
// });

// app.post("/SERVERLAYER_POST_API", async (req, res) => {
//   try {
//     console.log(req.body.body);
//     var myHeaders = new Headers();
//     myHeaders.append("Prefer", "return-no-content");
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append(
//       "Cookie",
//       "B1SESSION=" + req.body.session + "; ROUTEID=.node9"
//     );

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: req.body.body,
//       redirect: "follow",
//     };
//     console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
//     const x = await fetch(
//       `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

//       requestOptions
//     )
//       .then((response) => response.json())
//       .catch((error) => console.log("error", error));
//     res.send(x);
//   } catch (error) {}
// });

app.post("/SERVERLAYER_POST_API", async (req, res) => {
  try {
    console.log(req.body.body);
    var myHeaders = new Headers();
    myHeaders.append("Prefer", "return-no-content");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node5" //old ROUTEID=.node9
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: req.body.body,
      redirect: "follow",
    };
    console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
    const x = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

      requestOptions
    )
      .then((response) => {
        console.log(response);
        console.log("response");
        res.send(response);
      })
      .catch((error) => console.log("error", error));
    res.send(x);
  } catch (error) {}
});

app.post("/SERVERLAYER_POST_APIV2", async (req, res) => {
  try {
    console.log(req.body.body);
    var myHeaders = new Headers();
    myHeaders.append("Prefer", "return-no-content");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node9"
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: req.body.body,
      redirect: "follow",
    };
    console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
    const x = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

      requestOptions
    )
      .then((response) => {
        if (response.status == 400) {
          console.log(response);
          res.send("400").end();
        } else res.send("200").end();
      })
      .catch((error) => console.log("error", error));
    res.send(x);
  } catch (error) {}
});

//STAGING(working) changes -->ROUTEID=.node9 from ROUTEID=.node5
app.post("/SERVERLAYER_POST_APIV3.1", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body.body));
    var myHeaders = new Headers();
    myHeaders.append("Prefer", "return-no-content");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node5" // routeid issue
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(req.body.body),
      redirect: "follow",
    };
    console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
    const x = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

      requestOptions
    )
      .then((response) => {
        if (response.status == 400) res.send("400").end();
        else res.send("200").end();
      })
      .catch((error) => console.log("error", error));
    res.send(x);
  } catch (error) {}
});

//PRODUCTION
app.post("/SERVERLAYER_POST_APIV3", async (req, res) => {
  try {
    console.log(req.body.body);
    var myHeaders = new Headers();
    myHeaders.append("Prefer", "return-no-content");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node5" //old ROUTEID=.node9
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: req.body.body,
      redirect: "follow",
    };
    console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
    const x = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

      requestOptions
    )
      .then((response) => {
        if (response.status == 400) res.send("400").end();
        else res.send("200").end();
      })
      .catch((error) => console.log("error", error));
    res.send(x);
  } catch (error) {}
});

app.post("/SERVERLAYER_POST_APIV4", async (req, res) => {
  try {
    console.log(req.body.body);
    var myHeaders = new Headers();
    myHeaders.append("Prefer", "return-no-content");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "B1SESSION=" + req.body.session + "; ROUTEID=.node5" //old ROUTEID=.node9
    );
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: req.body.body,
      redirect: "follow",
    };
    console.log(`https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`);
    const x = await fetch(
      `https://10.50.79.53:50000/b1s/v1/${req.body.objectType}`,

      requestOptions
    )
      .then((response) => response.text())
      .then((result) => res.send(result))
      .catch((error) => console.log("error", error));
    res.send(x);
  } catch (error) {}
});

app.listen(API_PORT, () => console.log(`Server started on port ${API_PORT}`));
