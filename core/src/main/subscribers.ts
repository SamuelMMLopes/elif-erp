import {
  makeOnOrganizationCreatedSubscriber,
  makeOnUserCreatedSubscriber,
} from '@/infra/factories/subscribers'

export function setupSubscribers(): void {
  makeOnUserCreatedSubscriber().setupSubscriptions()
  makeOnOrganizationCreatedSubscriber().setupSubscriptions()
}
