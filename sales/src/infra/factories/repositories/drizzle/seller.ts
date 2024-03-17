import { DrizzleSellerRepository } from '@/infra/repositories/drizzle'

export const makeDrizzleSellerRepository = (): DrizzleSellerRepository => {
  return new DrizzleSellerRepository()
}
