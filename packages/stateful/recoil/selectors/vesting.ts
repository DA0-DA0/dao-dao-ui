import uniq from 'lodash.uniq'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import {
  Cw1WhitelistSelectors,
  CwPayrollFactorySelectors,
  CwVestingSelectors,
  genericTokenSelector,
  isContractSelector,
  nativeDelegationInfoSelector,
  queryWalletIndexerSelector,
  refreshVestingAtom,
  validatorSlashesSelector,
} from '@dao-dao/state/recoil'
import {
  TokenType,
  VestingInfo,
  VestingStep,
  WithChainId,
} from '@dao-dao/types'
import {
  ContractName,
  convertMicroDenomToDenomWithDecimals,
  getVestingValidatorSlashes,
} from '@dao-dao/utils'

export const vestingPaymentsOwnedBySelector = selectorFamily<
  string[],
  WithChainId<{ address: string }>
>({
  key: 'vestingPaymentsOwnedBy',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const vestingPayments: string[] = get(
        queryWalletIndexerSelector({
          chainId,
          walletAddress: address,
          formula: 'vesting/ownerOf',
        })
      )

      return vestingPayments && Array.isArray(vestingPayments)
        ? vestingPayments
        : []
    },
})

export const vestingInfosOwnedBySelector = selectorFamily<
  VestingInfo[],
  WithChainId<{ address: string }>
>({
  key: 'vestingInfosOwnedBy',
  get:
    ({ chainId, address }) =>
    ({ get }) => {
      const vestingPaymentContracts = get(
        vestingPaymentsOwnedBySelector({
          chainId,
          address,
        })
      )

      return get(
        waitForAll(
          vestingPaymentContracts.map((vestingContractAddress) =>
            vestingInfoSelector({
              vestingContractAddress,
              chainId,
            })
          )
        )
      )
    },
})

export const vestingFactoryOwnerSelector = selectorFamily<
  string | undefined,
  WithChainId<{ factory: string }>
>({
  key: 'vestingFactoryOwner',
  get:
    ({ chainId, factory }) =>
    ({ get }) => {
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

export const vestingInfosForFactorySelector = selectorFamily<
  VestingInfo[],
  WithChainId<{ factory: string }>
>({
  key: 'vestingInfosForFactory',
  get:
    ({ chainId, factory }) =>
    ({ get }) => {
      const vestingPaymentContracts = get(
        CwPayrollFactorySelectors.allVestingContractsSelector({
          chainId,
          contractAddress: factory,
        })
      )

      return get(
        waitForAll(
          vestingPaymentContracts.map(({ contract }) =>
            vestingInfoSelector({
              chainId,
              vestingContractAddress: contract,
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
        { owner },
        stakeHistory,
        unbondingDurationSeconds,
        [actualDelegationInfoLoadable],
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
          // This fails to load on chains without staking support, like Neutron.
          // If so, it's fine, we know nothing is staked.
          waitForAllSettled([
            nativeDelegationInfoSelector({
              address: vestingContractAddress,
              chainId,
            }),
          ]),
        ])
      )

      const ownerIsCw1Whitelist = owner
        ? get(
            isContractSelector({
              chainId,
              contractAddress: owner,
              name: ContractName.Cw1Whitelist,
            })
          )
        : false
      const cw1WhitelistAdmins =
        owner && ownerIsCw1Whitelist
          ? get(
              Cw1WhitelistSelectors.adminListSelector({
                contractAddress: owner,
                chainId,
                params: [],
              })
            ).admins
          : undefined

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

      const vestingValidatorSlashes =
        stakeHistory && unbondingDurationSeconds !== null
          ? getVestingValidatorSlashes(
              stakeHistory,
              unbondingDurationSeconds,
              validatorSlashes
            )
          : []

      const hasUnregisteredSlashes =
        vestingValidatorSlashes?.some(({ slashes }) =>
          slashes.some(({ unregisteredAmount }) => unregisteredAmount > 0)
        ) ?? false

      const actualSlashed = vestingValidatorSlashes?.reduce(
        (slashed, { slashes }) =>
          slashed +
          slashes.reduce((acc, { amount }) => acc + BigInt(amount), BigInt(0)),
        BigInt(0)
      )

      // This errors on chains without staking support, like Neutron. If so,
      // it's fine, we know nothing is staked.
      if (
        actualDelegationInfoLoadable.state === 'hasError' &&
        (!(actualDelegationInfoLoadable.contents instanceof Error) ||
          !actualDelegationInfoLoadable.contents.message.includes(
            'unknown query path'
          ))
      ) {
        throw actualDelegationInfoLoadable.contents
      }

      // Should always have loaded here.
      const actualDelegationInfo = actualDelegationInfoLoadable.valueMaybe()

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

      // If cannot compute the actual slashed amount, then we cannot compute the
      // stakable amount, so default to 0 to prevent the UI from allowing
      // staking.
      const stakable =
        actualSlashed === undefined
          ? '0'
          : (
              BigInt(total) -
              BigInt(vest.claimed) -
              BigInt(actualStaked) -
              BigInt(actualUnstaking) -
              actualSlashed
            ).toString()

      const completed =
        (vest.status === 'funded' ||
          (typeof vest.status === 'object' && 'canceled' in vest.status)) &&
        vest.claimed === total

      const startTimeMs = Number(vest.start_time) / 1e6
      const startDate = new Date(startTimeMs)

      const steps: VestingStep[] =
        // Constant is used when a vest is canceled.
        'constant' in vest.vested
          ? [
              {
                timestamp: startTimeMs,
                amount: convertMicroDenomToDenomWithDecimals(
                  vest.vested.constant.y,
                  token.decimals
                ),
              },
              {
                timestamp: startTimeMs,
                amount: convertMicroDenomToDenomWithDecimals(
                  vest.vested.constant.y,
                  token.decimals
                ),
              },
            ]
          : 'saturating_linear' in vest.vested
          ? [
              {
                timestamp:
                  startTimeMs + vest.vested.saturating_linear.min_x * 1000,
                amount: convertMicroDenomToDenomWithDecimals(
                  vest.vested.saturating_linear.min_y,
                  token.decimals
                ),
              },
              {
                timestamp:
                  startTimeMs + vest.vested.saturating_linear.max_x * 1000,
                amount: convertMicroDenomToDenomWithDecimals(
                  vest.vested.saturating_linear.max_y,
                  token.decimals
                ),
              },
            ]
          : vest.vested.piecewise_linear.steps.reduce(
              (acc, [seconds, amount], index): VestingStep[] => {
                // Ignore first step if hardcoded 0 amount at 1 second.
                if (index === 0 && seconds === 1 && amount === '0') {
                  return acc
                }

                return [
                  ...acc,
                  {
                    timestamp: startTimeMs + seconds * 1000,
                    amount: convertMicroDenomToDenomWithDecimals(
                      amount,
                      token.decimals
                    ),
                  },
                ]
              },
              [] as VestingStep[]
            )

      const endDate = new Date(steps[steps.length - 1].timestamp)

      return {
        chainId,
        vestingContractAddress,
        vest,
        token,
        owner: owner
          ? {
              address: owner,
              ...(ownerIsCw1Whitelist && cw1WhitelistAdmins
                ? {
                    isCw1Whitelist: true,
                    cw1WhitelistAdmins,
                  }
                : {
                    isCw1Whitelist: false,
                  }),
            }
          : undefined,
        vested,
        distributable,
        total,
        stakable,
        slashes: vestingValidatorSlashes,
        hasUnregisteredSlashes,
        completed,
        startDate,
        endDate,
        steps,
      }
    },
})
