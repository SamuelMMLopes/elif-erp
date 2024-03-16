import { DrizzleUserDao } from '@/infra/daos/drizzle'

export const makeDrizzleUserDao = (): DrizzleUserDao => {
  return new DrizzleUserDao()
}
