import type { Channel } from 'amqplib'

import { binds } from './data'

export async function assertBinds(channel: Channel): Promise<void> {
  for (const bind of binds) {
    await channel.bindQueue(bind[0], bind[1], '')
  }
}
