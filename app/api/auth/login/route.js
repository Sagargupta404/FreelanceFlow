import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 400 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 400 }
    );
  }

  const token = signToken(user);

  const response = NextResponse.json({
    message: "Login success",
    user: {
      name: user.name,
      email: user.email,
    },
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  return response;
}