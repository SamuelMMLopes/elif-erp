import { Hono } from 'hono'

import { makeRegisterAddressUseCase } from '@/infra/factories/use-cases/address'

import { authMiddleware } from '../middlewares'

const registerAddress = makeRegisterAddressUseCase()

const app = new Hono()

app.post('/', authMiddleware, async (context) => {
  const body = await context.req.json()
  const result = await registerAddress.execute(body)
  context.status(result.isLeft() ? 400 : 201)
  return context.json(result.value)
})

export default app
