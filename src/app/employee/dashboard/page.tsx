import Link from "next/link";
import EmployeePortal from "@/components/employee-portal";

const staffProfile = [
  { label: "Name", value: "Avery Morgan" },
  { label: "Role", value: "Manager" },
  { label: "Branch", value: "Downtown Branch" },
  { label: "Email", value: "avery.morgan@ourbank.com" },
  { label: "Phone", value: "(403) 555-0164" },
];

const transactions = [
  {
    id: "TX-2048",
    customer: "Jordan Lee",
    type: "Deposit",
    amount: "$500.00",
    status: "Pending",
  },
  {
    id: "TX-2051",
    customer: "Maya Patel",
    type: "Transfer",
    amount: "$1,250.00",
    status: "Flagged",
  },
  {
    id: "TX-2056",
    customer: "Noah Kim",
    type: "Withdraw",
    amount: "$220.00",
    status: "Approved",
  },
];

const accountControls = [
  {
    customer: "Jordan Lee",
    account: "Chequing **** 2841",
    status: "Active",
    action: "Freeze account",
  },
  {
    customer: "Maya Patel",
    account: "Savings **** 5520",
    status: "Frozen",
    action: "Unfreeze account",
  },
];

const loanControls = [
  {
    customer: "Noah Kim",
    loan: "Auto Loan",
    status: "Pending review",
    action: "Update status",
  },
  {
    customer: "Sofia Chen",
    loan: "Personal Loan",
    status: "Approved",
    action: "Override loan status",
  },
];

const managerTasks = [
  {
    title: "Assign tasks",
    detail: "Route loan reviews and transaction checks to employees.",
    action: "Manage assignments",
    href: "/employee/manager",
  },
  {
    title: "Department details",
    detail: "View staffing, branch unit information, and supervision needs.",
    action: "View department",
    href: "/employee/manager",
  },
  {
    title: "Loan overrides",
    detail: "Change or override loan decisions when elevated approval is needed.",
    action: "Open overrides",
    href: "/employee/manager",
  },
];

export default function EmployeeDashboardPage() {
  return (
    <EmployeePortal
      activePage="dashboard"
      title="Manage customer operations and staff workflows."
      description="This shared staff dashboard covers employee admin work by default and adds extra management controls for task assignment, department oversight, and loan overrides."
      stats={[
        { label: "Transactions to review", value: "3" },
        { label: "Customer accounts flagged", value: "2" },
        { label: "Loan items open", value: "2" },
        { label: "Assigned staff tasks", value: "5" },
      ]}
    >
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Daily admin tasks
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Transaction history and status
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {transactions.map((transaction) => (
                <article
                  key={transaction.id}
                  className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {transaction.id}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {transaction.customer} - {transaction.type}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Amount: {transaction.amount}
                      </p>
                    </div>

                    <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      {transaction.status}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      href="/employee/transactions"
                      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                    >
                      Change transaction status
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Account controls
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Freeze and unfreeze accounts
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {accountControls.map((item) => (
                <article
                  key={item.customer + item.account}
                  className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{item.customer}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.account}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Status: {item.status}
                    </p>
                  </div>

                    <Link
                      href="/employee/accounts"
                      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                    >
                      {item.action}
                    </Link>
                  </article>
                ))}
              </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Loan processing
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Loan status controls
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {loanControls.map((loan) => (
                <article
                  key={loan.customer + loan.loan}
                  className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{loan.customer}</h3>
                    <p className="mt-1 text-sm text-slate-600">{loan.loan}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Status: {loan.status}
                    </p>
                  </div>

                    <Link
                      href="/employee/loans"
                      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                    >
                      {loan.action}
                    </Link>
                  </article>
                ))}
              </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Employee profile
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Basic user information
            </h2>

            <div className="mt-6 space-y-4">
              {staffProfile.map((field) => (
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
              href="/employee/profile"
              className="mt-6 block w-full rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Update employee profile
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">
              Account setup
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Employee onboarding
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">
                  Create employee account
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Set up a new employee record with branch and role details.
                </p>
              </article>
              <article className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">
                  Add dependent
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Include dependent information as part of employee setup.
                </p>
              </article>
            </div>

            <Link
              href="/employee/create-account"
              className="mt-6 block w-full rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
            >
              Open employee account form
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-600">Manager tools</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Additional management controls
            </h2>

            <div className="mt-6 space-y-4">
              {managerTasks.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
                >
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.detail}
                  </p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                    >
                      {item.action}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
        </div>
      </section>
    </EmployeePortal>
  );
}
