'use client'
import { mutate } from 'swr'

export default function TaskItem({ task }: { task: any }) {
  async function toggle() {
    const newStatus = task.status === 'pending' ? 'done' : 'pending'
    mutate((k: string) => k.startsWith('/api/tasks'), (data: any) => {
      if (!data) return data
      return { ...data, items: data.items.map((t: any) => t._id === task._id ? { ...t, status: newStatus } : t) }
    }, false)
    await fetch(`/api/tasks/${task._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
    mutate((k: string) => k.startsWith('/api/tasks'))
  }

  async function remove() {
    mutate((k: string) => k.startsWith('/api/tasks'), (data: any) => {
      if (!data) return data
      return { ...data, items: data.items.filter((t: any) => t._id !== task._id) }
    }, false)
    await fetch(`/api/tasks/${task._id}`, { method: 'DELETE' })
    mutate((k: string) => k.startsWith('/api/tasks'))
  }

  return (
    <li className="flex items-start justify-between rounded border bg-white p-3 shadow">
      <div>
        <p className="font-medium">{task.title}</p>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        <p className="mt-1 text-xs text-gray-500">Status: {task.status} • {new Date(task.createdAt).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={toggle} className="rounded border px-2 py-1 text-sm">
          Mark {task.status === 'pending' ? 'Done' : 'Pending'}
        </button>
        <button onClick={remove} className="rounded border px-2 py-1 text-sm text-red-600">
          Delete
        </button>
      </div>
    </li>
  )
}
