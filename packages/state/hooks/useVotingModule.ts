import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import { CwCoreV1Selectors } from '../recoil/selectors'

interface UseVotingModuleOptions {
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
  { fetchMembership }: UseVotingModuleOptions = {}
): UseVotingModuleResponse => {
  const { address: walletAddress } = useWallet()

  const votingModuleAddress = useRecoilValue(
    CwCoreV1Selectors.votingModuleSelector({ contractAddress: coreAddress })
  )
  const _walletVotingWeight = useRecoilValue(
    fetchMembership && walletAddress
      ? CwCoreV1Selectors.votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )?.power
  const _totalVotingWeight = useRecoilValue(
    fetchMembership
      ? CwCoreV1Selectors.totalPowerAtHeightSelector({
          contractAddress: coreAddress,
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
