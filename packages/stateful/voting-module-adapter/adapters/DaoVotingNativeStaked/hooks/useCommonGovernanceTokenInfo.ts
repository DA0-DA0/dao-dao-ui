import { useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chain_id: chainId } = useChain()
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { denom } = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const eitherTokenInfo = useRecoilValue(
    genericTokenSelector({
      chainId,
      type: TokenType.Native,
      denomOrAddress: denom,
    })
  )

  return eitherTokenInfo
}
