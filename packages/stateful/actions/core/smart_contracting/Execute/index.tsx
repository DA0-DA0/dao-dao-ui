import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  SwordsEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { TokenType, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgExecuteContract as SecretMsgExecuteContract } from '@dao-dao/types/protobuf/codegen/secret/compute/v1beta1/msg'
import {
  bech32DataToAddress,
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodeJsonFromBase64,
  decodePolytoneExecuteMsg,
  encodeJsonToBase64,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  isSecretNetwork,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import {
  ExecuteData,
  ExecuteComponent as StatelessExecuteComponent,
} from './Component'

const useDefaults: UseDefaults<ExecuteData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    address: '',
    message: '{}',
    funds: [],
    cw20: false,
  }
}

const useTransformToCosmos: UseTransformToCosmos<ExecuteData> = () => {
  const { t } = useTranslation()
  const options = useActionOptions()
  const tokenBalances = useTokenBalances()

  return useCallback(
    ({ chainId, address, message, funds, cw20 }: ExecuteData) => {
      const msg = JSON5.parse(message)

      const fundsTokens = funds.map(({ denom }) =>
        tokenBalances.loading
          ? undefined
          : tokenBalances.data.find(
              ({ token }) =>
                token.chainId === chainId && token.denomOrAddress === denom
            )?.token
      )
      const nonexistentFundsDenom = funds.find(
        (_, index) => !fundsTokens[index]
      )?.denom
      if (nonexistentFundsDenom) {
        throw new Error(
          t('error.unknownDenom', {
            denom: nonexistentFundsDenom,
          })
        )
      }

      let executeMsg: UnifiedCosmosMsg | undefined
      if (cw20) {
        if (funds.length !== 1 || fundsTokens.length !== 1) {
          throw new Error(t('error.loadingData'))
        }

        // Execute CW20 send message.
        const isSecret = isSecretNetwork(chainId)
        executeMsg = makeExecuteSmartContractMessage({
          chainId,
          sender: getChainAddressForActionOptions(options, chainId) || '',
          contractAddress: fundsTokens[0]!.denomOrAddress,
          msg: {
            send: {
              amount: convertDenomToMicroDenomStringWithDecimals(
                funds[0].amount,
                fundsTokens[0]!.decimals
              ),
              [isSecret ? 'recipient' : 'contract']: address,
              msg: encodeJsonToBase64(msg),
              ...(isSecret && {
                padding: '',
              }),
            },
          },
        })
      } else {
        executeMsg = makeExecuteSmartContractMessage({
          chainId,
          sender: getChainAddressForActionOptions(options, chainId) || '',
          contractAddress: address,
          msg,
          funds: funds.map(({ denom, amount }, index) => ({
            denom,
            amount: convertDenomToMicroDenomStringWithDecimals(
              amount,
              fundsTokens[index]!.decimals
            ),
          })),
        })
      }

      return maybeMakePolytoneExecuteMessage(
        options.chain.chain_id,
        chainId,
        executeMsg
      )
    },
    [t, tokenBalances, options]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ExecuteData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  const isWasmExecute = objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {},
      },
    },
  })

  const isSecretExecuteMsg =
    isDecodedStargateMsg(msg) &&
    msg.stargate.typeUrl === SecretMsgExecuteContract.typeUrl

  const executeMsg = isWasmExecute
    ? msg.wasm.execute.msg
    : isSecretExecuteMsg
    ? decodeJsonFromBase64(msg.stargate.value.msg)
    : undefined

  // Check if a CW20 execute, which is a subset of execute.
  const isCw20 =
    (isWasmExecute &&
      objectMatchesStructure(executeMsg, {
        send: {
          amount: {},
          contract: {},
          msg: {},
        },
      })) ||
    (isSecretExecuteMsg &&
      objectMatchesStructure(executeMsg, {
        send: {
          amount: {},
          recipient: {},
          msg: {},
          padding: {},
        },
      }))

  const cw20Token = useCachedLoadingWithError(
    isCw20
      ? genericTokenSelector({
          chainId,
          type: TokenType.Cw20,
          denomOrAddress: isWasmExecute
            ? msg.wasm.execute.contract_addr
            : bech32DataToAddress(chainId, msg.stargate.value.contract),
        })
      : undefined
  )

  const funds: Coin[] | undefined = isWasmExecute
    ? msg.wasm.execute.funds
    : isSecretExecuteMsg
    ? msg.stargate.value.sentFunds
    : undefined

  const fundsTokens = useCachedLoadingWithError(
    funds?.length && !isCw20
      ? waitForAll(
          funds.map(({ denom }) =>
            genericTokenSelector({
              chainId,
              type: TokenType.Native,
              denomOrAddress: denom,
            })
          )
        )
      : undefined
  )

  // Can't match until we have the token info.
  if (
    (!isWasmExecute && !isSecretExecuteMsg) ||
    (isCw20 && (cw20Token.loading || cw20Token.errored)) ||
    (!isCw20 && !!funds?.length && (fundsTokens.loading || fundsTokens.errored))
  ) {
    return { match: false }
  }

  return isWasmExecute
    ? {
        match: true,
        data: {
          chainId,
          address: isCw20
            ? executeMsg.send.contract
            : msg.wasm.execute.contract_addr,
          message: JSON.stringify(
            isCw20
              ? decodeJsonFromBase64(executeMsg.send.msg, true)
              : executeMsg,
            null,
            2
          ),
          funds: isCw20
            ? [
                {
                  denom: msg.wasm.execute.contract_addr,
                  amount: convertMicroDenomToDenomWithDecimals(
                    executeMsg.send.amount,
                    !cw20Token.loading && !cw20Token.errored
                      ? cw20Token.data.decimals
                      : 0
                  ),
                },
              ]
            : !fundsTokens.loading && !fundsTokens.errored && funds
            ? funds.map(({ denom, amount }, index) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  fundsTokens.data[index].decimals
                ),
              }))
            : [],
          cw20: isCw20,
        },
      }
    : isSecretExecuteMsg
    ? {
        match: true,
        data: {
          chainId,
          address: isCw20
            ? executeMsg.send.recipient
            : bech32DataToAddress(chainId, msg.stargate.value.contract),
          message: JSON.stringify(
            isCw20
              ? decodeJsonFromBase64(executeMsg.send.msg, true)
              : executeMsg,
            null,
            2
          ),
          funds: isCw20
            ? [
                {
                  denom: bech32DataToAddress(
                    chainId,
                    msg.stargate.value.contract
                  ),
                  amount: convertMicroDenomToDenomWithDecimals(
                    executeMsg.send.amount,
                    !cw20Token.loading && !cw20Token.errored
                      ? cw20Token.data.decimals
                      : 0
                  ),
                },
              ]
            : !fundsTokens.loading && !fundsTokens.errored && funds
            ? funds.map(({ denom, amount }, index) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  fundsTokens.data[index].decimals
                ),
              }))
            : [],
          cw20: isCw20,
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()
  const { watch, setValue } = useFormContext<ExecuteData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')
  const cw20 = watch((props.fieldNamePrefix + 'cw20') as 'cw20')

  const balances = useTokenBalances({
    // Load selected tokens when not creating in case they are no longer
    // returned in the list of all tokens for the given DAO/wallet after the
    // proposal is made.
    additionalTokens: props.isCreating
      ? undefined
      : funds.map(({ denom }) => ({
          chainId,
          type: cw20 ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress: denom,
        })),
  })

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={() => {
            // Reset funds when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessExecuteComponent
          {...props}
          options={{
            balances: balances.loading
              ? balances
              : {
                  loading: false,
                  data: balances.data.filter(
                    ({ token }) => token.chainId === chainId
                  ),
                },
          }}
        />
      </ChainProvider>
    </>
  )
}

export const makeExecuteAction: ActionMaker<ExecuteData> = ({ t }) => ({
  key: ActionKey.Execute,
  Icon: SwordsEmoji,
  label: t('title.executeSmartContract'),
  description: t('info.executeSmartContractActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
