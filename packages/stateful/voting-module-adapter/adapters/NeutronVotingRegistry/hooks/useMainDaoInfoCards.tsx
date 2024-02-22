import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValueLoadable,
  waitForAllSettled,
} from 'recoil'

import { NeutronVaultSelectors } from '@dao-dao/state'
import { TokenAmountDisplay, useChain } from '@dao-dao/stateless'
import { DaoInfoCard } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useVotingModule } from './useVotingModule'

export const useMainDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()

  const { loadingVaults } = useVotingModule()
  const loadingVaultsVotingPower = useRecoilValueLoadable(
    loadingVaults.loading || loadingVaults.errored
      ? constSelector(undefined)
      : waitForAllSettled(
          loadingVaults.data.map(({ address }) =>
            NeutronVaultSelectors.totalPowerAtHeightSelector({
              contractAddress: address,
              chainId,
              params: [{}],
            })
          )
        )
  )

  return loadingVaults.loading ||
    loadingVaults.errored ||
    loadingVaultsVotingPower.state === 'hasError' ||
    !loadingVaultsVotingPower.contents
    ? []
    : loadingVaults.data.flatMap(({ info }, index) => {
        const votingPower =
          loadingVaultsVotingPower.state === 'loading'
            ? ({ state: 'loading' } as const)
            : loadingVaultsVotingPower.contents![index]

        return info.real && votingPower?.state !== 'hasError'
          ? {
              label: t('info.tokenStaked', {
                tokenSymbol: info.bondToken.symbol,
              }),
              tooltip: t('info.totalStakedTooltip', {
                tokenSymbol: info.bondToken.symbol,
              }),
              value: (
                <TokenAmountDisplay
                  amount={
                    votingPower.state === 'loading'
                      ? { loading: true }
                      : convertMicroDenomToDenomWithDecimals(
                          votingPower.contents.power,
                          info.bondToken.decimals
                        )
                  }
                  decimals={info.bondToken.decimals}
                  symbol={info.bondToken.symbol}
                />
              ),
            }
          : []
      })
}
