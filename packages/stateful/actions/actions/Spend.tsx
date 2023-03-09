import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { ActionCardLoader, MoneyEmoji } from '@dao-dao/stateless'
import { TokenType, UseDecodedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  CHAIN_BECH32_PREFIX,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  isValidContractAddress,
  makeBankMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import {
  SpendData,
  SpendComponent as StatelessSpendComponent,
} from '../components/Spend'
import { useTokenBalances } from '../hooks/useTokenBalances'

const useDefaults: UseDefaults<SpendData> = () => {
  const { address: walletAddress = '' } = useWallet()

  return {
    to: walletAddress,
    amount: 1,
    denom: NATIVE_DENOM,
  }
}

const Component: ActionComponent<undefined, SpendData> = (props) => {
  // Get the selected token if not creating.
  const { watch } = useFormContext<SpendData>()
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')

  const loadingTokens = useTokenBalances({
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given DAO/wallet.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            // Cw20 denoms are contract addresses, native denoms are not.
            type: isValidContractAddress(denom, CHAIN_BECH32_PREFIX)
              ? TokenType.Cw20
              : TokenType.Native,
            denomOrAddress: denom,
          },
        ],
  })

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        loadingTokens.loading
      }
    >
      <StatelessSpendComponent
        {...props}
        options={{
          tokens: loadingTokens.loading ? [] : loadingTokens.data,
          AddressInput,
        }}
      />
    </SuspenseLoader>
  )
}

const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
  const loadingTokenBalances = useTokenBalances()

  return useCallback(
    (data: SpendData) => {
      if (loadingTokenBalances.loading) {
        return
      }

      const token = loadingTokenBalances.data.find(
        ({ token }) => token.denomOrAddress === data.denom
      )?.token
      if (!token) {
        throw new Error(`Unknown token: ${data.denom}`)
      }

      if (token.type === TokenType.Native) {
        const amount = convertDenomToMicroDenomWithDecimals(
          data.amount,
          token.decimals
        )
        return {
          bank: makeBankMessage(amount.toString(), data.to, data.denom),
        }
      } else if (token.type === TokenType.Cw20) {
        const amount = convertDenomToMicroDenomWithDecimals(
          data.amount,
          token.decimals
        ).toString()

        return makeWasmMessage({
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
    },
    [loadingTokenBalances]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
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
  key: CoreActionKey.Spend,
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
