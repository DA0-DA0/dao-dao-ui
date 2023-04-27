import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { MoneyEmoji } from '@dao-dao/stateless'
import {
  CosmosMsgForEmpty,
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
  getChainForChainId,
  getNativeTokenForChainId,
  isValidContractAddress,
  makeBankMessage,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { useDecodePolytoneExecuteMsg } from '../../../hooks/useDecodePolytoneExecuteMsg'
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
    chainId,
    to: walletAddress,
    amount: 1,
    denom: getNativeTokenForChainId(chainId).denomOrAddress,
  }
}

const Component: ActionComponent<undefined, SpendData> = (props) => {
  // Get the selected token if not creating.
  const { watch } = useFormContext<SpendData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')

  const loadingTokens = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO/wallet.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
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

  return (
    <StatelessSpendComponent
      {...props}
      options={{
        tokens: loadingTokens,
        AddressInput,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
  const currentChainId = useActionOptions().chain.chain_id
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

      let msg: CosmosMsgForEmpty | undefined
      if (token.type === TokenType.Native) {
        const amount = convertDenomToMicroDenomWithDecimals(
          data.amount,
          token.decimals
        )
        msg = {
          bank: makeBankMessage(amount.toString(), data.to, data.denom),
        }
      } else if (token.type === TokenType.Cw20) {
        const amount = convertDenomToMicroDenomWithDecimals(
          data.amount,
          token.decimals
        ).toString()

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
        return makePolytoneExecuteMessage(data.chainId, msg)
      }
    },
    [currentChainId, loadingTokenBalances]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = useDecodePolytoneExecuteMsg(msg)
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

  const token = useRecoilValue(
    isNative || isCw20
      ? genericTokenSelector({
          chainId,
          type: isNative ? TokenType.Native : TokenType.Cw20,
          denomOrAddress: isNative
            ? msg.bank.send.amount[0].denom
            : msg.wasm.execute.contract_addr,
        })
      : constSelector(undefined)
  )

  if (!token) {
    return { match: false }
  }

  if (token.type === TokenType.Native) {
    return {
      match: true,
      data: {
        chainId,
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
