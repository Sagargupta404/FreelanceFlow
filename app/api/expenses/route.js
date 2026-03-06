import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Expense from "@/models/Expense";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

/* ================= GET ================= */
export async function GET() {
  try {
    await connectDB();
    const user = await getUser();

    if (!user) {
      return NextResponse.json([], { status: 200 });
    }

    const expenses = await Expense.find({ userId: user.id });

    return NextResponse.json(expenses || []);
  } catch (error) {
    console.error("GET EXPENSE ERROR:", error);
    return NextResponse.json([], { status: 200 });
  }
}

/* ================= POST ================= */
export async function POST(req) {
  await connectDB();
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const expense = await Expense.create({
    ...data,
    userId: user.id,
  });

  return NextResponse.json(expense);
}

/* ================= DELETE ================= */
export async function DELETE(req) {
  await connectDB();
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await Expense.deleteOne({ _id: id, userId: user.id });

  return NextResponse.json({ success: true });
}

/* ================= UPDATE ================= */
export async function PUT(req) {
  await connectDB();
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...updates } = await req.json();

  const updated = await Expense.findOneAndUpdate(
    { _id: id, userId: user.id },
    updates,
    { new: true }
  );

  return NextResponse.json(updated);
}