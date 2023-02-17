import { useRecoilValue } from 'recoil'

import {
  DaoVotingCw20StakedSelectors,
  eitherTokenInfoSelector,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const governanceTokenAddress = useRecoilValue(
    DaoVotingCw20StakedSelectors.tokenContractSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const eitherTokenInfo = useRecoilValue(
    eitherTokenInfoSelector({
      type: TokenType.Cw20,
      denomOrAddress: governanceTokenAddress,
    })
  )

  return eitherTokenInfo
}
