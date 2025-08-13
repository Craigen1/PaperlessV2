export const GLAccountCode = [
  {
    code: "112310100",
    id: "Advances to Suppliers",
  },
  {
    code: "112310200",
    id: "Advances to Officers",
  },
  {
    code: "112310300",
    id: "Advances to Employees",
  },
  {
    code: "112310400",
    id: "Advances – SSS Benefits",
  },
  {
    code: "112310500",
    id: "Advances - Employee Loans",
  },
  {
    code: "112310600",
    id: "Advances Against Benefits",
  },
  {
    code: "616110400",
    id: "Taxes, Licenses, Permits and Registration",
  },
  {
    code: "615110800",
    id: "Transportation & Travel Expenses",
  },
  {
    code: "615111000",
    id: "Merchandising Expense",
  },
  {
    code: "615111100",
    id: "Meal Expense",
  },
  {
    code: "611110300",
    id: "Temp Contracted Labor",
  },
  {
    code: "613110100",
    id: "Rent Expense",
  },
  {
    code: "617110700",
    id: "Samples Expense",
  },
  {
    code: "521110400",
    id: "Bonus and Incentives",
  },
  {
    code: "617110300",
    id: "Donation and Contributions",
  },
];

export const Branches = [
  { code: "IPIC - VAL", id: "1" },
  { code: "IPIC - CAB", id: "5" },
  { code: "OSHCORP", id: "10" },
];

export const ApproverMgr = [
  {
    name: "Herbert Parungao",
    code: "hjparungao",
    id: 1,
    uId: 1,
  },
  {
    name: "Laiza Dominguez",
    code: "laiza.cuadra",
    id: 2,
    uId: 1,
  },
  {
    name: "Jonathan Angeles",
    code: "jangeles",
    id: 3,
    uId: 1,
  },
  {
    name: "Rhodette Austria",
    code: "raustria",
    id: 4,
    uId: 1,
  },
  {
    name: "Jun Paculba",
    code: "jpaculba",
    id: 5,
    uId: 1,
  },
  {
    name: "Julie Ann Ballesteros",
    code: "julieann.ballesteros",
    id: 6,
    uId: 1,
  },
  {
    name: "Cristina Noriega",
    code: "cnoriega",
    id: 7,
    uId: 1,
  },
  {
    name: "Aileen Javate",
    code: "ajavate",
    id: 8,
    uId: 1,
  },
  {
    name: "Arth Kenneth Llantos",
    code: "akllantos",
    id: 9,
    uId: 1,
  },
  {
    name: "Christiane De Vera",
    code: "cdevera",
    id: 10,
    uId: 1,
  },
  {
    name: "Hanzel Muñoz",
    code: "hmunoz",
    id: 11,
    uId: 1,
  },
  {
    name: "Jethro Rojales",
    code: "jrojales",
    id: 12,
    uId: 1,
  },
  {
    name: "Michelle Illescas",
    code: "millescas",
    id: 13,
    uId: 1,
  },
];

export const contents = [
  {
    label: "Description",
    name: "description",
    id: "description",
    type: "text",
    subArr: [],
  },
  {
    label: "Account Code",
    name: "glCode",
    id: "glCode",
    type: "text",
    subArr: GLAccountCode,
  },
  {
    label: "Account",
    name: "glName",
    id: "glName",
    type: null,
    subArr: GLAccountCode,
  },
  {
    label: "Cost Center",
    name: "costCenter",
    id: "costCenter",
    type: "text",
    subArr: [],
  },
  {
    label: "Section",
    name: "section",
    id: "section",
    type: "text",
    subArr: [],
  },
  {
    label: "Amount",
    name: "amount",
    id: "amount",
    type: "number",
    subArr: [],
  },
];

export const header = [
  {
    label: "Branch",
    name: "branch",
    id: "branch",
    type: "text",
    subArr: Branches,
  },
  {
    label: "Document Ref. No.",
    name: "sInum",
    id: "sInum",
    type: "text",
    subArr: [],
  },
  {
    label: "Payment For",
    name: "paymentFor",
    id: "paymentFor",
    type: "text",
    subArr: [],
  },
  {
    label: "Payee",
    name: "payee",
    id: "payee",
    type: "text",
    subArr: [],
  },
  {
    label: "Approver Email (eg: mjpena)",
    name: "approverEmail",
    id: "approverEmail",
    type: "text",
    subArr: ApproverMgr,
  },
];
