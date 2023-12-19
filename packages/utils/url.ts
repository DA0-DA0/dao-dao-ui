import queryString from 'query-string'

import {
  DaoPageMode,
  DaoTabId,
  PartialCategorizedActionKeyAndDataNoId,
} from '@dao-dao/types'

import { DaoProposalSingleAdapterId } from './constants/adapters'

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
  params?: Record<string, unknown>
) => {
  const base = getDaoPath(
    mode,
    coreAddress,
    `${DaoTabId.Proposals}/${proposalId}`
  )
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query
}

// Create a path to a gov page.
export const getGovPath = (
  chain: string,
  path?: string,
  params?: Record<string, unknown>
) => {
  const base = `/gov/${chain}` + (path ? `/${path}` : '')
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query
}

// Create a path to a gov proposal page.
export const getGovProposalPath = (
  chain: string,
  proposalId: string,
  params?: Record<string, unknown>
) => {
  const base = getGovPath(chain, `${DaoTabId.Proposals}/${proposalId}`)
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query
}

// Create a path to an account's page.
export const getAccountPath = (
  address: string,
  path?: string,
  params?: Record<string, unknown>
) => {
  const base = `/account/${address}` + (path ? `/${path}` : '')
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query
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

// Create prefill URL parameter for a DAO's single choice proposal module.
export const getDaoProposalSinglePrefill = ({
  title = '',
  description = '',
  actions = [],
}: {
  actions?: PartialCategorizedActionKeyAndDataNoId[]
  title?: string
  description?: string
}): string =>
  JSON.stringify({
    id: DaoProposalSingleAdapterId,
    data: {
      title,
      description,
      actionData: actions.map((action, index) => ({
        _id: index.toString(),
        ...action,
      })),
    },
  })
