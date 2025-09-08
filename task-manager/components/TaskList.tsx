'use client'
import React from 'react'
import useSWR from 'swr'
import TaskItem from './TaskItem'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function TaskList() {
  const [search, setSearch] = React.useState('')
  const [status, setStatus] = React.useState<'all' | 'pending' | 'done'>('all')
  const [page, setPage] = React.useState(1)
  const limit = 10
  const key = `/api/tasks?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&status=${status}`
  const { data, error, isLoading } = useSWR(key, fetcher)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 rounded border bg-white p-3 shadow md:flex-row md:items-center md:justify-between">
        <input className="w-full rounded border p-2 md:max-w-sm" placeholder="Search title or description" value={search} onChange={(e) => { setPage(1); setSearch(e.target.value) }} />
        <div className="flex items-center gap-2">
          <select className="rounded border p-2" value={status} onChange={(e) => { setPage(1); setStatus(e.target.value as any) }}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {isLoading && <p className="text-sm text-gray-600">Loading tasks…</p>}
      {error && <p className="text-sm text-red-600">Failed to load tasks</p>}

      <ul className="space-y-2">
        {data?.items?.map((t: any) => (
          <TaskItem key={t._id} task={t} />
        ))}
      </ul>

      {data && (
        <div className="flex items-center justify-between">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-3 py-1.5 disabled:opacity-50">Prev</button>
          <p className="text-sm text-gray-600">Page {data.page} of {data.pages}</p>
          <button disabled={data.page >= data.pages} onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1.5 disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  )
}
