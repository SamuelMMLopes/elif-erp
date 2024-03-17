import type { Queue } from '@/application/contracts/queue'
import { UserCreatedEvent } from '@/domain/events'
import { DomainEvents, type EventHandler } from '@/shared/events'

export class OnUserCreatedSubscriber implements EventHandler {
  constructor(private readonly queue: Queue) {
    this.setupSubscriptions()
  }

  private publishInQueue({ user }: UserCreatedEvent): void {
    this.queue.publish({
      event: 'user-created',
      data: { id: user.id, name: user.name },
    })
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.publishInQueue.bind(this), UserCreatedEvent.name)
  }
}
