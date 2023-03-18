import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll } from 'recoil'

import {
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  DaoCoreV2Selectors,
  ValidatorSlash,
  genericTokenSelector,
  nativeDelegationInfoSelector,
  refreshVestingAtom,
  validatorSlashesSelector,
} from '@dao-dao/state/recoil'
import { TokenType, WithChainId } from '@dao-dao/types'

import {
  VestingInfo,
  VestingValidatorSlash,
  VestingValidatorWithSlashes,
} from './types'

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
        stakeHistory,
        unbondingDurationSeconds,
        actualDelegationInfo,
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
          CwVestingSelectors.stakeHistorySelector({
            contractAddress: vestingContractAddress,
            chainId,
          }),
          CwVestingSelectors.unbondingDurationSecondsSelector({
            contractAddress: vestingContractAddress,
            chainId,
          }),
          nativeDelegationInfoSelector({
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

      const uniqueValidators = uniq(
        stakeHistory?.stakeEvents.flatMap((event) =>
          event.type === 'redelegate' ? event.toValidator : event.validator
        ) ?? []
      )
      // Get all the slashes for each validator from the indexer.
      const validatorSlashes = get(
        waitForAll(
          uniqueValidators.map((validatorOperatorAddress) =>
            validatorSlashesSelector({
              validatorOperatorAddress,
              chainId,
            })
          )
        )
      ).map((slashes, index) => ({
        validator: uniqueValidators[index],
        slashes,
      }))

      // Get the slashed staked and unstaking amounts for a validator based on
      // a slash event.
      const slashedStakedUnstaking = (
        validator: string,
        {
          infractionBlockHeight,
          registeredBlockHeight,
          registeredBlockTimeUnixMs,
          slashFactor,
        }: ValidatorSlash
      ): { staked: number; unstaking: number } | null => {
        // If no stake history or unbonding duration, we can't compute.
        if (!stakeHistory || unbondingDurationSeconds === null) {
          return null
        }

        // Slashes before the current slash.
        const previousSlashes =
          validatorSlashes
            .find(
              (validatorSlashes) => validatorSlashes.validator === validator
            )
            ?.slashes.filter(
              (slash) =>
                Number(slash.registeredBlockHeight) <
                Number(registeredBlockHeight)
            ) ?? []

        // Combine stake events and slashes, and sort ascending by block height,
        // so they are applied in order of occurrence.
        const stakeEventsAndSlashes = [
          ...stakeHistory.stakeEvents,
          ...previousSlashes,
        ].sort((a, b) => {
          const aBlockHeight =
            'registeredBlockHeight' in a
              ? a.registeredBlockHeight
              : a.blockHeight
          const bBlockHeight =
            'registeredBlockHeight' in b
              ? b.registeredBlockHeight
              : b.blockHeight
          return Number(aBlockHeight) - Number(bBlockHeight)
        })

        // Total staked
        const staked = stakeEventsAndSlashes.reduce((acc, event) => {
          // Apply slash.
          if ('registeredBlockHeight' in event) {
            return acc * (1 - Number(event.slashFactor))
            // Apply stake event.
          } else {
            return Number(event.blockTimeUnixMs) <=
              Number(registeredBlockTimeUnixMs)
              ? (event.type === 'delegate' && event.validator === validator) ||
                (event.type === 'redelegate' && event.toValidator === validator)
                ? // Add stakes that occur before the slash was registered.
                  acc + Number(event.amount)
                : (event.type === 'undelegate' &&
                    event.validator === validator) ||
                  (event.type === 'redelegate' &&
                    event.fromValidator === validator)
                ? // Subtract unstakes that start before the slash was registered.
                  acc - Number(event.amount)
                : acc
              : acc
          }
        }, 0)

        // Total unstaking/redelegating.
        const unstaking = stakeEventsAndSlashes.reduce((acc, event) => {
          // Apply slash.
          if ('registeredBlockHeight' in event) {
            return acc * (1 - Number(event.slashFactor))
            // Apply stake event.
          } else {
            // Add unstakes that start after the infraction and have not yet
            // finished by the time the slash was registered.
            return Number(event.blockHeight) >= Number(infractionBlockHeight) &&
              Number(event.blockTimeUnixMs) + unbondingDurationSeconds * 1000 >
                Number(registeredBlockTimeUnixMs) &&
              ((event.type === 'undelegate' && event.validator === validator) ||
                (event.type === 'redelegate' &&
                  event.fromValidator === validator))
              ? acc + Number(event.amount)
              : acc
          }
        }, 0)

        // Calculate the amount slashed of the staked and unstaking amounts. The
        // Cosmos SDK truncates the slashed amount after the slash factor is
        // applied, so we do the same here.
        return {
          staked: Math.trunc(staked * Number(slashFactor)),
          unstaking: Math.trunc(unstaking * Number(slashFactor)),
        }
      }

      // These are the *actual* amounts that got slashed, based on the slashes
      // that occurred and the amounts the vesting contract had staked and
      // unstaking at the time of each, and also the unregistered amount based
      // on what should be registered.
      //
      // For each validator slash, get the total amount staked and unstaking at
      // the time of the slash and then compute the slashed amount using the
      // slash factor. To do this, we need to get the vesting validator stakes
      // data at the time of the slash. This is because once a slash is
      // registered, the past amounts are rewritten, so we need to get the
      // amount before the slash was registered. We also need to get the amount
      // before any slashed unstaking tokens finish unstaking (i.e. at the time
      // of the slash).
      const vestingValidatorSlashes = validatorSlashes.flatMap(
        ({
          validator: validatorOperatorAddress,
          slashes: _slashes,
        }): VestingValidatorWithSlashes => {
          const slashes = _slashes.flatMap((slash): VestingValidatorSlash[] => {
            const slashed = slashedStakedUnstaking(
              validatorOperatorAddress,
              slash
            )
            if (!slashed) {
              return []
            }

            // Actual amount slashed.
            const { staked, unstaking } = slashed
            if (staked === 0 && unstaking === 0) {
              return []
            }

            // Registered slashes.
            const registeredSlashes =
              stakeHistory?.slashRegistrations.filter(
                (registration) =>
                  registration.validator === validatorOperatorAddress &&
                  registration.time ===
                    // milliseconds to nanoseconds
                    (Number(slash.registeredBlockTimeUnixMs) * 1e6).toString()
              ) ?? []
            const registeredStaked = registeredSlashes.reduce(
              (acc, slash) =>
                acc + (!slash.duringUnbonding ? Number(slash.amount) : 0),
              0
            )
            const registeredUnstaking = registeredSlashes.reduce(
              (acc, slash) =>
                acc + (slash.duringUnbonding ? Number(slash.amount) : 0),
              0
            )

            const unregisteredStaked = staked - registeredStaked
            const unregisteredUnstaking = unstaking - registeredUnstaking

            return [
              ...(unregisteredStaked > 0
                ? [
                    {
                      timeMs: Number(slash.registeredBlockTimeUnixMs),
                      amount: staked,
                      unregisteredAmount: unregisteredStaked,
                      duringUnbonding: false,
                    },
                  ]
                : []),
              ...(unregisteredUnstaking > 0
                ? [
                    {
                      timeMs: Number(slash.registeredBlockTimeUnixMs),
                      amount: unstaking,
                      unregisteredAmount: unregisteredUnstaking,
                      duringUnbonding: true,
                    },
                  ]
                : []),
            ]
          })

          return {
            validatorOperatorAddress,
            slashes,
          }
        }
      )

      const hasUnregisteredSlashes = vestingValidatorSlashes.some(
        ({ slashes }) =>
          slashes.some(({ unregisteredAmount }) => unregisteredAmount > 0)
      )

      const actualSlashed = vestingValidatorSlashes.reduce(
        (slashed, { slashes }) =>
          slashed +
          slashes.reduce((acc, { amount }) => acc + BigInt(amount), BigInt(0)),
        BigInt(0)
      )

      const actualStaked =
        actualDelegationInfo?.delegations.reduce(
          (acc, { delegated }) => acc + BigInt(delegated.amount),
          BigInt(0)
        ) ?? BigInt(0)
      const actualUnstaking =
        actualDelegationInfo?.unbondingDelegations.reduce(
          (acc, { balance }) => acc + BigInt(balance.amount),
          BigInt(0)
        ) ?? BigInt(0)

      const stakable = (
        BigInt(total) -
        BigInt(vest.claimed) -
        BigInt(actualStaked) -
        BigInt(actualUnstaking) -
        actualSlashed
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
        slashes: vestingValidatorSlashes,
        hasUnregisteredSlashes,
        completed,
        startDate,
        endDate,
      }
    },
})
