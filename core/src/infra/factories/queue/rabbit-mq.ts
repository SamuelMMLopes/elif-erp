import type { Queue } from '@/application/contracts/queue'
import { env } from '@/infra/env'
import { RabbitMQAdapter } from '@/infra/queue'

export const makeRabbitMQAdapter = (): Queue => {
  return RabbitMQAdapter.getInstance(env.QUEUE_URL)
}
