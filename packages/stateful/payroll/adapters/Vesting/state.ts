import { selectorFamily, waitForAll } from 'recoil'

import {
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  DaoCoreV2Selectors,
  eitherTokenInfoSelector,
} from '@dao-dao/state/recoil'
import { WithChainId } from '@dao-dao/types'

import { StatefulVestingPaymentCardProps } from './components/types'

export const vestingPaymentsSelector = selectorFamily<
  StatefulVestingPaymentCardProps[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'vestingPayments',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      const item = get(
        DaoCoreV2Selectors.getItemSelector({
          contractAddress: coreAddress,
          chainId,
          params: [
            {
              key: 'payroll',
            },
          ],
        })
      )?.item

      if (!item) {
        return []
      }

      let parsedItem
      try {
        parsedItem = JSON.parse(item)
      } catch (err) {
        console.error(err)
        return []
      }

      if (parsedItem?.value !== 'vesting') {
        return []
      }

      const factory = parsedItem.data.factory

      const vestingPaymentContracts = get(
        CwPayrollFactorySelectors.allVestingContractsSelector({
          contractAddress: factory,
          chainId,
        })
      )

      const vestingPayments = get(
        waitForAll(
          vestingPaymentContracts.map(({ contract }) =>
            CwVestingSelectors.infoSelector({
              contractAddress: contract,
              params: [],
              chainId,
            })
          )
        )
      )

      const tokenInfos = get(
        waitForAll(
          vestingPayments.map(({ denom }) =>
            eitherTokenInfoSelector({
              type: 'cw20' in denom ? 'cw20' : 'native',
              denomOrAddress: 'cw20' in denom ? denom.cw20 : denom.native,
              chainId,
            })
          )
        )
      )

      return vestingPaymentContracts.map(({ contract }, index) => ({
        vestingContractAddress: contract,
        vestingPayment: vestingPayments[index],
        tokenInfo: tokenInfos[index],
      }))
    },
})
