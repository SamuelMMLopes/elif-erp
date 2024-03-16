import { OnUserCreatedSubscriber } from '@/application/subscribers'
import { makeRabbitMQAdapter } from '@/infra/factories/queue'

export const makeOnUserCreatedSubscriber = (): OnUserCreatedSubscriber => {
  return new OnUserCreatedSubscriber(makeRabbitMQAdapter())
}
