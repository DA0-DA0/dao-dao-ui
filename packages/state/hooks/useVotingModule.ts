import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import { CwdCoreV2Selectors } from '../recoil/selectors'

interface UseVotingModuleOptions {
  chainId?: string
  fetchMembership?: boolean
}

interface UseVotingModuleResponse {
  isMember: boolean | undefined
  votingModuleAddress: string
  walletVotingWeight: number | undefined
  totalVotingWeight: number | undefined
}

export const useVotingModule = (
  coreAddress: string,
  { chainId, fetchMembership }: UseVotingModuleOptions = {}
): UseVotingModuleResponse => {
  const { address: walletAddress } = useWallet(chainId)

  const votingModuleAddress = useRecoilValue(
    CwdCoreV2Selectors.votingModuleSelector({
      contractAddress: coreAddress,
      chainId,
      params: [],
    })
  )
  const _walletVotingWeight = useRecoilValue(
    fetchMembership && walletAddress
      ? CwdCoreV2Selectors.votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          chainId,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power
  const _totalVotingWeight = useRecoilValue(
    fetchMembership
      ? CwdCoreV2Selectors.totalPowerAtHeightSelector({
          contractAddress: coreAddress,
          chainId,
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

  return {
    isMember,
    votingModuleAddress,
    walletVotingWeight,
    totalVotingWeight,
  }
}
