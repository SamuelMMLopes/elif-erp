export class Organization {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {
    Object.freeze(this)
  }
}
