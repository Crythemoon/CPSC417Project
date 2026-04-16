import type { ReactNode } from "react";
import PortalShell from "@/components/portal-shell";

type CustomerPortalProps = {
  activePage: "dashboard" | "accounts" | "loans" | "payees" | "profile" | "transfer";
  title: string;
  description: string;
  children: ReactNode;
  stats?: { label: string; value: string }[];
};

export default function CustomerPortal({
  activePage,
  title,
  description,
  children,
  stats,
}: CustomerPortalProps) {
  return (
    <PortalShell
      sectionLabel="Personal banking dashboard"
      title={title}
      description={description}
      navItems={[
        { href: "/customer/dashboard", label: "Dashboard", active: activePage === "dashboard" },
        { href: "/customer/accounts",  label: "Accounts",  active: activePage === "accounts" },
        { href: "/customer/loans",     label: "Loans",     active: activePage === "loans" },
        { href: "/customer/transfer",  label: "Transfer",  active: activePage === "transfer" },
        { href: "/customer/payees",    label: "Payees",    active: activePage === "payees" },
        { href: "/customer/profile",   label: "Profile",   active: activePage === "profile" },
      ]}
      headerActions={[
        { href: "/customer/deposit", label: "Deposit money", primary: true },
        { label: "Sign out", signOut: true, signOutRedirect: "/login" },
      ]}
      stats={stats}
    >
      {children}
    </PortalShell>
  );
}
