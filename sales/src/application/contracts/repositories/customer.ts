import type { Customer } from '@/domain/entities'

export namespace CustomerRepository {
  export type FindByDocumentInput = {
    document: string
    organizationId: string
  }
}

export interface CustomerRepository {
  findByDocument: (
    input: CustomerRepository.FindByDocumentInput,
  ) => Promise<Customer | null>
  create: (customer: Customer) => Promise<void>
}
