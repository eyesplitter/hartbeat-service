import { app } from './app'
import { setupRedis, closeRedis } from './redis'
import { DatabaseConnectionError } from './errors/databaseConnectionError'

const start = async () => {
  if (!process.env.HEARTBEAT_EXPIRE) {
    throw new Error('HEARTBEAT_EXPIRE should be defined')
  }

  if (!process.env.REDIS_URL) {
    throw new Error('REDIS_URL should be defined')
  }

  try {
    await setupRedis(process.env.REDIS_URL)
  } catch {
    throw new DatabaseConnectionError()
  }

  process.on('SIGINT', () => closeRedis())
  process.on('SIGTERM', () => closeRedis())

  app.listen(3000, () => {
    console.log('Listening on 3000')
  })
}

start()
