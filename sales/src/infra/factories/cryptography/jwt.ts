import { JwtEncrypter } from '@/infra/cryptography'
import { env } from '@/infra/env'

export const makeJwtEncrypter = (): JwtEncrypter => {
  return new JwtEncrypter(env.JWT_PUBLIC_KEY_IN_BASE_64)
}
