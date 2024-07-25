import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  SwordsEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { AccountType, TokenType, UnifiedCosmosMsg } from '@dao-dao/types'
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
  decodeIcaExecuteMsg,
  decodeJsonFromBase64,
  decodePolytoneExecuteMsg,
  encodeJsonToBase64,
  getAccountAddress,
  isDecodedStargateMsg,
  isSecretNetwork,
  makeExecuteSmartContractMessage,
  maybeMakeIcaExecuteMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useQueryTokens } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import { useActionOptions } from '../../../react'
import {
  ExecuteData,
  ExecuteComponent as StatelessExecuteComponent,
} from './Component'

// Account types that are allowed to execute from.
const ALLOWED_ACCOUNT_TYPES: readonly AccountType[] = [
  AccountType.Native,
  AccountType.Polytone,
  AccountType.Ica,
]

const useDefaults: UseDefaults<ExecuteData> = () => {
  const {
    chain: { chain_id: chainId },
    address,
  } = useActionOptions()

  return {
    chainId,
    sender: address,
    address: '',
    message: '{}',
    funds: [],
    cw20: false,
  }
}

const useTransformToCosmos: UseTransformToCosmos<ExecuteData> = () => {
  const {
    address: currentAddress,
    context,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  return useCallback(
    ({ chainId, sender, address, message, funds, cw20 }: ExecuteData) => {
      const account = context.accounts.find(
        (a) => a.chainId === chainId && a.address === sender
      )
      if (!account) {
        throw new Error('Instantiator account not found')
      }

      const msg = JSON5.parse(message)

      let executeMsg: UnifiedCosmosMsg | undefined
      if (cw20) {
        if (funds.length !== 1) {
          throw new Error('Missing CW20 fund denom.')
        }

        // Execute CW20 send message.
        const isSecret = isSecretNetwork(chainId)
        executeMsg = makeExecuteSmartContractMessage({
          chainId,
          sender,
          contractAddress: funds[0].denom,
          msg: {
            send: {
              amount: convertDenomToMicroDenomStringWithDecimals(
                funds[0].amount,
                funds[0].decimals
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
          sender,
          contractAddress: address,
          msg,
          funds: funds
            .map(({ denom, amount, decimals }) => ({
              denom,
              amount: convertDenomToMicroDenomStringWithDecimals(
                amount,
                decimals
              ),
            }))
            // Neutron errors with `invalid coins` if the funds list is not
            // alphabetized.
            .sort((a, b) => a.denom.localeCompare(b.denom)),
        })
      }

      return account.type === AccountType.Polytone
        ? maybeMakePolytoneExecuteMessage(
            currentChainId,
            account.chainId,
            executeMsg
          )
        : account.type === AccountType.Ica
        ? maybeMakeIcaExecuteMessage(
            currentChainId,
            account.chainId,
            currentAddress,
            account.address,
            executeMsg
          )
        : executeMsg
    },
    [context.accounts, currentAddress, currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ExecuteData> = (
  msg: Record<string, any>
) => {
  let {
    chain: { chain_id: chainId },
    address: sender,
    context: { accounts },
  } = useActionOptions()
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
    sender =
      getAccountAddress({
        accounts,
        chainId,
        types: [AccountType.Polytone],
      }) || ''
  } else {
    const decodedIca = decodeIcaExecuteMsg(chainId, msg)
    if (decodedIca.match) {
      chainId = decodedIca.chainId
      // should never be undefined since we check for 1 message in the decoder
      msg = decodedIca.msgWithSender?.msg || {}
      sender = decodedIca.msgWithSender?.sender || ''
    }
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

  const fundsTokens = useQueryTokens(
    funds?.length && !isCw20
      ? funds.map(({ denom }) => ({
          chainId,
          type: TokenType.Native,
          denomOrAddress: denom,
        }))
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

  const cw20Decimals =
    !cw20Token.loading && !cw20Token.errored ? cw20Token.data.decimals : 0

  return isWasmExecute
    ? {
        match: true,
        data: {
          chainId,
          sender,
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
                    cw20Decimals
                  ),
                  decimals: cw20Decimals,
                },
              ]
            : !fundsTokens.loading && !fundsTokens.errored && funds
            ? funds.map(({ denom, amount }, index) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  fundsTokens.data[index].decimals
                ),
                decimals: fundsTokens.data[index].decimals,
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
          sender,
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
                    cw20Decimals
                  ),
                  decimals: cw20Decimals,
                },
              ]
            : !fundsTokens.loading && !fundsTokens.errored && funds
            ? funds.map(({ denom, amount }, index) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  fundsTokens.data[index].decimals
                ),
                decimals: fundsTokens.data[index].decimals,
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
  const sender = watch((props.fieldNamePrefix + 'sender') as 'sender')
  const funds = watch((props.fieldNamePrefix + 'funds') as 'funds')
  const cw20 = watch((props.fieldNamePrefix + 'cw20') as 'cw20')

  const tokens = useTokenBalances({
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

  // If sender is not found in the list of accounts, reset to the first account
  // on the target chain, or an empty account.
  useEffect(() => {
    if (
      sender &&
      !context.accounts.some(
        (a) => a.chainId === chainId && a.address === sender
      )
    ) {
      setValue(
        (props.fieldNamePrefix + 'sender') as 'sender',
        getAccountAddress({
          accounts: context.accounts,
          chainId,
          types: ALLOWED_ACCOUNT_TYPES,
        }) || ''
      )
    }
  }, [chainId, context.accounts, props.fieldNamePrefix, sender, setValue])

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset funds when switching chain.
            setValue((props.fieldNamePrefix + 'funds') as 'funds', [])
            // Default sender to first matching account on new chain.
            setValue(
              (props.fieldNamePrefix + 'sender') as 'sender',
              getAccountAddress({
                accounts: context.accounts,
                chainId,
                types: ALLOWED_ACCOUNT_TYPES,
              }) || ''
            )
          }}
        />
      )}

      <ChainProvider chainId={chainId}>
        <StatelessExecuteComponent
          {...props}
          options={{
            tokens: tokens.loading
              ? tokens
              : {
                  loading: false,
                  data: tokens.data.filter(
                    ({ token, owner }) =>
                      token.chainId === chainId && owner.address === sender
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
