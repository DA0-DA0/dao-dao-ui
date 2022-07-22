import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import { VotingModuleType, parseVotingModuleContractName } from '@dao-dao/utils'

import { Member } from '../clients/cw4-voting'
import {
  infoSelector,
  totalPowerAtHeightSelector,
  votingModuleSelector,
  votingPowerAtHeightSelector,
} from '../recoil/selectors/clients/cw-core'
import { listAllMembersSelector } from '../recoil/selectors/clients/cw4-group'
import { groupContractSelector } from '../recoil/selectors/clients/cw4-voting'

interface UseVotingModuleOptions {
  fetchCw4VotingMembers?: boolean
}

interface UseVotingModuleResponse {
  isMember: boolean | undefined
  votingModuleAddress: string | undefined
  votingModuleType: VotingModuleType | undefined
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
  cw4GroupAddress: string | undefined
  cw4VotingMembers: Member[] | undefined
}

export const useVotingModule = (
  coreAddress: string,
  { fetchCw4VotingMembers }: UseVotingModuleOptions = {}
): UseVotingModuleResponse => {
  const { address: walletAddress } = useWallet()
  const votingModuleAddress = useRecoilValue(
    votingModuleSelector({ contractAddress: coreAddress })
  )

  // All `info` queries are the same, so just use cw-core's info query.
  const votingModuleInfo = useRecoilValue(
    votingModuleAddress
      ? infoSelector({ contractAddress: votingModuleAddress })
      : constSelector(undefined)
  )
  const votingModuleType =
    votingModuleInfo &&
    parseVotingModuleContractName(votingModuleInfo.info.contract)

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
    votingModuleAddress && votingModuleType === VotingModuleType.Cw4Voting
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
    votingModuleType,
    walletVotingWeight,
    totalVotingWeight,
    cw4GroupAddress,
    cw4VotingMembers,
  }
}
