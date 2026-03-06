"use client";

import { useState, useMemo } from "react";

export default function InvoiceTable({ invoices, onRefresh }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("None");
  const [month, setMonth] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [editId, setEditId] = useState(null);
const [editForm, setEditForm] = useState({});

  // ✅ Delete Function (correct scope)
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure? This invoice will be permanently deleted."
    );

    if (!confirmDelete) return;

    await fetch("/api/invoices", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (onRefresh) onRefresh();
  };

  // ✅ Filtering + Sorting
  const filteredInvoices = useMemo(() => {
    let data = [...invoices];

    if (search) {
      data = data.filter(inv =>
        inv.client.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== "All") {
      data = data.filter(inv => inv.paymentStatus === filter);
    }

    if (month !== "All") {
      data = data.filter(inv =>
        inv.date &&
        new Date(inv.date).getMonth().toString() === month
      );
    }

    if (sort === "High") {
      data.sort((a, b) => b.total - a.total);
    }

    if (sort === "Low") {
      data.sort((a, b) => a.total - b.total);
    }

    return data;
  }, [invoices, search, filter, sort, month]);

  const handleUpdate = async (id) => {
  const total = Number(editForm.total);
  const paid = Number(editForm.paid);
  const remaining = total - paid;

  await fetch("/api/invoices", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...editForm,
      id,
      total,
      paid,
      remaining,
      paymentStatus: remaining === 0 ? "Paid" : "Pending",
    }),
  });

  setEditId(null);

  if (onRefresh) onRefresh();
};

  return (
    <div
      className="p-8 rounded-2xl space-y-6 shadow-md"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <h2 className="text-xl font-semibold">Invoices</h2>

      {/* Controls */}
      <div className="grid grid-cols-4 gap-4">
        <input
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded "
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="None">Sort</option>
          <option value="High">High to Low</option>
          <option value="Low">Low to High</option>
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i.toString()}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Invoice Cards */}
     {/* Invoice Cards */}
<div
  className="space-y-4 max-h-[450px] overflow-y-auto pr-2"
  style={{
    scrollbarWidth: "thin"
  }}
>
  {filteredInvoices.map((inv) => {
    const isEditing = editId === inv._id;

    return (
      <div
        key={inv._id}
        className="p-6 rounded-2xl shadow-sm hover:shadow-md transition"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">

          {/* LEFT */}
          <div
            className="cursor-pointer"
            onClick={() =>
              setOpenId(openId === inv._id ? null : inv._id)
            }
          >
            <h3 className="text-lg font-semibold">
              {isEditing ? (
                <input
                  value={editForm.client}
                  onChange={(e) =>
                    setEditForm({ ...editForm, client: e.target.value })
                  }
                  className="border p-1 rounded"
                />
              ) : (
                inv.client
              )}
            </h3>

            <div className="text-sm opacity-70 mt-1">
              ₹ {inv.paid} / ₹ {inv.total}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                inv.paymentStatus === "Paid"
                  ? "bg-green-500"
                  : "bg-yellow-500 animate-pulse"
              } text-white`}
            >
              {inv.paymentStatus}
            </span>

            {/* EDIT BUTTON */}
            {!isEditing ? (
              <button
                onClick={() => {
                  setEditId(inv._id);
                  setEditForm(inv);
                }}
                className="text-blue-500 text-sm hover:underline"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleUpdate(inv._id)}
                  className="text-green-600 text-sm font-medium"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </>
            )}

            {/* DELETE */}
            <button
              onClick={() => handleDelete(inv._id)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        {/* ================= EXPANDED SECTION ================= */}
        {openId === inv._id && (
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm border-t pt-4">

            {/* TOTAL */}
            <div>
              <label>Total</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.total}
                  onChange={(e) =>
                    setEditForm({ ...editForm, total: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div>₹ {inv.total}</div>
              )}
            </div>

            {/* PAID */}
            <div>
              <label>Paid</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.paid}
                  onChange={(e) =>
                    setEditForm({ ...editForm, paid: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div>₹ {inv.paid}</div>
              )}
            </div>

            {/* DATE */}
            <div>
              <label>Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div>{inv.date}</div>
              )}
            </div>

            {/* DURATION */}
            <div>
              <label>Duration</label>
              {isEditing ? (
                <input
                  value={editForm.duration}
                  onChange={(e) =>
                    setEditForm({ ...editForm, duration: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div>{inv.duration}</div>
              )}
            </div>

            {/* NOTES */}
            <div className="col-span-2">
              <label>Notes</label>
              {isEditing ? (
                <textarea
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm({ ...editForm, notes: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              ) : (
                <div>{inv.notes}</div>
              )}
            </div>

          </div>
        )}
      </div>
    );
  })}
</div>
    </div>
  );
}