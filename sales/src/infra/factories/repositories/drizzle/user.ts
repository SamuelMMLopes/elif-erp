import { DrizzleUserRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleUserRepository = (): DrizzleUserRepository => {
  return new DrizzleUserRepository()
}
