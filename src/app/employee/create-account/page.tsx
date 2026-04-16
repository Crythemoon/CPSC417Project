import Link from "next/link";

export default function EmployeeCreateAccountPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold">Our Bank Name</p>
            <p className="text-sm text-slate-500">Employee account setup</p>
          </div>

          <Link
            href="/employee/login"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            Back to sign in
          </Link>
        </header>

        <section className="py-12">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-8 py-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-600">
              Create employee account
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Set up staff access and dependent details.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Create a staff account, assign a role and branch, and include
              dependent information during employee setup.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="employee-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="employee-name"
                  type="text"
                  placeholder="Employee name"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="employee-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="employee-email"
                  type="email"
                  placeholder="employee@ourbank.com"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="employee-role"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Role
                </label>
                <select
                  id="employee-role"
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-slate-900"
                >
                  <option>Teller</option>
                  <option>Employee</option>
                  <option>Manager</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="employee-branch"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Branch
                </label>
                <input
                  id="employee-branch"
                  type="text"
                  placeholder="Branch name"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="dependent-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Dependent name
                </label>
                <input
                  id="dependent-name"
                  type="text"
                  placeholder="Dependent name"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="dependent-relationship"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Relationship
                </label>
                <input
                  id="dependent-relationship"
                  type="text"
                  placeholder="Relationship"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>
            </form>

            <button className="mt-8 rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800">
              Create employee account
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
