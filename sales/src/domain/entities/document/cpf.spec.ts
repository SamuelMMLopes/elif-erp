import { describe, expect, it } from 'bun:test'

import { InvalidFieldError } from '@/shared/errors'

import { CpfDocument } from './cpf'

describe('CpfDocument', () => {
  it.each([null, undefined, '', '111.111.111-11', '124567898'])(
    'should return InvalidFieldError if it is an invalid cpf',
    (invalidCpf) => {
      const error = CpfDocument.create(invalidCpf as string).value
      expect(error).toBeInstanceOf(InvalidFieldError)
    },
  )

  it.each(['061.138.490-66', '298.802.690-47'])(
    'should return the CpfDocument if it is a valid cpf',
    (validCpf) => {
      const cpfDocument = CpfDocument.create(validCpf).value
      expect(cpfDocument).toBeInstanceOf(CpfDocument)
    },
  )
})
