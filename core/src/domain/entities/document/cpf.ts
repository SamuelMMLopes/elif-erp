import { type Either, left, right } from '@/shared/core'
import { InvalidFieldError } from '@/shared/errors'

import type { Document } from './contract'

type CalculateDigitInput = {
  cpf: string
  factor: number
}

export class CpfDocument implements Document {
  private static readonly cpfLength = 11

  private constructor(readonly value: string) {
    Object.freeze(this)
  }

  private static removeNonDigits(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  private static isInvalidLength(cpf: string): boolean {
    return cpf.length !== this.cpfLength
  }

  private static hasAllDigitsEqual(cpf: string): boolean {
    const [firstDigit, ...otherDigits] = cpf
    return otherDigits.every((digit) => digit === firstDigit)
  }

  private static calculateDigit({ cpf, factor }: CalculateDigitInput): number {
    let total = 0
    for (const digit of cpf) {
      if (factor > 1) {
        total += parseInt(digit) * factor--
      }
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  private static extractDigit(cpf: string): string {
    return cpf.slice(9)
  }

  static create(cpf: string): Either<InvalidFieldError, CpfDocument> {
    if (!cpf) {
      return left(new InvalidFieldError('document'))
    }
    const cpfWithoutNonDigits = this.removeNonDigits(cpf)
    if (
      this.isInvalidLength(cpfWithoutNonDigits) ||
      this.hasAllDigitsEqual(cpfWithoutNonDigits)
    ) {
      return left(new InvalidFieldError('document'))
    }
    const digit1 = this.calculateDigit({ cpf: cpfWithoutNonDigits, factor: 10 })
    const digit2 = this.calculateDigit({ cpf: cpfWithoutNonDigits, factor: 11 })
    if (this.extractDigit(cpfWithoutNonDigits) !== `${digit1}${digit2}`) {
      return left(new InvalidFieldError('document'))
    }
    return right(new CpfDocument(cpfWithoutNonDigits))
  }

  static restore(cpf: string): CpfDocument {
    return new CpfDocument(cpf)
  }
}
