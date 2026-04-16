import Link from "next/link";

const services = [
  "Checking Accounts",
  "Savings Accounts",
  "Money Transfers",
  "Loans",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <p className="text-lg font-semibold">Our Bank Name</p>
            <p className="text-sm text-slate-500">Simple online banking</p>
          </div>

          <Link
            href="/login"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Sign in
          </Link>
        </header>

        <section className="flex flex-1 flex-col justify-center py-12">
          <div className="max-w-4xl rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_45%,#f0fdf4_100%)] px-8 py-6 shadow-sm ring-1 ring-slate-200 sm:px-10">
            <p className="text-sm font-medium text-slate-600">
              Welcome to Our Bank Name
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Banking made clear and easy.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              View accounts, move money, manage your balance, and access online
              banking from one secure place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-md bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Open online banking
              </Link>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="grid gap-4 border-t border-slate-200 py-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <div key={service} className="rounded-lg bg-slate-50 p-5">
              <h2 className="text-base font-semibold">{service}</h2>
              <p className="mt-2 text-sm text-slate-600">
                Secure access and simple tools for everyday banking.
              </p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
