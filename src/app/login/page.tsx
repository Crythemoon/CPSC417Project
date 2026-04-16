import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold">Our Bank Name</p>
            <p className="text-sm text-slate-500">Simple online banking</p>
          </div>

          <Link
            href="/"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            Back home
          </Link>
        </header>

        <section className="flex flex-1 items-center py-12">
          <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-8 py-8 shadow-sm ring-1 ring-slate-200 sm:px-10">
              <p className="text-sm font-medium text-slate-600">
                Welcome back
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Sign in to online banking.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Access your accounts, view recent activity, and manage your
                banking securely in one place.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="max-w-md">
                <p className="text-sm font-medium text-slate-600">Sign in</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Enter your details
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use your account credentials to continue.
                </p>
              </div>

              <form className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-900"
                    />
                    Remember me
                  </label>

                  <a href="#" className="text-slate-700 hover:text-slate-900">
                    Forgot password?
                  </a>
                </div>

                <Link
                  href="/dashboard"
                  className="block w-full rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
                >
                  Sign in
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
