import { coin } from '@cosmjs/amino'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  accountsSelector,
  genericTokenSelector,
  skipAllChainsPfmEnabledSelector,
  skipRouteMessageSelector,
  skipRouteSelector,
} from '@dao-dao/state/recoil'
import { MoneyEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  AccountType,
  CosmosMsgForEmpty,
  Entity,
  LoadingDataWithError,
  TokenType,
  UseDecodedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
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
  isValidContractAddress,
  makeBankMessage,
  makeStargateMessage,
  makeWasmMessage,
  maybeGetNativeTokenForChainId,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
  parseValidPfmMemo,
  transformBech32Address,
} from '@dao-dao/utils'
import { MsgTransfer } from '@dao-dao/utils/protobuf/codegen/ibc/applications/transfer/v1/tx'

import { AddressInput } from '../../../../components'
import { useWallet } from '../../../../hooks/useWallet'
import { entitySelector } from '../../../../recoil'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  SpendData,
  SpendComponent as StatelessSpendComponent,
} from './Component'

const useDefaults: UseDefaults<SpendData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { address: walletAddress = '' } = useWallet()

  return {
    fromChainId: chainId,
    toChainId: chainId,
    to: walletAddress,
    amount: 1,
    denom: maybeGetNativeTokenForChainId(chainId)?.denomOrAddress || '',
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
  const recipient = watch((props.fieldNamePrefix + 'to') as 'to')
  const toChainId = watch((props.fieldNamePrefix + 'toChainId') as 'toChainId')
  const amount = watch((props.fieldNamePrefix + 'amount') as 'amount')
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

  const loadingTokens = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO/wallet.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId: fromChainId,
            // Cw20 denoms are contract addresses, native denoms are not.
            type: isValidContractAddress(
              denom,
              getChainForChainId(fromChainId).bech32_prefix
            )
              ? TokenType.Cw20
              : TokenType.Native,
            denomOrAddress: denom,
          },
        ],
    allChains: true,
  })

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
    skipRoute.loading || skipRoute.errored || skipRoute.updating
      ? undefined
      : accountsSelector({
          chainId: currentChainId,
          address,
          // Only need ICA for intermediate accounts.
          includeIcaChains: skipRoute.data.chainIDs.slice(1, -1),
        })
  )
  // Get account for each skip route chain.
  const routeAddresses =
    skipRoute.loading ||
    skipRoute.errored ||
    accounts.loading ||
    accounts.errored
      ? undefined
      : skipRoute.data.chainIDs.slice(0, -1).map((chainId) =>
          // Transform bech32 wallet address to chain.
          context.type === ActionContextType.Wallet
            ? transformBech32Address(address, chainId)
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
          address ? [] : [skipRoute.data.chainIDs[index]]
        )

  // Get the IBC path.
  const ibcPath: LoadingDataWithError<string[]> = isIbc
    ? props.isCreating && (skipRoute.loading || skipRoute.updating)
      ? {
          loading: true,
          errored: false,
        }
      : props.isCreating &&
        !skipRoute.loading &&
        !skipRoute.updating &&
        !skipRoute.errored
      ? {
          loading: false,
          errored: false,
          updating: skipRoute.updating,
          data: skipRoute.data.chainIDs,
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

  // Load Skip route message if IBC transfer.
  const skipRouteMessageLoading = useCachedLoadingWithError(
    isIbc &&
      props.isCreating &&
      denom &&
      amountIn &&
      !skipRoute.loading &&
      !skipRoute.errored &&
      routeAddresses &&
      missingAccountChainIds &&
      missingAccountChainIds.length === 0 &&
      validRecipient
      ? skipRouteMessageSelector({
          chainAddresses: routeAddresses.reduce(
            (acc, address, index) => ({
              ...acc,
              [skipRoute.data.chainIDs[index]]: address,
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
  const loadingEntity = useCachedLoadingWithError(
    validRecipient
      ? entitySelector({
          address: recipient,
          chainId: toChainId,
        })
      : undefined
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
        missingAccountChainIds,
        AddressInput,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
  const options = useActionOptions()

  const loadingTokenBalances = useTokenBalances({
    allChains: true,
  })

  return useCallback(
    ({
      fromChainId,
      toChainId,
      to,
      amount: _amount,
      denom,
      _skipIbcTransferMsg,
    }: SpendData) => {
      if (loadingTokenBalances.loading) {
        return
      }

      const token = loadingTokenBalances.data.find(
        ({ token }) =>
          token.chainId === fromChainId && token.denomOrAddress === denom
      )?.token
      if (!token) {
        throw new Error(`Unknown token: ${denom}`)
      }

      const amount = convertDenomToMicroDenomStringWithDecimals(
        _amount,
        token.decimals
      )

      let msg: CosmosMsgForEmpty | undefined
      // IBC transfer.
      if (toChainId !== fromChainId) {
        // Timeout after 1 year. Needs to survive voting period and execution
        // delay.
        const timeoutTimestamp = BigInt(
          // Nanoseconds.
          (Date.now() + 1000 * 60 * 60 * 24 * 365) * 1e6
        )

        // If no Skip IBC msg or it errored, use single-hop IBC transfer.
        if (!_skipIbcTransferMsg || _skipIbcTransferMsg.errored) {
          const { sourceChannel } = getIbcTransferInfoBetweenChains(
            fromChainId,
            toChainId
          )
          const sender = getChainAddressForActionOptions(options, fromChainId)
          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgTransfer.typeUrl,
              value: {
                sourcePort: 'transfer',
                sourceChannel,
                token: coin(amount, denom),
                sender,
                receiver: to,
                timeoutTimestamp,
                memo: '',
              } as MsgTransfer,
            },
          })
        } else {
          if (_skipIbcTransferMsg.loading || _skipIbcTransferMsg.updating) {
            throw new Error('error.loadingData')
          }
          if (_skipIbcTransferMsg.data.msgTypeURL !== MsgTransfer.typeUrl) {
            throw new Error(
              `Unexpected Skip transfer message type: ${_skipIbcTransferMsg.data.msgTypeURL}`
            )
          }

          msg = makeStargateMessage({
            stargate: {
              typeUrl: MsgTransfer.typeUrl,
              value: MsgTransfer.fromAmino({
                ...JSON.parse(_skipIbcTransferMsg.data.msg),
                // Timeout after 1 year. Needs to survive voting period and
                // execution delay.
                timeout_timestamp: timeoutTimestamp,
                timeout_height: undefined,
              }),
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

      return maybeMakePolytoneExecuteMessage(
        options.chain.chain_id,
        fromChainId,
        msg
      )
    },
    [loadingTokenBalances, options]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
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
    msg.stargate.typeUrl === MsgTransfer.typeUrl &&
    objectMatchesStructure(msg.stargate.value, {
      sourcePort: {},
      sourceChannel: {},
      token: {},
      sender: {},
      receiver: {},
    }) &&
    msg.stargate.value.sourcePort === 'transfer'

  const token = useRecoilValue(
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
      : constSelector(undefined)
  )

  // Try to parse packet-forward-middleware memo.
  const pfmMemo =
    isIbcTransfer && msg.stargate.value.memo
      ? parseValidPfmMemo(msg.stargate.value.memo)
      : undefined

  // If valid PFM memo, validate that all chains have enabled PFM.
  const pfmChainPath =
    pfmMemo &&
    getPfmChainPathFromMemo(chainId, msg.stargate.value.sourceChannel, pfmMemo)
  const allChainsPfmEnabled = useCachedLoadingWithError(
    pfmChainPath?.length
      ? skipAllChainsPfmEnabledSelector(pfmChainPath)
      : undefined
  )

  if (
    !token ||
    // If this is a valid PFM message, ensure all chains have PFM enabled or
    // else this is invalid and may be unsafe to display. If we can't properly
    // determine where it ended up, we shouldn't show the action to avoid
    // misleading information.
    (!!pfmChainPath?.length &&
      (allChainsPfmEnabled.loading ||
        allChainsPfmEnabled.errored ||
        !allChainsPfmEnabled.data))
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
        fromChainId: chainId,
        toChainId,
        to,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.stargate.value.token.amount,
          token.decimals
        ),
        denom: token.denomOrAddress,

        _ibcData: {
          sourceChannel: msg.stargate.value.sourceChannel,
          pfmMemo: pfmMemo && JSON.stringify(pfmMemo),
        },
      },
    }
  } else if (token.type === TokenType.Native) {
    return {
      match: true,
      data: {
        fromChainId: chainId,
        toChainId: chainId,
        to: msg.bank.send.to_address,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.bank.send.amount[0].amount,
          token.decimals
        ),
        denom: token.denomOrAddress,
      },
    }
  } else if (token.type === TokenType.Cw20) {
    return {
      match: true,
      data: {
        fromChainId: chainId,
        toChainId: chainId,
        to: msg.wasm.execute.msg.transfer.recipient,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.wasm.execute.msg.transfer.amount,
          token.decimals
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
