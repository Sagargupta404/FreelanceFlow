import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Accent Glow */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "var(--primary)" }}
      />

      {/* Top Right Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">

        <h1 className="text-6xl font-bold tracking-tight mb-6">
          FreelanceFlow
        </h1>

        <p className="max-w-2xl mb-10 text-lg opacity-80 leading-relaxed">
          Take control of your freelance workflow.
          Track invoices, monitor revenue, plan tasks,
          and manage clients — all from one powerful dashboard.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-2xl font-medium transition hover:scale-105"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
            }}
          >
            Visit Dashboard
          </Link>

          <Link
            href="/dashboard/calendar"
            className="px-8 py-3 rounded-2xl border transition hover:scale-105"
            style={{
              borderColor: "var(--border)",
            }}
          >
            Explore Calendar
          </Link>
        </div>

      </div>

      {/* FEATURE PREVIEW SECTION */}
      <div className="px-10 pb-28">

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <FeatureCard
            title="Smart Invoice Tracking"
            desc="Track paid, pending and overdue invoices with live financial insights."
          />

          <FeatureCard
            title="Revenue Analytics"
            desc="Visualize monthly growth and monitor business performance clearly."
          />

          <FeatureCard
            title="Task & Calendar Planner"
            desc="Organize your month with priority-based planning and reminders."
          />

        </div>

      </div>
     <footer
  className="mt-20 border-t"
  style={{ borderColor: "var(--border)" }}
>
  <div className="max-w-7xl mx-auto px-6 py-12">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Brand */}
      <div>
        <h3 className="font-bold text-lg mb-4">
          FreelanceFlow
        </h3>
        <p className="text-sm opacity-70 leading-relaxed">
          The Financial OS for modern freelancers.
          Track revenue, manage expenses,
          and grow your business.
        </p>
      </div>

      {/* Product */}
      <div>
        <h4 className="font-semibold mb-4">Product</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><a href="#" className="hover:opacity-100">Invoices</a></li>
          <li><a href="#" className="hover:opacity-100">Expenses</a></li>
          <li><a href="#" className="hover:opacity-100">Analytics</a></li>
          <li><a href="#" className="hover:opacity-100">Calendar</a></li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><a href="#" className="hover:opacity-100">About</a></li>
          <li><a href="#" className="hover:opacity-100">Contact</a></li>
          <li><a href="#" className="hover:opacity-100">Privacy</a></li>
          <li><a href="#" className="hover:opacity-100">Terms</a></li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="font-semibold mb-4">Connect</h4>
        <ul className="space-y-2 text-sm opacity-70">
          <li><a href="#" className="hover:opacity-100">LinkedIn</a></li>
          <li><a href="#" className="hover:opacity-100">Twitter</a></li>
          <li><a href="#" className="hover:opacity-100">GitHub</a></li>
        </ul>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="mt-12 text-center text-xs opacity-60">
      © {new Date().getFullYear()} FreelanceFlow. All rights reserved.
    </div>

  </div>
</footer>

    </div>
  );
}

/* ---------- Feature Card ---------- */

function FeatureCard({ title, desc }) {
  return (
    <div
      className="p-8 rounded-2xl transition hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <h3 className="text-xl font-semibold mb-4">
        {title}
      </h3>
      <p className="opacity-70 leading-relaxed">
        {desc}
      </p>
      
    </div>
  );
}