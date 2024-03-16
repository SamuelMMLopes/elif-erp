import { Hono } from 'hono'

import { makeRegisterCustomerUseCase } from '@/infra/factories/use-cases/customer'

import { authMiddleware } from '../middlewares'

const registerCustomer = makeRegisterCustomerUseCase()

const app = new Hono()

app.post('/', authMiddleware, async (context) => {
  const body = await context.req.json()
  const organizationId = context.var.organizationId
  const result = await registerCustomer.execute({ ...body, organizationId })
  context.status(result.isLeft() ? 400 : 201)
  return context.json(result.value)
})

export default app
