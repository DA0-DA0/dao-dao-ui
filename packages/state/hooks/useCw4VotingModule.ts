import { constSelector, useRecoilValue } from 'recoil'

import { Member } from '../clients/cw4-voting'
import {
  Cw4GroupSelectors,
  Cw4VotingSelectors,
  CwCoreV0_1_0Selectors,
} from '../recoil'

interface UseCw4VotingModuleOptions {
  fetchMembers?: boolean
}

interface UseCw4VotingModuleResponse {
  votingModuleAddress: string | undefined
  cw4GroupAddress: string | undefined
  members: Member[] | undefined
}

export const useCw4VotingModule = (
  coreAddress: string,
  { fetchMembers }: UseCw4VotingModuleOptions = {}
): UseCw4VotingModuleResponse => {
  const votingModuleAddress = useRecoilValue(
    CwCoreV0_1_0Selectors.votingModuleSelector({ contractAddress: coreAddress })
  )

  const cw4GroupAddress = useRecoilValue(
    Cw4VotingSelectors.groupContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const members = useRecoilValue(
    fetchMembers
      ? Cw4GroupSelectors.listAllMembersSelector({
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
