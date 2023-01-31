import queryString from 'query-string'

import { DaoPageMode } from '@dao-dao/types'

export const getDaoPath = (
  mode: DaoPageMode,
  coreAddress: string,
  params?: Record<string, unknown>,
  hash?: string
) => {
  const base =
    mode === DaoPageMode.Dapp ? `/dao/${coreAddress}` : `/${coreAddress}`
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query + (hash ? `#${hash}` : '')
}

export const getDaoProposalPath = (
  mode: DaoPageMode,
  coreAddress: string,
  proposalId: string,
  params?: Record<string, unknown>,
  hash?: string
) => {
  const dao = getDaoPath(mode, coreAddress)
  const base = `${dao}/proposals/${proposalId}`
  const query = params ? `?${queryString.stringify(params)}` : ''

  return base + query + (hash ? `#${hash}` : '')
}
