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

  // On SDA, the ErrorPage404 renders outside the app layout context. We still
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

  // Returns address of DAO if we're on a DAO subpath, or undefined.
  const getCoreAddressFromPath = () =>
    router.asPath.startsWith(getDaoPath('')) &&
    !router.asPath.startsWith(getDaoPath('create'))
      ? // Base of URL does not matter. It just lets us use relative paths.
        new URL(router.asPath, 'http://localhost').pathname
          .replace(getDaoPath(''), '')
          .split('/')[0]
      : undefined

  // Returns proposal ID if we're on a DAO proposal subpath, or undefined.
  const getProposalIdFromPath = () =>
    router.asPath.match(
      new RegExp('^' + getDaoProposalPath('.+', '([a-zA-Z0-9]+)'))
    )?.[1]

  return {
    getDaoPath,
    goToDao,
    getDaoProposalPath,
    goToDaoProposal,
    getCoreAddressFromPath,
    getProposalIdFromPath,
    router,
  }
}
