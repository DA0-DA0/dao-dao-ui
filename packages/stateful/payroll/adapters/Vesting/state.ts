import { selectorFamily, waitForAll } from 'recoil'

import {
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  DaoCoreV2Selectors,
  genericTokenSelector,
  nativeDelegatedBalanceSelector,
  refreshVestingAtom,
} from '@dao-dao/state/recoil'
import { TokenType, WithChainId } from '@dao-dao/types'

import { VestingInfo } from './types'

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

export const vestingInfosSelector = selectorFamily<
  VestingInfo[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'vestingInfo',
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
            vestingInfoSelector({
              vestingContractAddress: contract,
              chainId,
            })
          )
        )
      )
    },
})

export const vestingInfoSelector = selectorFamily<
  VestingInfo,
  WithChainId<{ vestingContractAddress: string }>
>({
  key: 'vestingInfo',
  get:
    ({ vestingContractAddress, chainId }) =>
    ({ get }) => {
      get(refreshVestingAtom(''))
      get(refreshVestingAtom(vestingContractAddress))

      const [
        vest,
        vested,
        total,
        distributable,
        durationSeconds,
        { owner },
        { amount: staked },
      ] = get(
        waitForAll([
          CwVestingSelectors.infoSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [],
          }),
          CwVestingSelectors.vestedSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [{}],
          }),
          CwVestingSelectors.totalToVestSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [],
          }),
          CwVestingSelectors.distributableSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [{}],
          }),
          CwVestingSelectors.vestDurationSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [],
          }),
          CwVestingSelectors.ownershipSelector({
            contractAddress: vestingContractAddress,
            chainId,
            params: [],
          }),
          nativeDelegatedBalanceSelector({
            address: vestingContractAddress,
            chainId,
          }),
        ])
      )

      const token = get(
        genericTokenSelector({
          type: 'cw20' in vest.denom ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress:
            'cw20' in vest.denom ? vest.denom.cw20 : vest.denom.native,
          chainId,
        })
      )

      // TODO: Slashing?
      const stakable = (
        BigInt(total) -
        BigInt(vest.claimed) -
        BigInt(staked) -
        BigInt(vest.slashed)
      ).toString()

      const completed = vest.status === 'funded' && vest.claimed === total

      const startTimeNanos = Number(vest.start_time)
      const startDate = new Date(startTimeNanos / 1e6)
      const endTimeNanos = startTimeNanos + Number(durationSeconds) * 1e9
      const endDate = new Date(endTimeNanos / 1e6)

      return {
        vestingContractAddress,
        vest,
        token,
        owner: owner || undefined,
        vested,
        distributable,
        total,
        stakable,
        staked,
        completed,
        startDate,
        endDate,
      }
    },
})
