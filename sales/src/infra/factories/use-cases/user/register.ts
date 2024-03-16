import { RegisterUserUseCase } from '@/application/use-cases/user'
import { makeDrizzleUserDao } from '@/infra/factories/daos/drizzle'

export const makeRegisterUserUseCase = (): RegisterUserUseCase => {
  return new RegisterUserUseCase(makeDrizzleUserDao())
}
