"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <div
      className="flex justify-between items-center px-8 py-4 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <div className="font-bold text-2xl">
        FreelanceFlow
      </div>

      <div className="flex items-center gap-6">

        {!user ? (
          <>
            <Link href="/login" className="hover:opacity-70">
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-white"
              style={{ backgroundColor: "white" }}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="opacity-80">
              Welcome, <b>{user.name}</b>
            </span>

            <Link
              href="/dashboard"
              className="hover:opacity-70"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 border rounded-xl"
              style={{ borderColor: "var(--border)" }}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}