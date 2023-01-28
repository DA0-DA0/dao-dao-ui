import { useRecoilValue } from 'recoil'

import { DaoVotingNativeStakedSelectors } from '@dao-dao/state/recoil'
import { CommonGovernanceTokenInfo } from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): CommonGovernanceTokenInfo => {
  const { votingModuleAddress } = useVotingModuleAdapterOptions()

  const { denom } = useRecoilValue(
    DaoVotingNativeStakedSelectors.getConfigSelector({
      contractAddress: votingModuleAddress,
      params: [],
    })
  )

  return {
    denomOrAddress: denom,
    symbol: nativeTokenLabel(denom),
    decimals: nativeTokenDecimals(denom) ?? NATIVE_DECIMALS,
  }
}
