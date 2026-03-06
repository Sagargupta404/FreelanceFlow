"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await fetch("/api/invoices");

      if (res.status === 401) {
        setInvoices([]);
        return;
      }

      const data = await res.json();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Invoice fetch error:", error);
      setInvoices([]);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <DataContext.Provider
      value={{
        invoices,
        clients,
        fetchInvoices,
        setInvoices,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }
  return context;
}