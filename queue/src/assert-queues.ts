import type { Channel } from 'amqplib'

import { queues } from './data'

export async function assertQueues(channel: Channel): Promise<void> {
  for (const queue of Object.values(queues)) {
    await channel.assertQueue(queue, {
      durable: true,
    })
  }
}
