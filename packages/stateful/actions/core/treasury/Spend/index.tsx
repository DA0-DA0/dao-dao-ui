import { coin, coins } from '@cosmjs/amino'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  accountsSelector,
  genericTokenSelector,
  neutronIbcTransferFeeSelector,
  nobleTariffTransferFeeSelector,
  skipAllChainsPfmEnabledSelector,
  skipRouteMessageSelector,
  skipRouteSelector,
} from '@dao-dao/state/recoil'
import {
  MoneyEmoji,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  AccountType,
  ChainId,
  DurationUnits,
  Entity,
  GenericTokenBalanceWithOwner,
  LoadingData,
  LoadingDataWithError,
  TokenType,
  UnifiedCosmosMsg,
  UseDecodedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgCommunityPoolSpend } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { MsgTransfer } from '@dao-dao/types/protobuf/codegen/ibc/applications/transfer/v1/tx'
import { MsgTransfer as NeutronMsgTransfer } from '@dao-dao/types/protobuf/codegen/neutron/transfer/v1/tx'
import {
  MAINNET,
  convertDenomToMicroDenomStringWithDecimals,
  convertDurationWithUnitsToSeconds,
  convertMicroDenomToDenomWithDecimals,
  decodeIcaExecuteMsg,
  decodePolytoneExecuteMsg,
  getAccountAddress,
  getChainAddressForActionOptions,
  getChainForChainId,
  getChainForChainName,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromChannel,
  getPfmChainPathFromMemo,
  getPfmFinalReceiverFromMemo,
  isDecodedStargateMsg,
  isValidBech32Address,
  makeBankMessage,
  makeWasmMessage,
  maybeGetNativeTokenForChainId,
  maybeMakeIcaExecuteMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
  parseValidPfmMemo,
  transformBech32Address,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useWallet } from '../../../../hooks/useWallet'
import { useProposalModuleAdapterCommonContextIfAvailable } from '../../../../proposal-module-adapter/react/context'
import { entityQueries } from '../../../../queries/entity'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  SpendData,
  SpendComponent as StatelessSpendComponent,
} from './Component'

const useDefaults: UseDefaults<SpendData> = () => {
  const {
    chain: { chain_id: chainId },
    address,
    context,
  } = useActionOptions()
  const { address: walletAddress = '' } = useWallet()

  // Should always be defined if in a DAO proposal. Even for a DAO, it may not
  // be defined if being authz executed or something similar.
  const maxVotingPeriodSelector =
    useProposalModuleAdapterCommonContextIfAvailable()?.common?.selectors
      ?.maxVotingPeriod ||
    // If no selector, default to 0 time (likely in authz context).
    constSelector({ time: 0 })
  const proposalModuleMaxVotingPeriod = useCachedLoadingWithError(
    context.type === ActionContextType.Dao
      ? maxVotingPeriodSelector
      : context.type === ActionContextType.Wallet
      ? // Wallets execute transactions right away, so there's no voting delay.
        constSelector({
          time: 0,
        })
      : context.type === ActionContextType.Gov
      ? constSelector({
          // Seconds
          time: context.params.votingPeriod
            ? Number(context.params.votingPeriod.seconds) +
              context.params.votingPeriod.nanos / 1e9
            : // If no voting period loaded, default to 30 days.
              30 * 24 * 60 * 60,
        })
      : undefined
  )

  if (proposalModuleMaxVotingPeriod.loading) {
    return
  } else if (proposalModuleMaxVotingPeriod.errored) {
    return proposalModuleMaxVotingPeriod.error
  }

  return {
    fromChainId: chainId,
    toChainId: chainId,
    from: address,
    to: walletAddress,
    amount: 1,
    denom: maybeGetNativeTokenForChainId(chainId)?.denomOrAddress || '',
    ibcTimeout:
      'time' in proposalModuleMaxVotingPeriod.data
        ? // 1 week if voting period is a time since we can append it after.
          {
            value: 1,
            units: DurationUnits.Weeks,
          }
        : // 30 days if max voting period is in blocks since we can't append time and need to choose a conservative value.
          {
            value: 30,
            units: DurationUnits.Days,
          },
  }
}

