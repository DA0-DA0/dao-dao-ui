import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { DaoPageMode } from '@dao-dao/types'
import {
  getDaoPath as _getDaoPath,
  getDaoProposalPath as _getDaoProposalPath,
} from '@dao-dao/utils'

import { useRootContextIfAvailable } from '../components/layout/RootContext'

export const useNavHelpers = (overrideMode?: DaoPageMode) => {
  const router = useRouter()

  // On SDA, some pages, like 404 and discord redirect, render outside the app
  // layout context. We still want to be able to use these helpers to redirect
  // to DAO pages, so we allow overriding the mode.
  const { mode } = useRootContextIfAvailable() ?? {
    mode: overrideMode,
  }
  if (!mode) {
    throw new Error('No mode available')
  }

  const getDaoPath = useCallback(
    (coreAddress: string, params?: Record<string, unknown>, hash?: string) =>
      _getDaoPath(mode, coreAddress, params, hash),
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
      params?: Record<string, unknown>,
      hash?: string
    ) => _getDaoProposalPath(mode, coreAddress, proposalId, params, hash),
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
