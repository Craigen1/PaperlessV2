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
  },
  {
    name: "Laiza Dominguez",
    code: "laiza.cuadra",
    id: 2,
  },
  {
    name: "Jonathan Angeles",
    code: "jangeles",
    id: 3,
  },
  {
    name: "Rhodette Austria",
    code: "raustria",
    id: 4,
  },
  {
    name: "Jun Paculba",
    code: "jpaculba",
    id: 5,
  },
  {
    name: "Julie Ann Ballesteros",
    code: "julieann.ballesteros",
    id: 6,
  },
  {
    name: "Cristina Noriega",
    code: "cnoriega",
    id: 7,
  },
  {
    name: "Aileen Javate",
    code: "ajavate",
    id: 8,
  },
  {
    name: "Arth Kenneth Llantos",
    code: "akllantos",
    id: 9,
  },
  {
    name: "Christiane De Vera",
    code: "cdevera",
    id: 10,
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
    label: "SI No.",
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
