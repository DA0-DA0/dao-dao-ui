import { expect, test } from 'vitest'

import { transferFixtureResponse } from './snapperFreeTransfers'

test('the synthetic recipient has deterministic public profile metadata', () => {
  const response = transferFixtureResponse(
    new URL(
      'https://pfpk.daodao.zone/bech32/0000000000000000000000000000000000000000'
    ),
    undefined,
    'automatic'
  )
  expect(response).toMatchObject({
    status: 200,
    body: {
      name: 'Read-only recipient',
      nft: { imageUrl: '/favicon.ico' },
      chains: {},
    },
  })
})

test('profile fixture never substitutes other users or hosts', () => {
  for (const url of [
    'https://pfpk.daodao.zone/bech32/1111111111111111111111111111111111111111',
    'https://example.com/bech32/0000000000000000000000000000000000000000',
  ]) {
    expect(
      transferFixtureResponse(new URL(url), undefined, 'automatic')
    ).toBeUndefined()
  }
})
