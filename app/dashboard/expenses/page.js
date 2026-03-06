"use client";

import { useEffect, useState, useMemo,useCallback } from "react";
import { useData } from "@/context/DataContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#14b8a6"];

export default function ExpensesPage() {
  const { invoices } = useData();

  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Software",
    vendor: "",
    purpose: "",
    priority: "Medium",
    date: "",
  });

  /* ================= FETCH ================= */

const fetchExpenses = useCallback(async () => {
  const res = await fetch("/api/expenses");
  const data = await res.json();
  setExpenses(Array.isArray(data) ? data : []);
}, []);

  useEffect(() => {
    fetchExpenses();
  }, []);

  /* ================= METRICS ================= */

  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const revenue = invoices.reduce(
    (sum, inv) => sum + Number(inv.paid || 0),
    0
  );

  const netProfit = revenue - totalExpense;

  const expenseRatio =
    revenue > 0 ? ((totalExpense / revenue) * 100).toFixed(1) : 0;

  const isLoss = totalExpense > revenue;
  const highBurn = expenseRatio > 70;

  /* ================= CATEGORY DATA ================= */

  const categoryData = useMemo(() => {
    const grouped = {};
    expenses.forEach((e) => {
     grouped[e.category] = (grouped[e.category] || 0) + Number(e.amount || 0);
    });

    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key],
    }));
  }, [expenses]);

  /* ================= CRUD ================= */

  const handleSave = async () => {
    if (!form.title || !form.amount) return;

    const method = editId ? "PUT" : "POST";

    await fetch("/api/expenses", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editId
          ? { id: editId, ...form, amount: Number(form.amount) }
          : { ...form, amount: Number(form.amount) }
      ),
    });

    setForm({
      title: "",
      amount: "",
      category: "Software",
      vendor: "",
      purpose: "",
      priority: "Medium",
      date: "",
    });

    setEditId(null);
    setFormOpen(false);
    fetchExpenses();
  };

  const handleEdit = (exp) => {
    setForm(exp);
    setEditId(exp._id);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete permanently?")) return;

    await fetch("/api/expenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchExpenses();
  };

  return (
   <div className="p-4 sm:p-6 lg:p-8 space-y-8">

      {/* ================= ALERT ================= */}
      {isLoss && (
        <div className="p-4 bg-red-100 text-red-600 rounded-xl font-medium">
          🚨 You are operating at a loss. Expenses exceed revenue.
        </div>
      )}

      {highBurn && !isLoss && (
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl font-medium">
          ⚠ High burn rate detected ({expenseRatio}% of revenue).
        </div>
      )}

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric title="Total Expense" value={`₹ ${totalExpense}`} />
        <Metric title="Revenue" value={`₹ ${revenue}`} />
        <Metric title="Net Profit" value={`₹ ${netProfit}`} />
        <Metric title="Expense Ratio" value={`${expenseRatio}%`} />
      </div>

      {/* ================= ADD BUTTON ================= */}
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl"
      >
        {editId ? "Update Expense" : "+ Add Expense"}
      </button>

      {/* ================= FORM ================= */}
      {formOpen && (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 border rounded-xl">
          <input placeholder="Title"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
            className="border p-2 rounded"/>

          <input type="number" placeholder="Amount"
            value={form.amount}
            onChange={(e)=>setForm({...form,amount:e.target.value})}
            className="border p-2 rounded"/>

          <select value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="border p-2 rounded">
            <option>Software</option>
            <option>Marketing</option>
            <option>Equipment</option>
            <option>Travel</option>
            <option>Office</option>
            <option>Misc</option>
          </select>

          <input placeholder="Vendor"
            value={form.vendor}
            onChange={(e)=>setForm({...form,vendor:e.target.value})}
            className="border p-2 rounded"/>

          <input placeholder="Purpose"
            value={form.purpose}
            onChange={(e)=>setForm({...form,purpose:e.target.value})}
            className="border p-2 rounded"/>

          <select value={form.priority}
            onChange={(e)=>setForm({...form,priority:e.target.value})}
            className="border p-2 rounded">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            onClick={handleSave}
            className="sm:col-span-2 lg:col-span-3 bg-green-600 text-white p-2 rounded-xl"
          >
            Save
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="space-y-4">
        {expenses.map((e) => (
          <div key={e._id}
           className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border rounded-xl">

            <div>
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm opacity-60">
                {e.category} • {e.vendor}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  e.priority === "High"
                    ? "bg-red-500 text-white"
                    : e.priority === "Medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {e.priority}
              </span>

              <span className="font-semibold">
                ₹ {e.amount}
              </span>

              <button
                onClick={()=>handleEdit(e)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={()=>handleDelete(e._id)}
                className="text-red-500"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ================= PIE ================= */}
     <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={categoryData} dataKey="value" outerRadius={100}>
              {categoryData.map((entry,index)=>(
                <Cell key={index} fill={COLORS[index%COLORS.length]}/>
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

function Metric({title,value}) {
  return (
   <div className="p-4 border rounded-xl text-center sm:text-left">
      <p className="text-sm opacity-60">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}