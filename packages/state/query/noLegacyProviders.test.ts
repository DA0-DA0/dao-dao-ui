import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { expect, test } from 'vitest'

const files = (path: string): string[] =>
  readdirSync(path, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? ['node_modules', '.next', '.git'].includes(e.name)
        ? []
        : files(resolve(path, e.name))
      : /\.(ts|tsx|js|cjs)$/.test(e.name) && !/\.(test|spec)\./.test(e.name)
        ? [resolve(path, e.name)]
        : []
  )
test('production source has no legacy provider transport or query helper', () => {
  const root = resolve(__dirname, '../../..')
  const offenders = files(root)
    .filter((p) => !p.includes('/packages/tests/'))
    .filter((path) =>
      /snapper\.indexer\.zone|api\.coingecko\.com|querySnapper|indexerQueries\.snapper/.test(
        readFileSync(path, 'utf8')
      )
    )
  expect(offenders.map((p) => p.slice(root.length))).toEqual([])
})
