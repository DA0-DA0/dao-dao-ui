import { useRecoilValue } from 'recoil'

import {
  DaoVotingTokenStakedSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const { denom } = useRecoilValue(
    DaoVotingTokenStakedSelectors.denomSelector({
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
