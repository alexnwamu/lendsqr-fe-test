export interface LinkData {
  title: string;
  icon: string; // The path to the SVG icon
  url: string; // All URLs are now set to '#'
}

export const customerLinks: LinkData[] = [
  { title: "Users", icon: "/user.svg", url: "/dashboard" },
  { title: "Guarantors", icon: "/guarantor.svg", url: "#" },
  { title: "Loans", icon: "/loan.svg", url: "#" },
  { title: "Decision Models", icon: "/decision-model.svg", url: "#" },
  { title: "Savings", icon: "/savings.svg", url: "#" },
  { title: "Loan Requests", icon: "/loan-request.svg", url: "#" },
  { title: "Whitelist", icon: "/whitelist.svg", url: "#" },
  { title: "Karma", icon: "/karma.svg", url: "#" },
];

export const businessesLinks: LinkData[] = [
  { title: "Organization", icon: "/organization.svg", url: "#" },
  { title: "Loan Products", icon: "/loan.svg", url: "#" },
  { title: "Savings Products", icon: "/savings-product.svg", url: "#" },
  { title: "Fees and Charges", icon: "/fees.svg", url: "#" },
  { title: "Transactions", icon: "/transactions.svg", url: "#" },
  { title: "Services", icon: "/services.svg", url: "#" },
  { title: "Service Account", icon: "/service-account.svg", url: "#" },
  { title: "Settlements", icon: "/settlements.svg", url: "#" },
  { title: "Reports", icon: "/reports.svg", url: "#" },
];

export const settingsLinks: LinkData[] = [
  { title: "Preferences", icon: "/preferences.svg", url: "#" },
  { title: "Fees and Pricing", icon: "/fees-pricing.svg", url: "#" },
  { title: "Audit Logs", icon: "/audit-logs.svg", url: "#" },
  { title: "System Messages", icon: "/tire.svg", url: "#" },
];
