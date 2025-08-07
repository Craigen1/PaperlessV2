const SL_API_IFP = (rows) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "B1SESSION=ac8a282a-279b-11ee-8000-00505684e458; ROUTEID=.node7"
  );
  //   var raw = JSON.stringify({

  var raw = {
    "odata.metadata":
      "https://10.50.79.53:50000/b1s/v1/$metadata#InventoryGenExits/@Element",
    DocType: "dDocument_Items",
    DocDate: "2023-07-19",
    DocDueDate: "2023-07-19",
    BPL_IDAssignedToInvoice: 1,
    Comments: "Created With ServiceLayer-Paperless",
    U_PreparedBy: "DEANMARK FAMOLERAS",
    U_MNFDate: "2023-07-19",
  };
  var newRows = "";
  rows.map((item) => {
    newRows = [
      ...newRows,
      {
        LineNum: 0,
        Quantity: 1,
        WarehouseCode: "22320001",
        AccountCode: "525412100",
        CostingCode: "10",
        BaseType: 202,
        BaseEntry: 4850,
        BaseLine: 4,
        CostingCode2: "DMP",
        CostingCode3: "DMP11",
        BatchNumbers: [
          {
            BatchNumber: "240922-10E1",
            ExpiryDate: "2024-09-22",
            ManufacturingDate: "2022-09-22",
            AddmisionDate: "2023-07-10",
            Quantity: 1,
            BaseLineNumber: 0,
            ItemCode: "300544",
          },
        ],
      },
    ];
  });
  // newRows = JSON.stringify([raw,  "DocumentLines": [...newRows]]);

  const obj = {
    "odata.metadata":
      "https://10.50.79.53:50000/b1s/v1/$metadata#InventoryGenExits/@Element",
    DocType: "dDocument_Items",
    DocDate: "2023-07-19",
    DocDueDate: "2023-07-19",
    BPL_IDAssignedToInvoice: 1,
    Comments: "Created With ServiceLayer-Paperless",
    U_PreparedBy: "DEANMARK FAMOLERAS",
    U_MNFDate: "2023-07-19",
    DocumentLines: [...newRows],
  };

  const stringify = JSON.stringify(obj);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  console.log({ stringify });
  return;
  fetch("https://10.50.79.53:50000/b1s/v1/InventoryGenExits(1)", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("errxor", error));
};
module.exports = {
  SL_API_IFP,
};
