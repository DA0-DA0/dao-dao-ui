import { coins } from '@cosmjs/amino'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import {
  WyndexMultiHopSelectors,
  genericTokenSelector,
  wyndPoolsSelector,
  wyndSwapOperationsSelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state/recoil'
import {
  CycleEmoji,
  useCachedLoadable,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  AmountWithTimestamp,
  GenericToken,
  LoadingData,
  TokenType,
  UseDecodedCosmosMsg,
  WyndPoolToken,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ExecuteSwapOperationsMsg } from '@dao-dao/types/contracts/WyndexMultiHop'
import {
  DAO_DAO_DAO_ADDRESS,
  NATIVE_TOKEN,
  WYND_MULTI_HOP_CONTRACT,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  encodeMessageAsBase64,
  genericTokenToAssetInfo,
  getJunoIbcUsdc,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
  tokenDenomOrAddressFromAssetInfo,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import {
  useExecutedProposalTxLoadable,
  useLoadingWyndReferralCommission,
} from '../../../../hooks'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  WyndSwapComponent as StatelessWyndSwapComponent,
  WyndSwapData,
} from './Component'

const useDefaults: UseDefaults<WyndSwapData> = () => {
  const usdc = getJunoIbcUsdc()
  const { address } = useActionOptions()

  return {
    tokenIn: {
      ...usdc,
    },
    tokenInAmount: 0,
    tokenOut: {
      ...NATIVE_TOKEN,
    },
    tokenOutAmount: 0,
    minOutAmount: 0,
    maxSlippage: 0.01,
    swapOperations: undefined,
    receiver: address,
  }
}

const Component: ActionComponent<undefined, WyndSwapData> = (props) => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  const { watch, setValue, clearErrors, setError } = useFormContext()
  const tokenIn = watch(props.fieldNamePrefix + 'tokenIn') as GenericToken
  const tokenInAmount = watch(props.fieldNamePrefix + 'tokenInAmount') as number
  const tokenOut = watch(props.fieldNamePrefix + 'tokenOut') as GenericToken
  const tokenOutAmount = watch(
    props.fieldNamePrefix + 'tokenOutAmount'
  ) as number

  const loadingBalances = useTokenBalances({
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating ? undefined : [tokenIn, tokenOut],
  })

  const wyndPoolsLoadable = useCachedLoadable(wyndPoolsSelector)
  if (wyndPoolsLoadable.state === 'hasError') {
    throw wyndPoolsLoadable.contents
  }
  const wyndPools =
    wyndPoolsLoadable.state !== 'hasValue'
      ? undefined
      : wyndPoolsLoadable.contents
  const uniqueWyndPoolTokens = Object.values(
    Object.values(wyndPools ?? {})
      .flat()
      .reduce(
        (acc, token) => ({
          ...acc,
          // Ignore amount when comparing tokens.
          [JSON.stringify({ ...token, amount: '0' })]: token,
        }),
        {} as Record<string, WyndPoolToken>
      )
  )
  const loadingWyndTokens = useCachedLoading(
    uniqueWyndPoolTokens.length > 0
      ? waitForAll(
          uniqueWyndPoolTokens.map((token) =>
            genericTokenSelector({
              chainId,
              type: 'native' in token ? TokenType.Native : TokenType.Cw20,
              denomOrAddress: 'native' in token ? token.native : token.token,
            })
          )
        )
      : undefined,
    []
  )

  // If proposal executed, get token output amount from tx.
  const executedTxLoadable = useExecutedProposalTxLoadable()
  const loadingExecutionOrExecuted =
    executedTxLoadable.state === 'loading' ||
    (executedTxLoadable.state === 'hasValue' && !!executedTxLoadable.contents)
  useEffect(() => {
    if (
      props.isCreating ||
      executedTxLoadable.state !== 'hasValue' ||
      !executedTxLoadable.contents
    ) {
      return
    }

    try {
      // This gets all `return_amount` attributes from all swap actions. If this
      // is not the same length as the number of swap actions, then another swap
      // occurred in this transaction (likely via a custom message or a contract
      // execution), and we cannot detect the correct amount. If the lists are
      // the same length, there is a 1:1 mapping of swap actions to amounts, so
      // we can use the index of this action in all swap actions to select the
      // correct amount.

      // All swap actions' data.
      const swapActionsData = props.allActionsWithData
        .filter(({ actionKey }) => actionKey === ActionKey.WyndSwap)
        .map(({ data }) => data) as WyndSwapData[]
      // Index of this action in the list of all swap actions.
      const innerIndex = swapActionsData.indexOf(
        props.allActionsWithData[props.index].data
      )
      // Should never happen since this action is part of all actions.
      if (innerIndex === -1) {
        throw new Error(
          'internal error: could not find inner swap action index'
        )
      }

      // Return amounts stored in wasm events from the transaction data.
      const returnedAmounts = executedTxLoadable.contents.events.flatMap(
        ({ type, attributes }) =>
          type === 'wasm' &&
          attributes.some(({ key }) => key === 'return_amount')
            ? attributes
                .filter(({ key }) => key === 'return_amount')
                .map(({ value }) => Number(value))
            : []
      )

      // If the swap action length does not match the detected return_amount
      // attributes from the chain, we cannot definitively locate the amount.
      if (swapActionsData.length !== returnedAmounts.length) {
        return
      }

      setValue(
        props.fieldNamePrefix + 'tokenOutAmount',
        convertMicroDenomToDenomWithDecimals(
          returnedAmounts[innerIndex],
          tokenOut.decimals
        )
      )
    } catch (err) {
      console.error(err)
    }
  }, [
    executedTxLoadable,
    props.allActionsWithData,
    props.fieldNamePrefix,
    props.index,
    props.isCreating,
    setValue,
    tokenOut.decimals,
  ])

  // On token selection/amount changes, set last touched to the other one to
  // update its simulated price. When not creating, don't simulate token out,
  // since we'll load the actual returned amount from the TX.
  const [simulatingValue, setSimulatingValue] = useState<
    'tokenIn' | 'tokenOut' | undefined
  >('tokenOut')
  // Both tokens are set once initially, so don't simulate anything until both
  // are set one time, so that once they're both set, the token out gets
  // simulated and the values are accurate. simulatingValue gets cleared at the
  // beginning if we do not perform this initial token set check on both.
  const tokenInSet = useRef(false)
  const tokenOutSet = useRef(false)
  useEffect(() => {
    // If executed, don't simulate.
    if (loadingExecutionOrExecuted) {
      return
    }

    if (!tokenInSet.current) {
      tokenInSet.current = true
    } else {
      // Set out to 0 if in is 0, and stop simulating.
      if (tokenInAmount === 0) {
        setValue(props.fieldNamePrefix + 'tokenOutAmount', 0)
        setSimulatingValue(undefined)
        return
      }

      // If just simulated token in and it changed, it's because of simulation,
      // so set simulating to undefined to not simulate in a loop. Only simulate
      // when previously undefined.
      setSimulatingValue((prev) =>
        prev === 'tokenIn' ? undefined : 'tokenOut'
      )
    }
  }, [
    props.fieldNamePrefix,
    setValue,
    tokenInAmount,
    tokenIn,
    loadingExecutionOrExecuted,
  ])
  useEffect(() => {
    // If executed, don't simulate.
    if (loadingExecutionOrExecuted) {
      return
    }

    if (!tokenOutSet.current) {
      tokenOutSet.current = true
    } else {
      // Set out to 0 if in is 0, and stop simulating.
      if (tokenOutAmount === 0) {
        setValue(props.fieldNamePrefix + 'tokenInAmount', 0)
        setSimulatingValue(undefined)
        return
      }

      // If just simulated token out and it changed, it's because of simulation,
      // so set simulating to undefined to not simulate in a loop. Only simulate
      // when previously undefined.
      setSimulatingValue((prev) =>
        prev === 'tokenOut' ? undefined : 'tokenIn'
      )
    }
  }, [
    props.fieldNamePrefix,
    setValue,
    tokenOutAmount,
    tokenOut,
    loadingExecutionOrExecuted,
  ])

  // When token out amount changes, set the minimum out amount to be 99% of it.
  useEffect(() => {
    if (props.isCreating) {
      setValue(
        props.fieldNamePrefix + 'minOutAmount',
        Number((tokenOutAmount * 0.99).toFixed(tokenOut.decimals))
      )
    }
  }, [
    props.fieldNamePrefix,
    props.isCreating,
    setValue,
    tokenOut.decimals,
    tokenOutAmount,
  ])

  const loadingMaxReferralCommission = useLoadingWyndReferralCommission()

  // Get swap operations for these tokens.
  const swapOperationsLoadable = useRecoilValueLoadable(
    wyndSwapOperationsSelector({
      offerAsset: genericTokenToAssetInfo(tokenIn),
      askAsset: genericTokenToAssetInfo(tokenOut),
    })
  )
  // Store swap operations for message transformer in data, and validate that
  // swap operations are for the correct tokens.
  useEffect(() => {
    if (swapOperationsLoadable.state !== 'hasValue') {
      setError(props.fieldNamePrefix + 'swapOperations_loading', {
        type: 'manual',
      })
      return
    } else {
      clearErrors(props.fieldNamePrefix + 'swapOperations_loading')
    }

    const swapOperations = swapOperationsLoadable.contents
    // Update swap operations in form data.
    setValue(props.fieldNamePrefix + 'swapOperations', swapOperations)

    // Update errors if creating.
    if (props.isCreating) {
      if (
        !swapOperations?.length ||
        // Verify that the first and last operations are for the correct tokens.
        // This ensures that someone doesn't eagerly submit a transaction with the
        // wrong tokens before the swap operations have loaded.
        tokenDenomOrAddressFromAssetInfo(
          swapOperations[0].wyndex_swap.offer_asset_info
        ) !== tokenIn.denomOrAddress ||
        tokenDenomOrAddressFromAssetInfo(
          swapOperations[swapOperations.length - 1].wyndex_swap.ask_asset_info
        ) !== tokenOut.denomOrAddress
      ) {
        setError(props.fieldNamePrefix + 'swapOperations', {
          type: 'manual',
          message: 'Invalid swap operations',
        })
      } else {
        clearErrors(props.fieldNamePrefix + 'swapOperations')
      }
    }
  }, [
    clearErrors,
    props.fieldNamePrefix,
    props.isCreating,
    setError,
    setValue,
    swapOperationsLoadable,
    tokenIn.denomOrAddress,
    tokenOut.denomOrAddress,
  ])

  // Simulate offering input and getting output amount. Don't simulate if
  // executed.
  const tokenOutSimulation = useCachedLoadable(
    loadingExecutionOrExecuted ||
      loadingMaxReferralCommission.loading ||
      simulatingValue !== 'tokenOut' ||
      swapOperationsLoadable.state !== 'hasValue' ||
      !swapOperationsLoadable.contents
      ? constSelector(undefined)
      : WyndexMultiHopSelectors.simulateSwapOperationsSelector({
          chainId,
          contractAddress: WYND_MULTI_HOP_CONTRACT,
          params: [
            {
              offerAmount: convertDenomToMicroDenomWithDecimals(
                tokenInAmount,
                tokenIn.decimals
              ).toString(),
              operations: swapOperationsLoadable.contents,
              referral: true,
              referralCommission: loadingMaxReferralCommission.data,
            },
          ],
        })
  )
  // Simulate asking for output and getting input amount. Don't simulate if
  // executed.
  const tokenInSimulation = useCachedLoadable(
    loadingExecutionOrExecuted ||
      loadingMaxReferralCommission.loading ||
      simulatingValue !== 'tokenIn' ||
      swapOperationsLoadable.state !== 'hasValue' ||
      !swapOperationsLoadable.contents
      ? constSelector(undefined)
      : WyndexMultiHopSelectors.simulateReverseSwapOperationsSelector({
          chainId,
          contractAddress: WYND_MULTI_HOP_CONTRACT,
          params: [
            {
              askAmount: convertDenomToMicroDenomWithDecimals(
                tokenOutAmount,
                tokenOut.decimals
              ).toString(),
              operations: swapOperationsLoadable.contents,
              referral: true,
              referralCommission: loadingMaxReferralCommission.data,
            },
          ],
        })
  )

  const simulation =
    simulatingValue === 'tokenIn'
      ? tokenInSimulation
      : simulatingValue === 'tokenOut'
      ? tokenOutSimulation
      : undefined

  useEffect(() => {
    // If executed, don't simulate.
    if (loadingExecutionOrExecuted) {
      setSimulatingValue(undefined)
      return
    }

    if (
      simulation &&
      simulation.state !== 'loading' &&
      (simulation.state !== 'hasValue' || !simulation.updating)
    ) {
      // If errored, clear simulating value since we have nothing to set.
      if (simulation.state === 'hasError') {
        setSimulatingValue(undefined)
      } else if (simulation.contents) {
        setValue(
          props.fieldNamePrefix + simulatingValue + 'Amount',
          convertMicroDenomToDenomWithDecimals(
            simulation.contents.amount,
            simulatingValue === 'tokenIn' ? tokenIn.decimals : tokenOut.decimals
          ),
          {
            shouldValidate: true,
          }
        )
      }
    }
  }, [
    loadingExecutionOrExecuted,
    props.fieldNamePrefix,
    setValue,
    simulatingValue,
    simulation,
    tokenIn.decimals,
    tokenOut.decimals,
  ])

  // Get estimated USD price of output token.
  const tokenOutPrice = useCachedLoadingWithError(
    wyndUsdPriceSelector(tokenOut.denomOrAddress)
  )
  // Use either price depending on which is available.
  const estUsdPrice: LoadingData<AmountWithTimestamp | undefined> =
    tokenOutPrice.loading
      ? { loading: true }
      : tokenOutPrice.errored || !tokenOutPrice.data
      ? { loading: false, data: undefined }
      : {
          loading: false,
          updating: tokenOutPrice.updating,
          data: {
            ...tokenOutPrice.data,
            amount: Number(
              (tokenOutPrice.data.amount * tokenOutAmount).toFixed(2)
            ),
          },
        }

  return (
    <StatelessWyndSwapComponent
      {...props}
      options={{
        loadingBalances,
        loadingWyndTokens,
        simulatingValue:
          simulation &&
          (simulation.state === 'loading' ||
            (simulation.state === 'hasValue' && simulation.updating))
            ? simulatingValue
            : undefined,
        estUsdPrice,
        AddressInput,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<WyndSwapData> = () => {
  const loadingMaxReferralCommission = useLoadingWyndReferralCommission()

  return useCallback(
    ({
      tokenIn,
      tokenInAmount,
      tokenOut,
      minOutAmount: _minOutAmount,
      maxSlippage,
      swapOperations,
      receiver,
    }: WyndSwapData) => {
      if (
        loadingMaxReferralCommission.loading ||
        !swapOperations?.length ||
        // Verify that the first and last operations are for the correct tokens.
        // This ensures that someone doesn't eagerly submit a transaction with
        // the wrong tokens before the swap operations have loaded.
        tokenDenomOrAddressFromAssetInfo(
          swapOperations[0].wyndex_swap.offer_asset_info
        ) !== tokenIn.denomOrAddress ||
        tokenDenomOrAddressFromAssetInfo(
          swapOperations[swapOperations.length - 1].wyndex_swap.ask_asset_info
        ) !== tokenOut.denomOrAddress
      ) {
        return
      }

      const inAmount = convertDenomToMicroDenomWithDecimals(
        tokenInAmount,
        tokenIn.decimals
      ).toString()
      const minOutAmount =
        _minOutAmount !== undefined
          ? convertDenomToMicroDenomWithDecimals(
              _minOutAmount,
              tokenOut.decimals
            ).toString()
          : undefined

      const msg: ExecuteSwapOperationsMsg = {
        execute_swap_operations: {
          operations: swapOperations,
          minimum_receive: minOutAmount,
          max_spread: maxSlippage?.toString(),
          referral_address: DAO_DAO_DAO_ADDRESS,
          referral_commission: loadingMaxReferralCommission.data,
          receiver,
        },
      }

      if (tokenIn.type === TokenType.Native) {
        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: WYND_MULTI_HOP_CONTRACT,
              funds: coins(inAmount, tokenIn.denomOrAddress),
              msg,
            },
          },
        })
      } else if (tokenIn.type === TokenType.Cw20) {
        // Execute CW20 send message.
        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: tokenIn.denomOrAddress,
              funds: [],
              msg: {
                send: {
                  amount: inAmount,
                  contract: WYND_MULTI_HOP_CONTRACT,
                  msg: encodeMessageAsBase64(msg),
                },
              },
            },
          },
        })
      }
    },
    [loadingMaxReferralCommission]
  )
}

