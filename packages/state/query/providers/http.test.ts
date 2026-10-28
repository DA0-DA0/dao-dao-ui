import { afterEach, expect, test, vi } from 'vitest'

import { fetchPublicJson } from './http'

afterEach(() => vi.useRealTimers())

test('never retries client errors or malformed JSON', async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValue(new Response('bad', { status: 400 }))
  await expect(
    fetchPublicJson('skip', 'https://example.com', { fetcher })
  ).rejects.toMatchObject({ status: 400 })
  expect(fetcher).toHaveBeenCalledTimes(1)
  fetcher.mockResolvedValue(new Response('not json'))
  await expect(
    fetchPublicJson('skip', 'https://example.com', { fetcher })
  ).rejects.toThrow()
  expect(fetcher).toHaveBeenCalledTimes(2)
})

test('retries a server failure only once and releases rejected requests', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 503 }))
  await expect(
    fetchPublicJson('skip', 'https://example.com', { fetcher })
  ).rejects.toMatchObject({ status: 503 })
  expect(fetcher).toHaveBeenCalledTimes(2)
  fetcher.mockImplementation(async () => Response.json({ ok: true }))
  expect(
    await fetchPublicJson('skip', 'https://example.com', { fetcher })
  ).toEqual({ ok: true })
})

test('rate limits produce a cooldown without an immediate retry', async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValue(
      new Response('', { status: 429, headers: { 'Retry-After': '60' } })
    )
  await expect(
    fetchPublicJson('coinbase', 'https://example.com', { fetcher })
  ).rejects.toMatchObject({ status: 429 })
  await expect(
    fetchPublicJson('coinbase', 'https://example.com', { fetcher })
  ).rejects.toThrow('cooldown')
  expect(fetcher).toHaveBeenCalledTimes(1)
})

test('bounds the entire deadline including queue wait and aborts', async () => {
  vi.useFakeTimers()
  const fetcher = vi.fn(
    (_url, init) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal.addEventListener('abort', () =>
          reject(new Error('aborted'))
        )
      })
  )
  const result = Promise.allSettled(
    Array.from({ length: 6 }, () =>
      fetchPublicJson('indexer-stats', 'https://example.com', { fetcher })
    )
  )
  await vi.advanceTimersByTimeAsync(3100)
  expect((await result).every((r) => r.status === 'rejected')).toBe(true)
  expect(fetcher.mock.calls.length).toBeLessThanOrEqual(4)
})
