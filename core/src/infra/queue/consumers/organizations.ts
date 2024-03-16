import type { Queue } from '@/application/contracts/queue'
import { makeSendOrganizationWelcomeEmailUseCase } from '@/infra/factories/use-cases/organization'

const sendOrganizationWelcomeEmail = makeSendOrganizationWelcomeEmailUseCase()

export default async (queue: Queue): Promise<void> => {
  queue.consume({
    queue: 'send-organization-welcome-email',
    callback: async (data) => {
      await sendOrganizationWelcomeEmail.execute(data)
    },
  })
}
