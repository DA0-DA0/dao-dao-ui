import { AminoConverter } from '@cosmjs/stargate'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { HugeDecimal } from '@dao-dao/math'
import { skipQueries, tokenQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  useActionOptions,
  useLoadingPromise,
} from '@dao-dao/stateless'
import {
  Account,
  AccountType,
  DurationUnits,
  UnifiedCosmosMsg,
  getAminoTypes,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  convertDurationWithUnitsToSeconds,
  getNativeTokenForChainId,
  maybeMakeIcaExecuteMessages,
  maybeMakePolytoneExecuteMessages,
  processError,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useProposalModuleAdapterCommonContextIfAvailable } from '../../../../proposal-module-adapter/react/context'
import { useTokenBalances } from '../../../hooks'
import { SkipGoComponent, SkipGoData, SkipGoIcon } from './Component'

const accountOrder = (a: Account) =>
  a.type === AccountType.Base
    ? 0
    : a.type === AccountType.Polytone
      ? 1
      : a.type === AccountType.Ica
        ? 2
        : 0

const Component: ActionComponent<undefined, SkipGoData> = (props) => {
  const { context } = useActionOptions()
  const queryClient = useQueryClient()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<SkipGoData>()

  const from = watch((props.fieldNamePrefix + 'from') as 'from')
  const to = watch((props.fieldNamePrefix + 'to') as 'to')
  const amount = watch((props.fieldNamePrefix + 'amount') as 'amount')
  const ibcTimeout = watch(
    (props.fieldNamePrefix + 'ibcTimeout') as 'ibcTimeout'
  )

  const token = useQueryLoadingDataWithError(
    from.chainId && from.type && from.denomOrAddress
      ? tokenQueries.info(queryClient, {
          chainId: from.chainId,
          type: from.type,
          denomOrAddress: from.denomOrAddress,
        })
      : undefined
  )

  const tokens = useTokenBalances({
    includeAccountTypes: [
      AccountType.Base,
      AccountType.Polytone,
      AccountType.Ica,
    ],
  })

  const chains = useQueryLoadingDataWithError(skipQueries.chains(queryClient))
  const assets = useQueryLoadingDataWithError(
    skipQueries.allAssets(queryClient)
  )

  // Should always be defined if in a DAO proposal. Even for a DAO, it may not
  // be defined if being authz executed or something similar.
  const { proposalModule } =
    useProposalModuleAdapterCommonContextIfAvailable()?.options || {}
  const maxVotingPeriod = useLoadingPromise({
    promise: async () =>
      context.type === ActionContextType.Dao && proposalModule
        ? await proposalModule.getMaxVotingPeriod()
        : context.type === ActionContextType.Wallet
          ? // Wallets execute transactions right away—no voting.
            {
              time: 0,
            }
          : context.type === ActionContextType.Gov
            ? {
                // Seconds
                time: context.params.votingPeriod
                  ? Number(context.params.votingPeriod.seconds) +
                    context.params.votingPeriod.nanos / 1e9
                  : // If no voting period loaded, default to 30 days.
                    30 * 24 * 60 * 60,
              }
            : { time: 0 },
    deps: [context, proposalModule],
  })

  const addresses = useMemo(
    () =>
      context.accounts
        // Only include base, polytone, and ICA accounts.
        .filter(
          (a) =>
            a.type === AccountType.Base ||
            a.type === AccountType.Polytone ||
            a.type === AccountType.Ica
        )
        // Sort descending by account type, so that smaller order numbers
        // are reduced last and override larger order numbers.
        .sort((a, b) => accountOrder(b) - accountOrder(a))
        .reduce(
          (acc, account) => ({
            ...acc,
            [account.chainId]: account.address,
          }),
          {} as Record<string, string>
        ),
    [context.accounts]
  )

  // Default to conservative 30 days if no IBC timeout is set for some
  // reason. This should never happen.
  const timeoutSecondsDelta = convertDurationWithUnitsToSeconds(ibcTimeout)
  const timeoutSeconds =
    maxVotingPeriod.loading || maxVotingPeriod.errored
      ? 0
      : ('height' in maxVotingPeriod.data
          ? // Use 5-second block estimate if voting period is in blocks.
            5 * maxVotingPeriod.data.height
          : maxVotingPeriod.data.time) + timeoutSecondsDelta

  const skipGoResponse = useQueryLoadingDataWithError(
    from.denomOrAddress &&
      to.denomOrAddress &&
      to.type &&
      amount &&
      amount !== '0' &&
      !token.loading &&
      !token.errored &&
      !token.updating &&
      !maxVotingPeriod.loading &&
      !maxVotingPeriod.errored &&
      !maxVotingPeriod.updating
      ? skipQueries.skipGoMsgsDirect(queryClient, {
          fromChainId: from.chainId,
          fromTokenType: from.type,
          fromDenomOrAddress: from.denomOrAddress,
          toChainId: to.chainId,
          toTokenType: to.type,
          toDenomOrAddress: to.denomOrAddress,
          amount: HugeDecimal.fromHumanReadable(
            amount,
            token.data.decimals
          ).toString(),
          slippageTolerancePercent: 3,
          timeoutSeconds,
          addresses,
          smartRelay: false,
          allowSwaps: true,
        })
      : undefined
  )

  useEffect(() => {
    if (
      skipGoResponse.loading ||
      skipGoResponse.errored ||
      skipGoResponse.updating
    ) {
      setValue(
        (props.fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse',
        undefined
      )
      if (skipGoResponse.errored) {
        setError(
          (props.fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse',
          {
            type: 'manual',
            message: processError(skipGoResponse.error, {
              forceCapture: false,
            }),
          }
        )
      } else {
        clearErrors(
          (props.fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse'
        )
      }
    } else {
      setValue(
        (props.fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse',
        skipGoResponse.data
      )
      clearErrors(
        (props.fieldNamePrefix + 'skipGoResponse') as 'skipGoResponse'
      )
    }
  }, [skipGoResponse, props.fieldNamePrefix, setValue, setError, clearErrors])

  return (
    <SkipGoComponent
      {...props}
      options={{
        chains,
        assets,
        tokens: {
          ...tokens,
          errored: false,
        },
        token,
        AddressInput,
        proposalModuleMaxVotingPeriodInBlocks:
          !maxVotingPeriod.loading &&
          !maxVotingPeriod.errored &&
          'height' in maxVotingPeriod.data,
      }}
    />
  )
}

export class SkipGoAction extends ActionBase<SkipGoData> {
  public readonly key = ActionKey.SkipGo
  public readonly Component = Component

  constructor(options: ActionOptions) {
    if (options.context.type === ActionContextType.Gov) {
      throw new Error('SkipGoAction is not supported in gov')
    }

    super(options, {
      Icon: SkipGoIcon,
      label: options.t('title.skipGo'),
      description: options.t('info.skipGoDescription'),
    })

    const nativeToken = getNativeTokenForChainId(options.chain.chainId)
    this._defaults = {
      from: {
        chainId: options.chain.chainId,
        address: options.address,
        type: nativeToken.type,
        denomOrAddress: nativeToken.denomOrAddress,
      },
      to: {
        chainId: options.chain.chainId,
        address: '',
        type: nativeToken.type,
        denomOrAddress: nativeToken.denomOrAddress,
      },
      amount: '1',
      ibcTimeout: {
        value: 1,
        units: DurationUnits.Weeks,
      },
    }
  }

  encode({ from, skipGoResponse }: SkipGoData): UnifiedCosmosMsg[] {
    if (!skipGoResponse) {
      throw new Error('Skip Go route not ready.')
    }

    const account = this.options.context.accounts.find(
      (account) =>
        account.chainId === from.chainId && account.address === from.address
    )

    if (!account) {
      throw new Error('No sender account found.')
    }

    // Should never happen.
    if (skipGoResponse.route.txsRequired > 1) {
      throw new Error(
        'Skip Go route requires multiple transactions, which is not supported.'
      )
    }

    // Should never happen.
    const tx = skipGoResponse.txs[0]
    if (!('cosmosTx' in tx)) {
      throw new Error('Skip Go route is not a Cosmos TX.')
    }

    const msgs = tx.cosmosTx.msgs.map((m) => {
      const aminoConverter: AminoConverter =
        getAminoTypes()['register'][m.msgTypeURL]
      if (!aminoConverter) {
        throw new Error(`No Amino converter found for ${m.msgTypeURL}`)
      }

      return makeStargateMessage({
        stargate: {
          typeUrl: m.msgTypeURL,
          value: aminoConverter.fromAmino(JSON.parse(m.msg)),
        },
      })
    })

    return account.type === AccountType.Polytone
      ? maybeMakePolytoneExecuteMessages(
          this.options.chain.chainId,
          account.chainId,
          msgs
        )
      : account.type === AccountType.Ica
        ? maybeMakeIcaExecuteMessages(
            this.options.chain.chainId,
            account.chainId,
            this.options.address,
            account.address,
            msgs
          )
        : // account.type === AccountType.Base
          msgs
  }

  match(): ActionMatch {
    return false
  }

  decode(_messages: ProcessedMessage[]): SkipGoData {
    throw new Error('SkipGoAction does not support decoding')
  }
}
