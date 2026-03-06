import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = signToken(user);

  const response = NextResponse.json({
    message: "Registered successfully",
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