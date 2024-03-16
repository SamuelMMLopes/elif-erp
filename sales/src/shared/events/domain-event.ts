export interface DomainEvent {
  ocurredAt: Date
  getId(): string
}
