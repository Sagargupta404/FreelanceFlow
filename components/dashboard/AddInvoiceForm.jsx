"use client";

import { useState } from "react";

export default function AddInvoiceForm({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    client: "",
    total: "",
    paid: "",
    duration: "",
    date: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = Number(form.total);
    const paid = Number(form.paid);
    const remaining = total - paid;

    await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        total,
        paid,
        remaining,
        paymentStatus: remaining === 0 ? "Paid" : "Pending",
        workStatus: "In Progress",
      }),
    });

    setForm({
      client: "",
      total: "",
      paid: "",
      duration: "",
      date: "",
      notes: "",
    });

    setOpen(false);

    if (onSuccess) onSuccess();
  };

  return (
    <div className="space-y-4">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full sm:w-auto px-4 py-2 rounded-xl font-medium transition"
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
        }}
      >
        {open ? "Close Form" : "+ Add Invoice"}
      </button>

      {/* Expandable Form */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {open && (
         <form
  onSubmit={handleSubmit}
  className="mt-4 p-4 sm:p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
  style={{
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
  }}
>
            <input
              placeholder="Client Name"
              value={form.client}
              onChange={(e) =>
                setForm({ ...form, client: e.target.value })
              }
              className="p-2 border rounded"
              required
            />

            <input
              placeholder="Duration (e.g. 2 weeks)"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
              className="p-2 border rounded"
            />

            <input
              type="number"
              placeholder="Total Amount"
              value={form.total}
              onChange={(e) =>
                setForm({ ...form, total: e.target.value })
              }
              className="p-2 border rounded"
              required
            />

            <input
              type="number"
              placeholder="Amount Paid"
              value={form.paid}
              onChange={(e) =>
                setForm({ ...form, paid: e.target.value })
              }
              className="p-2 border rounded"
              required
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="p-2 border rounded"
            />

            <input
              placeholder="Notes"
              value={form.notes}
              onChange={(e) =>
                setForm({ ...form, notes: e.target.value })
              }
              className="w-full p-2.5 border rounded text-sm sm:text-base"
            />

            <div className="sm:col-span-2">
              <button
                type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                }}
              >
                Save Invoice
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}