"use client";
import { useState } from "react";
import { mutate } from "swr";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "done">("pending");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = { title, description, status };

    mutate(
      (k: string) => k.startsWith("/api/tasks"),
      (data: any) => {
        if (!data) return data;
        return {
          ...data,
          items: [
            {
              _id: "temp",
              title,
              description,
              status,
              createdAt: new Date().toISOString(),
            },
            ...data.items,
          ],
        };
      },
      false
    );

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      setTitle("");
      setDescription("");
      setStatus("pending");
      mutate((k: string) => k.startsWith("/api/tasks"));
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded border bg-white p-4 shadow"
    >
      <h3 className="text-lg font-semibold">Create Task</h3>
      <input
        className="w-full rounded border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full rounded border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full rounded border p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
      >
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>
      <button
        disabled={loading}
        className="rounded bg-gray-900 px-3 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Task"}
      </button>
    </form>
  );
}
