import { useMemo } from 'react'
import { constSelector } from 'recoil'

import {
  Cw4GroupSelectors,
  DaoDaoCoreSelectors,
  DaoVotingCw4Selectors,
} from '@dao-dao/state'
import { useCachedLoadingWithError, useChain } from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import { Member } from '@dao-dao/types/contracts/DaoVotingCw4'

interface UseVotingModuleOptions {
  fetchMembers?: boolean
}

interface UseVotingModuleReturn {
  votingModuleAddress: string
  cw4GroupAddress: string
  members: Member[] | undefined
}

export const useLoadingVotingModule = (
  coreAddress: string,
  { fetchMembers }: UseVotingModuleOptions = {}
): LoadingDataWithError<UseVotingModuleReturn> => {
  const { chain_id: chainId } = useChain()

  const votingModuleAddress = useCachedLoadingWithError(
    DaoDaoCoreSelectors.votingModuleSelector({
      chainId,
      contractAddress: coreAddress,
      params: [],
    })
  )

  const cw4GroupAddress = useCachedLoadingWithError(
    votingModuleAddress.loading || votingModuleAddress.errored
      ? undefined
      : DaoVotingCw4Selectors.groupContractSelector({
          chainId,
          contractAddress: votingModuleAddress.data,
          params: [],
        })
  )

  const members = useCachedLoadingWithError(
    fetchMembers
      ? cw4GroupAddress.loading || cw4GroupAddress.errored
        ? undefined
        : Cw4GroupSelectors.listAllMembersSelector({
            chainId,
            contractAddress: cw4GroupAddress.data,
          })
      : constSelector(undefined)
  )

  return useMemo(
    () =>
      votingModuleAddress.loading || cw4GroupAddress.loading || members.loading
        ? {
            loading: true,
            errored: false,
          }
        : votingModuleAddress.errored ||
          cw4GroupAddress.errored ||
          members.errored
        ? {
            loading: false,
            errored: true,
            error: votingModuleAddress.errored
              ? votingModuleAddress.error
              : cw4GroupAddress.errored
              ? cw4GroupAddress.error
              : members.errored
              ? members.error
              : new Error('Unknown error'),
          }
        : {
            loading: false,
            errored: false,
            updating:
              votingModuleAddress.updating ||
              cw4GroupAddress.updating ||
              members.updating,
            data: {
              votingModuleAddress: votingModuleAddress.data,
              cw4GroupAddress: cw4GroupAddress.data,
              members: members.data?.members,
            },
          },
    [cw4GroupAddress, members, votingModuleAddress]
  )
}
