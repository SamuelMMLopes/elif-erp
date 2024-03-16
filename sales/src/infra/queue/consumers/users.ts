import type { Queue } from '@/application/contracts/queue'
import { makeRegisterUserUseCase } from '@/infra/factories/use-cases/user'

const registerUser = makeRegisterUserUseCase()

export default async (queue: Queue): Promise<void> => {
  queue.consume({
    queue: 'create-user-in-sales',
    callback: async (data) => {
      await registerUser.execute(data)
    },
  })
}