const Component: ActionComponent<undefined, SpendData> = (props) => {
  const {
    context,
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()
  const { watch, setValue } = useFormContext<SpendData>()

  const fromChainId = watch(
    (props.fieldNamePrefix + 'fromChainId') as 'fromChainId'
  )
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')
  const from = watch((props.fieldNamePrefix + 'from') as 'from')
  const recipient = watch((props.fieldNamePrefix + 'to') as 'to')
  const toChainId = watch((props.fieldNamePrefix + 'toChainId') as 'toChainId')
  const amount = watch((props.fieldNamePrefix + 'amount') as 'amount')
  const useDirectIbcPath = watch(
    (props.fieldNamePrefix + 'useDirectIbcPath') as 'useDirectIbcPath'
  )
  // Loaded on decode after creation.
  const _ibcData = watch((props.fieldNamePrefix + '_ibcData') as '_ibcData')

  const validRecipient =
    !!recipient &&
    isValidBech32Address(recipient, getChainForChainId(toChainId).bech32_prefix)

  const isIbc = !!fromChainId && !!toChainId && fromChainId !== toChainId
  // Only defined if valid PFM memo and chains all have PFM enabled.
  const pfmMemo = _ibcData && parseValidPfmMemo(_ibcData.pfmMemo || '')
  const pfmChainPath =
    isIbc && !props.isCreating && pfmMemo && _ibcData
      ? getPfmChainPathFromMemo(fromChainId, _ibcData.sourceChannel, pfmMemo)
      : undefined

  const loadingAllTokenBalances = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO/wallet.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId: fromChainId,
            // Cw20 denoms are contract addresses, native denoms are not.
            type: isValidBech32Address(
              denom,
              getChainForChainId(fromChainId).bech32_prefix
            )
              ? TokenType.Cw20
              : TokenType.Native,
            denomOrAddress: denom,
          },
        ],
  })

  // Should always be defined if in a DAO proposal. Even for a DAO, it may not
  // be defined if being authz executed or something similar.
  const maxVotingPeriodSelector =
    useProposalModuleAdapterCommonContextIfAvailable()?.common?.selectors
      ?.maxVotingPeriod ||
    // If no selector, default to 0 time (likely in authz context).
    constSelector({ time: 0 })
  const proposalModuleMaxVotingPeriod = useRecoilValue(
    context.type === ActionContextType.Dao
      ? maxVotingPeriodSelector || constSelector(undefined)
      : context.type === ActionContextType.Wallet
      ? // Wallets execute transactions right away, so there's no voting delay.
        constSelector({
          time: 0,
        })
      : context.type === ActionContextType.Gov
      ? constSelector({
          // Seconds
          time: context.params.votingPeriod
            ? Number(context.params.votingPeriod.seconds) +
              context.params.votingPeriod.nanos / 1e9
            : // If no voting period loaded, default to 30 days.
              30 * 24 * 60 * 60,
        })
      : constSelector(undefined)
  )

  // Once already created, load selected token info (which should already be
  // loaded in the decoder), so this data is available right away. This removes
  // the need to wait for all the token balances to load just to show the
  // selected token.
  const loadingSelectedToken = useCachedLoading(
    props.isCreating
      ? undefined
      : genericTokenSelector({
          chainId: fromChainId,
          // Cw20 denoms are contract addresses, native denoms are not.
          type: isValidBech32Address(
            denom,
            getChainForChainId(fromChainId).bech32_prefix
          )
            ? TokenType.Cw20
            : TokenType.Native,
          denomOrAddress: denom,
        }),
    undefined
  )

  // If creating, use all token balances since they need to choose among them,
  // but once already created, we only need to load the selected token.
  const loadingTokens: LoadingData<GenericTokenBalanceWithOwner[]> =
    props.isCreating
      ? loadingAllTokenBalances
      : loadingSelectedToken.loading
      ? loadingSelectedToken
      : {
          loading: false,
          updating: loadingSelectedToken.updating,
          data: loadingSelectedToken.data
            ? [
                {
                  token: loadingSelectedToken.data,
                  // Not used once already created.
                  balance: '0',
                  // Only address is checked so the specific account type is not
                  // a big deal.
                  owner: {
                    type: AccountType.Native,
                    chainId: fromChainId,
                    address: from,
                  },
                },
              ]
            : [],
        }

  const selectedToken = loadingTokens.loading
    ? undefined
    : loadingTokens.data.find(
        ({ token }) =>
          token.chainId === fromChainId && token.denomOrAddress === denom
      )

  const amountIn =
    selectedToken && amount
      ? convertDenomToMicroDenomStringWithDecimals(
          amount,
          selectedToken.token.decimals
        )
      : undefined

  // Get Skip route for IBC transfer.
  const skipRoute = useCachedLoadingWithError(
    isIbc && denom && amountIn
      ? skipRouteSelector({
          fromChainId,
          toChainId,
          sourceDenom: denom,
          amountIn,
        })
      : undefined
  )

  // Get accounts to extract the receiver addresses for the transfer.
  const accounts = useCachedLoadingWithError(
    skipRoute.loading ||
      skipRoute.errored ||
      // Cannot use skip route if more than one TX is required.
      skipRoute.data.txs_required > 1
      ? undefined
      : accountsSelector({
          chainId: currentChainId,
          address,
          // Only need ICA for intermediate accounts.
          includeIcaChains: skipRoute.data.chain_ids.slice(1, -1),
        })
  )
  // Get account for each skip route chain.
  const routeAddresses =
    skipRoute.loading ||
    skipRoute.errored ||
    // Cannot use skip route if more than one TX is required.
    skipRoute.data.txs_required > 1 ||
    accounts.loading ||
    accounts.errored
      ? undefined
      : skipRoute.data.chain_ids.slice(0, -1).map((chainId, index) =>
          // For source, use from address. This should always match the first
          // chain ID.
          index === 0
            ? from
            : // Use profile address if set, falling back to transforming the address (which is unreliable due to different chains using different HD paths).
            context.type === ActionContextType.Wallet
            ? context.profile?.chains[chainId]?.address ||
              transformBech32Address(address, chainId)
            : // Otherwise try to find an account (DAOs and gov).
              getAccountAddress({
                accounts: accounts.data,
                chainId,
                types: [
                  AccountType.Native,
                  AccountType.Polytone,
                  AccountType.Ica,
                ],
              })
        )
  // Get missing accounts for skip route.
  const missingAccountChainIds =
    !routeAddresses || skipRoute.loading || skipRoute.errored
      ? undefined
      : routeAddresses.flatMap((address, index) =>
          address ? [] : [skipRoute.data.chain_ids[index]]
        )

  // Load Skip route message if IBC transfer.
  const skipRouteMessageLoading = useCachedLoadingWithError(
    isIbc &&
      props.isCreating &&
      denom &&
      amountIn &&
      !skipRoute.loading &&
      !skipRoute.errored &&
      // Can only use skip route if only one TX is required.
      skipRoute.data.txs_required === 1 &&
      routeAddresses &&
      missingAccountChainIds &&
      missingAccountChainIds.length === 0 &&
      validRecipient
      ? skipRouteMessageSelector({
          chainAddresses: routeAddresses.reduce(
            (acc, address, index) => ({
              ...acc,
              [skipRoute.data.chain_ids[index]]: address,
            }),
            {} as Record<string, string | undefined>
          ),
          fromChainId,
          toChainId,
          toAddress: recipient,
          sourceDenom: denom,
          amountIn,
        })
      : undefined
  )

  // Get the IBC path.
  const ibcPath: LoadingDataWithError<string[]> = isIbc
    ? props.isCreating && skipRoute.loading
      ? {
          loading: true,
          errored: false,
        }
      : props.isCreating &&
        !useDirectIbcPath &&
        !skipRoute.loading &&
        !skipRoute.errored &&
        // Can only use skip route if only one TX is required.
        skipRoute.data.txs_required === 1 &&
        // Only use skip IBC path if loads message successfully.
        !skipRouteMessageLoading.loading &&
        !skipRouteMessageLoading.errored
      ? {
          loading: false,
          errored: false,
          updating: skipRoute.updating,
          data: skipRoute.data.chain_ids,
        }
      : !props.isCreating && pfmChainPath?.length
      ? {
          loading: false,
          errored: false,
          data: pfmChainPath,
        }
      : // Fallback to just showing one hop if failed to load actual path.
        {
          loading: false,
          errored: false,
          updating: false,
          data: [fromChainId, toChainId],
        }
    : // Not IBC.
      {
        loading: true,
        errored: false,
      }
  // Get the amount out from an IBC path.
  const ibcAmountOut: LoadingDataWithError<number | undefined> = isIbc
    ? skipRoute.loading || !selectedToken
      ? {
          loading: true,
          errored: false,
        }
      : skipRoute.errored
      ? {
          loading: false,
          errored: true,
          error: skipRoute.error,
        }
      : {
          loading: false,
          errored: false,
          updating: skipRoute.updating,
          data: convertMicroDenomToDenomWithDecimals(
            skipRoute.data.amount_out,
            selectedToken.token.decimals
          ),
        }
    : {
        loading: false,
        errored: false,
        updating: false,
        data: undefined,
      }

  // Compute chain fees.
  const nobleTariff = useCachedLoadingWithError(
    ibcPath.loading || ibcPath.errored
      ? undefined
      : MAINNET &&
        // If selected token is from Noble.
        selectedToken &&
        selectedToken.token.source.chainId === ChainId.NobleMainnet &&
        // If Noble is one of the non-destination chains, meaning it will be
        // transferred out of Noble at some point.
        ibcPath.data.slice(0, -1).includes(ChainId.NobleMainnet)
      ? nobleTariffTransferFeeSelector
      : constSelector(undefined)
  )
  const neutronTransferFee = useCachedLoadingWithError(
    ibcPath.loading || ibcPath.errored
      ? undefined
      : MAINNET &&
        // If Neutron is one of the non-destination chains, meaning it will be
        // transferred out of Neutron at some point.
        ibcPath.data.slice(0, -1).includes(ChainId.NeutronMainnet)
      ? neutronIbcTransferFeeSelector
      : constSelector(undefined)
  )

  // Store skip route message once loaded successfully during creation.
  useEffect(() => {
    if (!props.isCreating) {
      return
    }

    if (!isIbc) {
      setValue(
        (props.fieldNamePrefix +
          '_skipIbcTransferMsg') as '_skipIbcTransferMsg',
        undefined
      )
    } else {
      setValue(
        (props.fieldNamePrefix +
          '_skipIbcTransferMsg') as '_skipIbcTransferMsg',
        skipRouteMessageLoading
      )
    }
  }, [
    skipRouteMessageLoading,
    props.fieldNamePrefix,
    setValue,
    isIbc,
    props.isCreating,
  ])

  const [currentEntity, setCurrentEntity] = useState<Entity | undefined>()
  const queryClient = useQueryClient()
  const loadingEntity = useQueryLoadingDataWithError(
    entityQueries.info(
      queryClient,
      validRecipient
        ? {
            address: recipient,
            chainId: toChainId,
          }
        : undefined
    )
  )
  // Cache last successfully loaded entity.
  useEffect(() => {
    if (loadingEntity.loading || loadingEntity.errored) {
      return
    }

    setCurrentEntity(loadingEntity.data)
  }, [loadingEntity])

  return (
    <StatelessSpendComponent
      {...props}
      options={{
        tokens: loadingTokens,
        currentEntity,
        ibcPath,
        ibcAmountOut,
        betterNonPfmIbcPath:
          skipRoute.loading || skipRoute.errored
            ? { loading: true }
            : {
                loading: false,
                data:
                  skipRoute.data.txs_required === 1
                    ? undefined
                    : skipRoute.data.chain_ids,
              },
        missingAccountChainIds,
        nobleTariff,
        neutronTransferFee:
          neutronTransferFee.loading || neutronTransferFee.errored
            ? neutronTransferFee
            : {
                loading: false,
                errored: false,
                updating: neutronTransferFee.updating,
                data: neutronTransferFee.data?.sum,
              },
        proposalModuleMaxVotingPeriodInBlocks:
          !!proposalModuleMaxVotingPeriod &&
          'blocks' in proposalModuleMaxVotingPeriod,
        AddressInput,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
  const options = useActionOptions()

  const loadingTokenBalances = useTokenBalances()

  const neutronTransferFee = useCachedLoading(
    neutronIbcTransferFeeSelector,
    undefined
  )

  // Should always be defined if in a DAO proposal. Even for a DAO, it may not
  // be defined if being authz executed or something similar.
  const maxVotingPeriodSelector =
    useProposalModuleAdapterCommonContextIfAvailable()?.common?.selectors
      ?.maxVotingPeriod ||
    // If no selector, default to 0 time (likely in authz context).
    constSelector({ time: 0 })
  const proposalModuleMaxVotingPeriod = useCachedLoadingWithError(
    options.context.type === ActionContextType.Dao
      ? maxVotingPeriodSelector
      : options.context.type === ActionContextType.Wallet
      ? // Wallets execute transactions right away, so there's no voting delay.
        constSelector({
          time: 0,
        })
      : options.context.type === ActionContextType.Gov
      ? constSelector({
          // Seconds
          time: options.context.params.votingPeriod
            ? Number(options.context.params.votingPeriod.seconds) +
              options.context.params.votingPeriod.nanos / 1e9
            : // If no voting period loaded, default to 30 days.
              30 * 24 * 60 * 60,
        })
      : undefined
  )

  return useCallback(
    ({
      fromChainId,
      toChainId,
      from,
      to,
      amount: _amount,
      denom,
      ibcTimeout,
      useDirectIbcPath,
      _skipIbcTransferMsg,
    }: SpendData) => {
      if (loadingTokenBalances.loading) {
        return
      }

      const { token, owner } =
        loadingTokenBalances.data.find(
          ({ owner, token }) =>
            owner.address === from &&
            token.chainId === fromChainId &&
            token.denomOrAddress === denom
        ) || {}
      if (!token || !owner) {
        throw new Error(`Unknown token: ${denom}`)
      }

      const amount = convertDenomToMicroDenomStringWithDecimals(
        _amount,
        token.decimals
      )

      // Gov module community pool spend.
      if (options.context.type === ActionContextType.Gov) {
        return makeStargateMessage({
          stargate: {
            typeUrl: MsgCommunityPoolSpend.typeUrl,
            value: {
              authority: options.address,
              recipient: to,
              amount: coins(amount, denom),
            } as MsgCommunityPoolSpend,
          },
        })
      }

      let msg: UnifiedCosmosMsg | undefined
      // IBC transfer.
      if (token.type === TokenType.Native && toChainId !== fromChainId) {
        // Require that this loads before using IBC.
        if (
          proposalModuleMaxVotingPeriod.loading ||
          proposalModuleMaxVotingPeriod.errored
        ) {
          throw new Error('Failed to load proposal module max voting period')
        }

        // Default to conservative 30 days if no IBC timeout is set for some
        // reason. This should never happen.
        const timeoutSeconds = ibcTimeout
          ? convertDurationWithUnitsToSeconds(ibcTimeout)
          : 30 * 24 * 60 * 60
        // Convert seconds to nanoseconds.
        const timeoutTimestamp = BigInt(
          Date.now() * 1e6 +
            // Add timeout to voting period if it's a time duration.
            ((!('time' in proposalModuleMaxVotingPeriod.data)
              ? 0
              : proposalModuleMaxVotingPeriod.data.time) +
              timeoutSeconds) *
              1e9
        )

        // If no Skip IBC msg or it errored or disabled, use single-hop IBC
        // transfer.
        if (
          useDirectIbcPath ||
          !_skipIbcTransferMsg ||
          _skipIbcTransferMsg.loading ||
          _skipIbcTransferMsg.errored
        ) {
          const { sourceChannel } = getIbcTransferInfoBetweenChains(
            fromChainId,
            toChainId
          )
          msg = makeStargateMessage({
            stargate: {
              typeUrl:
                fromChainId === ChainId.NeutronMainnet ||
                fromChainId === ChainId.NeutronTestnet
                  ? NeutronMsgTransfer.typeUrl
                  : MsgTransfer.typeUrl,
              value: {
                sourcePort: 'transfer',
                sourceChannel,
                token: coin(amount, denom),
                sender: from,
                receiver: to,
                timeoutTimestamp,
                memo: '',
                // Add Neutron IBC transfer fee if sending from Neutron.
                ...((fromChainId === ChainId.NeutronMainnet ||
                  fromChainId === ChainId.NeutronTestnet) && {
                  fee: neutronTransferFee.loading
                    ? undefined
                    : neutronTransferFee.data?.fee,
                }),
              } as NeutronMsgTransfer,
            },
          })
        } else {
          if (
            _skipIbcTransferMsg.data.msg_type_url !== MsgTransfer.typeUrl &&
            _skipIbcTransferMsg.data.msg_type_url !== NeutronMsgTransfer.typeUrl
          ) {
            throw new Error(
              `Unexpected Skip transfer message type: ${_skipIbcTransferMsg.data.msg_type_url}`
            )
          }

          const skipTransferMsgValue = JSON.parse(_skipIbcTransferMsg.data.msg)
          msg = makeStargateMessage({
            stargate: {
              typeUrl:
                fromChainId === ChainId.NeutronMainnet ||
                fromChainId === ChainId.NeutronTestnet
                  ? NeutronMsgTransfer.typeUrl
                  : MsgTransfer.typeUrl,
              value: {
                ...(fromChainId === ChainId.NeutronMainnet ||
                fromChainId === ChainId.NeutronTestnet
                  ? NeutronMsgTransfer
                  : MsgTransfer
                ).fromAmino({
                  ...skipTransferMsgValue,
                  // Replace all forwarding timeouts with our own. If no memo,
                  // use empty string. This will be undefined if PFM is not used
                  // and it's only a single hop.
                  memo:
                    (typeof skipTransferMsgValue.memo === 'string' &&
                      skipTransferMsgValue.memo.replace(
                        /"timeout":\d+/g,
                        `"timeout":${timeoutTimestamp.toString()}`
                      )) ||
                    '',
                  timeout_timestamp: timeoutTimestamp,
                  timeout_height: undefined,
                }),
                // Add Neutron IBC transfer fee if sending from Neutron.
                ...((fromChainId === ChainId.NeutronMainnet ||
                  fromChainId === ChainId.NeutronTestnet) && {
                  fee: neutronTransferFee.loading
                    ? undefined
                    : neutronTransferFee.data?.fee,
                }),
              },
            },
          })
        }
      } else if (token.type === TokenType.Native) {
        msg = {
          bank: makeBankMessage(amount, to, denom),
        }
      } else if (token.type === TokenType.Cw20) {
        msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: denom,
              funds: [],
              msg: {
                transfer: {
                  recipient: to,
                  amount,
                },
              },
            },
          },
        })
      }

      if (!msg) {
        throw new Error(`Unknown token type: ${token.type}`)
      }

      return owner.type === AccountType.Ica
        ? maybeMakeIcaExecuteMessage(
            options.chain.chain_id,
            fromChainId,
            options.address,
            owner.address,
            msg
          )
        : maybeMakePolytoneExecuteMessage(
            options.chain.chain_id,
            fromChainId,
            msg
          )
    },
    [
      loadingTokenBalances,
      options,
      neutronTransferFee,
      proposalModuleMaxVotingPeriod,
    ]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
  const options = useActionOptions()
  const defaults = useDefaults()

  let chainId = options.chain.chain_id
  let from = options.address

  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    msg = decodedPolytone.msg
    chainId = decodedPolytone.chainId
    from = getChainAddressForActionOptions(options, chainId) || ''
  } else {
    const decodedIca = decodeIcaExecuteMsg(chainId, msg)
    if (decodedIca.match) {
      chainId = decodedIca.chainId
      msg = decodedIca.msgWithSender?.msg || {}
      from = decodedIca.msgWithSender?.sender || ''
    }
  }

  const isNative =
    objectMatchesStructure(msg, {
      bank: {
        send: {
          amount: {},
          to_address: {},
        },
      },
    }) &&
    msg.bank.send.amount.length === 1 &&
    objectMatchesStructure(msg.bank.send.amount[0], {
      amount: {},
      denom: {},
    })

  const isCw20 = objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        msg: {
          transfer: {
            recipient: {},
            amount: {},
          },
        },
      },
    },
  })

  const isIbcTransfer =
    isDecodedStargateMsg(msg) &&
    (msg.stargate.typeUrl === MsgTransfer.typeUrl ||
      msg.stargate.typeUrl === NeutronMsgTransfer.typeUrl) &&
    objectMatchesStructure(msg.stargate.value, {
      sourcePort: {},
      sourceChannel: {},
      token: {},
      sender: {},
      receiver: {},
    }) &&
    msg.stargate.value.sourcePort === 'transfer'

  const token = useCachedLoadingWithError(
    isNative || isCw20 || isIbcTransfer
      ? genericTokenSelector({
          chainId,
          type: isNative || isIbcTransfer ? TokenType.Native : TokenType.Cw20,
          denomOrAddress: isIbcTransfer
            ? msg.stargate.value.token.denom
            : isNative
            ? msg.bank.send.amount[0].denom
            : msg.wasm.execute.contract_addr,
        })
      : undefined
  )

  // Try to parse packet-forward-middleware memo.
  const pfmMemo =
    isIbcTransfer && msg.stargate.value.memo
      ? parseValidPfmMemo(msg.stargate.value.memo)
      : undefined

  // If valid PFM memo, validate that all chains (except the receiver) have
  // enabled PFM.
  const pfmChainPath =
    pfmMemo &&
    getPfmChainPathFromMemo(chainId, msg.stargate.value.sourceChannel, pfmMemo)
  const allChainsExceptReceiverPfmEnabled = useCachedLoadingWithError(
    pfmChainPath?.length
      ? skipAllChainsPfmEnabledSelector(pfmChainPath.slice(0, -1))
      : undefined
  )

  if (
    // If somehow failed to load from address, don't match.
    !from ||
    token.loading ||
    token.errored ||
    // If this is a valid PFM message, ensure all chains have PFM enabled or
    // else this is invalid and may be unsafe to display. If we can't properly
    // determine where it ended up, we shouldn't show the action to avoid
    // misleading information.
    (!!pfmChainPath?.length &&
      (allChainsExceptReceiverPfmEnabled.loading ||
        allChainsExceptReceiverPfmEnabled.errored ||
        !allChainsExceptReceiverPfmEnabled.data))
  ) {
    return { match: false }
  }

  if (isIbcTransfer) {
    // Get destination chain of first hop. If no PFM, this is the only hop.
    const { destinationChain } = getIbcTransferInfoFromChannel(
      chainId,
      msg.stargate.value.sourceChannel
    )

    const toChainId =
      pfmMemo && pfmChainPath?.length
        ? pfmChainPath[pfmChainPath.length - 1]
        : getChainForChainName(destinationChain.chain_name).chain_id
    const to =
      pfmMemo && pfmChainPath?.length
        ? getPfmFinalReceiverFromMemo(pfmMemo)
        : msg.stargate.value.receiver

    return {
      match: true,
      data: {
        ...(defaults instanceof Error ? {} : defaults),

        fromChainId: chainId,
        toChainId,
        from,
        to,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.stargate.value.token.amount,
          token.data.decimals
        ),
        denom: token.data.denomOrAddress,

        // Nanoseconds to milliseconds.
        _absoluteIbcTimeout: Number(
          msg.stargate.value.timeoutTimestamp / BigInt(1e6)
        ),

        _ibcData: {
          sourceChannel: msg.stargate.value.sourceChannel,
          pfmMemo: pfmMemo && JSON.stringify(pfmMemo),
        },
      },
    }
  } else if (token.data.type === TokenType.Native) {
    return {
      match: true,
      data: {
        ...(defaults instanceof Error ? {} : defaults),

        fromChainId: chainId,
        toChainId: chainId,
        from,
        to: msg.bank.send.to_address,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.bank.send.amount[0].amount,
          token.data.decimals
        ),
        denom: token.data.denomOrAddress,
      },
    }
  } else if (token.data.type === TokenType.Cw20) {
    return {
      match: true,
      data: {
        ...(defaults instanceof Error ? {} : defaults),

        fromChainId: chainId,
        toChainId: chainId,
        from,
        to: msg.wasm.execute.msg.transfer.recipient,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.wasm.execute.msg.transfer.amount,
          token.data.decimals
        ),
        denom: msg.wasm.execute.contract_addr,
      },
    }
  }

  return { match: false }
}

export const makeSpendAction: ActionMaker<SpendData> = ({ t, context }) => ({
  key: ActionKey.Spend,
  Icon: MoneyEmoji,
  label: t('title.spend'),
  description: t('info.spendActionDescription', {
    context: context.type,
  }),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
