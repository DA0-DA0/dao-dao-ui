// Set max referral commission to the min of the max referral allowed and the

import { useTranslation } from 'react-i18next'

import {
  WyndexFactorySelectors,
  WyndexMultiHopSelectors,
} from '@dao-dao/state/recoil'
import { useCachedLoadable, useChain } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import {
  WYND_MULTI_HOP_CONTRACT,
  WYND_REFERRAL_COMMISSION,
} from '@dao-dao/utils'

// As of writing this, DAO DAO referral is configured to 1%, and the max allowed
// referral commission is 0.1%. This hook will return the min of the two
// values, so that if it increases later due to governance, the app will
// automatically use the new value.
export const useLoadingWyndReferralCommission = (): LoadingData<string> => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  // Get max referral commission from factory config.
  const wyndexMultiHopConfig = useCachedLoadable(
    WyndexMultiHopSelectors.configSelector({
      chainId,
      contractAddress: WYND_MULTI_HOP_CONTRACT,
      params: [],
    })
  )
  const wyndexFactoryConfig = useCachedLoadable(
    wyndexMultiHopConfig.state !== 'hasValue'
      ? undefined
      : WyndexFactorySelectors.configSelector({
          chainId,
          contractAddress: wyndexMultiHopConfig.contents.wyndex_factory,
          params: [],
        })
  )

  if (wyndexFactoryConfig.state === 'hasError') {
    throw new Error(t('error.loadingData'))
  }

  return wyndexFactoryConfig.state === 'loading'
    ? { loading: true }
    : {
        loading: false,
        data: Math.min(
          WYND_REFERRAL_COMMISSION,
          Number(wyndexFactoryConfig.contents.max_referral_commission)
        ).toString(),
      }
}
