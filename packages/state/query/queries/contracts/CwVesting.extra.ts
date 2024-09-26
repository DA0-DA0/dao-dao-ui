import { QueryClient, queryOptions } from '@tanstack/react-query'
import { BigNumber } from 'bignumber.js'

import {
  TokenType,
  VestingInfo,
  VestingStep,
  VestingValidatorWithSlashes,
} from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { chainQueries } from '../chain'
import { indexerQueries } from '../indexer'
import { tokenQueries } from '../token'
import { cw1WhitelistExtraQueries } from './Cw1Whitelist.extra'
import { cwPayrollFactoryExtraQueries } from './CwPayrollFactory.extra'
import { cwVestingQueries } from './CwVesting'

/**
 * Fetch info for a vesting payment.
 */
export const fetchVestingPaymentInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<VestingInfo> => {
  const [
    { vest, token },
    vested,
    total,
    distributable,
    owner,
    { slashes, hasUnregisteredSlashes, actualSlashed },
    delegationInfo,
  ] = await Promise.all([
    queryClient
      .fetchQuery(
        cwVestingQueries.info(queryClient, {
          chainId,
          contractAddress: address,
        })
      )
      .then(async (vest) => {
        const token = await queryClient.fetchQuery(
          tokenQueries.info(queryClient, {
            chainId,
            type: 'cw20' in vest.denom ? TokenType.Cw20 : TokenType.Native,
            denomOrAddress:
              'cw20' in vest.denom ? vest.denom.cw20 : vest.denom.native,
          })
        )

        return {
          vest,
          token,
        }
      }),
    queryClient.fetchQuery(
      cwVestingQueries.vested(queryClient, {
        chainId,
        contractAddress: address,
        args: {},
      })
    ),
    queryClient.fetchQuery(
      cwVestingQueries.totalToVest(queryClient, {
        chainId,
        contractAddress: address,
      })
    ),
    queryClient.fetchQuery(
      cwVestingQueries.distributable({
        chainId,
        contractAddress: address,
        args: {},
      })
    ),
    queryClient
      .fetchQuery(
        cwVestingQueries.ownership(queryClient, {
          chainId,
          contractAddress: address,
        })
      )
      .then(async ({ owner }): Promise<VestingInfo['owner']> => {
        if (!owner) {
          return null
        }

        const cw1WhitelistAdmins = owner
          ? await queryClient.fetchQuery(
              cw1WhitelistExtraQueries.adminsIfCw1Whitelist(queryClient, {
                chainId,
                address: owner,
              })
            )
          : null

        return cw1WhitelistAdmins
          ? {
              address: owner,
              isCw1Whitelist: true,
              cw1WhitelistAdmins,
            }
          : {
              address: owner,
              isCw1Whitelist: false,
            }
      }),
    // TODO(vesting): add stake slash history analysis back
    {
      slashes: [] as VestingValidatorWithSlashes[],
      hasUnregisteredSlashes: false,
      actualSlashed: BigNumber(0),
    },
    // Promise.all([
    //   queryClient.fetchQuery(
    //     cwVestingExtraQueries.stakeHistory(queryClient, {
    //       chainId,
    //       contractAddress: address,
    //     })
    //   ),
    //   queryClient
    //     .fetchQuery(
    //       cwVestingExtraQueries.unbondingDurationSeconds(queryClient, {
    //         chainId,
    //         address,
    //       })
    //     )
    //     // Fails on chains without an indexer.
    //     .catch(() => null),
    // ]).then(
    //   async ([stakeHistory, unbondingDurationSeconds]): Promise<{
    //     slashes: VestingValidatorWithSlashes[]
    //     hasUnregisteredSlashes: boolean
    //     actualSlashed: BigNumber
    //   }> => {
    //     const uniqueValidators = uniq(
    //       stakeHistory?.stakeEvents.flatMap((event) =>
    //         event.type === 'redelegate' ? event.toValidator : event.validator
    //       ) ?? []
    //     )

    //     const validatorSlashes = await Promise.all(
    //       uniqueValidators.map((validator) =>
    //         queryClient
    //           .fetchQuery(
    //             indexerQueries.queryValidator(queryClient, {
    //               chainId,
    //               validatorOperatorAddress: validator,
    //               formula: 'staking/slashes',
    //               noFallback: true,
    //             })
    //           )
    //           .then((slashes) => ({
    //             validator,
    //             slashes,
    //           }))
    //       )
    //     )

    //     const slashes =
    //       stakeHistory && unbondingDurationSeconds !== null
    //         ? getVestingValidatorSlashes(
    //             stakeHistory,
    //             unbondingDurationSeconds,
    //             validatorSlashes
    //           )
    //         : []

    //     const hasUnregisteredSlashes =
    //       slashes?.some(({ slashes }) =>
    //         slashes.some(({ unregisteredAmount }) => unregisteredAmount > 0)
    //       ) ?? false

    //     const actualSlashed = slashes?.reduce(
    //       (slashed, { slashes }) =>
    //         slashed +
    //         slashes.reduce(
    //           (acc, { amount }) => acc.plus(amount),
    //           BigNumber(0)
    //         ),
    //       BigNumber(0)
    //     )

    //     return {
    //       slashes,
    //       hasUnregisteredSlashes,
    //       actualSlashed,
    //     }
    //   }
    // ),
    queryClient.fetchQuery(
      chainQueries.nativeDelegationInfo(queryClient, {
        chainId,
        address,
      })
    ),
  ])

  const actualStaked = delegationInfo.delegations.reduce(
    (acc, { delegated }) => acc.plus(BigNumber(delegated.amount)),
    BigNumber(0)
  )
  const actualUnstaking = delegationInfo.unbondingDelegations.reduce(
    (acc, { balance }) => acc.plus(BigNumber(balance.amount)),
    BigNumber(0)
  )

  // If cannot compute the actual slashed amount, then we cannot compute the
  // stakable amount, so default to 0 to prevent the UI from allowing staking.
  const stakable =
    actualSlashed === undefined
      ? '0'
      : BigNumber(total)
          .minus(BigNumber(vest.claimed))
          .minus(BigNumber(actualStaked))
          .minus(BigNumber(actualUnstaking))
          .minus(actualSlashed)
          .toString()

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
            amount: BigNumber(
              convertMicroDenomToDenomWithDecimals(
                vest.vested.constant.y,
                token.decimals
              )
            ),
          },
          {
            timestamp: startTimeMs,
            amount: BigNumber(
              convertMicroDenomToDenomWithDecimals(
                vest.vested.constant.y,
                token.decimals
              )
            ),
          },
        ]
      : 'saturating_linear' in vest.vested
      ? [
          {
            timestamp: startTimeMs + vest.vested.saturating_linear.min_x * 1000,
            amount: BigNumber(
              convertMicroDenomToDenomWithDecimals(
                vest.vested.saturating_linear.min_y,
                token.decimals
              )
            ),
          },
          {
            timestamp: startTimeMs + vest.vested.saturating_linear.max_x * 1000,
            amount: BigNumber(
              convertMicroDenomToDenomWithDecimals(
                vest.vested.saturating_linear.max_y,
                token.decimals
              )
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
                amount: BigNumber(
                  convertMicroDenomToDenomWithDecimals(amount, token.decimals)
                ),
              },
            ]
          },
          [] as VestingStep[]
        )

  const endDate = new Date(steps[steps.length - 1].timestamp)

  return {
    chainId,
    vestingContractAddress: address,
    vest,
    token,
    owner,
    vested,
    distributable,
    total,
    stakable,
    slashes,
    hasUnregisteredSlashes,
    completed,
    startDate,
    endDate,
    steps,
  }
}

