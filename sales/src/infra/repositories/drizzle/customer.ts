import type { CustomerRepository } from '@/application/contracts/repositories'
import { Customer } from '@/domain/entities'
import { db } from '@/infra/database/connection'
import { customers } from '@/infra/database/schema'

export class DrizzleCustomerRepository implements CustomerRepository {
  async create(customer: Customer): Promise<void> {
    await db.insert(customers).values(customer)
  }

  async findByDocument({
    document = '',
    organizationId = '',
  }: CustomerRepository.FindByDocumentInput): Promise<Customer | null> {
    const rawCustomer = await db.query.customers.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.document, document),
          eq(fields.organizationId, organizationId),
        )
      },
    })
    if (!rawCustomer) {
      return null
    }
    return Customer.restore(rawCustomer)
  }
}
