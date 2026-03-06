"use client";

import { useMemo, useState } from "react";
import { useData } from "../../context/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";



export default function RevenueChart() {
  const { invoices } = useData();
  const [type, setType] = useState("bar");

      const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
  "#ec4899",
  "#6366f1",
];
  const monthlyData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      earned: 0,
    }));


    invoices.forEach(inv => {
      if (!inv.date) return;

      const monthIndex = new Date(inv.date).getMonth();
      months[monthIndex].earned += Number(inv.paid || 0);
    });

    return months;
  }, [invoices]);

  const totalEarned = invoices.reduce(
    (sum, inv) => sum + Number(inv.paid || 0),
    0
  );

  return (
    <div
     className="p-4 sm:p-6 rounded-xl space-y-2"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          Revenue Overview
        </h2>

       <div className="flex flex-wrap gap-2">

  {["bar", "line", "pie"].map((chart) => (
    <button
      key={chart}
      onClick={() => setType(chart)}
      className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
        type === chart
          ? "bg-blue-600 text-white shadow"
          : "border hover:bg-gray-200 dark:hover:bg-gray-300"
      }`}
    >
      {chart.charAt(0).toUpperCase() + chart.slice(1)}
    </button>
  ))}
  </div>

</div>

    

      <div className="w-full h-[50px] sm:h-[120px] lg:h-[200px]">
        <ResponsiveContainer>
          {type === "bar" && (
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earned" fill="#3b82f6" />
            </BarChart>
          )}

          {type === "line" && (
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earned" stroke="#3b82f6" />
            </LineChart>
          )}

          {type === "pie" && (
            <PieChart>
              <Pie
                data={monthlyData}
                dataKey="earned"
                nameKey="name"
                outerRadius={65}
                fill="#3b82f6"
              >
                {monthlyData.map((entry, index) => (
                 <Cell
  key={index}
  fill={COLORS[index % COLORS.length]}
/>
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}