/**
 * Fetch vesting payments owned by a given address.
 */
export const fetchVestingPaymentsOwnedBy = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string[]> => {
  const vestingPayments: string[] = await queryClient.fetchQuery(
    indexerQueries.queryAccount(queryClient, {
      chainId,
      address,
      formula: 'vesting/ownerOf',
      noFallback: true,
    })
  )

  return vestingPayments && Array.isArray(vestingPayments)
    ? vestingPayments
    : []
}

/**
 * Fetch vesting payment infos owned by a given address.
 */
export const fetchVestingInfosOwnedBy = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<VestingInfo[]> => {
  const vestingPayments = await queryClient.fetchQuery(
    cwVestingExtraQueries.vestingPaymentsOwnedBy(queryClient, {
      chainId,
      address,
    })
  )

  return (
    await Promise.allSettled(
      vestingPayments.map((address) =>
        queryClient.fetchQuery(
          cwVestingExtraQueries.info(queryClient, {
            chainId,
            address,
          })
        )
      )
    )
  ).flatMap((l) => (l.status === 'fulfilled' ? l.value : []))
}

/**
 * Fetch vesting payment infos created by a given factory.
 */
export const fetchVestingInfosForFactory = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<VestingInfo[]> => {
  const { contracts } = await queryClient.fetchQuery(
    cwPayrollFactoryExtraQueries.listAllVestingContracts(queryClient, {
      chainId,
      address,
    })
  )

  return (
    await Promise.allSettled(
      contracts.map(({ contract }) =>
        queryClient.fetchQuery(
          cwVestingExtraQueries.info(queryClient, {
            chainId,
            address: contract,
          })
        )
      )
    )
  ).flatMap((l) => (l.status === 'fulfilled' ? l.value : []))
}

export const cwVestingExtraQueries = {
  /**
   * Fetch info for a vesting payment.
   */
  info: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchVestingPaymentInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['cwVestingExtra', 'vestingPaymentInfo', options],
      queryFn: () => fetchVestingPaymentInfo(queryClient, options),
    }),
  /**
   * Fetch unbonding duration seconds configured for a vest.
   */
  unbondingDurationSeconds: (
    queryClient: QueryClient,
    {
      chainId,
      address,
    }: {
      chainId: string
      address: string
    }
  ) =>
    indexerQueries.queryContract<number | null>(queryClient, {
      chainId,
      contractAddress: address,
      formula: 'cwVesting/unbondingDurationSeconds',
      // No contract query for this.
      noFallback: true,
    }),
  /**
   * Fetch vesting payments owned by a given address.
   */
  vestingPaymentsOwnedBy: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchVestingPaymentsOwnedBy>[1]
  ) =>
    queryOptions({
      queryKey: ['cwVestingExtra', 'vestingPaymentsOwnedBy', options],
      queryFn: () => fetchVestingPaymentsOwnedBy(queryClient, options),
    }),
  /**
   * Fetch vesting payment infos owned by a given address.
   */
  vestingInfosOwnedBy: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchVestingInfosOwnedBy>[1]
  ) =>
    queryOptions({
      queryKey: ['cwVestingExtra', 'vestingInfosOwnedBy', options],
      queryFn: () => fetchVestingInfosOwnedBy(queryClient, options),
    }),
  /**
   * Fetch vesting payment infos created by a given factory.
   */
  vestingInfosForFactory: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchVestingInfosForFactory>[1]
  ) =>
    queryOptions({
      queryKey: ['cwVestingExtra', 'vestingInfosForFactory', options],
      queryFn: () => fetchVestingInfosForFactory(queryClient, options),
    }),
}
