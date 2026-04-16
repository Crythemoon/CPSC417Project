"use client";

import { useEffect, useState } from "react";
import EmployeePortal from "@/components/employee-portal";
import { apiFetch } from "@/lib/api";

interface Loan {
  Loan_No: number;
  Amount: number;
  Status: string;
  CustomerName: string;
  BranchName: string | null;
}

function fmt(n: number) {
  return "$" + Number(n).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function statusBadge(s: string) {
  const colors: Record<string, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
    "Under Review": "bg-violet-100 text-violet-700",
  };
  return colors[s] ?? "bg-slate-100 text-slate-600";
}

export default function EmployeeManagerPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    apiFetch("/api/manager/loans")
      .then((data) => setLoans(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load loans"))
      .finally(() => setLoading(false));
  }, []);

  async function setStatus(loanNo: number, status: "Approved" | "Rejected") {
    setUpdating(loanNo);
    try {
      await apiFetch(`/api/employee/loans/${loanNo}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setLoans((prev) => prev.map((l) => l.Loan_No === loanNo ? { ...l, Status: status } : l));
    } catch {
      setError("Failed to update loan");
    } finally {
      setUpdating(null);
    }
  }

  const filters = ["All", "Pending", "Under Review", "Approved", "Rejected"];
  const visible = filter === "All" ? loans : loans.filter((l) => l.Status === filter);

  return (
    <EmployeePortal
      activePage="manager"
      title="Manager tools"
      description="Approve or reject loan applications and oversee all loan decisions."
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-600">Loan overrides</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Loan approval panel</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${filter === f ? "bg-slate-900 text-white" : "border border-slate-300 text-slate-700 hover:border-slate-900"}`}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-1.5 tabular-nums">
                    ({loans.filter((l) => l.Status === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : visible.length === 0 ? (
            <p className="text-sm text-slate-500">No loans match this filter.</p>
          ) : visible.map((l) => (
            <article key={l.Loan_No} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold">{l.CustomerName}</h3>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(l.Status)}`}>
                      {l.Status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">Loan #{l.Loan_No} — {fmt(l.Amount)}</p>
                  {l.BranchName && <p className="mt-1 text-sm text-slate-500">Branch: {l.BranchName}</p>}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  <button
                    disabled={l.Status === "Approved" || updating === l.Loan_No}
                    onClick={() => setStatus(l.Loan_No, "Approved")}
                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-40"
                  >
                    {updating === l.Loan_No ? "…" : "Approve"}
                  </button>
                  <button
                    disabled={l.Status === "Rejected" || updating === l.Loan_No}
                    onClick={() => setStatus(l.Loan_No, "Rejected")}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-40"
                  >
                    {updating === l.Loan_No ? "…" : "Reject"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </EmployeePortal>
  );
}
