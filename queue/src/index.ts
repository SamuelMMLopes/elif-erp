import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

import amqp from 'amqplib'

import { env } from './env'

const connection = await amqp.connect(env.QUEUE_URL)
const channel = await connection.createChannel()

const files = await readdir(join(__dirname, './services'))
await Promise.all(
  files
    .filter((file) => !file.endsWith('.map'))
    .map(async (file) => {
      await (await import(`./services/${file}`)).default(channel)
    }),
)

await connection.close()

console.log('✔ Queues asserted')
process.exit()
