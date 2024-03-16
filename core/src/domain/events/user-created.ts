import type { User } from '@/domain/entities'
import type { DomainEvent } from '@/shared/events'

export class UserCreatedEvent implements DomainEvent {
  public user: User
  public ocurredAt: Date

  constructor(user: User) {
    this.user = user
    this.ocurredAt = new Date()
  }

  getId(): string {
    return this.user.id
  }
}
