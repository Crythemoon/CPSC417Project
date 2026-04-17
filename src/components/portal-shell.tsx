"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const BACK_MAP: Record<string, string> = {
  "/customer/dashboard":      "/",
  "/customer/accounts":       "/customer/dashboard",
  "/customer/loans":          "/customer/dashboard",
  "/customer/transfer":       "/customer/dashboard",
  "/customer/payees":         "/customer/dashboard",
  "/customer/profile":        "/customer/dashboard",
  "/customer/deposit":        "/customer/dashboard",
  "/customer/withdraw":       "/customer/dashboard",
  "/customer/transactions":   "/customer/dashboard",
  "/customer/create-account": "/customer/accounts",
  "/customer/request-loan":   "/customer/loans",
  "/employee/dashboard":      "/",
  "/employee/transactions":   "/employee/dashboard",
  "/employee/accounts":       "/employee/dashboard",
  "/employee/loans":          "/employee/dashboard",
  "/employee/manager":        "/employee/dashboard",
  "/employee/create-account": "/employee/dashboard",
  "/employee/profile":        "/employee/dashboard",
};

type NavItem = {
  href: string;
  label: string;
  active?: boolean;
};

type HeaderAction = {
  href?: string;
  label: string;
  primary?: boolean;
  signOut?: boolean;
  signOutRedirect?: string;
};

type StatItem = {
  label: string;
  value: string;
};

type PortalShellProps = {
  sectionLabel: string;
  title: string;
  description: string;
  navItems: NavItem[];
  headerActions?: HeaderAction[];
  stats?: StatItem[];
  children: ReactNode;
};

export default function PortalShell({
  sectionLabel,
  title,
  description,
  navItems,
  headerActions = [],
  stats = [],
  children,
}: PortalShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const backHref = BACK_MAP[pathname] ?? "/";

  function handleSignOut(redirect: string) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    router.push(redirect);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid flex-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <div className="border-b border-slate-200 pb-5">
              <p className="text-lg font-semibold">Our Bank Name</p>
              <p className="mt-1 text-sm text-slate-500">{sectionLabel}</p>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="space-y-8">
            <Link
              href={backHref}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back
            </Link>
            <header className="rounded-2xl bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_48%,#f0fdf4_100%)] px-8 py-7 shadow-sm ring-1 ring-slate-200 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-medium text-slate-600">{sectionLabel}</p>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {title}
                  </h1>
                  <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
                </div>

                {headerActions.length > 0 && (
                  <div className="flex flex-wrap gap-3 sm:justify-end">
                    {headerActions.map((action) =>
                      action.signOut ? (
                        <button
                          key={action.label}
                          onClick={() => handleSignOut(action.signOutRedirect ?? "/login")}
                          className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                        >
                          {action.label}
                        </button>
                      ) : action.href ? (
                        <Link
                          key={action.label}
                          href={action.href}
                          className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-center text-sm font-medium whitespace-nowrap transition-colors ${
                            action.primary
                              ? "bg-slate-900 text-white hover:bg-slate-800"
                              : "border border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
                          }`}
                        >
                          {action.label}
                        </Link>
                      ) : (
                        <button
                          key={action.label}
                          className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                            action.primary
                              ? "bg-slate-900 text-white hover:bg-slate-800"
                              : "border border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
                          }`}
                        >
                          {action.label}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </header>

            {stats.length > 0 && (
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </section>
            )}

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
