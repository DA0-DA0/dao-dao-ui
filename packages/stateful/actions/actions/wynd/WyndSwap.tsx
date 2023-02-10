import { coins } from '@cosmjs/amino'
import { findAttribute, parseRawLog } from '@cosmjs/stargate/build/logs'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import {
  WyndexFactorySelectors,
  WyndexMultiHopSelectors,
  genericTokenSelector,
  wyndPoolsSelector,
  wyndSwapOperationsSelector,
  wyndUsdPriceSelector,
} from '@dao-dao/state/recoil'
import {
  ActionCardLoader,
  CycleEmoji,
  useCachedLoadable,
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
  ActionMaker,
  CoreActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  AssetInfo,
  ExecuteSwapOperationsMsg,
} from '@dao-dao/types/contracts/WyndexMultiHop'
import {
  DAO_DAO_DAO_ADDRESS,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  WYND_MULTI_HOP_CONTRACT,
  WYND_REFERRAL_COMMISSION,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  encodeMessageAsBase64,
  getJunoIbcUsdc,
  loadableToLoadingDataWithError,
  makeWasmMessage,
  nativeTokenLabel,
  nativeTokenLogoURI,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components/SuspenseLoader'
import { useExecutedProposalTxLoadable } from '../../../hooks'
import {
  WyndSwapComponent as StatelessWyndSwapComponent,
  WyndSwapData,
} from '../../components/wynd/WyndSwap'
import { useTokenBalances } from '../../hooks/useTokenBalances'

// Set max referral commission to the min of the max referral allowed and the
// DAO DAO referral set.
const useLoadingWyndReferralCommission = (): LoadingData<string> => {
  const { t } = useTranslation()

  // Get max referral commission from factory config.
  const wyndexMultiHopConfig = useCachedLoadable(
    WyndexMultiHopSelectors.configSelector({
      contractAddress: WYND_MULTI_HOP_CONTRACT,
      params: [],
    })
  )
  const wyndexFactoryConfig = useCachedLoadable(
    wyndexMultiHopConfig.state !== 'hasValue'
      ? undefined
      : WyndexFactorySelectors.configSelector({
          contractAddress: wyndexMultiHopConfig.contents.wyndex_factory,
          params: [],
        })
  )

  if (wyndexFactoryConfig.state === 'hasError') {
    throw new Error(t('error.loadingData'))
  }

  return wyndexFactoryConfig.state === 'loading'
    ? { loading: true }
    : {
        loading: false,
        data: Math.min(
          WYND_REFERRAL_COMMISSION,
          Number(wyndexFactoryConfig.contents.max_referral_commission)
        ).toString(),
      }
}

const useDefaults: UseDefaults<WyndSwapData> = () => {
  const usdc = getJunoIbcUsdc()

  return {
    tokenIn: {
      type: TokenType.Native,
      denomOrAddress: NATIVE_DENOM,
      symbol: nativeTokenLabel(NATIVE_DENOM),
      decimals: NATIVE_DECIMALS,
      imageUrl: nativeTokenLogoURI(NATIVE_DENOM),
    },
    tokenInAmount: 1,
    tokenOut: {
      type: TokenType.Native,
      denomOrAddress: usdc.juno_denom,
      symbol: usdc.symbol,
      decimals: usdc.decimals,
      imageUrl: usdc.logoURI,
    },
    tokenOutAmount: 0,
    minOutAmount: 0,
    swapOperations: undefined,
  }
}

const genericTokenToAssetInfo = (token: GenericToken): AssetInfo =>
  token.type === TokenType.Native
    ? {
        native: token.denomOrAddress,
      }
    : {
        token: token.denomOrAddress,
      }

const tokenDenomOrAddressFromAssetInfo = (assetInfo: AssetInfo): string =>
  'native' in assetInfo ? assetInfo.native : assetInfo.token

const Component: ActionComponent<undefined, WyndSwapData> = (props) => {
  const loadingBalances = useTokenBalances()

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
  const wyndTokensLoadable = useCachedLoadable(
    uniqueWyndPoolTokens.length > 0
      ? waitForAll(
          uniqueWyndPoolTokens.map((token) =>
            genericTokenSelector({
              type: 'native' in token ? TokenType.Native : TokenType.Cw20,
              denomOrAddress: 'native' in token ? token.native : token.token,
            })
          )
        )
      : undefined
  )
  if (wyndTokensLoadable.state === 'hasError') {
    throw wyndTokensLoadable.contents
  }

  const { watch, setValue, clearErrors, setError } = useFormContext()
  const tokenIn = watch(props.fieldNamePrefix + 'tokenIn') as GenericToken
  const tokenInAmount = watch(props.fieldNamePrefix + 'tokenInAmount') as number
  const tokenOut = watch(props.fieldNamePrefix + 'tokenOut') as GenericToken
  const tokenOutAmount = watch(
    props.fieldNamePrefix + 'tokenOutAmount'
  ) as number

  // On token selection/amount changes, set last touched to the other one to
  // update its simulated price.
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
  }, [props.fieldNamePrefix, setValue, tokenInAmount, tokenIn])
  useEffect(() => {
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
  }, [props.fieldNamePrefix, setValue, tokenOutAmount, tokenOut])

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

  // Simulate offering input and getting output amount.
  const tokenOutSimulation = useCachedLoadable(
    loadingMaxReferralCommission.loading ||
      simulatingValue !== 'tokenOut' ||
      swapOperationsLoadable.state !== 'hasValue' ||
      !swapOperationsLoadable.contents
      ? constSelector(undefined)
      : WyndexMultiHopSelectors.simulateSwapOperationsSelector({
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
  // Simulate asking for output and getting input amount.
  const tokenInSimulation = useCachedLoadable(
    loadingMaxReferralCommission.loading ||
      simulatingValue !== 'tokenIn' ||
      swapOperationsLoadable.state !== 'hasValue' ||
      !swapOperationsLoadable.contents
      ? constSelector(undefined)
      : WyndexMultiHopSelectors.simulateReverseSwapOperationsSelector({
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
          )
        )
      }
    }
  }, [
    props.fieldNamePrefix,
    setValue,
    simulatingValue,
    simulation,
    tokenIn.decimals,
    tokenOut.decimals,
  ])

  // Get estimated USD price of output token.
  const tokenOutPrice = loadableToLoadingDataWithError(
    useCachedLoadable(wyndUsdPriceSelector(tokenOut.denomOrAddress))
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

  // If proposal executed, get token output amount from tx.
  const executedTxLoadable = useExecutedProposalTxLoadable()
  useEffect(() => {
    if (
      props.isCreating ||
      executedTxLoadable.state !== 'hasValue' ||
      !executedTxLoadable.contents
    ) {
      return
    }

    try {
      const outputAmount = findAttribute(
        parseRawLog(executedTxLoadable.contents.rawLog),
        'wasm',
        'return_amount'
      )

      setValue(
        props.fieldNamePrefix + 'tokenOutAmount',
        Number(outputAmount.value)
      )
    } catch (err) {
      console.error(err)
    }
  }, [executedTxLoadable, props.fieldNamePrefix, props.isCreating, setValue])

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        loadingBalances.loading || wyndTokensLoadable.state !== 'hasValue'
      }
    >
      <StatelessWyndSwapComponent
        {...props}
        options={{
          balances: loadingBalances.loading ? [] : loadingBalances.data,
          wyndTokens:
            wyndTokensLoadable.state !== 'hasValue'
              ? []
              : wyndTokensLoadable.contents,
          simulatingValue:
            simulation?.state === 'loading' ? simulatingValue : undefined,
          estUsdPrice,
        }}
      />
    </SuspenseLoader>
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
      swapOperations,
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
      const minOutAmount = convertDenomToMicroDenomWithDecimals(
        _minOutAmount,
        tokenOut.decimals
      ).toString()

      const msg: ExecuteSwapOperationsMsg = {
        execute_swap_operations: {
          operations: swapOperations,
          minimum_receive: minOutAmount,
          referral_address: DAO_DAO_DAO_ADDRESS,
          referral_commission: loadingMaxReferralCommission.data,
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
      minimum_receive: {},
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
          type: isNative ? TokenType.Native : TokenType.Cw20,
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

  if (
    !tokenIn ||
    tokenInAmount === undefined ||
    !tokenOut ||
    !swapMsg?.execute_swap_operations.minimum_receive
  ) {
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
      minOutAmount: convertMicroDenomToDenomWithDecimals(
        swapMsg.execute_swap_operations.minimum_receive,
        tokenOut.decimals
      ),
      swapOperations: swapMsg.execute_swap_operations.operations,
    },
  }
}

export const makeWyndSwapAction: ActionMaker<WyndSwapData> = ({ t, chainId }) =>
  // WYND only exists on Juno mainnet.
  chainId === ChainInfoID.Juno1
    ? {
        key: CoreActionKey.WyndSwap,
        Icon: CycleEmoji,
        label: t('title.swapTokensOnWynd'),
        description: t('info.swapTokensOnWyndDescription'),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
      }
    : null
