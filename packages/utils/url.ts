import queryString from 'query-string'

import {
  DaoPageMode,
  DaoTabId,
  PartialCategorizedActionKeyAndDataNoId,
} from '@dao-dao/types'

// Create a path to a DAO page based on the app's page mode.
export const getDaoPath = (
  mode: DaoPageMode,
  coreAddress: string,
  path?: string,
  params?: Record<string, unknown>
) => {
  const base =
    (mode === DaoPageMode.Dapp ? `/dao/${coreAddress}` : `/${coreAddress}`) +
    (path ? `/${path}` : '')
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query
}

// Create a path to a DAO proposal page based on the app's page mode.
export const getDaoProposalPath = (
  mode: DaoPageMode,
  coreAddress: string,
  proposalId: string,
  params?: Record<string, unknown>,
  hash?: string
) => {
  const dao = getDaoPath(mode, coreAddress)
  const base = `${dao}/${DaoTabId.Proposals}/${proposalId}`
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query + (hash ? `#${hash}` : '')
}

// Create a path for the Me page transaction builder with a pre-filled
// transaction form.
export const getMeTxPrefillPath = (
  actions: PartialCategorizedActionKeyAndDataNoId[]
) => {
  const base = '/me/tx'
  const query = `?${queryString.stringify({
    prefill: JSON.stringify({
      actions: actions.map((action, index) => ({
        _id: index.toString(),
        ...action,
      })),
    }),
  })}`

  return base + query
}
