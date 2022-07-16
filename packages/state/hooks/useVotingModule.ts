import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import { Member } from '../clients/cw4-voting'
import {
  totalPowerAtHeightSelector,
  votingModuleSelector,
  votingPowerAtHeightSelector,
} from '../recoil/selectors/clients/cw-core'
import { listAllMembersSelector } from '../recoil/selectors/clients/cw4-group'
import { groupContractSelector } from '../recoil/selectors/clients/cw4-voting'

interface UseVotingModuleOptions {
  fetchCw4GroupAddress?: boolean
  fetchCw4VotingMembers?: boolean
}

interface UseVotingModuleResponse {
  isMember: boolean | undefined
  votingModuleAddress: string | undefined
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
  cw4GroupAddress: string | undefined
  cw4VotingMembers: Member[] | undefined
}

// TODO(noah/voting-module-adapter): Make this a general hook by removing cw4VotingMembers from here and moving to @dao-dao/voting-module-adapter.
export const useVotingModule = (
  coreAddress: string,
  { fetchCw4GroupAddress, fetchCw4VotingMembers }: UseVotingModuleOptions = {}
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
    votingModuleAddress
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
  const isMember =
    walletVotingWeight !== undefined ? walletVotingWeight > 0 : undefined

  const cw4GroupAddress = useRecoilValue(
    votingModuleAddress && (fetchCw4GroupAddress || fetchCw4VotingMembers)
      ? groupContractSelector({
          contractAddress: votingModuleAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  let cw4VotingMembers = useRecoilValue(
    cw4GroupAddress && fetchCw4VotingMembers
      ? listAllMembersSelector({
          contractAddress: cw4GroupAddress,
        })
      : constSelector(undefined)
  )?.members

  return {
    isMember,
    votingModuleAddress,
    walletVotingWeight,
    totalVotingWeight,
    cw4GroupAddress,
    cw4VotingMembers,
  }
}
