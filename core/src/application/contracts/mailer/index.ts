export namespace Mailer {
  export type SendInput = {
    to: string
    subject: string
    content: string
  }
}

export interface Mailer {
  send: (input: Mailer.SendInput) => Promise<void>
}
