import { CustomError } from './custom-error'

export class InvalidFieldError extends CustomError {
  constructor(field: string) {
    super(`The field ${field} is invalid`)
  }
}
