import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  cw4GroupExtraQueries,
  daoDaoCoreQueries,
  daoVotingCw4Queries,
} from '@dao-dao/state'
import { useChain } from '@dao-dao/stateless'
import { LoadingDataWithError } from '@dao-dao/types'
import { Member } from '@dao-dao/types/contracts/DaoVotingCw4'

import { useQueryLoadingDataWithError } from '../../../../hooks'

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
  const queryClient = useQueryClient()

  const votingModuleAddress = useQueryLoadingDataWithError(
    daoDaoCoreQueries.votingModule(queryClient, {
      chainId,
      contractAddress: coreAddress,
    })
  )

  const cw4GroupAddress = useQueryLoadingDataWithError(
    votingModuleAddress.loading || votingModuleAddress.errored
      ? undefined
      : daoVotingCw4Queries.groupContract(queryClient, {
          chainId,
          contractAddress: votingModuleAddress.data,
        })
  )

  const members = useQueryLoadingDataWithError(
    fetchMembers
      ? cw4GroupAddress.loading || cw4GroupAddress.errored
        ? undefined
        : cw4GroupExtraQueries.listAllMembers(queryClient, {
            chainId,
            address: cw4GroupAddress.data,
          })
      : undefined
  )

  return useMemo(
    () =>
      votingModuleAddress.loading ||
      cw4GroupAddress.loading ||
      (fetchMembers && members.loading)
        ? {
            loading: true,
            errored: false,
          }
        : votingModuleAddress.errored ||
          cw4GroupAddress.errored ||
          (fetchMembers && members.errored)
        ? {
            loading: false,
            errored: true,
            error: votingModuleAddress.errored
              ? votingModuleAddress.error
              : cw4GroupAddress.errored
              ? cw4GroupAddress.error
              : fetchMembers && members.errored
              ? members.error
              : new Error('Unknown error'),
          }
        : {
            loading: false,
            errored: false,
            updating:
              votingModuleAddress.updating ||
              cw4GroupAddress.updating ||
              (fetchMembers && !members.loading && members.updating),
            data: {
              votingModuleAddress: votingModuleAddress.data,
              cw4GroupAddress: cw4GroupAddress.data,
              members:
                fetchMembers && !members.loading && !members.errored
                  ? members.data.members
                  : undefined,
            },
          },
    [cw4GroupAddress, members, votingModuleAddress, fetchMembers]
  )
}
