import type { Entity } from '@/shared/core'

import type { DomainEvent } from './domain-event'

type DomainEventCallback = (event: any) => void

export class DomainEvents {
  private static handlersMap: Map<string, DomainEventCallback[]> = new Map()
  private static markedEntities: Entity[] = []
  public static shouldRun = true

  public static markEntityForDispatch(entity: Entity): void {
    const entityFound = !!this.findMarkedEntityByID(entity.id)
    if (!entityFound) {
      this.markedEntities.push(entity)
    }
  }

  private static dispatchEntityEvents(entity: Entity): void {
    entity.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeEntityFromMarkedDispatchList(entity: Entity): void {
    const index = this.markedEntities.findIndex((current) =>
      current.equals(entity),
    )
    this.markedEntities.splice(index, 1)
  }

  private static findMarkedEntityByID(id: string): Entity | undefined {
    return this.markedEntities.find((entity) => entity.id === id)
  }

  public static dispatchEventsForEntity(id: string): void {
    const entity = this.findMarkedEntityByID(id)
    if (entity) {
      this.dispatchEntityEvents(entity)
      entity.clearEvents()
      this.removeEntityFromMarkedDispatchList(entity)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ): void {
    const wasEventRegisteredBefore = this.handlersMap.has(eventClassName)
    if (!wasEventRegisteredBefore) {
      this.handlersMap.set(eventClassName, [])
    }
    this.handlersMap.get(eventClassName)?.push(callback)
  }

  public static clearHandlers(): void {
    this.handlersMap.clear()
  }

  public static clearMarkedEntities(): void {
    this.markedEntities = []
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name
    const isEventRegistered = this.handlersMap.has(eventClassName)
    if (!this.shouldRun) {
      return
    }
    if (isEventRegistered) {
      const handlers = this.handlersMap.get(eventClassName) ?? []
      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
