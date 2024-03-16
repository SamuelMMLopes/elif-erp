import amqp from 'amqplib'

import { assertBinds } from './assert-binds'
import { assertExchanges } from './assert-exchanges'
import { assertQueues } from './assert-queues'
import { env } from './env'

const connection = await amqp.connect(env.QUEUE_URL)
const channel = await connection.createChannel()

await Promise.all([assertExchanges(channel), assertQueues(channel)])

await assertBinds(channel)

await connection.close()

console.log('✔ Queues asserted')
process.exit()
