import { useRouter } from 'next/router'
import { useCallback } from 'react'

import {
  getDaoPath as _getDaoPath,
  getDaoProposalPath as _getDaoProposalPath,
} from '@dao-dao/utils'

import { useAppLayoutContext } from '../components/layout/AppLayoutContext'

export const useNavHelpers = () => {
  const router = useRouter()
  const { mode } = useAppLayoutContext()

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
