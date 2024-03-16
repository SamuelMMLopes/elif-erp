import type { Channel } from 'amqplib'

import { exchanges, queues } from '@/names'

export default async (channel: Channel): Promise<void> => {
  await channel.assertQueue(queues.CREATE_ORGANIZATION_IN_SALES, {
    durable: true,
  })
  await channel.bindQueue(
    queues.CREATE_ORGANIZATION_IN_SALES,
    exchanges.ORGANIZATION_CREATED,
    '',
  )
}
