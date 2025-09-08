'use client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Task Manager</h1>
        <button onClick={logout} className="rounded bg-gray-900 px-3 py-1.5 text-white hover:bg-black">
          Logout
        </button>
      </div>
    </header>
  )
}
