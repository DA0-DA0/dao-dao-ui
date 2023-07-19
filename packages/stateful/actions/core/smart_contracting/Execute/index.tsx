import { Coin } from '@cosmjs/stargate'
import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import {
  ChainPickerInput,
  ChainProvider,
  SwordsEmoji,
} from '@dao-dao/stateless'
import { CosmosMsgForEmpty, TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  encodeMessageAsBase64,
  getTokenForChainIdAndDenom,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
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
  const currentChainId = useActionOptions().chain.chain_id
  const tokenBalances = useTokenBalances({
    allChains: true,
  })

  return useCallback(
    ({ chainId, address, message, funds, cw20 }: ExecuteData) => {
      let msg
      try {
        msg = JSON5.parse(message)
      } catch (err) {
        console.error(`internal error. unparsable message: (${message})`, err)
        return
      }

      let executeMsg: CosmosMsgForEmpty | undefined
      if (cw20) {
        const tokenBalance =
          tokenBalances.loading || funds.length !== 1
            ? undefined
            : tokenBalances.data.find(
                ({ token }) =>
                  token.chainId === chainId &&
                  token.denomOrAddress === funds[0].denom
              )
        if (!tokenBalance) {
          throw new Error(t('error.unknownDenom', { denom: funds[0].denom }))
        }

        // Execute CW20 send message.
        executeMsg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: tokenBalance.token.denomOrAddress,
              funds: [],
              msg: {
                send: {
                  amount: convertDenomToMicroDenomWithDecimals(
                    funds[0].amount,
                    tokenBalance.token.decimals
                  ).toString(),
                  contract: address,
                  msg: encodeMessageAsBase64(msg),
                },
              },
            },
          },
        })
      } else {
        executeMsg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: funds.map(({ denom, amount }) => ({
                denom,
                amount: convertDenomToMicroDenomWithDecimals(
                  amount,
                  getTokenForChainIdAndDenom(chainId, denom).decimals
                ).toString(),
              })),
              msg,
            },
          },
        })
      }

      if (chainId === currentChainId) {
        return executeMsg
      } else {
        return makePolytoneExecuteMessage(currentChainId, chainId, executeMsg)
      }
    },
    [currentChainId, t, tokenBalances]
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

  const isExecute = objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {},
      },
    },
  })

  // Check if a CW20 execute, which is a subset of execute.
  const isCw20 = objectMatchesStructure(msg, {
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

  const cw20Token = useRecoilValue(
    isCw20
      ? genericTokenSelector({
          chainId,
          type: TokenType.Cw20,
          denomOrAddress: msg.wasm.execute.contract_addr,
        })
      : constSelector(undefined)
  )

  // Can't match until we have the CW20 token info.
  if (isCw20 && !cw20Token) {
    return { match: false }
  }

  return isExecute
    ? {
        match: true,
        data: {
          chainId,
          address: isCw20
            ? msg.wasm.execute.msg.send.contract
            : msg.wasm.execute.contract_addr,
          message: JSON.stringify(
            isCw20
              ? parseEncodedMessage(msg.wasm.execute.msg.send.msg)
              : msg.wasm.execute.msg,
            undefined,
            2
          ),
          funds: isCw20
            ? [
                {
                  denom: msg.wasm.execute.contract_addr,
                  amount: convertMicroDenomToDenomWithDecimals(
                    msg.wasm.execute.msg.send.amount,
                    cw20Token?.decimals ?? 0
                  ),
                },
              ]
            : (msg.wasm.execute.funds as Coin[]).map(({ denom, amount }) => ({
                denom,
                amount: convertMicroDenomToDenomWithDecimals(
                  amount,
                  getTokenForChainIdAndDenom(chainId, denom).decimals
                ),
              })),
          cw20: isCw20,
        },
      }
    : { match: false }
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
    allChains: true,
  })

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <ChainPickerInput
          className="mb-4"
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
