import type { Channel } from 'amqplib'

import { exchanges } from './data'

export async function assertExchanges(channel: Channel): Promise<void> {
  for (const exchange of Object.values(exchanges)) {
    await channel.assertExchange(exchange, 'direct', {
      durable: true,
    })
  }
}
