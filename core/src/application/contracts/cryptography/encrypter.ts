import type { Either } from '@/shared/core'
import type { CustomError } from '@/shared/errors'

export namespace Encrypter {
  export type DecryptOutput = Either<CustomError, Record<string, string>>
}

export interface Encrypter {
  encrypt: (payload: Record<string, string>) => Promise<string>
  decrypt: (token?: string) => Promise<Encrypter.DecryptOutput>
}
