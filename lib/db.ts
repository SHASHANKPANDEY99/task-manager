import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not set')
}

let isConnected = 0

export async function connectDB() {
  if (isConnected) return
  const conn = await mongoose.connect(MONGODB_URI)
  isConnected = conn.connections[0].readyState
}
