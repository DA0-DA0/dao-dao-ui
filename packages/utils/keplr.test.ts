import { afterEach, expect, test, vi } from 'vitest'

import { getKeplrFromWindow } from './keplr'

afterEach(() => vi.unstubAllGlobals())

test('server-side wallet detection returns undefined', async () => {
  vi.stubGlobal('window', undefined)
  await expect(getKeplrFromWindow()).resolves.toBeUndefined()
})

test('an installed wallet is returned without waiting for document load', async () => {
  const keplr = { mode: 'mobile-web' }
  vi.stubGlobal('window', { keplr })
  await expect(getKeplrFromWindow()).resolves.toBe(keplr)
})

test('a loaded read-only page without Keplr is not an error', async () => {
  vi.stubGlobal('window', {})
  vi.stubGlobal('document', { readyState: 'complete' })
  await expect(getKeplrFromWindow()).resolves.toBeUndefined()
})

test('wallet detection waits for extension injection and removes its listener', async () => {
  const document = Object.assign(new EventTarget(), { readyState: 'loading' })
  const remove = vi.spyOn(document, 'removeEventListener')
  const window: { keplr?: unknown } = {}
  vi.stubGlobal('window', window)
  vi.stubGlobal('document', document)
  const pending = getKeplrFromWindow()
  const keplr = { mode: 'mobile-web' }
  window.keplr = keplr
  document.readyState = 'complete'
  document.dispatchEvent(new Event('readystatechange'))
  await expect(pending).resolves.toBe(keplr)
  expect(remove).toHaveBeenCalledOnce()
})

test('completing document load without an extension is not a rejected promise', async () => {
  const document = Object.assign(new EventTarget(), { readyState: 'loading' })
  const remove = vi.spyOn(document, 'removeEventListener')
  vi.stubGlobal('window', {})
  vi.stubGlobal('document', document)
  const pending = getKeplrFromWindow()
  document.readyState = 'complete'
  document.dispatchEvent(new Event('readystatechange'))
  await expect(pending).resolves.toBeUndefined()
  expect(remove).toHaveBeenCalledOnce()
})
