import { verify } from 'jsonwebtoken'

import type { Encrypter } from '@/application/contracts/cryptography'
import { left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

export class JwtEncrypter implements Encrypter {
  constructor(private readonly publicKeyInBase64: string) {}

  async decrypt(
    token: string | undefined = '',
  ): Promise<Encrypter.DecryptOutput> {
    try {
      const payload = verify(
        token,
        Buffer.from(this.publicKeyInBase64, 'base64'),
        {
          algorithms: ['RS256'],
        },
      )
      return right(payload as Record<string, string>)
    } catch (error) {
      console.error(error)
      return left(new CustomError('Unauthorized'))
    }
  }
}
