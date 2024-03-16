import type { Encrypter } from '@/application/contracts/cryptography'
import type { Mailer } from '@/application/contracts/mailer'

type Input = {
  id: string
  name: string
  email: string
}

export class SendOrganizationWelcomeEmailUseCase {
  constructor(
    private readonly mailer: Mailer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ id, name, email }: Input): Promise<void> {
    const token = await this.encrypter.encrypt({
      organizationId: id,
    })

    await this.mailer.send({
      to: email,
      subject: 'Elif - Boas vindas',
      content: `Olá ${name}, seja bem vindo, acesse ${token} para cadastrar o usuário`,
    })
  }
}
