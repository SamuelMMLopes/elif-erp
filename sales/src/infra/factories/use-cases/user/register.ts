import { RegisterUserUseCase } from '@/application/use-cases/user'
import { makeDrizzleUserRepository } from '@/infra/factories/repositories/drizzle'

export const makeRegisterUserUseCase = (): RegisterUserUseCase => {
  return new RegisterUserUseCase(makeDrizzleUserRepository())
}
