"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex justify-between items-center pl-50 pr-4 sm:px-15 lg:px-20 py-3">
        {/* Logo */}
        <div className="font-bold text-lg sm:text-xl lg:text-2xl">
          FreelanceFlow
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {!user ? (
            <>
              <Link href="/login" className="hover:opacity-70 text-sm">
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-sm text-black bg-white"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="opacity-80 text-sm">
                Welcome, <b>{user.name}</b>
              </span>

              <Link href="/dashboard" className="hover:opacity-70 text-sm">
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 border rounded-xl text-sm"
                style={{ borderColor: "var(--border)" }}
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-15 pb-4">

          {!user ? (
            <>
              <Link href="/login" className="hover:opacity-70">
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-xl text-black bg-white w-fit"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="opacity-80">
                Welcome, <b>{user.name}</b>
                 <button
                onClick={logout}
                className="px-4 mx-8 py-2 border rounded-xl w-fit"
                style={{ borderColor: "var(--border)" }}
              >
                Logout
              </button>
              </span>

            

             
            </>
          )}

        </div>
      )}
    </div>
  );
}