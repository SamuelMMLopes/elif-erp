import type { SellerRepository } from '@/application/contracts/repositories/seller'
import { Seller } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { sellers } from '@/infra/database/schema'

export class DrizzleSellerRepository implements SellerRepository {
  async create(seller: Seller): Promise<void> {
    await db.insert(sellers).values(seller)
  }

  async findByUserId({
    userId = '',
    organizationId = '',
  }: SellerRepository.FindByUserIdInput): Promise<Seller | null> {
    const rawSeller = await db.query.sellers.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.organizationId, organizationId),
          eq(fields.userId, userId),
        )
      },
    })
    if (!rawSeller) {
      return null
    }
    return Seller.restore(rawSeller)
  }
}
