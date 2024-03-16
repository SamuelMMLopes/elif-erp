import { type Either, left } from '@/shared/core'
import { CustomError } from '@/shared/errors'

import type { CustomerType } from '../customer'
import { CnpjDocument } from './cnpj'
import type { Document } from './contract'
import { CpfDocument } from './cpf'

type CreateInput = {
  document: string
  customerType: CustomerType
}

function create({
  document,
  customerType,
}: CreateInput): Either<CustomError, Document> {
  if (customerType === 'individual') {
    return CpfDocument.create(document)
  }
  if (customerType === 'corporate') {
    return CnpjDocument.create(document)
  }
  return left(new CustomError('Invalid customer type'))
}

export const DocumentFactory = {
  create,
}
