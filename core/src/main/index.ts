import { Hono } from 'hono'

import { env } from '@/infra/env'
import { setupHono } from '@/infra/http/hono'

import { setupSubscribers } from './subscribers'

setupSubscribers()

const app = new Hono()

await setupHono(app)

app.onError((error, context) => {
  console.error(error)
  context.status(500)
  return context.json({ message: 'Internal server error' })
})

export default {
  port: env.API_PORT,
  fetch: app.fetch,
}
