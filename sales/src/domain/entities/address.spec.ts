import { describe, expect, it } from 'bun:test'

import { Address } from './address'

describe('Address', () => {
  it('should return an Address instance if it is a valid address', () => {
    const address = Address.create({
      customerId: 'any_customer_id',
      state: 'any_state',
      street: 'any_street',
      city: 'any_city',
      neighborhood: 'any_neighborhood',
      type: 'billing',
      zipCode: 'any_zip_code',
    }).value
    expect(address).toBeInstanceOf(Address)
  })
})
