import { describe, expect, it } from 'bun:test'

import { InvalidFieldError } from '@/shared/errors'

import { CnpjDocument } from './cnpj'

describe('CnpjDocument', () => {
  it.each([null, undefined, '', '111.111.111-11', '124567898'])(
    'should return InvalidFieldError if it is an invalid cnpj',
    (invalidCnpj) => {
      const error = CnpjDocument.create(invalidCnpj as string).value
      expect(error).toBeInstanceOf(InvalidFieldError)
    },
  )

  it.each(['11.795.623/0001-14', '08.664.252/0001-27'])(
    'should return the CnpjDocument if it is a valid cnpj',
    (validCnpj) => {
      const cnpjDocument = CnpjDocument.create(validCnpj).value
      expect(cnpjDocument).toBeInstanceOf(CnpjDocument)
    },
  )
})
