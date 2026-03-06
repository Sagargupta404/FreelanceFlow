"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import AddInvoiceForm from "../../components/dashboard/AddInvoiceForm";
import InvoiceTable from "../../components/dashboard/InvoiceTable";
import RevenueChart from "../../components/dashboard/RevenueChart";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

const { invoices, fetchInvoices } = useData();
 

  /* ================= PROTECT ROUTE ================= */

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  /* ================= FETCH INVOICES ================= */



  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user],[fetchInvoices]);

  /* ================= LOADING STATE ================= */

  if (authLoading) {
    return (
      <div className="p-10 text-center">
        Loading dashboard...
      </div>
    );
  }

  /* ================= SAFE CALCULATIONS ================= */

  const totalContractValue = invoices.reduce(
    (sum, inv) => sum + Number(inv.total || 0),
    0
  );

  const totalEarned = invoices.reduce(
    (sum, inv) => sum + Number(inv.paid || 0),
    0
  );

  const totalPending = invoices.reduce(
    (sum, inv) => sum + Number(inv.remaining || 0),
    0
  );

  return (
   <div className="p-2 sm:p-6 lg:p-8 space-y-4">

    {/* ================= MAIN GRID ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

      {/* ================= LEFT COLUMN ================= */}
      <div className="space-y-3">
 
        {/* Financial Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card title="Total Contract Value" value={`₹ ${totalContractValue}`} />
          <Card title="Total Earned" value={`₹ ${totalEarned}`} />
          <Card title="Pending Revenue" value={`₹ ${totalPending}`} />
        </div>

        {/* Revenue Chart */}
         <div className="w-full h-[250px] sm:h-[300px]">
          <RevenueChart />
        </div>
          {/* Add Invoice Form */}
    <AddInvoiceForm onSuccess={fetchInvoices} />

      </div>
  {/* ================= RIGHT COLUMN ================= */}
  <div className="space-y-2">

  

    {/* Invoice Table + Filters */}
            <div className="overflow-x-auto">
          <InvoiceTable
            invoices={invoices}
            onRefresh={fetchInvoices}
          />
        </div>


  </div>

</div>

     
    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function Card({ title, value }) {
  return (
    <div
      className="p-3 rounded-2xl text-center"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-xs  opacity-60">{title}</p>
      <h2 className="text-lg font-bold mt-1">{value}</h2>
    </div>
  );
}