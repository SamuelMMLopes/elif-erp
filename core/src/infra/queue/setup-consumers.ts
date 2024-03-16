import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import type { Queue } from '@/application/contracts/queue'

export async function setupQueueConsumers(queue: Queue): Promise<void> {
  const files = await readdir(join(__dirname, './consumers'))
  await Promise.all(
    files
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        await (await import(`./consumers/${file}`)).default(queue)
      }),
  )
}
