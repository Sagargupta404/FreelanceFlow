"use client";

import { useEffect, useState } from "react";

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const today = new Date().toISOString().split("T")[0];
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const monthName = current.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 const handleAddTask = async () => {
  if (!form.title || !selectedDate) return;

  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      date: selectedDate,
    }),
  });

  if (!res.ok) {
    console.log("Task failed");
    return;
  }

  setForm({
    title: "",
    description: "",
    priority: "Medium",
  });

  await fetchTasks();
};
  const deleteTask = async (id) => {
    const confirmDelete = confirm("Delete this task permanently?");
    if (!confirmDelete) return;

    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTasks();
  };

  return (
    <div className="p-10 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {monthName} {year}
        </h1>
        <p className="text-sm opacity-60">
          Plan your work. Stay ahead.
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-6">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const dayTasks = tasks.filter(t => t.date === dateStr);
          const isToday = dateStr === today;

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={`p-4 rounded-2xl shadow-sm transition cursor-pointer hover:scale-[1.02] ${
                isToday
                  ? "border-2 border-blue-500"
                  : "border"
              }`}
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="font-semibold mb-2">
                {day}
              </div>

              <div className="space-y-1">
                {dayTasks.slice(0, 2).map(task => (
                  <div
                    key={task._id}
                    className={`text-xs px-2 py-1 rounded-lg text-white ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.title}
                  </div>
                ))}

                {dayTasks.length > 2 && (
                  <div className="text-xs opacity-60">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[450px] p-6 rounded-2xl shadow-xl space-y-4">

            <h2 className="text-lg font-semibold">
              Tasks for {selectedDate}
            </h2>

            <input
              placeholder="Task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 border rounded"
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <button
              onClick={handleAddTask}
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Add Task
            </button>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {tasks
                .filter(t => t.date === selectedDate)
                .map(task => (
                  <div
                    key={task._id}
                    className="flex justify-between items-center text-sm border p-2 rounded"
                  >
                    <span>{task.title}</span>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>
<button
  onClick={() => setSelectedDate(null)}
  className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-xl transition"
>
  Close
</button>
          </div>
        </div>
      )}

    </div>
  );
}