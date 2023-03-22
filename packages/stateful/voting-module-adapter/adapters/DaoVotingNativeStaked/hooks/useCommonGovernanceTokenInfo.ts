import { useRecoilValue } from 'recoil'

import {
  DaoVotingNativeStakedSelectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { denom } = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  const eitherTokenInfo = useRecoilValue(
    genericTokenSelector({
      type: TokenType.Native,
      denomOrAddress: denom,
    })
  )

  return eitherTokenInfo
}
