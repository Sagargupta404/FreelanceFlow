"use client";

import { useState } from "react";

export default function SettingsPage() {

  const [activeTab, setActiveTab] = useState("business");

  const tabs = [
    { id: "business", label: "Business Profile" },
    { id: "financial", label: "Financial Defaults" },
    { id: "budget", label: "Budget Control" },
    { id: "invoice", label: "Invoice Automation" },
    { id: "system", label: "System Preferences" },
    { id: "danger", label: "Danger Zone" },
  ];

  return (
   <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 p-4 sm:p-6 lg:p-8">

      {/* LEFT PANEL */}
      <div className="lg:w-60 border-b lg:border-b-0 lg:border-r pb-4 lg:pb-0 lg:pr-6 flex lg:block overflow-x-auto gap-4 lg:space-y-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === tab.id
                ? "bg-blue-400 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RIGHT PANEL */}
     <div className="flex-1 w-full max-w-3xl space-y-12">

        {activeTab === "business" && <BusinessSettings />}
        {activeTab === "financial" && <FinancialSettings />}
        {activeTab === "budget" && <BudgetSettings />}
        {activeTab === "invoice" && <InvoiceSettings />}
        {activeTab === "system" && <SystemSettings />}
        {activeTab === "danger" && <DangerZone />}

      </div>

    </div>
  );
}

/* ================= SECTIONS ================= */

function BusinessSettings() {
  return (
    <Section title="Business Profile" className="space-y-15">
      <input placeholder="Business Name" className="input"/>
      <input placeholder="GST / Tax ID" className="input"/>
      <select className="input">
        <option>₹ INR</option>
        <option>$ USD</option>
        <option>€ EUR</option>
      </select>
      <button className="btn">Save Changes</button>
    </Section>
  );
}

function FinancialSettings() {
  return (
    <Section title="Financial Defaults">
      <input type="number" placeholder="Default Tax %" className="input"/>
      <select className="input">
        <option>Payment Due in 7 Days</option>
        <option>Payment Due in 15 Days</option>
        <option>Payment Due in 30 Days</option>
      </select>
      <button className="btn">Save Financial Settings</button>
    </Section>
  );
}

function BudgetSettings() {
  return (
    <Section title="Budget Control">
      <input type="number" placeholder="Monthly Budget" className="input"/>
      <input type="number" placeholder="Alert Threshold %" className="input"/>
      <button className="btn">Save Budget</button>
    </Section>
  );
}

function InvoiceSettings() {
  return (
    <Section title="Invoice Automation">
     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span>Auto Mark Paid When Remaining = 0</span>
        <input type="checkbox"/>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span>Send Invoice Email Notification</span>
        <input type="checkbox"/>
      </div>
      <button className="btn">Save Invoice Settings</button>
    </Section>
  );
}

function SystemSettings() {
  return (
    <Section title="System Preferences">
    <div className="flex flex-wrap gap-4">
        <button className="btn">Light Mode</button>
        <button className="btn">Dark Mode</button>
      </div>
    </Section>
  );
}

function DangerZone() {
  return (
    <div className="p-6 sm:p-8 border border-red-500 rounded-xl space-y-6">
      <h2 className="text-red-500 font-semibold text-lg">
        Danger Zone
      </h2>
      <button className="danger-btn">
        Delete All Data
      </button> <br></br>
      <button className="danger-btn">
        Delete Account
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return (
   <div className="p-4 sm:p-6 border rounded-xl space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}