import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { DaoPageMode } from '@dao-dao/types'
import {
  getDaoPath as _getDaoPath,
  getDaoProposalPath as _getDaoProposalPath,
} from '@dao-dao/utils'

import { useAppLayoutContextIfAvailable } from '../components/layout/AppLayoutContext'

export const useNavHelpers = (overrideMode?: DaoPageMode) => {
  const router = useRouter()

  // On SDP, the ErrorPage404 renders outside the app layout context. We still
  // want to be able to use these helpers to redirect to the DAO page if we're
  // 404ing on a DAO subpath, so we allow overriding the mode.
  const { mode } = useAppLayoutContextIfAvailable() ?? {
    mode: overrideMode,
  }
  if (!mode) {
    throw new Error('No mode available')
  }

  const getDaoPath = useCallback(
    (coreAddress: string, params?: Record<string, unknown>) =>
      _getDaoPath(mode, coreAddress, params),
    [mode]
  )

  const goToDao = useCallback(
    (...args: Parameters<typeof getDaoPath>) =>
      router.push(getDaoPath(...args)),
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

  return {
    getDaoPath,
    goToDao,
    getDaoProposalPath,
    goToDaoProposal,
    router,
  }
}
