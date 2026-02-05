/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import supabase from "@/supabaseClient";

type OptOutRow = {
  id?: string;
  name: string | null;
  email: string | null;
  number: string | null;
  opt_out: string[] | string | null;
  additional: string | null;
  created_at: string;
};

type SortKey = "name" | "email" | "created_at";
type SortDir = "asc" | "desc";

function toCsvValue(v: unknown) {
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return `"${v.join("; ").replaceAll(`"`, `""`)}"`;
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replaceAll(`"`, `""`)}"`;
  return s;
}

function downloadCsv(filename: string, rows: OptOutRow[]) {
  const headers = [
    "created_at",
    "name",
    "email",
    "number",
    "opt_out",
    "additional",
  ] as const;

  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => toCsvValue(r[h])).join(",")),
  ];

  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function OptOutAdminPage() {
  const [rows, setRows] = useState<OptOutRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("opt-out")
        .select("id,name,email,number,opt_out,additional,created_at")
        .order("created_at", { ascending: false })
        .limit(5000);

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setRows([]);
      } else {
        setRows((data ?? []) as OptOutRow[]);
      }

      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedRows = useMemo(() => {
    const copy = [...rows];

    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];

      if (sortKey === "created_at") {
        const ad = av ? new Date(av).getTime() : 0;
        const bd = bv ? new Date(bv).getTime() : 0;
        return (ad - bd) * dir;
      }

      const as = (av ?? "").toString().toLowerCase();
      const bs = (bv ?? "").toString().toLowerCase();

      if (!as && bs) return 1;
      if (as && !bs) return -1;

      return as.localeCompare(bs) * dir;
    });

    return copy;
  }, [rows, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "created_at" ? "desc" : "asc");
    }
  }

  const sortIndicator = (key: SortKey) => {
    if (key !== sortKey) return null;
    return sortDir === "asc" ? "▲" : "▼";
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="min-h-screen mx-auto w-full max-w-6xl p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Opt-Out Submissions</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading…" : `${sortedRows.length} row(s)`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin"
              className="rounded-md border px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted"
            >
              Back to Admin
            </Link>

            <button
              onClick={() =>
                downloadCsv(
                  `opt-out_${new Date().toISOString().slice(0, 10)}.csv`,
                  sortedRows
                )
              }
              disabled={loading || sortedRows.length === 0}
              className="rounded-md border px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Download CSV
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <div className="font-medium">Error</div>
            <div className="mt-1">{error}</div>
            <div className="mt-2 text-xs text-red-600">
              If this is an admin page, ensure your RLS/policies allow selecting
              from <code className="rounded bg-red-100 px-1">opt-out</code>.
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            {/* header row */}
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th
                  onClick={() => toggleSort("created_at")}
                  className="cursor-pointer select-none whitespace-nowrap border-b px-4 py-3 font-medium"
                >
                  <span className="inline-flex items-center gap-2">
                    Time{" "}
                    <span className="text-xs opacity-70">
                      {sortIndicator("created_at")}
                    </span>
                  </span>
                </th>

                {/* vertical divider */}
                <div className="w-[1px] h-12 bg-gray-200 " aria-hidden="true" />

                <th
                  onClick={() => toggleSort("name")}
                  className="cursor-pointer select-none border-b px-4 py-3 font-medium"
                >
                  <span className="inline-flex items-center gap-2">
                    Name{" "}
                    <span className="text-xs opacity-70">
                      {sortIndicator("name")}
                    </span>
                  </span>
                </th>

                <div className="w-[1px] h-12 bg-gray-200 " aria-hidden="true" />

                <th
                  onClick={() => toggleSort("email")}
                  className="cursor-pointer select-none border-b px-4 py-3 font-medium"
                >
                  <span className="inline-flex items-center gap-2">
                    Email{" "}
                    <span className="text-xs opacity-70">
                      {sortIndicator("email")}
                    </span>
                  </span>
                </th>

                <div className="w-[1px] h-12 bg-gray-200 " aria-hidden="true" />

                <th className="whitespace-nowrap border-b px-4 py-3 font-medium">
                  Phone
                </th>

                <div className="w-[1px] h-12 bg-gray-200 " aria-hidden="true" />

                <th className="border-b px-4 py-3 font-medium">Opt-out</th>

                <div className="w-[1px] h-12 bg-gray-200 " aria-hidden="true" />

                <th className="border-b px-4 py-3 font-medium">Additional</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-muted-foreground" colSpan={11}>
                    Loading…
                  </td>
                </tr>
              ) : sortedRows.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-muted-foreground" colSpan={11}>
                    No submissions found.
                  </td>
                </tr>
              ) : (
                sortedRows.map((r, idx) => {
                  const zebra = idx % 2 === 1 ? "bg-muted/30" : "bg-background";
                  return (
                    <tr
                      key={(r.id ?? "") + idx}
                      className={`${zebra} border-b last:border-b-0`}
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        {r.created_at
                          ? new Date(r.created_at).toLocaleString()
                          : ""}
                      </td>
                      <td className="w-px bg-border p-0" aria-hidden="true" />

                      <td className="px-4 py-3">{r.name ?? ""}</td>
                      <td className="w-px bg-border p-0" aria-hidden="true" />

                      <td className="px-4 py-3">{r.email ?? ""}</td>
                      <td className="w-px bg-border p-0" aria-hidden="true" />

                      <td className="px-4 py-3">{r.number ?? ""}</td>
                      <td className="w-px bg-border p-0" aria-hidden="true" />

                      <td className="px-4 py-3">
                        {Array.isArray(r.opt_out)
                          ? r.opt_out.join(", ")
                          : r.opt_out ?? ""}
                      </td>
                      <td className="w-px bg-border p-0" aria-hidden="true" />

                      <td className="px-4 py-3">
                        <div className="max-w-[520px] whitespace-pre-wrap">
                          {r.additional ?? ""}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Tip: click <span className="font-medium">Time</span>,{" "}
          <span className="font-medium">Name</span>, or{" "}
          <span className="font-medium">Email</span> to sort.
        </p>
      </main>

      <Footer />
    </div>
  );
}
