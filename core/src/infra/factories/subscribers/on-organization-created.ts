import { OnOrganizationCreatedSubscriber } from '@/application/subscribers'
import { makeRabbitMQAdapter } from '@/infra/factories/queue'

export const makeOnOrganizationCreatedSubscriber =
  (): OnOrganizationCreatedSubscriber => {
    return new OnOrganizationCreatedSubscriber(makeRabbitMQAdapter())
  }
