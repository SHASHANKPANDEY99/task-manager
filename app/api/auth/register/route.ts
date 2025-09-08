import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "lib/db";
import { registerSchema } from "lib/validators";
import User from "models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { error, value } = registerSchema.validate(body);
    if (error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    const existing = await User.findOne({ email: value.email });
    if (existing)
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );

    const passwordHash = await bcrypt.hash(value.password, 10);
    await User.create({ email: value.email, passwordHash });

    return NextResponse.json({ message: "Registered" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
