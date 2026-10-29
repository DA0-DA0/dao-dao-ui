import { readFileSync } from 'node:fs'

import { expect, test, vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () =>
      'Historical treasury USD valuation is unavailable. Current holdings remain available.',
  }),
}))
vi.mock('@dao-dao/stateless', () => ({
  StatusCard: ({ content }: { content: string }) => <p>{content}</p>,
}))

test('history component does not mount a legacy selector or graph query', () => {
  const source = readFileSync(
    new URL('./TreasuryHistoryGraph.tsx', import.meta.url),
    'utf8'
  )
  expect(source).not.toContain('treasuryValueHistorySelector')
})
