import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prime_nagpur";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  lastFailure: number;
}

const g = globalThis as unknown as { mongooseConn?: MongooseCache };

if (!g.mongooseConn) {
  g.mongooseConn = { conn: null, promise: null, lastFailure: 0 };
}

const cached = g.mongooseConn;

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 60-second non-blocking cooldown if network/IP is unreachable
  const now = Date.now();
  if (cached.lastFailure > 0 && now - cached.lastFailure < 60000) {
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1000,
      connectTimeoutMS: 1000,
      socketTimeoutMS: 2000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        cached.lastFailure = 0;
        cached.conn = m;
        return m;
      })
      .catch(() => {
        cached.promise = null;
        cached.conn = null;
        cached.lastFailure = Date.now();
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    cached.lastFailure = Date.now();
    return null;
  }
}
