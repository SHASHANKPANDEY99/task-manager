import { getUserFromCookie } from "lib/auth";
import { connectDB } from "lib/db";
import { createTaskSchema } from "lib/validators";
import Task from "models/Task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const q: any = { userId: user.uid };
    if (status !== "all") q.status = status;
    if (search)
      q.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Task.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(q),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { error, value } = createTaskSchema.validate(body);
    if (error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    const task = await Task.create({ ...value, userId: user.uid });
    return NextResponse.json(task, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
