import type { Channel } from 'amqplib'

import { exchanges } from '@/names'

export default async (channel: Channel): Promise<void> => {
  await channel.assertExchange(exchanges.ORGANIZATION_CREATED, 'direct', {
    durable: true,
  })
  await channel.assertExchange(exchanges.USER_CREATED, 'direct', {
    durable: true,
  })
}
