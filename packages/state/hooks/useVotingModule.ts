import { constSelector, useRecoilValue } from 'recoil'

import { Member } from '../clients/cw4-voting'
import {
  totalPowerAtHeightSelector,
  votingModuleSelector,
  votingPowerAtHeightSelector,
} from '../recoil/selectors/clients/cw-core'
import { listAllMembersSelector } from '../recoil/selectors/clients/cw4-group'
import { useWallet } from './useWallet'

interface UseVotingModuleOptions {
  cw4VotingGroupAddress?: string
}

interface UseVotingModuleResponse {
  isMember: boolean | undefined
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
  cw4VotingMembers?: Member[]
}

export const useVotingModule = (
  coreAddress: string,
  { cw4VotingGroupAddress }: UseVotingModuleOptions = {}
): UseVotingModuleResponse => {
  const { address: walletAddress } = useWallet()
  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: coreAddress })
  )

  const _walletVotingWeight = useRecoilValue(
    walletAddress && votingModuleAddress
      ? votingPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power
  const _totalVotingWeight = useRecoilValue(
    walletAddress && votingModuleAddress
      ? totalPowerAtHeightSelector({
          contractAddress: votingModuleAddress,
          params: [{}],
        })
      : constSelector(undefined)
  )?.power

  const walletVotingWeight = !isNaN(Number(_walletVotingWeight))
    ? Number(_walletVotingWeight)
    : undefined
  const totalVotingWeight = !isNaN(Number(_totalVotingWeight))
    ? Number(_totalVotingWeight)
    : undefined
  const isMember = walletVotingWeight ? walletVotingWeight > 0 : undefined

  let cw4VotingMembers = useRecoilValue(
    cw4VotingGroupAddress
      ? listAllMembersSelector({
          contractAddress: cw4VotingGroupAddress,
        })
      : constSelector(undefined)
  )?.members

  return {
    isMember,
    walletVotingWeight,
    totalVotingWeight,
    cw4VotingMembers,
  }
}
