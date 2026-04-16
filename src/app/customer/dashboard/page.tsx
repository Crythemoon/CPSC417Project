import Link from "next/link";
import CustomerPortal from "@/components/customer-portal";

const accountCards = [
  {
    type: "Chequing Account",
    number: "**** 2841",
    balance: "$4,820.50",
    status: "Active",
  },
  {
    type: "Savings Account",
    number: "**** 7719",
    balance: "$12,440.10",
    status: "Active",
  },
];

const loans = [
  {
    name: "Auto Loan",
    remaining: "$8,200.00",
    payment: "$320 / month",
    status: "Current",
  },
  {
    name: "Personal Loan",
    remaining: "$2,150.00",
    payment: "$185 / month",
    status: "Under review",
  },
];

const payees = [
  "City Utilities",
  "Campus Housing",
  "Mobile Provider",
  "Insurance Services",
];

const profileFields = [
  { label: "Name", value: "Jordan Lee" },
  { label: "Email", value: "jordan.lee@example.com" },
  { label: "Phone", value: "(403) 555-0188" },
  { label: "Address", value: "123 Main Street, Calgary, AB" },
  { label: "Password", value: "**********" },
];

const quickActions = [
  {
    title: "Create a new account",
    description: "Choose between a savings account or a chequing account.",
    action: "Start account setup",
    href: "/customer/create-account",
  },
  {
    title: "Deposit money",
    description: "Add funds to an existing account after signing in.",
    action: "Make a deposit",
    href: "/customer/deposit",
  },
  {
    title: "Request a loan",
    description: "Submit a loan request and track the current status here.",
    action: "Request loan",
    href: "/customer/request-loan",
  },
  {
    title: "Update personal information",
    description: "Edit your email, password, phone number, name, or address.",
    action: "Edit profile",
    href: "/customer/profile",
  },
];

export default function CustomerDashboardPage() {
  return (
    <CustomerPortal
      activePage="dashboard"
      title="Manage your banking in one place."
      description="This customer dashboard gives one clear place to view balances, track loans, review payees, and access personal profile updates while backend integration is still being built."
      stats={[
        { label: "Total balance", value: "$17,260.60" },
        { label: "Open accounts", value: "2" },
        { label: "Active loans", value: "2" },
        { label: "Saved payees", value: "4" },
      ]}
    >
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Your accounts
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Account balances
                </h2>
              </div>
              <Link
                href="/customer/create-account"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
              >
                New account
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {accountCards.map((account) => (
                <article
                  key={account.number}
                  className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <p className="text-sm text-slate-500">{account.type}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Account {account.number}
                  </p>
                  <p className="mt-5 text-2xl font-semibold">
                    {account.balance}
                  </p>
                  <div className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    {account.status}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Loan overview
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Active loans
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {loans.map((loan) => (
                <article
                  key={loan.name}
                  className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{loan.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Remaining balance: {loan.remaining}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Payment: {loan.payment}
                    </p>
                  </div>

                  <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    {loan.status}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Saved payees
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Payee list
                </h2>
              </div>
              <Link
                href="/customer/payees"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
              >
                Add payee
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {payees.map((payee) => (
                <div
                  key={payee}
                  className="rounded-xl bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                >
                  {payee}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Quick actions</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Customer tools
            </h2>

            <div className="mt-6 space-y-4">
              {quickActions.map((action) => (
                <article
                  key={action.title}
                  className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {action.description}
                  </p>
                  <Link
                    href={action.href}
                    className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                  >
                    {action.action}
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Profile details
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Personal information
            </h2>

            <div className="mt-6 space-y-4">
              {profileFields.map((field) => (
                <div
                  key={field.label}
                  className="rounded-xl bg-slate-50 px-4 py-4 ring-1 ring-slate-200"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {field.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/customer/profile"
              className="mt-6 block w-full rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Update profile
            </Link>
          </div>
        </div>
      </section>
    </CustomerPortal>
  );
}
