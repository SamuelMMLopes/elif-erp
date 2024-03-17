import { Hono } from 'hono'

import { makeRegisterSellerUseCase } from '@/infra/factories/use-cases/seller'

import { authMiddleware } from '../middlewares'

const registerSeller = makeRegisterSellerUseCase()

const app = new Hono()

app.post('/', authMiddleware, async (context) => {
  const body = await context.req.json()
  const organizationId = context.var.organizationId
  const result = await registerSeller.execute({ ...body, organizationId })
  context.status(result.isLeft() ? 400 : 201)
  return context.json(result.value)
})

export default app
