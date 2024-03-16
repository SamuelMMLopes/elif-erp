function isValid(name: unknown): name is string {
  return typeof name === 'string' && name.length > 2
}

export const Name = {
  isValid,
}
