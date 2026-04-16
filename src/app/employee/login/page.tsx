import Link from "next/link";

export default function EmployeeLoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold">Our Bank Name</p>
            <p className="text-sm text-slate-500">
              Employee and manager sign in
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            Customer sign in
          </Link>
        </header>

        <section className="flex flex-1 items-center py-12">
          <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-8 py-8 shadow-sm ring-1 ring-slate-200 sm:px-10">
              <p className="text-sm font-medium text-slate-600">
                Staff sign in
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Open employee management tools.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Employees and managers can sign in here to review transactions,
                update statuses, manage accounts, and access staff controls.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="max-w-md">
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Sign in to staff tools
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use your employee credentials to continue.
                </p>
              </div>

              <form className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="employee-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Work email
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
                    htmlFor="employee-password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="employee-password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                  />
                </div>

                <Link
                  href="/employee/dashboard"
                  className="block w-full rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Sign in
                </Link>
              </form>

              <div className="mt-8 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-700">
                  Need staff access?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create a new employee account and include dependent details as
                  part of onboarding.
                </p>
                <Link
                  href="/employee/create-account"
                  className="mt-4 inline-block rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                >
                  Create employee account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
