import type { Queue } from '@/application/contracts/queue'
import { makeRegisterOrganizationUseCase } from '@/infra/factories/use-cases/organization'

const registerOrganization = makeRegisterOrganizationUseCase()

export default async (queue: Queue): Promise<void> => {
  queue.consume({
    queue: 'create-organization-in-sales',
    callback: async (data) => {
      await registerOrganization.execute(data)
    },
  })
}
