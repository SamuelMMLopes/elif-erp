import { createTransport, type Transporter } from 'nodemailer'

import type { Mailer } from '@/application/contracts/mailer'

type GetInstanceInput = {
  from: string
  host: string
  port: number
  user: string
  password: string
}

export class Nodemailer implements Mailer {
  private readonly transporter: Transporter
  private static instance: Mailer | undefined

  private constructor(
    private readonly from: string,
    host: string,
    port: number,
    user: string,
    password: string,
  ) {
    this.transporter = createTransport({
      host,
      port,
      auth: {
        user,
        pass: password,
      },
    })
  }

  async send({ to, subject, content }: Mailer.SendInput): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      html: content,
    })
  }

  static getInstance({
    from,
    host,
    port,
    user,
    password,
  }: GetInstanceInput): Mailer {
    if (!this.instance) {
      this.instance = new Nodemailer(from, host, port, user, password)
    }
    return this.instance
  }
}
