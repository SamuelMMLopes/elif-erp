import { Hono } from 'hono'

import { env } from '@/infra/env'
import { makeRabbitMQAdapter } from '@/infra/factories/queue'
import { setupHono } from '@/infra/http/hono'
import { setupQueueConsumers } from '@/infra/queue'

import { setupSubscribers } from './subscribers'

setupSubscribers()

const app = new Hono()

const rabbitmq = makeRabbitMQAdapter()
await rabbitmq.connect()

await Promise.all([setupHono(app), setupQueueConsumers(rabbitmq)])

app.onError((error, context) => {
  console.error(error)
  context.status(500)
  return context.json({ message: 'Internal server error' })
})

export default {
  port: env.API_PORT,
  fetch: app.fetch,
}
