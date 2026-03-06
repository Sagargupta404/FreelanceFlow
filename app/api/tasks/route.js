import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json([], { status: 401 });

    const user = verifyToken(token);

    const tasks = await Task.find({
      userId: user.id,
    });

    return NextResponse.json(tasks);

  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    const data = await req.json();

    const task = await Task.create({
      ...data,
      userId: user.id,
    });

    return NextResponse.json(task);

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = verifyToken(token);
    const { id } = await req.json();

    await Task.deleteOne({
      _id: id,
      userId: user.id,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}