// Site-wide content data — single source of truth for all portfolio sections.
// Strictly derived from Harish Murugan P's official resume document.

export const siteConfig = {
  name: "HARISH MURUGAN P",
  tagline: "SAP FI / FICO | Finance & Accounting",
  role: "Enterprise Financial Architect",
  email: "harishpethanesh@gmail.com",
  phone: "+91 9345530058",
  phoneDisplay: "+91 93455 30058",
  location: "Coimbatore, Tamil Nadu",
  resumeUrl: "/resume.pdf",
  portraitUrl: "/images/harish-portrait.png?v=3",
  avatarUrl: "/images/harish-portrait.png?v=3",
  linkedin: "", // Add your LinkedIn URL here when ready
  github: "https://github.com/pethaneshwaran-07/portfolio",
};

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "SAP Expertise", href: "#sap-expertise" },
  { label: "Project", href: "#project" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const heroIntro =
  "Entry-level SAP FI / SAP FICO candidate with a B.Com in Accounts, pursuing an MBA in Finance, and practical exposure to SAP FI through training and a financial accounting mini project.";

export const heroBadges = [
  {
    label: "Academics",
    value: "MBA – Finance",
    sub: "Bharathidasan Univ. (2025–2027)",
  },
  {
    label: "Foundation",
    value: "B.Com – Accounts",
    sub: "Sri Ramakrishna CAS (2021–2024)",
  },
  {
    label: "Specialization",
    value: "SAP FI Training",
    sub: "Techmaax Academy, Coimbatore",
  },
];

export const floatingBadges = [
  { code: "GL", label: "General Ledger", position: "top-left" as const },
  { code: "AP", label: "Accounts Payable", position: "top-right" as const },
  { code: "BA", label: "Bank Accounting", position: "mid-left" as const },
  { code: "AR", label: "Accounts Receivable", position: "bottom-left" as const },
  { code: "AA", label: "Asset Accounting", position: "bottom-right" as const },
];

export const aboutNarrative = {
  main: "Entry-level SAP FI / SAP FICO candidate with a B.Com in Accounts, pursuing an MBA in Finance, and practical exposure to SAP FI through training and a financial accounting mini project.",
  secondary:
    "Knowledge of General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset Accounting, Bank Accounting, journal entries, invoice processing, payments, reconciliation, master data, and financial reporting. Also experienced in stock audit, inventory reconciliation, accounting records, spreadsheets, and ITR process exposure.",
  competencies: [
    {
      icon: "Wallet",
      title: "Ledger Integrity",
      description:
        "General Ledger, AP, AR, Asset & Bank Accounting, master data, & reconciliation accuracy.",
    },
    {
      icon: "ShieldCheck",
      title: "Audit & Compliance",
      description:
        "Physical stock audit, inventory reconciliation, spreadsheet management, & ITR process exposure.",
    },
  ],
  focusCards: [
    {
      icon: "Receipt",
      num: "01",
      title: "SAP FI / FICO",
      desc: "General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Asset & Bank Accounting.",
    },
    {
      icon: "BarChart3",
      num: "02",
      title: "Financial Transactions",
      desc: "Journal entries, vendor & customer master data, invoice processing, payment clearing, & financial reporting.",
    },
    {
      icon: "Database",
      num: "03",
      title: "SAP S/4HANA",
      desc: "Company code, chart of accounts, posting periods, document types, & basic SAP FI configuration.",
    },
    {
      icon: "ArrowLeftRight",
      num: "04",
      title: "MM / SD Integration",
      desc: "Practical understanding of SAP FI business processes and integration exposure with SAP MM and SD.",
    },
  ],
};

export const sapModules = [
  {
    code: "GL",
    title: "General Ledger (GL)",
    tag: "Financial Core",
    color: "primary" as const,
    items: [
      "Chart of Accounts maintenance & G/L master records (FS00)",
      "General Journal posting & document parking (FB50, F-02)",
      "Period closing activities, accruals, & line items (FBL3N)",
    ],
    tCodes: "FS00, FB50, F-02, FBL3N",
  },
  {
    code: "AP",
    title: "Accounts Payable (AP)",
    tag: "Vendor Management",
    color: "secondary" as const,
    items: [
      "Vendor Master Data configuration & account groups",
      "Vendor invoice verification & incoming bookings (FB60, F-43)",
      "Manual & automated outgoing payment processing (F-53)",
    ],
    tCodes: "XK01, FB60, F-43, F-53, FBL1N",
  },
  {
    code: "AR",
    title: "Accounts Receivable (AR)",
    tag: "Customer Accounting",
    color: "tertiary" as const,
    items: [
      "Customer Master Data setup (XD01 / BP in S/4HANA)",
      "Customer billing, debit memo & invoice postings (FB70, F-22)",
      "Incoming payment posting, clearing & customer aging (F-28, FBL5N)",
    ],
    tCodes: "XD01, FB70, F-22, F-28, FBL5N",
  },
  {
    code: "AA",
    title: "Asset Accounting (AA)",
    tag: "Fixed Assets",
    color: "primary" as const,
    items: [
      "Chart of Depreciation configuration & Asset Classes",
      "Asset Master Creation (AS01) & Capital Acquisition postings",
      "Depreciation run execution (AFAB) & asset retirement entries",
    ],
    tCodes: "AS01, ABZON, AFAB, AW01N",
  },
  {
    code: "BA",
    title: "Bank Accounting (BA)",
    tag: "Cash & Banking",
    color: "secondary" as const,
    items: [
      "House Bank & Account ID configuration (FI12)",
      "Cash Journal transaction entries (FBCJ)",
      "Manual & Electronic Bank Reconciliation clearing processes",
    ],
    tCodes: "FI12, FBCJ, FF67, FF_5",
  },
];

export const s4HanaSteps = [
  { num: "01. Org Structure", label: "Company Code Setup" },
  { num: "02. Ledger Setup", label: "Chart of Accounts" },
  { num: "03. Time Controls", label: "Posting Periods" },
  { num: "04. Number Ranges", label: "Document Types" },
  { num: "05. Customizing", label: "SAP FI Config Concepts" },
  { num: "06. Integration", label: "SAP MM / SD Integration" },
];

export const projectActivities = [
  "Vendor Master Data",
  "Customer Master Data",
  "Journal Entries",
  "Invoice Processing",
  "Payment Processing",
  "Account Reconciliation",
  "Financial Reporting",
  "MM / SD Integration",
];

export const projectConfig = [
  { label: "Company Code", value: "TTN1", color: "text-primary" },
  { label: "COA", value: "TCOA", color: "text-secondary" },
  { label: "Posting Periods", value: "12 + 4", color: "text-tertiary" },
  { label: "Doc Types", value: "SA, KR, DR", color: "text-on-surface" },
];

export const ledgerEntries = [
  {
    item: "001",
    pk: "31",
    pkColor: "text-secondary",
    account: "VEND-40012",
    desc: "Titan Precision Vendor",
    amount: "- 450,000.00",
    amountColor: "text-error",
  },
  {
    item: "002",
    pk: "40",
    pkColor: "text-primary",
    account: "GL-210000",
    desc: "Raw Materials Inventory",
    amount: "+ 381,355.93",
    amountColor: "text-primary",
  },
  {
    item: "003",
    pk: "40",
    pkColor: "text-primary",
    account: "GL-154000",
    desc: "Input CGST / SGST 18%",
    amount: "+ 68,644.07",
    amountColor: "text-primary",
  },
];

export const experiences = [
  {
    title: "Stock Audit Intern",
    company: "Pradeep Associates",
    location: "Madurai, Tamil Nadu",
    period: "Mar 2026 – Jun 2026",
    color: "primary" as const,
    tasks: [
      {
        icon: "Package",
        text: "Performed physical stock verification and maintained accurate inventory records.",
      },
      {
        icon: "Scale",
        text: "Reconciled physical stock with system records and identified inventory variances.",
      },
      {
        icon: "FileText",
        text: "Assisted with inventory management, data entry, and reporting to support timely and accurate stock updates.",
      },
    ],
  },
  {
    title: "Financial Accounting & Tax Intern",
    company: "Anandha Kumar Associates",
    location: "Theni, Tamil Nadu",
    period: "Nov 2023",
    color: "secondary" as const,
    tasks: [
      {
        icon: "Calculator",
        text: "Assisted in managing, organizing, and maintaining client financial records, data sheets, and spreadsheets.",
      },
      {
        icon: "ClipboardCheck",
        text: "Gained practical exposure to Income Tax Return (ITR) filing processes and portal record maintenance.",
      },
      {
        icon: "Mail",
        text: "Communicated with clients by phone, email, and in person to collect financial documentation.",
      },
    ],
  },
];

export const education = [
  {
    degree: "MBA (Distance) – Finance",
    institution: "Bharathidasan University",
    period: "2025 – 2027",
    color: "primary" as const,
    focus:
      "Focus: Corporate Financial Management, Advanced Capital Budgeting, Financial Statement Analysis, Strategic Costing.",
  },
  {
    degree: "B.Com – Accounts",
    institution: "Sri Ramakrishna College of Arts and Science",
    period: "2021 – 2024",
    color: "secondary" as const,
    focus:
      "Focus: Double-entry Bookkeeping, Corporate Accounting, Income Tax Laws, Cost & Management Accounting, Auditing Principles.",
  },
];

export const sapTraining = {
  title: "SAP FI Training",
  institution: "Techmaax Academy • Coimbatore, Tamil Nadu",
  period: "Jul 2026 – Present",
  description:
    "Completed training covering GL, AP, AR, Asset Accounting, and Bank Accounting, with practical exposure to financial transactions and SAP FI mini-project activities:",
  modules: [
    { label: "General Ledger (GL)", color: "bg-primary" },
    { label: "Accounts Payable (AP)", color: "bg-secondary" },
    { label: "Accounts Receivable (AR)", color: "bg-tertiary" },
    { label: "Asset Accounting (AA)", color: "bg-primary-fixed" },
    { label: "Bank Accounting", color: "bg-secondary-fixed" },
  ],
};

export const skillCategories = [
  {
    icon: "Network",
    title: "SAP FI / FICO",
    color: "text-primary",
    footer: "Financial Modules",
    skills: [
      "General Ledger (GL)",
      "Accounts Payable (AP)",
      "Accounts Receivable (AR)",
      "Asset Accounting (AA)",
      "Bank Accounting",
      "Vendor Master Data",
      "Customer Master Data",
      "Journal Entries",
      "Invoice Processing",
      "Payment Processing",
      "Account Reconciliation",
      "Financial Reporting",
    ],
  },
  {
    icon: "Database",
    title: "SAP S/4HANA",
    color: "text-secondary",
    footer: "ERP Architecture",
    skills: [
      "Company Code",
      "Chart of Accounts",
      "Posting Periods",
      "Document Types",
      "Basic SAP FI Config",
      "SAP MM Integration",
      "SAP SD Integration",
    ],
  },
  {
    icon: "Table",
    title: "Accounting & Tools",
    color: "text-tertiary",
    footer: "Core Competencies",
    skills: [
      "Financial Accounting",
      "Inventory Reconciliation",
      "Stock Audit",
      "MS Excel",
      "Tally",
      "ITR Process Exposure",
    ],
  },
  {
    icon: "ClipboardList",
    title: "Professional Experience",
    color: "text-primary-fixed",
    footer: "Audit & Tax Internships",
    skills: [
      "Physical Stock Audit",
      "Pradeep Associates",
      "Anandha Kumar Associates",
      "ITR Tax Portal Filing",
      "Client Financial Records",
      "Variance Identification",
    ],
  },
];
