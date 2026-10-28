type Provider = 'skip' | 'coinbase' | 'kraken' | 'indexer-stats'

export class PublicHttpError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
  }
}

const policies = {
  skip: { concurrency: 4, spacing: 0 },
  coinbase: { concurrency: 2, spacing: 250 },
  kraken: { concurrency: 1, spacing: 1000 },
  'indexer-stats': { concurrency: 4, spacing: 0 },
}
const states = Object.fromEntries(
  Object.keys(policies).map((key) => [
    key,
    {
      active: 0,
      nextStart: 0,
      cooldown: 0,
      waiters: new Set<() => void>(),
    },
  ])
) as Record<
  Provider,
  {
    active: number
    nextStart: number
    cooldown: number
    waiters: Set<() => void>
  }
>

/** Small shared scheduler. The deadline covers queueing, retries and response parsing.
 * No outer query retries should be enabled for these public providers.
 */
export const fetchPublicJson = async <T = unknown>(
  provider: Provider,
  url: string,
  { fetcher = fetch, ...init }: RequestInit & { fetcher?: typeof fetch } = {}
): Promise<T> => {
  const state = states[provider]
  if (Date.now() < state.cooldown)
    throw new PublicHttpError('Provider cooldown', 429)
  const controller = new AbortController()
  const deadline = Date.now() + (provider === 'indexer-stats' ? 3000 : 8000)
  const timer = setTimeout(() => controller.abort(), deadline - Date.now())
  const signal = controller.signal
  const wait = (delay: number) =>
    new Promise<void>((resolve, reject) => {
      const done = () => {
        clearTimeout(timeout)
        state.waiters.delete(done)
        signal.removeEventListener('abort', abort)
        signal.aborted
          ? reject(new PublicHttpError('Provider deadline exceeded'))
          : resolve()
      }
      const abort = () => done()
      const timeout = setTimeout(done, delay)
      state.waiters.add(done)
      signal.addEventListener('abort', abort, { once: true })
      if (signal.aborted) done()
    })
  let acquired = false
  try {
    while (
      state.active >= policies[provider].concurrency ||
      Date.now() < state.nextStart
    ) {
      await wait(
        Math.max(
          1,
          state.nextStart - Date.now(),
          state.active >= policies[provider].concurrency ? 100 : 0
        )
      )
    }
    if (signal.aborted || Date.now() >= deadline)
      throw new PublicHttpError('Provider deadline exceeded')
    if (Date.now() < state.cooldown)
      throw new PublicHttpError('Provider cooldown', 429)
    state.active++
    acquired = true
    state.nextStart = Date.now() + policies[provider].spacing
    const attempts = provider === 'indexer-stats' ? 1 : 2
    for (let attempt = 0; attempt < attempts; attempt++) {
      let response: Response
      try {
        response = await fetcher(url, { ...init, signal })
      } catch (error) {
        if (signal.aborted || attempt === attempts - 1) throw error
        await wait(250)
        continue
      }
      if (response.status === 429) {
        const seconds = Number(response.headers.get('Retry-After'))
        state.cooldown =
          Date.now() +
          Math.min(
            60_000,
            Math.max(
              1000,
              Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 30_000
            )
          )
      }
      if (!response.ok) {
        if (response.status >= 500 && attempt < attempts - 1) {
          await wait(250)
          continue
        }
        throw new PublicHttpError(
          'Public provider request failed',
          response.status
        )
      }
      return await response.json()
    }
    throw new PublicHttpError('Public provider unavailable')
  } finally {
    clearTimeout(timer)
    if (acquired) state.active--
    // Wake only queue waiters; each rechecks capacity and rate constraints.
    for (const wake of [...state.waiters]) wake()
  }
}
