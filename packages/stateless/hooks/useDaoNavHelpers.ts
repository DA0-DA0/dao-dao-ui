import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { DaoPageMode } from '@dao-dao/types'
import {
  getDaoPath as _getDaoPath,
  getDaoProposalPath as _getDaoProposalPath,
} from '@dao-dao/utils'

import { useAppContextIfAvailable } from '../components/layout/AppContext'

export const useDaoNavHelpers = (overrideMode?: DaoPageMode) => {
  const router = useRouter()

  // On SDA, some pages, like 404 and discord redirect, render outside the app
  // layout context. We still want to be able to use these helpers to redirect
  // to DAO pages, so we allow overriding the mode.
  const { mode } = useAppContextIfAvailable() ?? {
    mode: overrideMode,
  }
  if (!mode) {
    throw new Error('No mode available')
  }

  const getDaoPath = useCallback(
    (coreAddress: string, path?: string, params?: Record<string, unknown>) =>
      _getDaoPath(mode, coreAddress, path, params),
    [mode]
  )

  const goToDao = useCallback(
    (
      coreAddress: string,
      path?: string,
      params?: Record<string, unknown>,
      { shallow = false }: { shallow?: boolean } = {}
    ) =>
      router.push(getDaoPath(coreAddress, path, params), undefined, {
        shallow,
      }),
    [getDaoPath, router]
  )

  const getDaoProposalPath = useCallback(
    (
      coreAddress: string,
      proposalId: string,
      params?: Record<string, unknown>
    ) => _getDaoProposalPath(mode, coreAddress, proposalId, params),
    [mode]
  )

  const goToDaoProposal = useCallback(
    (...args: Parameters<typeof getDaoProposalPath>) =>
      router.push(getDaoProposalPath(...args)),
    [getDaoProposalPath, router]
  )

  // Returns proposal ID if we're on a DAO proposal subpath, or undefined.
  const getProposalIdFromPath = () =>
    router.asPath.match(
      new RegExp('^' + getDaoProposalPath('.+', '([a-zA-Z0-9]+)'))
    )?.[1]

  // Path components after the DAO's address.
  const daoSubpathComponents = new URL(
    router.asPath,
    'http://localhost'
  ).pathname
    .replace(getDaoPath(''), '')
    .split('/')
    .slice(1)

  return {
    getDaoPath,
    goToDao,
    getDaoProposalPath,
    goToDaoProposal,
    getProposalIdFromPath,
    router,
    daoSubpathComponents,
  }
}
