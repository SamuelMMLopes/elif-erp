import { Hono } from 'hono'

import {
  makeAuthenticateUserFromCodeUseCase,
  makeRegisterUserUseCase,
  makeSendUserAuthCodeEmailUseCase,
} from '@/infra/factories/use-cases/user'

import { authMiddleware } from '../middlewares'

const registerUser = makeRegisterUserUseCase()
const sendAuthCodeEmail = makeSendUserAuthCodeEmailUseCase()
const authenticateFromCode = makeAuthenticateUserFromCodeUseCase()

const app = new Hono()

app.post('/', authMiddleware, async (context) => {
  const body = await context.req.json()
  const organizationId = context.var.organizationId
  const result = await registerUser.execute({ ...body, organizationId })
  context.status(result.isLeft() ? 400 : 201)
  return context.json(result.value)
})

app.post('/send-auth-code', async (context) => {
  const body = await context.req.json()
  const result = await sendAuthCodeEmail.execute(body)
  context.status(result.isLeft() ? 401 : 204)
  return context.json(result.value)
})

app.post('/authenticate-from-code', async (context) => {
  const body = await context.req.json()
  const result = await authenticateFromCode.execute(body)
  context.status(result.isLeft() ? 401 : 200)
  return context.json(result.value)
})

export default app
