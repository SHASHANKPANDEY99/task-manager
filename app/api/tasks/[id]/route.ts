import { getUserFromCookie } from "lib/auth";
import { connectDB } from "lib/db";
import { updateTaskSchema } from "lib/validators";
import Task from "models/Task";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = getUserFromCookie();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const task = await Task.findById(params.id);
  if (!task || String(task.userId) !== user.uid)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(task);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { error, value } = updateTaskSchema.validate(body);
    if (error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    const task = await Task.findById(params.id);
    if (!task || String(task.userId) !== user.uid)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    Object.assign(task, value);
    await task.save();
    return NextResponse.json(task);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const task = await Task.findById(params.id);
    if (!task || String(task.userId) !== user.uid)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    await task.deleteOne();
    return NextResponse.json({ message: "Deleted" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
