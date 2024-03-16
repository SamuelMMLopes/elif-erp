export namespace Queue {
  export type ConsumeInput = {
    queue: string
    callback: (data: any) => Promise<void>
  }

  export type PublishInput = {
    event: string
    data: any
  }
}

export interface Queue {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  consume: (input: Queue.ConsumeInput) => Promise<void>
  publish: (input: Queue.PublishInput) => Promise<void>
}
