import { type DomainEvent, DomainEvents } from '@/shared/events'

export abstract class Entity {
  abstract id: string
  private _domainEvents: DomainEvent[] = []

  public equals(entity: Entity): boolean {
    return entity === this || entity.id === this.id
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markEntityForDispatch(this)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }
}
