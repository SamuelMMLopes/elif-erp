import type { Queue } from '@/application/contracts/queue'
import { OrganizationCreatedEvent } from '@/domain/events'
import { DomainEvents, type EventHandler } from '@/shared/events'

export class OnOrganizationCreatedSubscriber implements EventHandler {
  constructor(private readonly queue: Queue) {}

  private async publishQueue({
    organization,
  }: OrganizationCreatedEvent): Promise<void> {
    await this.queue.publish({
      event: 'organization-created',
      data: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
      },
    })
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.publishQueue.bind(this),
      OrganizationCreatedEvent.name,
    )
  }
}
