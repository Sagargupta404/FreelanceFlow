"use client";

import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  
  return (
    <header
      className="h-16 flex items-center justify-between px-8"
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <h1 className="text-lg font-semibold">Dashboard</h1>
            
      <ThemeToggle />
    </header>
  );
}