import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "lib/db";
import { loginSchema } from "lib/validators";
import User from "models/User";
import { signToken } from "lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { error, value } = loginSchema.validate(body);
    if (error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    const user = await User.findOne({ email: value.email });
    if (!user)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const ok = await bcrypt.compare(value.password, user.passwordHash);
    if (!ok)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );

    const token = signToken({ uid: String(user._id), email: user.email });

    const res = NextResponse.json({ message: "Logged in" });
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
