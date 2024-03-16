import type { Mailer } from '@/application/contracts/mailer'
import { env } from '@/infra/env'
import { Nodemailer } from '@/infra/mailer'

export const makeNodemailer = (): Mailer => {
  return Nodemailer.getInstance({
    from: env.EMAIL_FROM,
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    user: env.EMAIL_USER,
    password: env.EMAIL_PASSWORD,
  })
}
