import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold">Our Bank Name</p>
            <p className="text-sm text-slate-500">Customer account creation</p>
          </div>

          <Link
            href="/login"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
          >
            Back to sign in
          </Link>
        </header>

        <section className="py-12">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-8 py-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-600">
              Create customer account
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start your online banking access.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Open your customer profile, choose your first account type, and
              get set up for secure online banking access.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <form className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone
                </label>
                <input
                  id="signup-phone"
                  type="text"
                  placeholder="Phone number"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-address"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Address
                </label>
                <input
                  id="signup-address"
                  type="text"
                  placeholder="Street, city, province"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-account-type"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  First account type
                </label>
                <select
                  id="signup-account-type"
                  className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-slate-900"
                >
                  <option>Chequing Account</option>
                  <option>Savings Account</option>
                </select>
              </div>
            </form>

            <Link
              href="/customer/dashboard"
              className="mt-8 inline-block rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Create account
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
