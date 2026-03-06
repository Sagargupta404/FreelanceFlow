import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

/* ================= GET ================= */

export async function GET() {
  await connectDB();

 const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = verifyToken(token);

  const invoices = await Invoice.find({
    userId: user.id,
  });

  return NextResponse.json(invoices);
}

/* ================= POST ================= */

export async function POST(req) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = verifyToken(token);

  const data = await req.json();

  const invoice = await Invoice.create({
    ...data,
    userId: user.id,
  });
console.log("Decoded user:", user);
  await sendEmail(
    user.email,
    "New Invoice Created",
    `Invoice for ${data.client} created successfully.`
  );

  return NextResponse.json(invoice);
}

/* ================= DELETE ================= */

export async function DELETE(req) {
  await connectDB();

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user = verifyToken(token);

  const { id } = await req.json();

  await Invoice.findOneAndDelete({
    _id: id,
    userId: user.id,
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    const data = await req.json();

    const total = Number(data.total);
    const paid = Number(data.paid);
    const remaining = total - paid;

    const updated = await Invoice.findOneAndUpdate(
      { _id: data.id, userId: user.id },
      {
        client: data.client,
        total,
        paid,
        remaining,
        duration: data.duration,
        date: data.date,
        notes: data.notes,
        workStatus: data.workStatus,
        paymentStatus: remaining === 0 ? "Paid" : "Pending",
      },
      { new: true }
    );

    return NextResponse.json(updated);

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}