const isValidSwapMsg = (msg: Record<string, any>): boolean =>
  objectMatchesStructure(msg, {
    execute_swap_operations: {
      operations: {},
    },
  }) &&
  msg.execute_swap_operations.operations.length === 1 &&
  objectMatchesStructure(msg.execute_swap_operations.operations[0], {
    wyndex_swap: {
      offer_asset_info: {},
      ask_asset_info: {},
    },
  })

const useDecodedCosmosMsg: UseDecodedCosmosMsg<WyndSwapData> = (
  msg: Record<string, any>
) => {
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

  let swapMsg: ExecuteSwapOperationsMsg | undefined

  const isNative =
    objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {},
        },
      },
    }) &&
    msg.wasm.execute.funds.length === 1 &&
    objectMatchesStructure(msg.wasm.execute.funds[0], {
      amount: {},
      denom: {},
    }) &&
    isValidSwapMsg(msg.wasm.execute.msg)

  let isCw20 = objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          send: {
            amount: {},
            contract: {},
            msg: {},
          },
        },
      },
    },
  })

  // If cw20, validated internal message.
  if (isCw20) {
    const parsed = parseEncodedMessage(msg.wasm.execute.msg.send.msg)
    isCw20 = isValidSwapMsg(parsed)
    if (isCw20) {
      swapMsg = parsed
    }
  }
  // Otherwise swap msg is from native.
  else if (isNative) {
    swapMsg = msg.wasm.execute.msg
  }

  const tokenIn = useRecoilValue(
    swapMsg
      ? genericTokenSelector({
          chainId,
          type: isNative ? TokenType.Native : TokenType.Cw20,
          denomOrAddress:
            'native' in
            swapMsg.execute_swap_operations.operations[0].wyndex_swap
              .offer_asset_info
              ? swapMsg.execute_swap_operations.operations[0].wyndex_swap
                  .offer_asset_info.native
              : swapMsg.execute_swap_operations.operations[0].wyndex_swap
                  .offer_asset_info.token,
        })
      : constSelector(undefined)
  )
  const tokenOut = useRecoilValue(
    swapMsg
      ? genericTokenSelector({
          chainId,
          type:
            'native' in
            swapMsg.execute_swap_operations.operations[0].wyndex_swap
              .ask_asset_info
              ? TokenType.Native
              : TokenType.Cw20,
          denomOrAddress:
            'native' in
            swapMsg.execute_swap_operations.operations[0].wyndex_swap
              .ask_asset_info
              ? swapMsg.execute_swap_operations.operations[0].wyndex_swap
                  .ask_asset_info.native
              : swapMsg.execute_swap_operations.operations[0].wyndex_swap
                  .ask_asset_info.token,
        })
      : constSelector(undefined)
  )

  const tokenInAmount = isNative
    ? msg.wasm.execute.funds[0].amount
    : isCw20
    ? msg.wasm.execute.msg.send.amount
    : undefined

  if (!swapMsg || !tokenIn || tokenInAmount === undefined || !tokenOut) {
    return { match: false }
  }

  return {
    match: true,
    data: {
      tokenIn,
      tokenInAmount: convertMicroDenomToDenomWithDecimals(
        tokenInAmount,
        tokenIn.decimals
      ),
      tokenOut,
      // Will be loaded in the component.
      tokenOutAmount: -1,
      minOutAmount: swapMsg.execute_swap_operations.minimum_receive
        ? convertMicroDenomToDenomWithDecimals(
            swapMsg.execute_swap_operations.minimum_receive,
            tokenOut.decimals
          )
        : undefined,
      maxSlippage: swapMsg.execute_swap_operations.max_spread
        ? Number(swapMsg.execute_swap_operations.max_spread)
        : undefined,
      swapOperations: swapMsg.execute_swap_operations.operations,
      receiver: swapMsg.execute_swap_operations.receiver || address,
    },
  }
}

export const makeWyndSwapAction: ActionMaker<WyndSwapData> = ({ t, chain }) =>
  // WYND only exists on Juno mainnet.
  chain.chain_id === ChainInfoID.Juno1
    ? {
        key: ActionKey.WyndSwap,
        Icon: CycleEmoji,
        label: t('title.swapTokensOnWynd'),
        description: t('info.swapTokensOnWyndDescription'),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
