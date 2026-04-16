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

const STATUSES = ["Pending", "Under Review", "Approved", "Rejected"];

export default function EmployeeLoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    apiFetch("/api/employee/loans")
      .then((data) => setLoans(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load loans"))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(loanNo: number, status: string) {
    setUpdating(loanNo);
    try {
      await apiFetch(`/api/employee/loans/${loanNo}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setLoans((prev) => prev.map((l) => l.Loan_No === loanNo ? { ...l, Status: status } : l));
    } catch {
      setError("Failed to update loan status");
    } finally {
      setUpdating(null);
    }
  }

  return (
    <EmployeePortal
      activePage="loans"
      title="Loan controls"
      description="Review and update loan statuses for all customers."
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-600">Loan processing</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">All customer loans</h2>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : loans.length === 0 ? (
            <p className="text-sm text-slate-500">No loans found.</p>
          ) : loans.map((l) => (
            <article key={l.Loan_No} className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {STATUSES.filter((s) => s !== l.Status).map((s) => (
                    <button
                      key={s}
                      disabled={updating === l.Loan_No}
                      onClick={() => updateStatus(l.Loan_No, s)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 disabled:opacity-50"
                    >
                      {updating === l.Loan_No ? "Updating…" : `Set ${s}`}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </EmployeePortal>
  );
}
