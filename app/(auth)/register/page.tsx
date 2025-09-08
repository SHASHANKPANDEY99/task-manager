'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (res.ok) router.push('/login')
    else setError((await res.json()).message || 'Failed')
  }

  return (
    <div className="mx-auto mt-24 max-w-md rounded-lg border bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Create an account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border p-2" type="password" placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-gray-900 p-2 text-white hover:bg-black disabled:opacity-50">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account? <Link href="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  )
}
