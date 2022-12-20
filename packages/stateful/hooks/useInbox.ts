import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState, waitForAll } from 'recoil'

import { openProposalsSelector, refreshOpenProposalsAtom } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { DaoWithOpenUnvotedProposals, UseInboxReturn } from '@dao-dao/types'

import { pinnedDaosWithProposalModulesSelector } from '../recoil'

export const useInbox = (): UseInboxReturn => {
  const { address: walletAddress, status: walletConnectionStatus } = useWallet()

  const pinnedDaosWithProposalModulesLoadable = useCachedLoadable(
    pinnedDaosWithProposalModulesSelector
  )

  const setRefreshOpenProposals = useSetRecoilState(refreshOpenProposalsAtom)
  const refreshOpenProposals = useCallback(
    () => setRefreshOpenProposals((id) => id + 1),
    [setRefreshOpenProposals]
  )

  const openProposalsLoadable = useCachedLoadable(
    pinnedDaosWithProposalModulesLoadable.state !== 'hasValue' ||
      // Don't load without a wallet until we're no longer initializing. This
      // prevents duplicate queries when the page is first loading.
      walletConnectionStatus === WalletConnectionStatus.Initializing ||
      walletConnectionStatus === WalletConnectionStatus.AttemptingAutoConnection
      ? undefined
      : waitForAll(
          pinnedDaosWithProposalModulesLoadable.contents.map(
            ({ coreAddress }) =>
              openProposalsSelector({
                coreAddress,
                address: walletAddress,
              })
          )
        )
  )

  // Automatically update once per minute.
  useEffect(() => {
    const interval = setInterval(refreshOpenProposals, 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshOpenProposals])

  const daosWithOpenUnvotedProposals: DaoWithOpenUnvotedProposals[] =
    pinnedDaosWithProposalModulesLoadable.state === 'hasValue'
      ? pinnedDaosWithProposalModulesLoadable.contents.map(
          (
            { coreAddress, proposalModules },
            index
          ): DaoWithOpenUnvotedProposals => {
            const proposalModulesWithOpenProposals =
              openProposalsLoadable.state === 'hasValue'
                ? openProposalsLoadable.contents[index]
                : []

            return {
              coreAddress,
              proposalModules,
              openUnvotedProposals: proposalModules.flatMap(
                (proposalModule) =>
                  proposalModulesWithOpenProposals
                    .find(
                      ({ proposalModuleAddress }) =>
                        proposalModuleAddress === proposalModule.address
                    )
                    ?.proposals.map(({ id }) => ({
                      proposalModule,
                      proposalNumber: id,
                    })) ?? []
              ),
            }
          }
        )
      : []

  const proposalCount = daosWithOpenUnvotedProposals.reduce(
    (acc, { openUnvotedProposals }) =>
      acc + (openUnvotedProposals?.length ?? 0),
    0
  )

  return {
    loading:
      pinnedDaosWithProposalModulesLoadable.state === 'loading' ||
      openProposalsLoadable.state === 'loading',
    refetching:
      (pinnedDaosWithProposalModulesLoadable.state === 'hasValue' &&
        pinnedDaosWithProposalModulesLoadable.updating) ||
      (openProposalsLoadable.state === 'hasValue' &&
        openProposalsLoadable.updating),
    daosWithOpenUnvotedProposals,
    proposalCount,
    refetch: refreshOpenProposals,
  }
}
