function isValid(name: unknown): name is string {
  return typeof name === 'string' && name.length > 5
}

export const Name = {
  isValid,
}
