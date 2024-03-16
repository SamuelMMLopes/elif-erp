import type { MiddlewareHandler } from 'hono'

import { makeJwtEncrypter } from '@/infra/factories/cryptography'

const jwtEncrypter = makeJwtEncrypter()

export const authMiddleware: MiddlewareHandler<{
  Variables: {
    userId: string
    organizationId: string
  }
}> = async (context, next) => {
  const token = context.req.header('x-token')
  const payloadOrError = await jwtEncrypter.decrypt(token)
  if (payloadOrError.isLeft()) {
    context.status(401)
    return context.json(payloadOrError.value)
  }
  context.set('userId', payloadOrError.value.userId)
  context.set('organizationId', payloadOrError.value.organizationId)
  await next()
}
