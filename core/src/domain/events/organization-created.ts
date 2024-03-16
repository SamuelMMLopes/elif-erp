import type { Organization } from '@/domain/entities'
import type { DomainEvent } from '@/shared/events'

export class OrganizationCreatedEvent implements DomainEvent {
  public organization: Organization
  public ocurredAt: Date

  constructor(organization: Organization) {
    this.organization = organization
    this.ocurredAt = new Date()
  }

  getId(): string {
    return this.organization.id
  }
}
