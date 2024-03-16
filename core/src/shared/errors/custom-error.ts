export class CustomError {
  constructor(readonly message: string) {
    Object.freeze(this)
  }
}
