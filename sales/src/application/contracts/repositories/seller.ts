import type { Seller } from '@/domain/entities'

export namespace SellerRepository {
  export type FindByUserIdInput = {
    userId: string
    organizationId: string
  }
}

export interface SellerRepository {
  findByUserId: (
    input: SellerRepository.FindByUserIdInput,
  ) => Promise<Seller | null>
  create: (seller: Seller) => Promise<void>
}
