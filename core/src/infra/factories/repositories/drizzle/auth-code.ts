import { DrizzleAuthCodeRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleAuthCodeRepository = (): DrizzleAuthCodeRepository => {
  return new DrizzleAuthCodeRepository()
}
