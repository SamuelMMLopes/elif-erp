import { type Either, left, right } from '@/shared/core'
import { InvalidFieldError } from '@/shared/errors'

import type { Document } from './contract'

type CalculateDigitInput = {
  cnpjDigits: number[]
  size: number
}

export class CnpjDocument implements Document {
  private static readonly cnpjLength = 14

  private constructor(readonly value: string) {
    Object.freeze(this)
  }

  private static removeNonDigits(cnpj: string): string {
    return cnpj.replace(/\D/g, '')
  }

  private static isInvalidLength(cnpj: string): boolean {
    return cnpj.length !== this.cnpjLength
  }

  private static hasAllDigitsEqual(cnpj: string): boolean {
    const [firstDigit, ...otherDigits] = cnpj
    return otherDigits.every((digit) => digit === firstDigit)
  }

  private static toNumbersArray(cpnj: string): number[] {
    return [...cpnj].map((digit) => {
      return parseInt(digit)
    })
  }

  private static calculateDigit({
    cnpjDigits,
    size,
  }: CalculateDigitInput): number {
    const slice = cnpjDigits.slice(0, size)
    let factor = size - 7
    let total = 0
    for (let current = size; current >= 1; current--) {
      const digit = slice[size - current]
      total += digit * factor--
      if (factor < 2) {
        factor = 9
      }
    }
    const result = 11 - (total % 11)
    return result > 9 ? 0 : result
  }

  private static extractDigit(cnpj: string): string {
    return cnpj.slice(12)
  }

  static create(cnpj: string): Either<InvalidFieldError, CnpjDocument> {
    if (!cnpj) {
      return left(new InvalidFieldError('document'))
    }
    const cnpjWithoutNonDigits = this.removeNonDigits(cnpj)
    if (
      this.isInvalidLength(cnpjWithoutNonDigits) ||
      this.hasAllDigitsEqual(cnpjWithoutNonDigits)
    ) {
      return left(new InvalidFieldError('document'))
    }
    const cnpjDigits = this.toNumbersArray(cnpjWithoutNonDigits)
    const digit1 = this.calculateDigit({
      cnpjDigits,
      size: 12,
    })
    const digit2 = this.calculateDigit({
      cnpjDigits,
      size: 13,
    })
    if (this.extractDigit(cnpjWithoutNonDigits) !== `${digit1}${digit2}`) {
      return left(new InvalidFieldError('document'))
    }
    return right(new CnpjDocument(cnpjWithoutNonDigits))
  }

  static restore(cnpj: string): CnpjDocument {
    return new CnpjDocument(cnpj)
  }
}
