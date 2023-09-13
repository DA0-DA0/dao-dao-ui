import { useRecoilValue } from 'recoil'

import {
  DaoVotingCw20StakedSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const governanceTokenAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.tokenContractSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const eitherTokenInfo = useRecoilValue(
    genericTokenSelector({
      chainId,
      type: TokenType.Cw20,
      denomOrAddress: governanceTokenAddress,
    })
  )

  return eitherTokenInfo
}
