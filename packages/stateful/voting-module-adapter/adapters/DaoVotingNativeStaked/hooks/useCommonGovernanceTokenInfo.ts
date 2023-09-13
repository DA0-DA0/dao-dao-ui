import { useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

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
