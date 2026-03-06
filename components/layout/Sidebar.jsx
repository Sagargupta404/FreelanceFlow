"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { invoices = [] } = useData();

  const totalEarned = invoices.length
    ? invoices.reduce((sum, inv) => sum + Number(inv.paid || 0), 0)
    : 0;

  const totalPending = invoices.length
    ? invoices.reduce((sum, inv) => sum + Number(inv.remaining || 0), 0)
    : 0;

  const pendingCount = invoices.filter(inv => inv.remaining > 0).length;

  const menu = [
    { name: "Overview", href: "/dashboard" },
    { name: "Settings", href: "/dashboard/settings" },
    { name: "Calendar", href: "/dashboard/calendar" },
    { name: "Expenditure", href: "/dashboard/expenses" }
  ];

  return (
    <aside className="w-64 h-screen flex flex-col px-6 py-8 border-r">

    
      <nav className="flex flex-col gap-2 mb-10">
        {menu.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-blue-100 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-200"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 rounded-xl space-y-3 text-sm border mb-6">
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

      {pendingCount > 0 && (
        <div className="mb-6 text-xs bg-red-500 text-white px-3 py-2 rounded-lg">
          {pendingCount} invoice(s) pending
        </div>
      )}

   
    </aside>
  );
}