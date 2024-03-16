import { Hono } from 'hono'

import { makeRegisterOrganizationUseCase } from '@/infra/factories/use-cases/organization'

const registerOrganization = makeRegisterOrganizationUseCase()

const app = new Hono()

app.post('/', async (context) => {
  const body = await context.req.json()
  const result = await registerOrganization.execute(body)
  context.status(result.isLeft() ? 400 : 201)
  return context.json(result.value)
})

export default app
