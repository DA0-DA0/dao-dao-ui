import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll } from 'recoil'

import {
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  DaoCoreV2Selectors,
  genericTokenSelector,
  nativeDelegatedBalanceSelector,
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
        currentValidatorStakes,
        { amount: actualStaked },
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
          CwVestingSelectors.validatorStakesSelector({
            contractAddress: vestingContractAddress,
            chainId,
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

      const uniqueValidators = uniq(
        currentValidatorStakes.map(({ validator }) => validator)
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
          // Get the validator stakes at the time of each slash using historical
          // indexer queries.
          const vestingValidatorStakes = get(
            waitForAll(
              _slashes.map(
                ({ registeredBlockHeight, registeredBlockTimeUnixMs }) =>
                  CwVestingSelectors.validatorStakesSelector({
                    contractAddress: vestingContractAddress,
                    chainId,
                    block: {
                      height: registeredBlockHeight,
                      timeUnixMs: registeredBlockTimeUnixMs,
                    },
                  })
              )
            )
          )

          const slashes = _slashes
            .map(
              (
                { registeredBlockTimeUnixMs, slashFactor },
                index
              ): VestingValidatorSlash => {
                // Validator stakes are storted descending by time, so find the
                // first validator stake that is at or before the slash
                // registration time to get the value at the slash.
                const pastValidatorStake = vestingValidatorStakes[index].find(
                  ({ validator, timeMs }) =>
                    validator === validatorOperatorAddress &&
                    timeMs <= Number(registeredBlockTimeUnixMs)
                )

                // Staked and unstaking amount at the time of the slash, without
                // any registered slash amount deducted.
                const pastStakedAndUnstaking = Number(
                  pastValidatorStake?.amount ?? '0'
                )

                // Calculate the amount slashed of the staked and unstaking
                // amount at the time of the slash. The cosmos SDK truncates the
                // slashed amount after the slash factor is applied, so we do
                // the same here.
                const amount = Math.trunc(
                  pastStakedAndUnstaking * Number(slashFactor)
                )

                // Get current validator stake so we can compare to see if the
                // slash amount has been registered.
                const currentValidatorStake = currentValidatorStakes.find(
                  ({ validator, timeMs }) =>
                    validator === validatorOperatorAddress &&
                    timeMs <= Number(registeredBlockTimeUnixMs)
                )

                // Staked and unstaking amount at the time of the slash, with
                // all registered slash amounts deducted.
                const currentStakedAndUnstaking = Number(
                  currentValidatorStake?.amount ?? '0'
                )

                // This is the amount that was slashed but not registered. If
                // `amount` were registered, `currentStakedAndUnstaking` would
                // be equal to `pastStakedAndUnstaking` - `amount`, since
                // registering the slash will make the current stakes reflect
                // the slash amount subtracted from the staked and unstaking
                // amount at the time of the slash. The unregistered amount is
                // the difference between the current and the original/past with
                // the actual slashed amount removed. This is actual - expected.
                const unregisteredAmount =
                  currentStakedAndUnstaking - (pastStakedAndUnstaking - amount)

                return {
                  timeMs: Number(registeredBlockTimeUnixMs),
                  amount,
                  unregisteredAmount,
                }
              }
            )
            .filter(({ amount }) => amount > 0)

          return {
            validatorOperatorAddress,
            slashes,
          }
        }
      )

      const actualSlashed = vestingValidatorSlashes.reduce(
        (slashed, { slashes }) =>
          slashed +
          slashes.reduce((acc, { amount }) => acc + BigInt(amount), BigInt(0)),
        BigInt(0)
      )

      const stakable = (
        BigInt(total) -
        BigInt(vest.claimed) -
        BigInt(actualStaked) -
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
        completed,
        startDate,
        endDate,
      }
    },
})
