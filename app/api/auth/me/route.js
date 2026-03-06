import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    return NextResponse.json({ user });

  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null });
  }
}