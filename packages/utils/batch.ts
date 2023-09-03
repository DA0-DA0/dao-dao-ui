// Generic batch client inspired by @cosmjs/tendermint-rpc's HttpBatchClient.

export type BatchClientOptions = {
  dispatchInterval: number
  batchSizeLimit: number
}

export type Request = {
  url: string
}

export type Response = {
  status: number
  body: any
}

export type QueueItem = {
  request: Request
  resolve: (response: Response) => void
  reject: (reason?: any) => void
}

const defaultHttpBatchClientOptions = {
  dispatchInterval: 20,
  batchSizeLimit: 20,
}

export class BatchClient {
  protected readonly url: string
  protected readonly options: BatchClientOptions
  private timer: NodeJS.Timer | number | undefined
  private readonly queue: QueueItem[]

  constructor(endpoint: string, options: Partial<BatchClientOptions> = {}) {
    this.queue = []
    this.options = {
      batchSizeLimit:
        options.batchSizeLimit ?? defaultHttpBatchClientOptions.batchSizeLimit,
      dispatchInterval:
        options.dispatchInterval ??
        defaultHttpBatchClientOptions.dispatchInterval,
    }
    this.url = endpoint
    this.timer = setInterval(() => this.tick(), options.dispatchInterval)
    this.validate()
  }

  disconnect() {
    this.timer && clearInterval(this.timer)
    this.timer = undefined
  }

  async execute(request: Request): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.queue.push({ request, resolve, reject })
      if (this.queue.length >= this.options.batchSizeLimit) {
        // this train is full, let's go
        this.tick()
      }
    })
  }

  validate() {
    if (
      !this.options.batchSizeLimit ||
      !Number.isSafeInteger(this.options.batchSizeLimit) ||
      this.options.batchSizeLimit < 1
    ) {
      throw new Error('batchSizeLimit must be a safe integer >= 1')
    }
  }

  /**
   * This is called in an interval where promise rejections cannot be handled.
   * So this is not async and HTTP errors need to be handled by the queued promises.
   */
  async tick() {
    // Remove batch from queue.
    const batch = this.queue.splice(0, this.options.batchSizeLimit)
    if (!batch.length) {
      return
    }

    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(batch.map(({ request }) => request.url)),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      batch.forEach(({ reject }) => reject(new Error(response.statusText)))
      return
    }

    const responses = await response.json()
    if (!Array.isArray(responses) || responses.length !== batch.length) {
      batch.forEach(({ reject }) => reject(new Error('Invalid batch response')))
      return
    }

    batch.forEach(({ resolve }, index) => resolve(responses[index]))
  }
}
