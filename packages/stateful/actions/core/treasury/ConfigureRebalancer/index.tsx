import { coin } from '@cosmjs/amino'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { MsgTransfer } from '@dao-dao/protobuf/codegen/ibc/applications/transfer/v1/tx'
import { genericTokenSelector } from '@dao-dao/state/recoil'
import { ChainProvider, MoneyEmoji } from '@dao-dao/stateless'
import {
  CosmosMsgForEmpty,
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
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getIbcTransferInfoBetweenChains,
  makeBankMessage,
  makePolytoneExecuteMessage,
  makeStargateMessage,
  makeWasmMessage,
  objectMatchesStructure,
  transformBech32Address,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  ConfigureRebalancerData,
  ConfigureRebalancerComponent as StatelessConfigureRebalancerComponent,
} from './Component'

const useDefaults: UseDefaults<ConfigureRebalancerData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId: chainId,
    tokens: [],
    pid: {
      kp: 1,
      ki: 1,
      kd: 1,
    },
  }
}

const Component: ActionComponent<undefined, ConfigureRebalancerData> = (
  props
) => {
  const { watch } = useFormContext<ConfigureRebalancerData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const loadingTokens = useTokenBalances({
    allChains: true,
    filter: TokenType.Native,
  })

  return (
    <ChainProvider chainId={chainId}>
      <StatelessConfigureRebalancerComponent
        {...props}
        options={{
          nativeBalances: loadingTokens.loading
            ? loadingTokens
            : {
                loading: false,
                updating: loadingTokens.updating,
                data: loadingTokens.data.filter(
                  ({ token }) => token.chainId === chainId
                ),
              },
        }}
      />
    </ChainProvider>
  )
}

const useTransformToCosmos: UseTransformToCosmos<
  ConfigureRebalancerData
> = () => {
  const {
    address,
    context,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const loadingTokenBalances = useTokenBalances({
    allChains: true,
    filter: TokenType.Native,
  })

  return useCallback(
    ({ chainId, tokens, pid }: ConfigureRebalancerData) => {
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

      const amount = BigInt(
        convertDenomToMicroDenomWithDecimals(_amount, token.decimals)
      ).toString()

      let msg: CosmosMsgForEmpty | undefined
      if (toChainId !== fromChainId) {
        const { sourceChannel } = getIbcTransferInfoBetweenChains(
          fromChainId,
          toChainId
        )
        const sender =
          fromChainId === currentChainId
            ? address
            : context.type === ActionContextType.Dao
            ? context.info.polytoneProxies[fromChainId]
            : transformBech32Address(address, fromChainId)
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgTransfer.typeUrl,
            value: {
              sourcePort: 'transfer',
              sourceChannel,
              token: coin(amount, denom),
              sender,
              receiver: to,
              // Timeout after 1 year. Needs to survive voting period and
              // execution delay.
              timeoutTimestamp: BigInt(
                // Nanoseconds.
                (Date.now() + 1000 * 60 * 60 * 24 * 365) * 1e6
              ),
              memo: '',
            } as MsgTransfer,
          },
        })
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

      if (fromChainId === currentChainId) {
        return msg
      } else {
        return makePolytoneExecuteMessage(currentChainId, fromChainId, msg)
      }
    },
    [address, context, currentChainId, loadingTokenBalances]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<ConfigureRebalancerData> = (
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

  const token = useRecoilValue(
    isNative
      ? genericTokenSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: msg.bank.send.amount[0].denom,
        })
      : constSelector(undefined)
  )

  if (!token) {
    return {
      match: false,
    }
  }

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
}

export const makeSpendAction: ActionMaker<ConfigureRebalancerData> = ({
  t,
  context,
}) => ({
  key: ActionKey.ConfigureRebalancer,
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
