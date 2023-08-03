import { coin } from '@cosmjs/amino'
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx'
import Long from 'long'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { MoneyEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  CosmosMsgForEmpty,
  Entity,
  TokenType,
  UseDecodedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  getChainForChainId,
  getChainForChainName,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromChainSource,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  isValidBech32Address,
  isValidContractAddress,
  makeBankMessage,
  makePolytoneExecuteMessage,
  makeStargateMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useWallet } from '../../../../hooks/useWallet'
import { entitySelector } from '../../../../recoil'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { useActionOptions } from '../../../react'
import {
  SpendData,
  SpendComponent as StatelessSpendComponent,
} from './Component'

const IBC_MSG_TRANSFER_TYPE_URL = '/ibc.applications.transfer.v1.MsgTransfer'

const useDefaults: UseDefaults<SpendData> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { address: walletAddress = '' } = useWallet()

  return {
    chainId,
    toChainId: chainId,
    to: walletAddress,
    amount: 1,
    denom: getNativeTokenForChainId(chainId).denomOrAddress,
  }
}

const Component: ActionComponent<undefined, SpendData> = (props) => {
  const { watch } = useFormContext<SpendData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')
  const recipient = watch((props.fieldNamePrefix + 'to') as 'to')
  const toChainId = watch((props.fieldNamePrefix + 'toChainId') as 'toChainId')

  const loadingTokens = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO/wallet.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId,
            // Cw20 denoms are contract addresses, native denoms are not.
            type: isValidContractAddress(
              denom,
              getChainForChainId(chainId).bech32_prefix
            )
              ? TokenType.Cw20
              : TokenType.Native,
            denomOrAddress: denom,
          },
        ],
    allChains: true,
  })

  const [currentEntity, setCurrentEntity] = useState<Entity | undefined>()
  const loadingEntity = useCachedLoadingWithError(
    recipient &&
      isValidBech32Address(
        recipient,
        getChainForChainId(toChainId).bech32_prefix
      )
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
        AddressInput,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
  const {
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const loadingTokenBalances = useTokenBalances({
    allChains: true,
  })

  return useCallback(
    (data: SpendData) => {
      if (loadingTokenBalances.loading) {
        return
      }

      const token = loadingTokenBalances.data.find(
        ({ token }) =>
          token.chainId === data.chainId && token.denomOrAddress === data.denom
      )?.token
      if (!token) {
        throw new Error(`Unknown token: ${data.denom}`)
      }

      const amount = BigInt(
        convertDenomToMicroDenomWithDecimals(data.amount, token.decimals)
      ).toString()

      let msg: CosmosMsgForEmpty | undefined
      if (data.toChainId !== data.chainId) {
        const { sourceChannel } = getIbcTransferInfoBetweenChains(
          data.chainId,
          data.toChainId
        )
        msg = makeStargateMessage({
          stargate: {
            typeUrl: IBC_MSG_TRANSFER_TYPE_URL,
            value: {
              sourcePort: 'transfer',
              sourceChannel,
              token: coin(amount, data.denom),
              sender: address,
              receiver: data.to,
              timeoutTimestamp: Long.MAX_VALUE,
              memo: '',
            } as MsgTransfer,
          },
        })
      } else if (token.type === TokenType.Native) {
        msg = {
          bank: makeBankMessage(amount, data.to, data.denom),
        }
      } else if (token.type === TokenType.Cw20) {
        msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: data.denom,
              funds: [],
              msg: {
                transfer: {
                  recipient: data.to,
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

      if (data.chainId === currentChainId) {
        return msg
      } else {
        return makePolytoneExecuteMessage(currentChainId, data.chainId, msg)
      }
    },
    [address, currentChainId, loadingTokenBalances]
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
    msg.stargate.typeUrl === IBC_MSG_TRANSFER_TYPE_URL &&
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

  if (!token) {
    return { match: false }
  }

  if (isIbcTransfer) {
    const { destinationChain } = getIbcTransferInfoFromChainSource(
      chainId,
      msg.stargate.value.sourceChannel
    )

    return {
      match: true,
      data: {
        chainId,
        toChainId: getChainForChainName(destinationChain.chain_name).chain_id,
        to: msg.stargate.value.receiver,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.stargate.value.token.amount,
          token.decimals
        ),
        denom: token.denomOrAddress,
      },
    }
  } else if (token.type === TokenType.Native) {
    return {
      match: true,
      data: {
        chainId,
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
        chainId,
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
