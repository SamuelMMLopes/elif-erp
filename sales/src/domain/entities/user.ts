export class User {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {
    Object.freeze(this)
  }
}
