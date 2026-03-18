"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { invoices = [] } = useData();

  const [open, setOpen] = useState(false);

  const totalEarned = invoices.reduce(
    (sum, inv) => sum + Number(inv.paid || 0),
    0
  );

  const totalPending = invoices.reduce(
    (sum, inv) => sum + Number(inv.remaining || 0),
    0
  );

  const pendingCount = invoices.filter(inv => inv.remaining > 0).length;

  const menu = [
    { name: "Overview", href: "/dashboard" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Calendar", href: "/dashboard/calendar" },
    { name: "Expenditure", href: "/dashboard/expenses" }
  ];

  return (
    <>
      {/* MOBILE HANDLE */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="fixed left-0 top-0 h-screen w-7 flex items-center justify-center shadow-md lg:hidden cursor-pointer"
          style={{ backgroundColor: "var(--card)" }}
        >
          <span className="text-lg font-bold">›</span>
        </div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static top-0 left-0 z-50
        h-screen w-64
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
        style={{
          backgroundColor: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div className="p-6 flex flex-col h-full">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden mb-6 text-sm px-3 py-1 border rounded"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            Close
          </button>

          {/* MENU */}
          <nav className="flex flex-col gap-2 mb-10">
            {menu.map(item => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center"
                  style={{
                    backgroundColor: active
                      ? "var(--accent)"
                      : "var(--card-soft)",
                    color: active ? "#fff" : "var(--text)",
                    borderLeft: active
                      ? "4px solid var(--accent)"
                      : "4px solid transparent",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* FINANCE SUMMARY */}
          <div
            className="p-4 rounded-xl space-y-3 text-sm mb-6"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <p className="opacity-60">Earned</p>
              <p className="font-semibold text-lg">
                ₹ {totalEarned.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="opacity-60">Pending</p>
              <p className="font-semibold text-lg text-yellow-500">
                ₹ {totalPending.toLocaleString()}
              </p>
            </div>
          </div>

          {/* ALERT */}
          {pendingCount > 0 && (
            <div className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg">
              {pendingCount} invoice(s) pending
            </div>
          )}
        </div>
      </aside>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 lg:hidden"
        />
      )}
    </>
  );
}