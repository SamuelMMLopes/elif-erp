import type { Customer } from '@/domain/entities'
import type { DomainEvent } from '@/shared/events'

export class CustomerCreatedEvent implements DomainEvent {
  public customer: Customer
  public ocurredAt: Date

  constructor(customer: Customer) {
    this.customer = customer
    this.ocurredAt = new Date()
  }

  getId(): string {
    return this.customer.id
  }
}
