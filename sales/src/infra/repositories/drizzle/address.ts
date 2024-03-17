import type { AddressRepository } from '@/application/contracts/repositories'
import type { Address } from '@/domain/entities/address'
import { db } from '@/infra/database/connection'
import { addresses } from '@/infra/database/schema'

export class DrizzleAddressRepository implements AddressRepository {
  async create(address: Address): Promise<void> {
    await db.insert(addresses).values(address)
  }
}
