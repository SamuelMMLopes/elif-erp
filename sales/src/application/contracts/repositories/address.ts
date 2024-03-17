import type { Address } from '@/domain/entities/address'

export interface AddressRepository {
  create: (address: Address) => Promise<void>
}
