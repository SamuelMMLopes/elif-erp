const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function isValid(email: unknown): email is string {
  return typeof email === 'string' && emailRegex.test(email)
}

function format(email: string): string {
  return email.toLowerCase()
}

export const Email = {
  isValid,
  format,
}
