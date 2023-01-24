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
      const payrollConfig = get(
        DaoCoreV2Selectors.payrollConfigSelector({
          coreAddress,
          chainId,
        })
      )

      // Make sure payroll config is set to vesting and factory address exists
      // inside data.
      if (
        !payrollConfig?.data ||
        payrollConfig.type !== 'vesting' ||
        !('factory' in payrollConfig.data) ||
        !payrollConfig.data.factory ||
        typeof payrollConfig.data.factory !== 'string'
      ) {
        return []
      }

      const factory = payrollConfig.data.factory

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

      const vestedAmounts = get(
        waitForAll(
          vestingPaymentContracts.map(({ contract }) =>
            CwVestingSelectors.vestedAmountSelector({
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
        vestedAmount: Number(vestedAmounts[index]),
        tokenInfo: tokenInfos[index],
      }))
    },
})
