import { CustomError } from './custom-error'

export class ResourceNotFoundError extends CustomError {
  constructor(resource: string) {
    super(`The resource ${resource} not found`)
  }
}
