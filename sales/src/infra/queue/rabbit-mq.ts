import amqp from 'amqplib'

import type { Queue } from '@/application/contracts/queue'

export class RabbitMQAdapter implements Queue {
  private static instance: Queue | undefined
  private connection: amqp.Connection | undefined

  private constructor(private readonly url: string) {
    this.connect()
  }

  static getInstance(url: string): Queue {
    if (!this.instance) {
      this.instance = new RabbitMQAdapter(url)
    }
    return this.instance
  }

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url)
  }

  async disconnect(): Promise<void> {
    this.connection?.close()
    this.connection = undefined
  }

  async consume({ queue, callback }: Queue.ConsumeInput): Promise<void> {
    if (!this.connection) return
    const channel = await this.connection.createChannel()
    await channel.consume(
      queue,
      async (message: amqp.Message | null): Promise<void> => {
        if (!message) return
        const input = JSON.parse(message.content.toString())
        try {
          await callback(input)
          channel.ack(message)
        } catch (error) {
          console.error(error)
        }
      },
    )
  }

  async publish({ event, data }: Queue.PublishInput): Promise<void> {
    if (!this.connection) return
    const channel = await this.connection.createChannel()
    channel.publish(event, '', Buffer.from(JSON.stringify(data)))
  }
}
