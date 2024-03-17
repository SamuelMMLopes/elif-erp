import type { ZodError } from 'zod'

import { InvalidFieldError } from './invalid-field'

export function parseZodErrors(zodError: ZodError): InvalidFieldError[] {
  return Object.keys(zodError.flatten().fieldErrors).map(
    (field) => new InvalidFieldError(field),
  )
}
