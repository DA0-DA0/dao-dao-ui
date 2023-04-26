import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw4GroupSelectors,
  DaoCoreV2Selectors,
  DaoVotingCw4Selectors,
} from '@dao-dao/state'
import { useChain } from '@dao-dao/stateless'
import { Member } from '@dao-dao/types/contracts/DaoVotingCw4'

interface UseVotingModuleOptions {
  fetchMembers?: boolean
}

interface UseVotingModuleReturn {
  votingModuleAddress: string
  cw4GroupAddress: string
  members: Member[] | undefined
}

export const useVotingModule = (
  coreAddress: string,
  { fetchMembers }: UseVotingModuleOptions = {}
): UseVotingModuleReturn => {
  const { chain_id: chainId } = useChain()

  const votingModuleAddress = useRecoilValue(
    DaoCoreV2Selectors.votingModuleSelector({
      chainId,
      contractAddress: coreAddress,
      params: [],
    })
  )

  const cw4GroupAddress = useRecoilValue(
    DaoVotingCw4Selectors.groupContractSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const members = useRecoilValue(
    fetchMembers
      ? Cw4GroupSelectors.listAllMembersSelector({
          chainId,
          contractAddress: cw4GroupAddress,
        })
      : constSelector(undefined)
  )?.members

  return {
    votingModuleAddress,
    cw4GroupAddress,
    members,
  }
}
