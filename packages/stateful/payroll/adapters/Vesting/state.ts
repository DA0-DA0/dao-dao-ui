import { selectorFamily, waitForAll } from 'recoil'

import {
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  DaoCoreV2Selectors,
  genericTokenSelector,
} from '@dao-dao/state/recoil'
import { TokenType, WithChainId } from '@dao-dao/types'

import { StatefulVestingPaymentCardProps } from './components/types'

// Returns the contract address for the cw-payroll-factory if set.
export const vestingFactorySelector = selectorFamily<
  string | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'vestingFactory',
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
        return
      }

      const factory = payrollConfig.data.factory

      return factory
    },
})

export const vestingFactoryOwnerSelector = selectorFamily<
  string | undefined,
  WithChainId<{ coreAddress: string }>
>({
  key: 'vestingFactoryOwner',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      const factory = get(vestingFactorySelector({ coreAddress, chainId }))
      if (!factory) {
        return
      }

      const ownership = get(
        CwPayrollFactorySelectors.ownershipSelector({
          contractAddress: factory,
          chainId,
          params: [],
        })
      )

      return ownership.owner || undefined
    },
})

export const vestingPaymentCardsPropsSelector = selectorFamily<
  StatefulVestingPaymentCardProps[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'vestingPaymentCardsProps',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      const factory = get(vestingFactorySelector({ coreAddress, chainId }))
      if (!factory) {
        return []
      }

      const vestingPaymentContracts = get(
        CwPayrollFactorySelectors.allVestingContractsSelector({
          contractAddress: factory,
          chainId,
        })
      )

      return get(
        waitForAll(
          vestingPaymentContracts.map(({ contract }) =>
            vestingPaymentCardPropsSelector({
              vestingContractAddress: contract,
              chainId,
            })
          )
        )
      )
    },
})

export const vestingPaymentCardPropsSelector = selectorFamily<
  StatefulVestingPaymentCardProps,
  WithChainId<{ vestingContractAddress: string }>
>({
  key: 'vestingPaymentCardProps',
  get:
    ({ vestingContractAddress, chainId }) =>
    ({ get }) => {
      const vestingPayment = get(
        CwVestingSelectors.infoSelector({
          contractAddress: vestingContractAddress,
          params: [],
          chainId,
        })
      )

      const vestedAmount = get(
        CwVestingSelectors.vestedAmountSelector({
          contractAddress: vestingContractAddress,
          params: [],
          chainId,
        })
      )

      const token = get(
        genericTokenSelector({
          type:
            'cw20' in vestingPayment.denom ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress:
            'cw20' in vestingPayment.denom
              ? vestingPayment.denom.cw20
              : vestingPayment.denom.native,
          chainId,
        })
      )

      return {
        vestingContractAddress,
        vestingPayment,
        vestedAmount: Number(vestedAmount),
        token,
      }
    },
})
