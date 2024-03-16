import { sign, verify } from 'jsonwebtoken'

import type { Encrypter } from '@/application/contracts/cryptography'
import { left, right } from '@/shared/core'
import { CustomError } from '@/shared/errors'

export class JwtEncrypter implements Encrypter {
  constructor(
    private readonly privateKeyInBase64: string,
    private readonly publicKeyInBase64: string,
  ) {}

  async encrypt(payload: Record<string, string>): Promise<string> {
    return sign(payload, Buffer.from(this.privateKeyInBase64, 'base64'), {
      algorithm: 'RS256',
    })
  }

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
